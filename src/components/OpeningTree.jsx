'use client'
import dynamic from 'next/dynamic'
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import ChessNode from "./ChessNode";
const ChessPanel = dynamic(() => import('./ChessPanel'), { ssr: false, loading: () => null })
import FlowControls from "./FlowControls";
import OpeningsPanel from "./OpeningsPanel";
import StockfishEvaluationBar from "./StockfishEvaluationBar";
import HelpDialog from "./ui/HelpDialog";
import { findPathToNode } from "../utils/chessPath";

const nodeTypes = { chess: ChessNode };
const FIT_VIEW_MAX_ZOOM = 1;

function OpeningTreeContent({
  nodes,
  edges,
  selectedNodeId,
  activeOpening,
  activeVariant,
  pinnedIds,
  toggleNode,
  toggleOpening,
  toggleVariant,
  togglePin,
  clearPins,
  firstOpeningBtnRef,
  lockedContentId,
  premiumOverlayVersion,
  catalog,
  initialViewport,
  tree,
  variantCatalog,
  variantRoutes,
}) {
  const { getViewport, setViewport } = useReactFlow();
  const didFocusRootRef = useRef(false);
  const anchorRef = useRef(null); // { nodeId, screenX, screenY }
  const pendingFitViewRef = useRef(false);

  useEffect(() => {
    if (didFocusRootRef.current) return;
    let retryTimeoutId = null;
    let confirmTimeoutId = null;
    let attempts = 0;

    const tryFocusRoot = () => {
      attempts += 1;
      const rootPill = document.querySelector('[data-node-pill-id="root"]');
      if (!rootPill) {
        if (attempts < 20) {
          retryTimeoutId = window.setTimeout(tryFocusRoot, 50);
        }
        return;
      }

      rootPill.focus({ preventScroll: true });
      didFocusRootRef.current = true;

      // ReactFlow can steal focus right after mount; re-assert once.
      confirmTimeoutId = window.setTimeout(() => {
        if (document.activeElement !== rootPill) {
          rootPill.focus({ preventScroll: true });
        }
      }, 80);
    };

    tryFocusRoot();

    return () => {
      if (retryTimeoutId) window.clearTimeout(retryTimeoutId);
      if (confirmTimeoutId) window.clearTimeout(confirmTimeoutId);
    };
  }, [nodes]);

  // Restore viewport so the toggled node stays at the same screen position
  useEffect(() => {
    if (!anchorRef.current) return;
    const { nodeId, screenX, screenY } = anchorRef.current;
    anchorRef.current = null;

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const vp = getViewport();
    setViewport({
      x: screenX - node.position.x * vp.zoom,
      y: screenY - node.position.y * vp.zoom,
      zoom: vp.zoom,
    });
  }, [nodes, getViewport, setViewport]);

  // After an opening/variant toggle from the panel, fit all visible nodes
  // keeping x anchored to the initial page-load position.
  useEffect(() => {
    if (!pendingFitViewRef.current) return;
    pendingFitViewRef.current = false;
    if (nodes.length === 0) return;

    const frameId = window.requestAnimationFrame(() => {
      const minY = Math.min(...nodes.map((n) => n.position.y));
      const maxY = Math.max(
        ...nodes.map((n) => n.position.y + (n.measured?.height ?? n.height ?? 40)),
      );
      const centerY = (minY + maxY) / 2;
      const viewH = window.innerHeight;
      const zoom = Math.min(FIT_VIEW_MAX_ZOOM, Math.max(0.2, (viewH * 0.8) / (maxY - minY)));
      setViewport({ x: initialViewport.x, y: viewH / 2 - centerY * zoom, zoom }, { duration: 300 });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [nodes, setViewport, initialViewport]);

  // Wrap toggleNode to capture the node's screen position before layout changes
  const handleToggle = useCallback(
    (id) => {
      const node = nodes.find((n) => n.id === id);
      if (node) {
        const vp = getViewport();
        anchorRef.current = {
          nodeId: id,
          screenX: node.position.x * vp.zoom + vp.x,
          screenY: node.position.y * vp.zoom + vp.y,
        };
      }
      toggleNode(id);
    },
    [nodes, getViewport, toggleNode],
  );

  const handleToggleOpening = useCallback(
    (nodeId) => {
      pendingFitViewRef.current = true;
      toggleOpening(nodeId);
    },
    [toggleOpening],
  );

  const handleToggleVariant = useCallback(
    (nodeId) => {
      pendingFitViewRef.current = true;
      toggleVariant(nodeId);
    },
    [toggleVariant],
  );

  const handleTogglePin = useCallback(
    (nodeId) => {
      pendingFitViewRef.current = true;
      togglePin(nodeId);
    },
    [togglePin],
  );

  const handleClearPins = useCallback(() => {
    pendingFitViewRef.current = true;
    clearPins();
  }, [clearPins]);

  const selectedNode = useMemo(
    () => (selectedNodeId ? findPathToNode(tree, selectedNodeId).at(-1) : null),
    [selectedNodeId, tree],
  );

  const nodesWithAnchor = useMemo(
    () =>
      nodes.map((n) => ({ ...n, data: { ...n.data, onToggle: handleToggle } })),
    [nodes, handleToggle],
  );
  return (
    <div className="w-screen h-screen bg-app">
      {/* Panels first in DOM so Tab reaches them before the ReactFlow canvas */}
      {catalog.length > 0 && (
        <OpeningsPanel
          openings={catalog}
          variantCatalog={variantCatalog}
          variantRoutes={variantRoutes}
          activeOpening={activeOpening}
          activeVariant={activeVariant}
          pinnedIds={pinnedIds}
          onToggleOpening={handleToggleOpening}
          onToggleVariant={handleToggleVariant}
          onTogglePin={handleTogglePin}
          onClearPins={handleClearPins}
          firstButtonRef={firstOpeningBtnRef}
        />
      )}

      <div className="absolute inset-0">
        <ReactFlow
          nodes={nodesWithAnchor}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultViewport={initialViewport}
          minZoom={0.2}
          maxZoom={2}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
        >
          <Background color="var(--color-grid)" gap={24} size={1} />
          <FlowControls initialX={initialViewport.x} />
        </ReactFlow>
      </div>

      <ChessPanel
        tree={tree}
        selectedNodeId={selectedNodeId}
        lockedContentId={lockedContentId}
        premiumOverlayVersion={premiumOverlayVersion}
      />

      <StockfishEvaluationBar
        stockfish={selectedNode?.stockfish}
        className="absolute right-0 top-0 bottom-0 z-10"
      />

      {/* Help button — fixed bottom-left */}
      <div className="absolute bottom-28 left-4 z-10">
        <HelpDialog />
      </div>
    </div>
  );
}

export default function OpeningTree({ state }) {
  return (
    <ReactFlowProvider>
      <OpeningTreeContent {...state} />
    </ReactFlowProvider>
  );
}
