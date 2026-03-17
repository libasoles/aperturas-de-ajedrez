import { Background, Controls, ReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { HELP_ROUTE } from "../data/routes";
import { PANEL_OPENINGS, useOpeningTreeState } from "../hooks/useOpeningTreeState";
import ChessNode from "./ChessNode";
import ChessPanel from "./ChessPanel";
import OpeningsPanel from "./OpeningsPanel";
import HelpDialog from "./ui/HelpDialog";

const nodeTypes = { chess: ChessNode };
const HELP_PATH = `/${HELP_ROUTE.slug}`;

function isHelpPath(pathname) {
  return pathname.replace(/\/$/, "") === HELP_PATH;
}

export default function OpeningTree() {
  const { nodes, edges, selectedNodeId, activeOpening, toggleOpening, firstOpeningBtnRef } =
    useOpeningTreeState();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const previousPathRef = useRef("/");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncFromLocation = () => {
      setIsHelpOpen(isHelpPath(window.location.pathname));
    };
    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  const onHelpOpenChange = useCallback((nextOpen) => {
    if (typeof window === "undefined") return;

    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const currentlyOnHelp = isHelpPath(window.location.pathname);

    if (nextOpen) {
      if (!currentlyOnHelp) {
        previousPathRef.current = currentPath || "/";
        history.pushState(null, "", HELP_PATH);
      }
      setIsHelpOpen(true);
      return;
    }

    if (currentlyOnHelp) {
      const fallbackPath = previousPathRef.current && !isHelpPath(previousPathRef.current)
        ? previousPathRef.current
        : "/";
      history.pushState(null, "", fallbackPath);
    }
    setIsHelpOpen(false);
  }, []);

  const onInit = useCallback((rf) => {
    const { y, zoom } = rf.getViewport();
    rf.setViewport({ x: 80, y: y + 40, zoom });
  }, []);

  return (
    <div className="w-screen h-screen bg-app">
      {/* Panels first in DOM so Tab reaches them before the ReactFlow canvas */}
      <OpeningsPanel
        openings={PANEL_OPENINGS}
        activeOpening={activeOpening}
        onToggleOpening={toggleOpening}
        firstButtonRef={firstOpeningBtnRef}
      />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.14 }}
        onInit={onInit}
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
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-3 z-10 border-b border-neon-purple/[0.14]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-panel) 94%, transparent) 0%, color-mix(in srgb, var(--color-panel) 69%, transparent) 80%, transparent 100%)",
        }}
      >
        <a href="/" className="flex flex-col gap-0.5 no-underline">
          <div className="neon-title">Árbol de Aperturas</div>
          <div className="neon-subtitle">Explora variantes, compara</div>
        </a>
      </div>

      {/* Help button — fixed bottom-left */}
      <div className="absolute bottom-28 left-4 z-10">
        <HelpDialog open={isHelpOpen} onOpenChange={onHelpOpenChange} />
      </div>
    </div>
  );
}
