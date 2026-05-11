import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { toFrenchSAN, toSpanishSAN } from "../utils/chessPath";
import {
  clampPanelToViewport,
  getPanelViewportBoundsStyle,
} from "./floatingPanelBounds";
import { DESKTOP_CHESS_PANEL_BOTTOM, DESKTOP_PANEL_RIGHT } from "./panelLayout";

const BOARD_SIZE = 380;
const CUSTOM_LIGHT = { backgroundColor: "#c8b89a" };
const CUSTOM_DARK = { backgroundColor: "#6b4f3a" };

function toRenderableFen(fen) {
  const parts = fen.split(" ");
  return parts.length >= 6 ? fen : `${parts.slice(0, 4).join(" ")} 0 1`;
}

function formatMoveSequence(moves, locale) {
  const translate = (move) =>
    locale === "en" ? move : locale === "fr" ? toFrenchSAN(move) : toSpanishSAN(move);
  return moves
    .map((move, index) => `${index % 2 === 0 ? `${Math.floor(index / 2) + 1}. ` : ""}${translate(move)}`)
    .join(" ");
}

export default function PlayerChessBoard({ fen, moves, locale, orientation, onFlip }) {
  const panelRef = useRef(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const [pos, setPos] = useState(null);

  const renderedFen = useMemo(() => toRenderableFen(fen), [fen]);
  const formattedMoves = useMemo(() => formatMoveSequence(moves, locale), [moves, locale]);

  const onMouseDown = useCallback((event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    const rect = panelRef.current.getBoundingClientRect();
    dragRef.current = {
      dragging: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: rect.left,
      originY: rect.top,
    };
  }, []);

  useEffect(() => {
    function onMouseMove(event) {
      if (!dragRef.current.dragging) return;
      const rect = panelRef.current?.getBoundingClientRect();
      const nextPos = {
        x: dragRef.current.originX + event.clientX - dragRef.current.startX,
        y: dragRef.current.originY + event.clientY - dragRef.current.startY,
      };

      setPos(
        rect
          ? clampPanelToViewport({
              ...nextPos,
              width: rect.width,
              height: rect.height,
            })
          : nextPos,
      );
    }
    function onMouseUp() {
      dragRef.current.dragging = false;
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const positionStyle = pos
    ? { left: pos.x, top: pos.y, bottom: "auto", right: "auto" }
    : { bottom: DESKTOP_CHESS_PANEL_BOTTOM, right: DESKTOP_PANEL_RIGHT };
  const viewportBoundsStyle = getPanelViewportBoundsStyle({
    pos,
    defaultPosition: {
      bottom: DESKTOP_CHESS_PANEL_BOTTOM,
      right: DESKTOP_PANEL_RIGHT,
    },
  });

  return (
    <div
      ref={panelRef}
      className="panel absolute z-20 flex flex-col gap-3 overflow-hidden pt-2 px-4 pb-4"
      style={{ ...positionStyle, width: BOARD_SIZE + 32, ...viewportBoundsStyle }}
    >
      <div className="panel-divider flex justify-center py-1 -mx-4 cursor-grab" onMouseDown={onMouseDown}>
        <span className="flex gap-0.75 opacity-40 hover:opacity-70 transition-opacity">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <span key={index} className="inline-block w-1 h-1 rounded-full bg-neon-purple" />
          ))}
        </span>
      </div>
      <div className="flex items-center justify-between cursor-grab" onMouseDown={onMouseDown}>
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-neon-purple">posición</span>
          <span className="font-mono text-[13px] font-bold tracking-wide text-white-soft">
            {moves.length ? moves.at(-1) : "Inicial"}
          </span>
        </div>
        <button
          onClick={onFlip}
          onMouseDown={(event) => event.stopPropagation()}
          title="Girar tablero"
          className="flex items-center justify-center w-8 h-8 border transition-all duration-150 active:scale-95 cursor-pointer text-neon-cyan/60 border-neon-cyan/25 hover:text-neon-cyan hover:border-neon-cyan/50"
        >
          <span style={{ fontSize: "22px", lineHeight: 1 }}>↻</span>
        </button>
      </div>
      <div inert style={{ width: BOARD_SIZE, height: BOARD_SIZE }}>
        <Chessboard
          options={{
            position: renderedFen,
            boardOrientation: orientation,
            allowDragging: false,
            showAnimations: false,
            darkSquareStyle: CUSTOM_DARK,
            lightSquareStyle: CUSTOM_LIGHT,
            boardStyle: {
              borderRadius: 0,
              boxShadow: "0 0 16px rgba(0,0,0,0.38)",
            },
          }}
        />
      </div>
      <div className="font-mono text-[13px] leading-relaxed text-neon-cyan/55 overflow-hidden" style={{ height: 48 }}>
        {formattedMoves}
      </div>
    </div>
  );
}
