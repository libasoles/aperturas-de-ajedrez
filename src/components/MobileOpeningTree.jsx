import { Background, ReactFlow, ReactFlowProvider, useReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { INITIAL_MOBILE_VIEWPORT } from "../hooks/useOpeningTreeState";
import MobileChessBoard from "./MobileChessBoard";
import MobileChessNode from "./MobileChessNode";
import MobileHamburgerMenu from "./MobileHamburgerMenu";
import { MOBILE_BOARD_PANEL_HEIGHT } from "./panelLayout";

const nodeTypes = { chess: MobileChessNode };

function MobileOpeningTreeContent({ nodes, edges, selectedNodeId, activeOpening, activeVariant, toggleNode, toggleOpening, toggleVariant, expandToNextFork, lockedContentId, premiumOverlayVersion }) {
  const { getViewport, setViewport } = useReactFlow();
  const anchorRef = useRef(null); // { nodeId, screenX, screenY }

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

  const mobileNodesWithAnchor = useMemo(
    () =>
      mobileNodes.map((n) => ({
        ...n,
        data: { ...n.data, onToggle: handleToggle, onExpandToFork: handleExpandToFork },
      })),
    [mobileNodes, handleToggle, handleExpandToFork],
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
      <MobileHamburgerMenu
        activeOpening={activeOpening}
        activeVariant={activeVariant}
        onToggleOpening={toggleOpening}
        onToggleVariant={toggleVariant}
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
          selectedNodeId={selectedNodeId}
          lockedContentId={lockedContentId}
          premiumOverlayVersion={premiumOverlayVersion}
        />
      </div>

      <div
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
          defaultViewport={INITIAL_MOBILE_VIEWPORT}
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
