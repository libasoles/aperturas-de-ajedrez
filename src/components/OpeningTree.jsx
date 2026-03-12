import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
} from '@xyflow/react';
import { OPENING_TREE } from '../data/openings';
import ChessNode from './ChessNode';
import ChessPanel from './ChessPanel';
import { getActivePathIds } from '../utils/chessPath';

const nodeTypes = { chess: ChessNode };

const INITIAL_EXPANDED = new Set(['root', 'e4', 'scan-1', 'span-1', 'span-2', 'span-3', 'sic-1']);

function collectAllIds(node, acc = new Set()) {
  if (node.children && node.children.length > 0) {
    acc.add(node.id);
    node.children.forEach((c) => collectAllIds(c, acc));
  }
  return acc;
}
const ALL_IDS = collectAllIds(OPENING_TREE);

function buildOpeningFullIds(nodeId, pathIds) {
  const ids = new Set(['root', 'e4', ...pathIds]);
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
    label: 'Escandinava',
    nodeId: 'scan-1',
    pathIds: [],
    color: '#16a34a', glow: '#22c55e', text: '#bbf7d0',
  },
  {
    label: 'Española',
    nodeId: 'span-4',
    pathIds: ['span-1', 'span-2', 'span-3'],
    color: '#2563eb', glow: '#3b82f6', text: '#bfdbfe',
  },
  {
    label: 'Italiana',
    nodeId: 'ital-1',
    pathIds: ['span-1', 'span-2', 'span-3'],
    color: '#ea580c', glow: '#f97316', text: '#fed7aa',
  },
  {
    label: 'Siciliana',
    nodeId: 'sic-1',
    pathIds: [],
    color: '#dc2626', glow: '#ef4444', text: '#fecdd3',
  },
];

const OPENING_FULL_IDS = Object.fromEntries(
  PANEL_OPENINGS.map((o) => [o.nodeId, buildOpeningFullIds(o.nodeId, o.pathIds)])
);

export const OPENING_COLORS = {
  root: { node: '#3a2a1e', text: '#e8d5bc', border: '#6b4f3a', edge: '#8b6a50' },
  scandinavian: { node: '#14532d', text: '#bbf7d0', border: '#16a34a', edge: '#22c55e' },
  spanish: { node: '#1e3a5f', text: '#bfdbfe', border: '#2563eb', edge: '#3b82f6' },
  italian: { node: '#431407', text: '#fed7aa', border: '#ea580c', edge: '#f97316' },
  sicilian: { node: '#4c1d2e', text: '#fecdd3', border: '#dc2626', edge: '#ef4444' },
};

const X_STEP = 230;
const Y_STEP = 90;

function buildGraph(treeNode, expandedIds, depth = 0, yOffset = 0) {
  const colors = OPENING_COLORS[treeNode.opening] || OPENING_COLORS.root;
  const isExpanded = expandedIds.has(treeNode.id);
  const hasChildren = treeNode.children && treeNode.children.length > 0;

  const rfNode = {
    id: treeNode.id,
    type: 'chess',
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
      const { nodes: cn, edges: ce, height } = buildGraph(
        child,
        expandedIds,
        depth + 1,
        childY,
      );
      nodes.push(...cn);
      edges.push(...ce);

      edges.push({
        id: `${treeNode.id}->${child.id}`,
        source: treeNode.id,
        target: child.id,
        type: 'smoothstep',
        style: { stroke: colors.edge, strokeWidth: 2, opacity: 0.7 },
        markerEnd: { type: MarkerType.ArrowClosed, color: colors.edge, width: 16, height: 16 },
      });

      childY += height;
    }

    const totalHeight = childY - yOffset;
    rfNode.position.y = yOffset + totalHeight / 2 - Y_STEP / 2;

    return { nodes, edges, height: Math.max(totalHeight, Y_STEP) };
  }

  return { nodes, edges, height: Y_STEP };
}

export default function OpeningTree() {
  const [expandedIds, setExpandedIds] = useState(() => new Set(INITIAL_EXPANDED));
  const [activeOpening, setActiveOpening] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const displayIds = activeOpening ? OPENING_FULL_IDS[activeOpening] : expandedIds;
  const isAllExpanded = !activeOpening && expandedIds.size === ALL_IDS.size;

  // Compute the set of IDs on the active selection path for ring highlighting
  const activePathIds = useMemo(
    () => (selectedNodeId ? getActivePathIds(selectedNodeId) : new Set()),
    [selectedNodeId],
  );

  const toggleAll = useCallback(() => {
    setActiveOpening(null);
    setExpandedIds(isAllExpanded ? new Set(INITIAL_EXPANDED) : new Set(ALL_IDS));
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
    <div className="w-screen h-screen bg-[#0f1117]">
      <ReactFlow
        nodes={nodes}
        edges={rawEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2}
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Background color="#2a2a3a" gap={24} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-3 z-10"
        style={{
          background: 'linear-gradient(180deg, #0a0a14f0 0%, #0a0a14b0 80%, transparent 100%)',
          borderBottom: '1px solid #bf5fff25',
        }}
      >
        {/* Title */}
        <div className="flex flex-col gap-0.5">
          <div className="neon-title">Árbol de Aperturas</div>
          <div className="neon-subtitle">Chess Opening Explorer</div>
        </div>

        {/* Openings + expand button */}
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-[9px] tracking-[0.35em] uppercase mr-2"
            style={{ color: '#bf5fff60' }}
          >
            Aperturas
          </span>

          {PANEL_OPENINGS.map((opening) => {
            const isActive = activeOpening === opening.nodeId;
            return (
              <button
                key={opening.label}
                onClick={() => toggleOpening(opening.nodeId)}
                className="flex items-center gap-2 px-3 py-1.5 border transition-all duration-150 active:scale-95"
                style={{
                  borderColor: isActive ? opening.glow : `${opening.color}40`,
                  background: isActive ? `${opening.color}20` : 'transparent',
                  boxShadow: isActive ? `0 0 12px ${opening.glow}40` : 'none',
                }}
              >
                <span
                  className="inline-block w-2 h-2 flex-shrink-0 transition-all duration-150"
                  style={{
                    backgroundColor: isActive ? opening.color : 'transparent',
                    border: `1px solid ${opening.color}`,
                    boxShadow: isActive ? `0 0 6px ${opening.glow}` : 'none',
                  }}
                />
                <span
                  className="font-mono text-[11px] tracking-wide"
                  style={{
                    color: isActive ? opening.text : `${opening.text}70`,
                    textShadow: isActive ? `0 0 6px ${opening.glow}80` : 'none',
                  }}
                >
                  {opening.label}
                </span>
              </button>
            );
          })}

          <div
            className="w-px h-5 mx-1"
            style={{ background: '#bf5fff30' }}
          />

          <button
            onClick={toggleAll}
            className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 border transition-all duration-150 active:scale-95"
            style={{
              color: isAllExpanded ? '#ff2d78' : '#00f5ff80',
              borderColor: isAllExpanded ? '#ff2d7860' : '#00f5ff30',
              background: isAllExpanded ? '#ff2d7810' : 'transparent',
              boxShadow: isAllExpanded ? '0 0 8px #ff2d7840' : 'none',
              textShadow: isAllExpanded ? '0 0 6px #ff2d78' : 'none',
            }}
          >
            {isAllExpanded ? '[ colapsar ]' : '[ expandir todo ]'}
          </button>
        </div>
      </div>

      <ChessPanel selectedNodeId={selectedNodeId} />
    </div>
  );
}
