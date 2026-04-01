import { Chess } from "chess.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useTranslation } from "react-i18next";
import { findPathToNode, toFrenchSAN, toSpanishSAN } from "../utils/chessPath";
import { DESKTOP_CHESS_PANEL_BOTTOM, DESKTOP_PANEL_RIGHT } from "./panelLayout";

const BOARD_SIZE = 460;
const MOVES_HEIGHT = 48; // fixed height for move sequence area
const MOVE_DELAY = 600; // ms between moves

const CUSTOM_LIGHT = { backgroundColor: "#c8b89a" };
const CUSTOM_DARK = { backgroundColor: "#6b4f3a" };

function fenAtStep(moves, count) {
  const chess = new Chess();
  for (let i = 0; i < count; i++) {
    try {
      chess.move(moves[i]);
    } catch {
      break;
    }
  }
  return chess.fen();
}

export default function ChessPanel({ selectedNodeId }) {
  const { t, i18n } = useTranslation();
  const san = useCallback((move) => i18n.language === "en" ? move : i18n.language === "fr" ? toFrenchSAN(move) : toSpanishSAN(move), [i18n.language]);

  const path = useMemo(
    () => (selectedNodeId ? findPathToNode(selectedNodeId) : []),
    [selectedNodeId],
  );

  const moves = useMemo(
    () => path.map((n) => n.move).filter((m) => m && m !== "Inicial"),
    [path],
  );

  const [orientation, setOrientation] = useState("white");

  const [anim, setAnim] = useState({
    nodeId: selectedNodeId,
    playedCount: moves.length,
    isPlaying: false,
  });
  const timeoutsRef = useRef([]);

  const { playedCount, isPlaying } = anim;

  // Reset state during render when selection changes — no ref access here
  if (anim.nodeId !== selectedNodeId) {
    setAnim({
      nodeId: selectedNodeId,
      playedCount: moves.length,
      isPlaying: false,
    });
  }

  // Clear pending timeouts when selection changes
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [selectedNodeId]);

  // Handle animation playback and pausing
  useEffect(() => {
    if (!isPlaying) {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      return;
    }

    const startFrom = playedCount >= moves.length ? 0 : playedCount;
    const ts = moves
      .slice(startFrom)
      .map((_, i) =>
        setTimeout(
          () => {
            setAnim((p) => ({
              ...p,
              playedCount: startFrom + i + 1,
              isPlaying: startFrom + i + 1 < moves.length,
            }));
          },
          (i + 1) * MOVE_DELAY,
        ),
      );

    timeoutsRef.current = ts;

    return () => {
      ts.forEach(clearTimeout);
    };
  }, [isPlaying, playedCount, moves]);

  const play = useCallback(() => {
    setAnim((prev) => {
      if (prev.isPlaying) return prev;
      const startFrom = prev.playedCount >= moves.length ? 0 : prev.playedCount;
      return { ...prev, playedCount: startFrom, isPlaying: true };
    });
  }, [moves]);

  const pause = useCallback(() => {
    setAnim((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const fen = useMemo(
    () => fenAtStep(moves, playedCount),
    [moves, playedCount],
  );

  const selectedNode = path[path.length - 1] ?? null;

  const formattedMoves = useMemo(() => {
    const parts = [];
    for (let i = 0; i < moves.length; i++) {
      if (i % 2 === 0)
        parts.push(
          `<span class="move-number">${Math.floor(i / 2) + 1}.</span>`,
        );
      const move = san(moves[i]);
      parts.push(
        i < playedCount ? move : `<span style="opacity:0.35">${move}</span>`,
      );
    }
    return parts.join(" ");
  }, [moves, playedCount, san]);

  // Flip board on Enter key
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Enter") {
        setOrientation((o) => (o === "white" ? "black" : "white"));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Drag logic
  const [pos, setPos] = useState(null); // null = use default bottom-right CSS positioning
  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });
  const panelRef = useRef(null);

  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const rect = panelRef.current.getBoundingClientRect();
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: rect.left,
      originY: rect.top,
    };
  }, []);

  useEffect(() => {
    function onMouseMove(e) {
      if (!dragRef.current.dragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPos({
        x: dragRef.current.originX + dx,
        y: dragRef.current.originY + dy,
      });
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

  return (
    <div
      ref={panelRef}
      className="panel absolute z-20 flex flex-col gap-3 pt-2 px-4 pb-4"
      style={{ ...positionStyle, width: BOARD_SIZE + 32 }}
    >
      {/* Drag handle bar — centered at top */}
      <div
        className="panel-divider flex justify-center py-1 -mx-4 cursor-grab"
        onMouseDown={onMouseDown}
      >
        <span className="flex gap-0.75 opacity-40 hover:opacity-70 transition-opacity">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="inline-block w-1 h-1 rounded-full bg-neon-purple"
            />
          ))}
        </span>
      </div>

      {/* Header */}
      <div
        className="flex items-center justify-between cursor-grab"
        onMouseDown={onMouseDown}
      >
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-neon-purple">
            {t("chess_panel.position")}
          </span>
          <span
            className="font-mono text-[15px] font-bold tracking-wide text-white-soft"
            style={{
              textShadow:
                "0 0 8px color-mix(in srgb, var(--color-neon-purple) 38%, transparent)",
            }}
          >
            {(selectedNode && t(`openings:${selectedNode.id}.name`, { defaultValue: "" })) ||
              (selectedNode?.move ? san(selectedNode.move) : t("chess_panel.initial"))}
          </span>
        </div>

        {/* Controls */}
        <div
          className="flex items-center gap-2"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Play button */}
          {moves.length > 0 && (
            <button
              onClick={isPlaying ? pause : play}
              onMouseDown={(e) => e.stopPropagation()}
              className={[
                "flex items-center justify-center gap-2 px-3 py-1.5 min-w-19 font-mono text-[11px] tracking-widest uppercase border",
                "transition-all duration-150 active:scale-95 cursor-pointer",
                isPlaying
                  ? "text-neon-purple border-neon-purple/60 bg-neon-purple/22"
                  : "text-neon-purple border-neon-purple/38 bg-neon-purple/6",
              ].join(" ")}
              style={{
                boxShadow: isPlaying
                  ? "0 0 14px color-mix(in srgb, var(--color-neon-purple) 26%, transparent)"
                  : "0 0 8px color-mix(in srgb, var(--color-neon-purple) 12%, transparent)",
              }}
              title={isPlaying ? t("chess_panel.pause") : t("chess_panel.play")}
            >
              <span style={{ fontSize: "13px", lineHeight: 1 }}>
                {isPlaying ? "||" : "▶"}
              </span>
              {isPlaying
                ? t("chess_panel.pause", { defaultValue: "pause" })
                : t("chess_panel.play")}
            </button>
          )}
          <button
            onClick={() =>
              setOrientation((o) => (o === "white" ? "black" : "white"))
            }
            title={t("chess_panel.flip_board")}
            className="flex items-center justify-center w-8 h-8 border transition-all duration-150 active:scale-95 cursor-pointer text-neon-cyan/60 border-neon-cyan/25 hover:text-neon-cyan hover:border-neon-cyan/50"
          >
            <span style={{ fontSize: "22px", lineHeight: 1 }}>↻</span>
          </button>
        </div>
      </div>

      {/* react-chessboard v5 uses a single `options` prop */}
      <div inert style={{ width: BOARD_SIZE, height: BOARD_SIZE }}>
        <Chessboard
          options={{
            position: fen,
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

      {/* Move sequence — fixed height so the panel never resizes */}
      <div
        className="font-mono text-[14px] leading-relaxed wrap-break-word overflow-hidden text-neon-cyan/50"
        style={{ width: BOARD_SIZE, height: MOVES_HEIGHT }}
        dangerouslySetInnerHTML={{ __html: formattedMoves }}
      />
    </div>
  );
}
