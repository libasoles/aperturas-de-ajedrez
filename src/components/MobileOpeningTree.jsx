'use client'
import { Background, ReactFlow, ReactFlowProvider, useReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import MobileChessBoard from "./MobileChessBoard";
import MobileChessNode from "./MobileChessNode";
import MobileHamburgerMenu from "./MobileHamburgerMenu";
import StockfishEvaluationBar from "./StockfishEvaluationBar";
import { MOBILE_BOARD_PANEL_HEIGHT } from "./panelLayout";
import { findPathToNode } from "../utils/chessPath";

const nodeTypes = { chess: MobileChessNode };

function MobileOpeningTreeContent({ nodes, edges, selectedNodeId, activeOpening, activeVariant, pinnedIds, toggleNode, toggleOpening, toggleVariant, togglePin, clearPins, expandToNextFork, lockedContentId, premiumOverlayVersion, catalog, initialMobileViewport, tree, variantRoutes }) {
  const { getViewport, setViewport } = useReactFlow();
  const anchorRef = useRef(null); // { nodeId, screenX, screenY }
  const flowWrapperRef = useRef(null);
  const pendingMenuCenterNodeIdRef = useRef(null);
  const pendingFitViewRef = useRef(false);

  const mobileNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        // Rotate logical layout: from left->right to bottom->top.
        position: {
          x: node.position.y,
          y: -node.position.x,
        },
      })),
    [nodes],
  );

  // After layout changes, restore viewport so the toggled node stays at the same screen position
  useEffect(() => {
    if (!anchorRef.current) return;
    const { nodeId, screenX, screenY } = anchorRef.current;
    anchorRef.current = null;

    const node = mobileNodes.find((n) => n.id === nodeId);
    if (!node) return;

    const vp = getViewport();
    setViewport({
      x: screenX - node.position.x * vp.zoom,
      y: screenY - node.position.y * vp.zoom,
      zoom: vp.zoom,
    });
  }, [mobileNodes, getViewport, setViewport]);

  // Mobile menu selections use the rotated canvas coordinates. Place the node
  // in the landscape reading area: horizontally centered, vertically lower.
  useEffect(() => {
    const nodeId = pendingMenuCenterNodeIdRef.current;
    if (!nodeId || selectedNodeId !== nodeId) return;

    const node = mobileNodes.find((n) => n.id === nodeId);
    const wrapper = flowWrapperRef.current;
    if (!node || !wrapper) return;

    pendingMenuCenterNodeIdRef.current = null;

    const frameId = window.requestAnimationFrame(() => {
      const bounds = wrapper.getBoundingClientRect();
      const vp = getViewport();
      const nodeWidth = node.measured?.width ?? node.width ?? 0;
      const nodeHeight = node.measured?.height ?? node.height ?? 0;
      const nodeCenterX = node.position.x + nodeWidth / 2;
      const nodeCenterY = node.position.y + nodeHeight / 2;

      setViewport({
        x: bounds.width * 0.5 - nodeCenterX * vp.zoom,
        y: bounds.height * 0.65 - nodeCenterY * vp.zoom,
        zoom: vp.zoom,
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [mobileNodes, selectedNodeId, getViewport, setViewport]);

  // Pin switches can radically change the filtered tree. Reframe the visible
  // rotated graph instead of anchoring to a node that may disappear.
  useEffect(() => {
    if (!pendingFitViewRef.current) return;
    pendingFitViewRef.current = false;

    const wrapper = flowWrapperRef.current;
    if (!wrapper || mobileNodes.length === 0) return;

    const frameId = window.requestAnimationFrame(() => {
      const bounds = wrapper.getBoundingClientRect();
      const minX = Math.min(...mobileNodes.map((n) => n.position.x));
      const maxX = Math.max(
        ...mobileNodes.map((n) => n.position.x + (n.measured?.width ?? n.width ?? 80)),
      );
      const minY = Math.min(...mobileNodes.map((n) => n.position.y));
      const maxY = Math.max(
        ...mobileNodes.map((n) => n.position.y + (n.measured?.height ?? n.height ?? 40)),
      );
      const graphWidth = Math.max(maxX - minX, 1);
      const graphHeight = Math.max(maxY - minY, 1);
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;
      const zoom = Math.min(
        1,
        Math.max(
          0.2,
          Math.min(
            (bounds.width * 0.82) / graphWidth,
            (bounds.height * 0.82) / graphHeight,
          ),
        ),
      );

      setViewport(
        {
          x: bounds.width * 0.5 - centerX * zoom,
          y: bounds.height * 0.55 - centerY * zoom,
          zoom,
        },
        { duration: 300 },
      );
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [mobileNodes, setViewport]);

  // Capture the node's screen position (using rotated coords) before layout changes
  const makeAnchoredHandler = useCallback(
    (callback) => (id) => {
      const node = mobileNodes.find((n) => n.id === id);
      if (node) {
        const vp = getViewport();
        anchorRef.current = {
          nodeId: id,
          screenX: node.position.x * vp.zoom + vp.x,
          screenY: node.position.y * vp.zoom + vp.y,
        };
      }
      callback(id);
    },
    [mobileNodes, getViewport],
  );

  const handleToggle = useMemo(
    () => makeAnchoredHandler(toggleNode),
    [makeAnchoredHandler, toggleNode],
  );

  const handleExpandToFork = useMemo(
    () => makeAnchoredHandler(expandToNextFork),
    [makeAnchoredHandler, expandToNextFork],
  );

  const handleToggleOpening = useCallback(
    (nodeId) => {
      pendingMenuCenterNodeIdRef.current =
        activeOpening === nodeId && activeVariant == null ? null : nodeId;
      toggleOpening(nodeId);
    },
    [activeOpening, activeVariant, toggleOpening],
  );

  const handleToggleVariant = useCallback(
    (nodeId) => {
      pendingMenuCenterNodeIdRef.current =
        activeVariant === nodeId ? null : nodeId;
      toggleVariant(nodeId);
    },
    [activeVariant, toggleVariant],
  );

  const handleTogglePin = useCallback(
    (nodeId) => {
      pendingFitViewRef.current = true;
      togglePin(nodeId);
    },
    [togglePin],
  );

  const mobileNodesWithAnchor = useMemo(
    () =>
      mobileNodes.map((n) => ({
        ...n,
        data: { ...n.data, onToggle: handleToggle, onExpandToFork: handleExpandToFork },
      })),
    [mobileNodes, handleToggle, handleExpandToFork],
  );
  const selectedNode = useMemo(
    () => (selectedNodeId ? findPathToNode(tree, selectedNodeId).at(-1) : null),
    [selectedNodeId, tree],
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: "var(--color-app)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {catalog.length > 0 && (
        <MobileHamburgerMenu
          openings={catalog}
          variantRoutes={variantRoutes}
          activeOpening={activeOpening}
          activeVariant={activeVariant}
          pinnedIds={pinnedIds}
          onToggleOpening={handleToggleOpening}
          onToggleVariant={handleToggleVariant}
          onTogglePin={handleTogglePin}
          onClearPins={clearPins}
        />
      )}
      <StockfishEvaluationBar
        stockfish={selectedNode?.stockfish}
        orientation="horizontal"
        className="fixed left-0 right-0 top-0 z-40"
      />
      <div
        className="panel"
        style={{
          height: MOBILE_BOARD_PANEL_HEIGHT,
          borderBottom:
            "1px solid color-mix(in srgb, var(--color-grid) 60%, transparent)",
          flexShrink: 0,
        }}
      >
        <MobileChessBoard
          tree={tree}
          selectedNodeId={selectedNodeId}
          lockedContentId={lockedContentId}
          premiumOverlayVersion={premiumOverlayVersion}
        />
      </div>

      <div
        ref={flowWrapperRef}
        style={{
          flex: 1,
          minHeight: 0,
          position: "relative",
          touchAction: "none",
        }}
      >
        <ReactFlow
          nodes={mobileNodesWithAnchor}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultViewport={initialMobileViewport}
          minZoom={0.2}
          maxZoom={2}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          panOnDrag
          zoomOnPinch
          zoomOnScroll={false}
          panOnScroll
        >
          <Background color="var(--color-grid)" gap={24} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function MobileOpeningTree({ state }) {
  return (
    <ReactFlowProvider>
      <MobileOpeningTreeContent {...state} />
    </ReactFlowProvider>
  );
}
