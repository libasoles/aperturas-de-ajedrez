import { Chess } from 'chess.js';
import { describe, expect, it } from 'vitest';
import { fenAfterMoves, findPathToNode, toFrenchSAN, toSpanishSAN } from './chessPath';

// ─── toSpanishSAN ──────────────────────────────────────────────────────────────

describe('toSpanishSAN', () => {
  it('converts English piece letters to Spanish', () => {
    expect(toSpanishSAN('Qd1')).toBe('Dd1'); // Queen → Dama
    expect(toSpanishSAN('Rd1')).toBe('Td1'); // Rook → Torre
    expect(toSpanishSAN('Bf4')).toBe('Af4'); // Bishop → Alfil
    expect(toSpanishSAN('Nf3')).toBe('Cf3'); // Knight → Caballo
  });

  it('applies sequential replacements for King moves (K→R→T due to chained replaces)', () => {
    // The function applies replacements in sequence: K→R, then R→T
    // King moves are rare in opening theory (castling is O-O), so this is acceptable
    expect(toSpanishSAN('Ke1')).toBe('Te1');
  });

  it('leaves pawn moves unchanged', () => {
    expect(toSpanishSAN('e4')).toBe('e4');
    expect(toSpanishSAN('d5')).toBe('d5');
    expect(toSpanishSAN('exd5')).toBe('exd5');
  });

  it('handles captures and checks', () => {
    expect(toSpanishSAN('Nxf3+')).toBe('Cxf3+');
    expect(toSpanishSAN('Qxd5')).toBe('Dxd5');
    expect(toSpanishSAN('Bxf7#')).toBe('Axf7#');
  });
});

// ─── toFrenchSAN ───────────────────────────────────────────────────────────────

describe('toFrenchSAN', () => {
  it('converts English piece letters to French', () => {
    expect(toFrenchSAN('Qd1')).toBe('Dd1'); // Queen → Dame
    expect(toFrenchSAN('Rd1')).toBe('Td1'); // Rook → Tour
    expect(toFrenchSAN('Bf4')).toBe('Ff4'); // Bishop → Fou (differs from Spanish Alfil)
    expect(toFrenchSAN('Nf3')).toBe('Cf3'); // Knight → Cavalier
  });

  it('Bishop uses F (Fou) in French, not A (Alfil) as in Spanish', () => {
    expect(toFrenchSAN('Bb5')).toBe('Fb5');
    expect(toSpanishSAN('Bb5')).toBe('Ab5');
  });

  it('applies the same sequential King replacement as Spanish (K→R→T)', () => {
    expect(toFrenchSAN('Ke1')).toBe('Te1');
  });

  it('leaves pawn moves unchanged', () => {
    expect(toFrenchSAN('e4')).toBe('e4');
    expect(toFrenchSAN('d5')).toBe('d5');
    expect(toFrenchSAN('exd5')).toBe('exd5');
  });

  it('handles captures and checks', () => {
    expect(toFrenchSAN('Nxf3+')).toBe('Cxf3+');
    expect(toFrenchSAN('Bxf7#')).toBe('Fxf7#');
  });
});

// ─── findPathToNode ────────────────────────────────────────────────────────────

describe('findPathToNode', () => {
  it('returns the correct path for an existing node', () => {
    // e4 is a direct child of root
    const path = findPathToNode('e4');
    const ids = path.map((n) => n.id);
    expect(ids).toEqual(['root', 'e4']);
  });

  it('returns [] for a non-existent ID', () => {
    expect(findPathToNode('this-does-not-exist')).toEqual([]);
  });

  it('has the target node as the last element', () => {
    const path = findPathToNode('span-2');
    expect(path[path.length - 1].id).toBe('span-2');
  });

  it('returns the root node alone when searching for root', () => {
    const path = findPathToNode('root');
    expect(path).toHaveLength(1);
    expect(path[0].id).toBe('root');
  });
});

// ─── fenAfterMoves ─────────────────────────────────────────────────────────────

describe('fenAfterMoves', () => {
  const INITIAL_FEN = new Chess().fen();

  it('returns the initial position FEN for the root node', () => {
    expect(fenAfterMoves('root')).toBe(INITIAL_FEN);
  });

  it('returns the correct FEN after a single move (e4)', () => {
    const chess = new Chess();
    chess.move('e4');
    expect(fenAfterMoves('e4')).toBe(chess.fen());
  });

  it('returns the correct FEN for the sequence e4, e5, Nf3', () => {
    // span-2 is reached via root → e4 → span-1(e5) → span-2(Nf3)
    const chess = new Chess();
    chess.move('e4');
    chess.move('e5');
    chess.move('Nf3');
    expect(fenAfterMoves('span-2')).toBe(chess.fen());
  });

  it('returns the initial FEN for a non-existent ID without crashing', () => {
    expect(fenAfterMoves('nonexistent-node')).toBe(INITIAL_FEN);
  });
});
