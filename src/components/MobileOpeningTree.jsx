import { Background, ReactFlow } from "@xyflow/react";
import { useMemo } from "react";
import { INITIAL_MOBILE_VIEWPORT, useOpeningTreeState } from "../hooks/useOpeningTreeState";
import MobileChessBoard from "./MobileChessBoard";
import MobileChessNode from "./MobileChessNode";
import MobileHamburgerMenu from "./MobileHamburgerMenu";

const nodeTypes = { chess: MobileChessNode };

import { MOBILE_BOARD_PANEL_HEIGHT } from "./panelLayout";

export default function MobileOpeningTree() {
  const {
    nodes,
    edges,
    selectedNodeId,
    activeOpening,
    activeVariant,
    toggleOpening,
    toggleVariant,
  } = useOpeningTreeState();
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
        <MobileChessBoard selectedNodeId={selectedNodeId} />
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
          nodes={mobileNodes}
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
