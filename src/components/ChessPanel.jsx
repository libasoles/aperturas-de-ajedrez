import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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

  // Show all moves immediately on selection
  const [playedCount, setPlayedCount] = useState(moves.length);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutsRef = useRef([]);

  // When selection changes, jump to final position immediately
  useEffect(() => {
    setPlayedCount(moves.length);
    setIsPlaying(false);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, [selectedNodeId, moves.length]);

  const play = useCallback(() => {
    if (isPlaying) return;
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setPlayedCount(0);
    setIsPlaying(true);

    const ts = moves.map((_, i) =>
      setTimeout(() => {
        setPlayedCount(i + 1);
        if (i === moves.length - 1) setIsPlaying(false);
      }, (i + 1) * MOVE_DELAY),
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

  // Drag logic
  const [pos, setPos] = useState(null); // null = use default bottom-right CSS positioning
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const panelRef = useRef(null);

  const onMouseDown = useCallback((e) => {
    // Only drag from the header bar, and only with left button
    if (e.button !== 0) return;
    e.preventDefault();
    const rect = panelRef.current.getBoundingClientRect();
    dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, originX: rect.left, originY: rect.top };
  }, []);

  useEffect(() => {
    function onMouseMove(e) {
      if (!dragRef.current.dragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPos({ x: dragRef.current.originX + dx, y: dragRef.current.originY + dy });
    }
    function onMouseUp() {
      dragRef.current.dragging = false;
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const positionStyle = pos
    ? { left: pos.x, top: pos.y, bottom: 'auto', right: 'auto' }
    : { bottom: 24, right: 24 };

  return (
    <div
      ref={panelRef}
      className="absolute z-20 flex flex-col gap-3 p-4"
      style={{
        ...positionStyle,
        background: '#0a0a14f5',
        border: '1px solid #bf5fff40',
        boxShadow: '0 0 24px #bf5fff20, 0 0 48px #00000080',
        backdropFilter: 'blur(8px)',
        width: BOARD_SIZE + 32,
      }}
    >
      {/* Header — drag handle */}
      <div
        className="flex items-center justify-between"
        onMouseDown={onMouseDown}
        style={{ cursor: 'grab' }}
      >
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

        {/* Play button */}
        {moves.length > 0 && (
          <button
            onClick={play}
            onMouseDown={(e) => e.stopPropagation()}
            disabled={isPlaying}
            className="flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] tracking-widest uppercase border transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              cursor: 'pointer',
              color: isPlaying ? '#bf5fff80' : '#bf5fff',
              borderColor: isPlaying ? '#bf5fff30' : '#bf5fff60',
              background: isPlaying ? 'transparent' : '#bf5fff10',
              boxShadow: isPlaying ? 'none' : '0 0 8px #bf5fff20',
            }}
          >
            <span style={{ fontSize: '16px', lineHeight: 1 }}>▶</span>
            {isPlaying ? 'jugando...' : 'reproducir'}
          </button>
        )}
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
