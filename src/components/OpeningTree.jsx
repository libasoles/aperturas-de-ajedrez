import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import ChessNode from "./ChessNode";
import ChessPanel from "./ChessPanel";
import OpeningsPanel from "./OpeningsPanel";
import StockfishEvaluationBar from "./StockfishEvaluationBar";
import HelpDialog from "./ui/HelpDialog";
import { findPathToNode } from "../utils/chessPath";
import { formatStockfishScore } from "../utils/stockfishEvaluation";

const nodeTypes = { chess: ChessNode };

function OpeningTreeContent({
  nodes,
  edges,
  selectedNodeId,
  activeOpening,
  activeVariant,
  toggleNode,
  toggleOpening,
  toggleVariant,
  firstOpeningBtnRef,
  lockedContentId,
  premiumOverlayVersion,
  catalog,
  initialViewport,
  tree,
  subtitle,
  variantCatalog,
  variantRoutes,
}) {
  const { t, i18n } = useTranslation();
  const { getViewport, setViewport } = useReactFlow();
  const didFocusRootRef = useRef(false);
  const anchorRef = useRef(null); // { nodeId, screenX, screenY }

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

  const nodesWithAnchor = useMemo(
    () =>
      nodes.map((n) => ({ ...n, data: { ...n.data, onToggle: handleToggle } })),
    [nodes, handleToggle],
  );
  const selectedNode = useMemo(
    () => (selectedNodeId ? findPathToNode(tree, selectedNodeId).at(-1) : null),
    [selectedNodeId, tree],
  );
  const stockfishDepth = selectedNode?.stockfish?.depth ?? 14;
  const stockfishScore = formatStockfishScore(selectedNode?.stockfish);

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
          onToggleOpening={toggleOpening}
          onToggleVariant={toggleVariant}
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
          <Controls showInteractive={false} />
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

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-3 z-10 border-b border-neon-purple/[0.14]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-panel) 94%, transparent) 0%, color-mix(in srgb, var(--color-panel) 69%, transparent) 80%, transparent 100%)",
        }}
      >
        <a
          href={
            i18n.language === "en"
              ? "/en/"
              : i18n.language === "fr"
                ? "/fr/"
                : "/"
          }
          className="flex flex-col gap-0.5 no-underline"
        >
          <div className="neon-title">{t("title")}</div>
          <div className="neon-subtitle">{t("subtitle")}</div>
        </a>
        <div className="flex flex-col items-end gap-1 text-right">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white-soft/80">
            Stockfish 18 · {t("evaluation.depth")} {stockfishDepth}
          </div>
          <div className="font-mono text-[12px] font-bold leading-none text-white-soft">
            {stockfishScore}
          </div>
          {subtitle && <div className="neon-subtitle">{subtitle}</div>}
        </div>
      </div>

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
