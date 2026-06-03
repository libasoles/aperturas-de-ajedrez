/* eslint-disable react-refresh/only-export-components */
'use client'
import { Background, Controls, MarkerType, ReactFlow, ReactFlowProvider } from "@xyflow/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChessNode from "./ChessNode";
import HelpDialog from "./ui/HelpDialog";
import PlayerAnalysisPanel from "./PlayerAnalysisPanel";
import PlayerChessBoard from "./PlayerChessBoard";
import { PLAYER_CATALOG } from "../data/players";
import { localizedPath } from "../utils/locale";

const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -";
const X_STEP = 170;
const Y_STEP = 92;
const PLAYER_COLORS = {
  root: { node: "#111827", text: "#f8fafc", border: "#00f5ff", edge: "#00f5ff" },
  white: { node: "#1e293b", text: "#f8fafc", border: "#f8fafc", edge: "#94a3b8" },
  black: { node: "#111111", text: "#f8fafc", border: "#bf5fff", edge: "#bf5fff" },
};
const nodeTypes = { chess: ChessNode };
const PREFETCH_CHILD_LIMIT = 8;

function apiUrl(name, params) {
  const search = new URLSearchParams(params);
  return `/api/${name}?${search.toString()}`;
}

async function fetchJson(name, params) {
  const response = await fetch(apiUrl(name, params));
  const payload = await response.json();
  if (!response.ok) {
    const error = new Error(payload.error ?? `Error loading ${name}`);
    error.status = response.status;
    throw error;
  }
  return payload;
}

function initialNodes() {
  return {
    root: {
      id: "root",
      parentId: null,
      move: "Inicial",
      color: null,
      fen: INITIAL_FEN,
      ply: 0,
      children: [],
      loaded: false,
      loading: false,
    },
  };
}

function childId(parentId, move, fen) {
  return `${parentId}/${move}/${fen}`;
}

function pathToNode(nodesById, nodeId) {
  const path = [];
  let current = nodesById[nodeId];
  while (current) {
    path.unshift(current);
    current = current.parentId ? nodesById[current.parentId] : null;
  }
  return path;
}

function buildGraph(nodesById, nodeId, expandedIds, depth = 0, yOffset = 0) {
  const source = nodesById[nodeId];
  const colors = source.id === "root" ? PLAYER_COLORS.root : PLAYER_COLORS[source.color];
  const isExpanded = expandedIds.has(nodeId);
  const hasChildren = source.loaded ? source.children.length > 0 : true;
  const node = {
    id: source.id,
    type: "chess",
    position: { x: depth * X_STEP, y: yOffset },
    data: {
      move: source.move,
      color: source.color,
      name: source.id === "root" ? "Capablanca" : null,
      annotation: source.times_played ? `${source.times_played} partidas` : null,
      isExpanded,
      hasChildren,
      colors,
      isPremium: false,
      isLocked: false,
    },
  };
  const nodes = [node];
  const edges = [];

  if (isExpanded && source.children.length > 0) {
    let childY = yOffset;
    for (const childNodeId of source.children) {
      const childGraph = buildGraph(nodesById, childNodeId, expandedIds, depth + 1, childY);
      nodes.push(...childGraph.nodes);
      edges.push(...childGraph.edges);
      edges.push({
        id: `${nodeId}->${childNodeId}`,
        source: nodeId,
        target: childNodeId,
        type: "straight",
        style: { stroke: colors.edge, strokeWidth: 2, opacity: 0.72 },
        markerEnd: { type: MarkerType.ArrowClosed, color: colors.edge, width: 16, height: 16 },
      });
      childY += childGraph.height;
    }
    const totalHeight = childY - yOffset;
    node.position.y = yOffset + totalHeight / 2 - Y_STEP / 2;
    return { nodes, edges, height: Math.max(totalHeight, Y_STEP) };
  }

  return { nodes, edges, height: Y_STEP };
}

