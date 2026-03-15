import { Chess } from "chess.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { findPathToNode, toSpanishSAN } from "../utils/chessPath";

const BOARD_SIZE = 272;
const MOVE_DELAY = 600;
const ROTATED_FRAME_WIDTH = 320;
const ROTATED_FRAME_HEIGHT = 310;

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
  const frameRef = useRef(null);
  const [frameSize, setFrameSize] = useState({
    width: ROTATED_FRAME_WIDTH,
    height: ROTATED_FRAME_HEIGHT,
  });

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

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [selectedNodeId]);

  useEffect(() => {
    if (!frameRef.current) return;
    const element = frameRef.current;
    const updateSize = () =>
      setFrameSize({
        width: element.clientWidth || ROTATED_FRAME_WIDTH,
        height: element.clientHeight || ROTATED_FRAME_HEIGHT,
      });

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { playedCount, isPlaying } = anim;

  const play = useCallback(() => {
    if (isPlaying) return;
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setAnim((prev) => ({ ...prev, playedCount: 0, isPlaying: true }));

    const ts = moves.map((_, i) =>
      setTimeout(
        () => {
          setAnim((prev) => ({
            ...prev,
            playedCount: i + 1,
            isPlaying: i < moves.length - 1,
          }));
        },
        (i + 1) * MOVE_DELAY,
      ),
    );
    timeoutsRef.current = ts;
  }, [isPlaying, moves]);

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
      const move = toSpanishSAN(moves[i]);
      parts.push(
        i < playedCount ? move : `<span style="opacity:0.35">${move}</span>`,
      );
    }
    return parts.join(" ");
  }, [moves, playedCount]);

  return (
    <div className="h-full w-full flex items-start justify-start overflow-hidden">
      <div
        ref={frameRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
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
            width: `${frameSize.height}px`,
            height: `${frameSize.width}px`,
          }}
        >
          {/* Header */}
          <div className="flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-end gap-2">
              {moves.length > 0 && (
                <button
                  onClick={play}
                  disabled={isPlaying}
                  className={[
                    "flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] tracking-widest uppercase border",
                    "transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
                    isPlaying
                      ? "text-neon-purple/50 border-neon-purple/19"
                      : "text-neon-purple border-neon-purple/38 bg-neon-purple/6",
                  ].join(" ")}
                  style={{
                    boxShadow: isPlaying
                      ? "none"
                      : "0 0 8px color-mix(in srgb, var(--color-neon-purple) 12%, transparent)",
                  }}
                >
                  <span style={{ fontSize: "16px", lineHeight: 1 }}>▶</span>
                  {isPlaying ? "jugando..." : "reproducir"}
                </button>
              )}
              <button
                onClick={() =>
                  setOrientation((o) => (o === "white" ? "black" : "white"))
                }
                title="Girar tablero"
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
              {selectedNode?.name ??
                (selectedNode?.move ? toSpanishSAN(selectedNode.move) : "Inicial")}
            </span>
          </div>

          <div
            className="mobile-board-scroll flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
            style={{ touchAction: "pan-y" }}
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
