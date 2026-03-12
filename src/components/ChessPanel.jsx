import { useState, useEffect, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { findPathToNode } from '../utils/chessPath';
import { toSpanishSAN } from './ChessNode';

const BOARD_SIZE = 460;
const MOVES_HEIGHT = 48; // fixed height for move sequence area
const MOVE_DELAY = 600; // ms between moves

const CUSTOM_LIGHT = { backgroundColor: '#c8b89a' };
const CUSTOM_DARK  = { backgroundColor: '#6b4f3a' };

function fenAfterMoves(moves, count) {
  const chess = new Chess();
  for (let i = 0; i < count; i++) {
    try { chess.move(moves[i]); } catch { break; }
  }
  return chess.fen();
}

export default function ChessPanel({ selectedNodeId }) {
  const path = useMemo(
    () => (selectedNodeId ? findPathToNode(selectedNodeId) : []),
    [selectedNodeId],
  );

  const moves = useMemo(
    () => path.map((n) => n.move).filter((m) => m && m !== 'Partida'),
    [path],
  );

  const [playedCount, setPlayedCount] = useState(0);

  // When selection changes, replay moves one by one
  useEffect(() => {
    setPlayedCount(0);
    if (moves.length === 0) return;

    const timeouts = moves.map((_, i) =>
      setTimeout(() => setPlayedCount(i + 1), (i + 1) * MOVE_DELAY),
    );
    return () => timeouts.forEach(clearTimeout);
  }, [selectedNodeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fen = useMemo(
    () => fenAfterMoves(moves, playedCount),
    [moves, playedCount],
  );

  const selectedNode = path[path.length - 1] ?? null;

  const formattedMoves = useMemo(() => {
    const parts = [];
    for (let i = 0; i < moves.length; i++) {
      if (i % 2 === 0) parts.push(`${Math.floor(i / 2) + 1}.`);
      const move = toSpanishSAN(moves[i]);
      parts.push(
        i < playedCount
          ? move
          : `<span style="opacity:0.35">${move}</span>`,
      );
    }
    return parts.join(' ');
  }, [moves, playedCount]);

  return (
    <div
      className="absolute bottom-6 right-6 z-20 flex flex-col gap-3 p-4"
      style={{
        background: '#0a0a14f5',
        border: '1px solid #bf5fff40',
        boxShadow: '0 0 24px #bf5fff20, 0 0 48px #00000080',
        backdropFilter: 'blur(8px)',
        width: BOARD_SIZE + 32,
      }}
    >
      {/* Header */}
      <div className="flex flex-col gap-0.5">
        <span
          className="font-mono text-[9px] tracking-[0.35em] uppercase"
          style={{ color: '#bf5fff' }}
        >
          Posición
        </span>
        <span
          className="font-mono text-[15px] font-bold tracking-wide"
          style={{ color: '#f0ecff', textShadow: '0 0 8px #bf5fff60' }}
        >
          {selectedNode?.name ?? selectedNode?.move ?? 'Inicial'}
        </span>
      </div>

      {/* react-chessboard v5 uses a single `options` prop */}
      <div style={{ width: BOARD_SIZE, height: BOARD_SIZE }}>
        <Chessboard
          options={{
            position: fen,
            allowDragging: false,
            showAnimations: false,
            darkSquareStyle: CUSTOM_DARK,
            lightSquareStyle: CUSTOM_LIGHT,
            boardStyle: {
              borderRadius: 0,
              boxShadow: '0 0 16px #00000060',
            },
          }}
        />
      </div>

      {/* Move sequence — fixed height so the panel never resizes */}
      <div
        className="font-mono text-[14px] leading-relaxed wrap-break-word overflow-hidden"
        style={{ color: '#00f5ff80', width: BOARD_SIZE, height: MOVES_HEIGHT }}
        dangerouslySetInnerHTML={{ __html: formattedMoves }}
      />
    </div>
  );
}