export function usePlayerExplorer(player) {
  const playerKey = player.keyName ?? player.name;
  const [color, setColor] = useState("white");
  const [nodesById, setNodesById] = useState(initialNodes);
  const [expandedIds, setExpandedIds] = useState(new Set(["root"]));
  const [selectedNodeId, setSelectedNodeId] = useState("root");
  const [profile, setProfile] = useState(null);
  const [orientation, setOrientation] = useState("white");
  const [error, setError] = useState("");
  const [transpositions, setTranspositions] = useState([]);
  const [gameDetails, setGameDetails] = useState({});
  const cacheRef = useRef(new Map());
  const loadingRef = useRef(new Set());
  const failedRef = useRef(new Set());
  const generationRef = useRef(0);
  // Read nodesById without adding it as a dependency of loadFen
  const nodesByIdRef = useRef(nodesById);
  useEffect(() => { nodesByIdRef.current = nodesById; });

  const resetTree = useCallback(() => {
    generationRef.current += 1;
    cacheRef.current.clear();
    loadingRef.current.clear();
    failedRef.current.clear();
    const nextNodes = initialNodes();
    nodesByIdRef.current = nextNodes;
    setNodesById(nextNodes);
    setExpandedIds(new Set(["root"]));
    setSelectedNodeId("root");
    setTranspositions([]);
    setError("");
  }, []);

  useEffect(() => {
    resetTree();
  }, [color, playerKey, resetTree]);

  useEffect(() => {
    fetchJson("player-profile", { player_name: playerKey })
      .then((payload) => setProfile(payload.player))
      .catch((err) => setError(err.message));
  }, [playerKey]);

  const loadPosition = useCallback(
    async (nodeId, { prefetch = false } = {}) => {
      const source = nodesByIdRef.current[nodeId];
      if (!source) return;
      const cacheKey = `${color}:${source.fen}`;
      if (
        source.loaded ||
        loadingRef.current.has(cacheKey) ||
        failedRef.current.has(cacheKey)
      )
        return;

      const generation = generationRef.current;
      loadingRef.current.add(cacheKey);
      if (!prefetch) {
        const current = nodesByIdRef.current;
        const node = current[nodeId];
        if (node) {
          const next = { ...current, [nodeId]: { ...node, loading: true } };
          nodesByIdRef.current = next;
          setNodesById(next);
        }
      }

      try {
        const payload =
          cacheRef.current.get(cacheKey) ??
          (await fetchJson("player-explorer", {
            player_name: playerKey,
            color,
            fen: source.fen,
          }));
        if (generation !== generationRef.current) return;
        cacheRef.current.set(cacheKey, payload);
        const childIdsToPrefetch = payload.moves.map((move, index) =>
          childId(nodeId, `${index}-${move.san}`, move.fen),
        );
        const current = nodesByIdRef.current;
        const parent = current[nodeId];
        if (!parent) return;
        const next = { ...current };
        payload.moves.forEach((move, index) => {
          const id = childIdsToPrefetch[index];
          next[id] = {
            ...move,
            id,
            parentId: nodeId,
            move: move.san,
            color: (parent.ply + 1) % 2 === 1 ? "white" : "black",
            ply: parent.ply + 1,
            children: current[id]?.children ?? [],
            loaded: current[id]?.loaded ?? false,
            loading: false,
          };
        });
        next[nodeId] = {
          ...parent,
          children: childIdsToPrefetch,
          loaded: true,
          loading: false,
        };
        nodesByIdRef.current = next;
        setNodesById(next);

        if (!prefetch && childIdsToPrefetch.length > 0) {
          window.queueMicrotask(() => {
            childIdsToPrefetch
              .slice(0, PREFETCH_CHILD_LIMIT)
              .forEach((childNodeId) => {
                loadPosition(childNodeId, { prefetch: true });
              });
          });
        }
      } catch (err) {
        if (generation !== generationRef.current) return;
        if (prefetch && err.status === 404) {
          cacheRef.current.set(cacheKey, { fen: source.fen, moves: [] });
          const current = nodesByIdRef.current;
          const node = current[nodeId];
          if (node) {
            const next = {
              ...current,
              [nodeId]: { ...node, children: [], loaded: true, loading: false },
            };
            nodesByIdRef.current = next;
            setNodesById(next);
          }
          return;
        }

        failedRef.current.add(cacheKey);
        if (!prefetch) setError(err.message);
        const current = nodesByIdRef.current;
        const node = current[nodeId];
        if (node) {
          const next = { ...current, [nodeId]: { ...node, loading: false } };
          nodesByIdRef.current = next;
          setNodesById(next);
        }
      } finally {
        loadingRef.current.delete(cacheKey);
      }
    },
    [color, playerKey],
  );

  const loadFen = useCallback(
    (nodeId) => loadPosition(nodeId, { prefetch: false }),
    [loadPosition],
  );

  useEffect(() => {
    loadFen("root");
  }, [loadFen]);

  const selectNode = useCallback(
    (nodeId) => {
      setSelectedNodeId(nodeId);
      loadFen(nodeId);
      const node = nodesById[nodeId];
      if (!node || node.id === "root") {
        setTranspositions([]);
        return;
      }
      fetchJson("player-transpositions", {
        player_name: playerKey,
        color,
        fen: node.fen,
      })
        .then((payload) => setTranspositions(payload.transpositions))
        .catch(() => setTranspositions([]));
    },
    [color, loadFen, nodesById, playerKey],
  );

  const toggleNode = useCallback(
    (nodeId) => {
      setExpandedIds((current) => {
        const next = new Set(current);
        if (next.has(nodeId)) next.delete(nodeId);
        else next.add(nodeId);
        return next;
      });
      loadFen(nodeId);
    },
    [loadFen],
  );

  const expandToNextFork = useCallback(
    (nodeId) => {
      const idsToExpand = [];
      let currentId = nodeId;
      const currentNodes = nodesByIdRef.current;

      while (currentId) {
        const node = currentNodes[currentId];
        if (!node) break;

        idsToExpand.push(currentId);
        if (!node.loaded || node.children.length !== 1) break;
        currentId = node.children[0];
      }

      if (idsToExpand.length > 0) {
        setExpandedIds((current) => new Set([...current, ...idsToExpand]));
      }
      loadFen(nodeId);
    },
    [loadFen],
  );

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== " " || !selectedNodeId) return;

      const target = event.target;
      const isEditable =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT");
      if (isEditable) return;

      const node = nodesByIdRef.current[selectedNodeId];
      if (!node) return;
      const hasChildren = node.loaded ? node.children.length > 0 : true;
      if (!hasChildren) return;

      event.preventDefault();
      event.stopPropagation();
      expandToNextFork(selectedNodeId);
    }

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [expandToNextFork, selectedNodeId]);

  const loadGame = useCallback(async (gameId) => {
    if (gameDetails[gameId]) return;
    const payload = await fetchJson("game-detail", { game_id: gameId });
    setGameDetails((current) => ({ ...current, [gameId]: payload.game }));
  }, [gameDetails]);

  const graph = useMemo(
    () => buildGraph(nodesById, "root", expandedIds),
    [expandedIds, nodesById],
  );

  const activePath = useMemo(
    () => pathToNode(nodesById, selectedNodeId),
    [nodesById, selectedNodeId],
  );
  const activePathIds = useMemo(() => new Set(activePath.map((node) => node.id)), [activePath]);
  const selectedNode = nodesById[selectedNodeId];
  const continuations = selectedNode?.children.map((id) => nodesById[id]).filter(Boolean) ?? [];

  const nodes = useMemo(
    () =>
      graph.nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onToggle: toggleNode,
          onSelect: selectNode,
          onExpandToFork: expandToNextFork,
          isSelected: node.id === selectedNodeId,
          isInActivePath: activePathIds.has(node.id),
        },
      })),
    [activePathIds, expandToNextFork, graph.nodes, selectNode, selectedNodeId, toggleNode],
  );

  return {
    activePath,
    color,
    continuations,
    edges: graph.edges,
    error,
    gameDetails,
    nodes,
    orientation,
    profile,
    selectedNode,
    setColor,
    setOrientation,
    transpositions,
    loadGame,
  };
}

