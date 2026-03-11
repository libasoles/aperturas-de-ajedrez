import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
} from '@xyflow/react';
import { OPENING_TREE } from '../data/openings';
import ChessNode from './ChessNode';

const nodeTypes = { chess: ChessNode };

export const OPENING_COLORS = {
  root: { node: '#f5f0e8', text: '#1a1a2e', border: '#d4c9b0', edge: '#aaa' },
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
    // Center the parent vertically over its children
    rfNode.position.y = yOffset + totalHeight / 2 - Y_STEP / 2;

    return { nodes, edges, height: Math.max(totalHeight, Y_STEP) };
  }

  return { nodes, edges, height: Y_STEP };
}

export default function OpeningTree() {
  const [expandedIds, setExpandedIds] = useState(
    () => new Set(['root', 'e4', 'scan-1', 'span-1', 'sic-1']),
  );

  const toggleNode = useCallback((id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const { nodes: rawNodes, edges: rawEdges } = useMemo(
    () => buildGraph(OPENING_TREE, expandedIds),
    [expandedIds],
  );

  const nodes = useMemo(
    () => rawNodes.map((n) => ({ ...n, data: { ...n.data, onToggle: toggleNode } })),
    [rawNodes, toggleNode],
  );

  const handleNodeClick = useCallback(
    (_, node) => { if (node.data.hasChildren) toggleNode(node.id); },
    [toggleNode],
  );

  return (
    <div className="w-screen h-screen bg-[#0f1117]">
      <ReactFlow
        key={[...expandedIds].join(',')}
        nodes={nodes}
        edges={rawEdges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2}
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Background color="#2a2a3a" gap={24} size={1} />
        <Controls
          className="!bg-[#1a1a2e] !border-[#2a2a4a]"
          showInteractive={false}
        />
      </ReactFlow>

      {/* Title */}
      <div className="absolute top-6 left-8 flex flex-col gap-0.5 pointer-events-none">
        <div className="neon-title">Árbol de Aperturas</div>
        <div className="neon-subtitle">Chess Opening Explorer</div>
        <div
          className="mt-1"
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, #ff2d78, #bf5fff, #00f5ff, transparent)',
            width: '280px',
            boxShadow: '0 0 6px #bf5fff80',
          }}
        />
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-2 bg-[#0a0a14]/80 backdrop-blur border border-[#bf5fff40] p-3"
        style={{ boxShadow: '0 0 12px #bf5fff30, inset 0 0 12px #00000040' }}
      >
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-[#bf5fff] mb-1"
          style={{ textShadow: '0 0 6px #bf5fff' }}>
          Aperturas
        </span>
        {[
          { color: '#16a34a', glow: '#22c55e', text: '#bbf7d0', label: 'Escandinava' },
          { color: '#2563eb', glow: '#3b82f6', text: '#bfdbfe', label: 'Española' },
          { color: '#ea580c', glow: '#f97316', text: '#fed7aa', label: 'Italiana' },
          { color: '#dc2626', glow: '#ef4444', text: '#fecdd3', label: 'Siciliana' },
        ].map(({ color, glow, text, label }) => (
          <span key={label} className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2"
              style={{ backgroundColor: color, boxShadow: `0 0 6px ${glow}` }}
            />
            <span className="font-mono text-[11px]" style={{ color: text }}>{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
