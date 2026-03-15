import { Background, ReactFlow } from "@xyflow/react";
import { useOpeningTreeState } from "../hooks/useOpeningTreeState";
import ChessNode from "./ChessNode";
import MobileChessBoard from "./MobileChessBoard";

const nodeTypes = { chess: ChessNode };

const BOARD_COLUMN_WIDTH = 308; // board (272) + px-3 padding on each side

export default function MobileOpeningTree() {
  const { nodes, edges, selectedNodeId } = useOpeningTreeState();

  return (
    <div
      style={{
        position: "fixed",
        width: "100vh",
        height: "100vw",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(-90deg)",
        overflow: "hidden",
        background: "var(--color-app)",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* Left: ReactFlow tree */}
      <div style={{ flex: 1, position: "relative" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          minZoom={0.2}
          maxZoom={2}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          panOnScroll={false}
        >
          <Background color="var(--color-grid)" gap={24} size={1} />
        </ReactFlow>
      </div>

      {/* Right: compact board column */}
      <div
        className="panel"
        style={{
          width: BOARD_COLUMN_WIDTH,
          borderLeft: "1px solid color-mix(in srgb, var(--color-grid) 60%, transparent)",
          flexShrink: 0,
        }}
      >
        <MobileChessBoard selectedNodeId={selectedNodeId} />
      </div>
    </div>
  );
}