function PlayerExplorerContent({ player, locale }) {
  const state = usePlayerExplorer(player);
  const gameCount =
    state.color === "white" ? state.profile?.white_games : state.profile?.black_games;
  const moves = state.activePath.map((node) => node.move).filter((move) => move && move !== "Inicial");
  const selectedFen = state.selectedNode?.fen ?? INITIAL_FEN;

  return (
    <div className="w-screen h-screen bg-app">
      <div className="absolute inset-0">
        <ReactFlow
          nodes={state.nodes}
          edges={state.edges}
          nodeTypes={nodeTypes}
          defaultViewport={{ x: 36, y: 300, zoom: 0.86 }}
          minZoom={0.2}
          maxZoom={2}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
        >
          <Background color="var(--color-grid)" gap={24} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <PlayerAnalysisPanel
        selectedNode={state.selectedNode}
        continuations={state.continuations}
        transpositions={state.transpositions}
        activeSequence={moves}
        gameDetails={state.gameDetails}
        onLoadGame={state.loadGame}
        locale={locale}
        isLoading={state.selectedNode?.loading}
      />

      <PlayerChessBoard
        fen={selectedFen}
        moves={moves}
        locale={locale}
        orientation={state.orientation}
        onFlip={() => state.setOrientation((current) => (current === "white" ? "black" : "white"))}
      />

      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between gap-4 px-8 py-3 z-10 border-b border-neon-purple/[0.14]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-panel) 94%, transparent) 0%, color-mix(in srgb, var(--color-panel) 69%, transparent) 80%, transparent 100%)",
        }}
      >
        <a href={localizedPath({ locale })} className="flex flex-col gap-0.5 no-underline">
          <div className="neon-title">Capablanca</div>
          <div className="neon-subtitle">explorador por posiciones</div>
        </a>
        <div className="flex items-center gap-3">
          <select
            value={player.id}
            className="border border-neon-cyan/25 bg-panel px-3 py-2 font-mono text-xs text-neon-cyan"
            onChange={(event) => {
              const next = PLAYER_CATALOG.find((item) => item.id === event.target.value);
              if (next) window.location.href = localizedPath({ locale, slug: next.routes[locale] });
            }}
          >
            {PLAYER_CATALOG.map((item) => (
              <option key={item.id} value={item.id}>{item.displayName}</option>
            ))}
          </select>
          <select
            value={state.color}
            onChange={(event) => state.setColor(event.target.value)}
            className="border border-neon-cyan/25 bg-panel px-3 py-2 font-mono text-xs text-neon-cyan"
          >
            <option value="white">Blancas</option>
            <option value="black">Negras</option>
          </select>
          <span className="font-mono text-xs text-neon-cyan/70">{gameCount ?? "-"} partidas</span>
          <button
            onClick={() => window.location.reload()}
            className="border border-neon-purple/35 px-3 py-2 font-mono text-xs uppercase text-neon-purple hover:border-neon-purple"
          >
            reset
          </button>
        </div>
      </div>

      {state.error ? (
        <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 border border-neon-pink/50 bg-panel px-4 py-2 font-mono text-sm text-neon-pink">
          {state.error}
        </div>
      ) : null}
      <div className="absolute bottom-28 left-4 z-10">
        <HelpDialog />
      </div>
    </div>
  );
}

export default function PlayerExplorerPage({ player, locale }) {
  return (
    <ReactFlowProvider>
      <PlayerExplorerContent player={player} locale={locale} />
    </ReactFlowProvider>
  );
}
