import { Background, Controls, MarkerType, ReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { OPENING_TREE } from "../data/openings";
import { findPathToNode, getActivePathIds } from "../utils/chessPath";
import ChessNode from "./ChessNode";
import ChessPanel from "./ChessPanel";
import OpeningsPanel from "./OpeningsPanel";

const nodeTypes = { chess: ChessNode };

const INITIAL_EXPANDED = new Set([
  "root",
  "e4",
  "scan-1",
  "span-1",
  "span-2",
  "span-3",
  "sic-1",
  "d4",
  "qg-1",
  "ki-1",
]);

function collectAllIds(node, acc = new Set()) {
  if (node.children && node.children.length > 0) {
    acc.add(node.id);
    node.children.forEach((c) => collectAllIds(c, acc));
  }
  return acc;
}
const ALL_IDS = collectAllIds(OPENING_TREE);

function buildOpeningFullIds(nodeId, pathIds) {
  const ids = new Set(["root", ...pathIds]);
  function findAndCollect(node) {
    if (node.id === nodeId) {
      collectAllIds(node, ids);
      ids.add(node.id);
      return true;
    }
    return (node.children || []).some(findAndCollect);
  }
  findAndCollect(OPENING_TREE);
  return ids;
}

const PANEL_OPENINGS = [
  {
    group: "e4",
    openings: [
      {
        label: "Escandinava",
        nodeId: "scan-1",
        pathIds: ["e4"],
        color: "#16a34a",
        glow: "#22c55e",
        text: "#bbf7d0",
      },
      {
        label: "Española",
        nodeId: "span-4",
        pathIds: ["e4", "span-1", "span-2", "span-3"],
        color: "#2563eb",
        glow: "#3b82f6",
        text: "#bfdbfe",
      },
      {
        label: "Italiana",
        nodeId: "ital-1",
        pathIds: ["e4", "span-1", "span-2", "span-3"],
        color: "#ea580c",
        glow: "#f97316",
        text: "#fed7aa",
      },
      {
        label: "Siciliana",
        nodeId: "sic-1",
        pathIds: ["e4"],
        color: "#dc2626",
        glow: "#ef4444",
        text: "#fecdd3",
      },
    ],
  },
  {
    group: "d4",
    openings: [
      {
        label: "Gambito de Dama",
        nodeId: "qg-2",
        pathIds: ["d4", "qg-1"],
        color: "#7c3aed",
        glow: "#8b5cf6",
        text: "#ddd6fe",
      },
      {
        label: "Londres",
        nodeId: "lon-2",
        pathIds: ["d4", "qg-1"],
        color: "#0891b2",
        glow: "#06b6d4",
        text: "#a5f3fc",
      },
      {
        label: "India de Rey",
        nodeId: "ki-3a",
        pathIds: ["d4", "ki-1", "ki-2"],
        color: "#d97706",
        glow: "#f59e0b",
        text: "#fde68a",
      },
      {
        label: "Nimzo-India",
        nodeId: "nim-3b",
        pathIds: ["d4", "ki-1", "ki-2"],
        color: "#a21caf",
        glow: "#c026d3",
        text: "#f5d0fe",
      },
    ],
  },
];

const ALL_OPENINGS = PANEL_OPENINGS.flatMap((g) => g.openings);

const OPENING_FULL_IDS = Object.fromEntries(
  ALL_OPENINGS.map((o) => [o.nodeId, buildOpeningFullIds(o.nodeId, o.pathIds)]),
);

export const OPENING_COLORS = {
  root: {
    node: "#3a2a1e",
    text: "#e8d5bc",
    border: "#6b4f3a",
    edge: "#8b6a50",
  },
  scandinavian: {
    node: "#14532d",
    text: "#bbf7d0",
    border: "#16a34a",
    edge: "#22c55e",
  },
  spanish: {
    node: "#1e3a5f",
    text: "#bfdbfe",
    border: "#2563eb",
    edge: "#3b82f6",
  },
  italian: {
    node: "#431407",
    text: "#fed7aa",
    border: "#ea580c",
    edge: "#f97316",
  },
  sicilian: {
    node: "#4c1d2e",
    text: "#fecdd3",
    border: "#dc2626",
    edge: "#ef4444",
  },
  queens_gambit: {
    node: "#1e1a3a",
    text: "#ddd6fe",
    border: "#7c3aed",
    edge: "#8b5cf6",
  },
  london: {
    node: "#1a2a2a",
    text: "#a5f3fc",
    border: "#0891b2",
    edge: "#06b6d4",
  },
  kings_indian: {
    node: "#2a1a00",
    text: "#fde68a",
    border: "#d97706",
    edge: "#f59e0b",
  },
  nimzo: {
    node: "#2a1a2a",
    text: "#f5d0fe",
    border: "#a21caf",
    edge: "#c026d3",
  },
};

const X_STEP = 160;
const Y_STEP = 90;

function buildGraph(treeNode, expandedIds, depth = 0, yOffset = 0) {
  const colors = OPENING_COLORS[treeNode.opening] || OPENING_COLORS.root;
  const isExpanded = expandedIds.has(treeNode.id);
  const hasChildren = treeNode.children && treeNode.children.length > 0;

  const rfNode = {
    id: treeNode.id,
    type: "chess",
    position: { x: depth * X_STEP, y: yOffset },
    data: {
      move: treeNode.move,
      name: treeNode.name,
      annotation: treeNode.annotation,
      color: treeNode.color,
      opening: treeNode.opening,
      isExpanded,
      hasChildren,
      colors,
    },
  };

  const nodes = [rfNode];
  const edges = [];

  if (isExpanded && hasChildren) {
    let childY = yOffset;

    for (const child of treeNode.children) {
      const {
        nodes: cn,
        edges: ce,
        height,
      } = buildGraph(child, expandedIds, depth + 1, childY);
      nodes.push(...cn);
      edges.push(...ce);

      edges.push({
        id: `${treeNode.id}->${child.id}`,
        source: treeNode.id,
        target: child.id,
        type: "straight",
        style: { stroke: colors.edge, strokeWidth: 2, opacity: 0.7 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.edge,
          width: 16,
          height: 16,
        },
      });

      childY += height;
    }

    const totalHeight = childY - yOffset;
    rfNode.position.y = yOffset + totalHeight / 2 - Y_STEP / 2;

    return { nodes, edges, height: Math.max(totalHeight, Y_STEP) };
  }

  return { nodes, edges, height: Y_STEP };
}

function getInitialStateFromUrl() {
  const nodeId = new URLSearchParams(window.location.search).get("node");
  if (!nodeId) return { selectedNodeId: null, extraExpanded: new Set() };
  const path = findPathToNode(nodeId);
  if (!path.length) return { selectedNodeId: null, extraExpanded: new Set() };
  // Expand all ancestors (all nodes in path except the leaf itself)
  const ancestorIds = new Set(path.slice(0, -1).map((n) => n.id));
  return { selectedNodeId: nodeId, extraExpanded: ancestorIds };
}

const INITIAL_URL_STATE = getInitialStateFromUrl();

export default function OpeningTree() {
  const [expandedIds, setExpandedIds] = useState(
    () => new Set([...INITIAL_EXPANDED, ...INITIAL_URL_STATE.extraExpanded]),
  );
  const [activeOpening, setActiveOpening] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(
    INITIAL_URL_STATE.selectedNodeId,
  );

  // Sync selected node → URL
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedNodeId) {
      url.searchParams.set("node", selectedNodeId);
    } else {
      url.searchParams.delete("node");
    }
    history.replaceState(null, "", url);
  }, [selectedNodeId]);

  const displayIds = activeOpening
    ? OPENING_FULL_IDS[activeOpening]
    : expandedIds;
  const isAllExpanded = !activeOpening && expandedIds.size === ALL_IDS.size;

  // Compute the set of IDs on the active selection path for ring highlighting
  const activePathIds = useMemo(
    () => (selectedNodeId ? getActivePathIds(selectedNodeId) : new Set()),
    [selectedNodeId],
  );

  const toggleAll = useCallback(() => {
    setActiveOpening(null);
    setExpandedIds(
      isAllExpanded ? new Set(INITIAL_EXPANDED) : new Set(ALL_IDS),
    );
  }, [isAllExpanded]);

  const toggleNode = useCallback((id) => {
    setActiveOpening(null);
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectNode = useCallback((id) => {
    setSelectedNodeId((prev) => (prev === id ? null : id));
  }, []);

  const toggleOpening = useCallback((nodeId) => {
    setActiveOpening((prev) => (prev === nodeId ? null : nodeId));
  }, []);

  const { nodes: rawNodes, edges: rawEdges } = useMemo(
    () => buildGraph(OPENING_TREE, displayIds),
    [displayIds],
  );

  const nodes = useMemo(
    () =>
      rawNodes.map((n) => ({
        ...n,
        data: {
          ...n.data,
          onToggle: toggleNode,
          onSelect: selectNode,
          isSelected: n.id === selectedNodeId,
          isInActivePath: activePathIds.has(n.id),
        },
      })),
    [rawNodes, toggleNode, selectNode, selectedNodeId, activePathIds],
  );

  return (
    <div className="w-screen h-screen bg-app">
      {/* Panels first in DOM so Tab reaches them before the ReactFlow canvas */}
      <OpeningsPanel
        openings={PANEL_OPENINGS}
        activeOpening={activeOpening}
        onToggleOpening={toggleOpening}
        isAllExpanded={isAllExpanded}
        onToggleAll={toggleAll}
      />

      <ReactFlow
        nodes={nodes}
        edges={rawEdges}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: 100, y: 80, zoom: 0.9 }}
        minZoom={0.2}
        maxZoom={2}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
      >
        <Background color="var(--color-grid)" gap={24} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>

      <ChessPanel selectedNodeId={selectedNodeId} />

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center px-8 py-3 z-10 border-b border-neon-purple/[0.14]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-panel) 94%, transparent) 0%, color-mix(in srgb, var(--color-panel) 69%, transparent) 80%, transparent 100%)",
        }}
      >
        <div className="flex flex-col gap-0.5">
          <div className="neon-title">Árbol de Aperturas</div>
          <div className="neon-subtitle">Explora variantes, compara</div>
        </div>
      </div>
    </div>
  );
}
