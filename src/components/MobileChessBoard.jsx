import { Chess } from "chess.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useTranslation } from "react-i18next";
import { findPathToNode, toFrenchSAN, toSpanishSAN } from "../utils/chessPath";

const BOARD_SIZE = 272;
const MOVE_DELAY = 600;

const CUSTOM_LIGHT = { backgroundColor: "#c8b89a" };
const CUSTOM_DARK = { backgroundColor: "#6b4f3a" };

function fenAfterMoves(moves, count) {
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

export default function MobileChessBoard({ selectedNodeId }) {
  const { t, i18n } = useTranslation();
  const san = useCallback((move) => i18n.language === "en" ? move : i18n.language === "fr" ? toFrenchSAN(move) : toSpanishSAN(move), [i18n.language]);

  const frameRef = useRef(null);

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

  if (anim.nodeId !== selectedNodeId) {
    setAnim({
      nodeId: selectedNodeId,
      playedCount: moves.length,
      isPlaying: false,
    });
  }

  const { playedCount, isPlaying } = anim;

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
    () => fenAfterMoves(moves, playedCount),
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

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
      <div
        ref={frameRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          containerType: "size",
        }}
      >
        <div
          className="flex flex-col gap-1 pt-2 px-3 pb-3"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-90deg)",
            transformOrigin: "center",
            width: "100cqh",
            height: "100cqw",
          }}
        >
          {/* Header */}
          <div className="flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-end gap-2">
              {moves.length > 0 && (
                <button
                  onClick={isPlaying ? pause : play}
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
                >
                  <span style={{ fontSize: "13px", lineHeight: 1 }}>
                    {isPlaying ? "⏸" : "▶"}
                  </span>
                  {isPlaying ? t("chess_panel.pause", { defaultValue: "pause" }) : t("chess_panel.play")}
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

            <span
              className="font-mono text-[13px] font-bold tracking-wide text-white-soft"
              style={{
                textShadow:
                  "0 0 8px color-mix(in srgb, var(--color-neon-purple) 38%, transparent)",
              }}
            >
              {(selectedNode && t(`openings:${selectedNode.id}.name`, { defaultValue: "" })) ||
                (selectedNode?.move ? san(selectedNode.move) : t("chess_panel.initial"))}
            </span>
          </div>

          <div
            className="mobile-board-scroll flex-1 min-h-0 overflow-auto"
            style={{ touchAction: "pan-x pan-y" }}
          >
            <div className="flex flex-col gap-1 min-h-full">
              {/* Board */}
              <div
                inert
                style={{
                  width: BOARD_SIZE,
                  height: BOARD_SIZE,
                }}
              >
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

              {/* Move sequence */}
              <div
                className="font-mono text-[14px] leading-relaxed wrap-break-word text-neon-cyan/50 flex-1"
                style={{
                  width: BOARD_SIZE,
                  minHeight: 48,
                  paddingBottom: "6px",
                }}
                dangerouslySetInnerHTML={{ __html: formattedMoves }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
