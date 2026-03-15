import { Chess } from "chess.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { findPathToNode, toSpanishSAN } from "../utils/chessPath";

const BOARD_SIZE = 272;
const MOVES_HEIGHT = 48;
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
    <div className="flex flex-col gap-2 pt-2 px-3 pb-3 h-full justify-center">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-neon-purple">
            Posición
          </span>
          <span
            className="font-mono text-[15px] font-bold tracking-wide text-white-soft"
            style={{
              textShadow:
                "0 0 8px color-mix(in srgb, var(--color-neon-purple) 38%, transparent)",
            }}
          >
            {selectedNode?.name ??
              (selectedNode?.move
                ? toSpanishSAN(selectedNode.move)
                : "Inicial")}
          </span>
        </div>

        <div className="flex items-center gap-2">
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
      </div>

      {/* Board */}
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

      {/* Move sequence */}
      <div
        className="font-mono text-[14px] leading-relaxed wrap-break-word overflow-hidden text-neon-cyan/50"
        style={{ width: BOARD_SIZE, height: MOVES_HEIGHT }}
        dangerouslySetInnerHTML={{ __html: formattedMoves }}
      />
    </div>
  );
}
