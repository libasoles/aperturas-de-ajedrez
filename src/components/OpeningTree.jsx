import { Background, Controls, ReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { buildHelpUrl, detectLocale, INITIAL_VIEWPORT, PANEL_OPENINGS, useOpeningTreeState } from "../hooks/useOpeningTreeState";
import ChessNode from "./ChessNode";
import ChessPanel from "./ChessPanel";
import OpeningsPanel from "./OpeningsPanel";
import HelpDialog from "./ui/HelpDialog";

const nodeTypes = { chess: ChessNode };

function getHelpPath() {
  return buildHelpUrl(detectLocale());
}

function isHelpPath(pathname) {
  // Help path can be either /ayuda or /en/help
  const p = pathname.replace(/\/$/, "");
  return p === "/ayuda" || p === "/en/help";
}

export default function OpeningTree() {
  const { t, i18n } = useTranslation();
  const { nodes, edges, selectedNodeId, activeOpening, toggleOpening, firstOpeningBtnRef } =
    useOpeningTreeState();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const previousPathRef = useRef("/");
  const didFocusRootRef = useRef(false);

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
        history.pushState(null, "", getHelpPath());
      }
      setIsHelpOpen(true);
      return;
    }

    if (currentlyOnHelp) {
      const locale = detectLocale();
      const fallbackPath = previousPathRef.current && !isHelpPath(previousPathRef.current)
        ? previousPathRef.current
        : (locale === "en" ? "/en/" : "/");
      history.pushState(null, "", fallbackPath);
    }
    setIsHelpOpen(false);
  }, []);

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

  return (
    <div className="w-screen h-screen bg-app">
      {/* Panels first in DOM so Tab reaches them before the ReactFlow canvas */}
      <OpeningsPanel
        openings={PANEL_OPENINGS}
        activeOpening={activeOpening}
        onToggleOpening={toggleOpening}
        firstButtonRef={firstOpeningBtnRef}
      />

      <div className="absolute inset-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultViewport={INITIAL_VIEWPORT}
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

      <ChessPanel selectedNodeId={selectedNodeId} />

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-3 z-10 border-b border-neon-purple/[0.14]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-panel) 94%, transparent) 0%, color-mix(in srgb, var(--color-panel) 69%, transparent) 80%, transparent 100%)",
        }}
      >
        <a href={i18n.language === "en" ? "/en" : "/"} className="flex flex-col gap-0.5 no-underline">
          <div className="neon-title">{t("title")}</div>
          <div className="neon-subtitle">{t("subtitle")}</div>
        </a>
      </div>

      {/* Help button — fixed bottom-left */}
      <div className="absolute bottom-28 left-4 z-10">
        <HelpDialog open={isHelpOpen} onOpenChange={onHelpOpenChange} />
      </div>
    </div>
  );
}
