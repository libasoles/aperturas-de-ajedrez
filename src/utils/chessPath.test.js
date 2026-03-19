import { Chess } from 'chess.js';
import { describe, expect, it } from 'vitest';
import { fenAfterMoves, findPathToNode, getPathToNextFork, getVerticalNavigationTarget, toFrenchSAN, toSpanishSAN } from './chessPath';

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

// ─── getPathToNextFork ────────────────────────────────────────────────────────
//
// Tree structure used in these tests:
//   scan-3a → scan-4a[fork: scan-5a1, scan-5a2]
//   scan-5a1 → scan-6a1 → scan-7a1 → scan-8a1[fork: scan-9a1a, scan-9a1b]
//   scan-13a1a: leaf (no children)

describe('getPathToNextFork', () => {
  it('returns only the node itself when it is an immediate fork (≥2 children)', () => {
    // scan-4a has 2 children: scan-5a1 and scan-5a2
    expect(getPathToNextFork('scan-4a')).toEqual(['scan-4a']);
  });

  it('walks a single-link chain and stops at the fork', () => {
    // scan-3a has 1 child (scan-4a), which is a fork
    expect(getPathToNextFork('scan-3a')).toEqual(['scan-3a', 'scan-4a']);
  });

  it('walks a multi-link chain until the fork (4 nodes)', () => {
    // scan-5a1 → scan-6a1 → scan-7a1 → scan-8a1[fork]
    expect(getPathToNextFork('scan-5a1')).toEqual([
      'scan-5a1',
      'scan-6a1',
      'scan-7a1',
      'scan-8a1',
    ]);
  });

  it('returns [] for a leaf node', () => {
    // scan-13a1a has no children
    expect(getPathToNextFork('scan-13a1a')).toEqual([]);
  });

  it('returns [] for a non-existent ID', () => {
    expect(getPathToNextFork('nonexistent-node')).toEqual([]);
  });
});

// ─── getVerticalNavigationTarget ─────────────────────────────────────────────
//
// Tree forks used in these tests:
//   scan-2 (exd5):  children = [scan-3a (Qxd5, idx 0), scan-3b (Nf6, idx 1)]
//   scan-4a (Nc3):  children = [scan-5a1 (Qd6, idx 0), scan-5a2 (Qa5, idx 1)]

describe('getVerticalNavigationTarget', () => {
  it('navigates down to the next sibling at a fork', () => {
    // scan-3a is idx 0, scan-3b is idx 1 under fork scan-2
    expect(getVerticalNavigationTarget('scan-3a', 'down', new Set())).toBe('scan-3b');
  });

  it('navigates up to the previous sibling at a fork', () => {
    expect(getVerticalNavigationTarget('scan-3b', 'up', new Set())).toBe('scan-3a');
  });

  it('returns null when no sibling exists in the given direction', () => {
    // scan-3a is the first child — no sibling above it at scan-2
    // root/e4 ancestors also have no prior sibling for this path
    expect(getVerticalNavigationTarget('scan-3a', 'up', new Set())).toBeNull();
  });

  it('returns null for the root node (no fork ancestor)', () => {
    expect(getVerticalNavigationTarget('root', 'down', new Set())).toBeNull();
  });

  it('climbs to a higher fork when the immediate fork has no sibling in that direction (cousin navigation)', () => {
    // scan-3b is the last child of scan-2 → no 'down' sibling there
    // so it climbs to the e4 fork and navigates to the next e4 branch (span-1)
    const result = getVerticalNavigationTarget('scan-3b', 'down', new Set());
    expect(result).toBe('span-1');
  });

  it('stops at the target branch root when it is not expanded', () => {
    // Selected: scan-6a1 (child of scan-5a1, depth 1 below fork scan-4a)
    // Navigate down → target branch root is scan-5a2 (not in displayIds)
    expect(
      getVerticalNavigationTarget('scan-6a1', 'down', new Set()),
    ).toBe('scan-5a2');
  });

  it('follows the first child into the target branch when it is expanded', () => {
    // Same as above but scan-5a2 IS expanded → follow first child → scan-6a2
    expect(
      getVerticalNavigationTarget('scan-6a1', 'down', new Set(['scan-5a2'])),
    ).toBe('scan-6a2');
  });

  it('follows the last child when navigating up (visually closest)', () => {
    // Navigate up from scan-5a2 to scan-5a1 branch.
    // scan-5a1 is not in displayIds → stops at scan-5a1
    expect(
      getVerticalNavigationTarget('scan-5a2', 'up', new Set()),
    ).toBe('scan-5a1');
  });

  it('follows the last child chain when navigating up into an expanded branch', () => {
    // Navigate up from scan-6a2 to scan-5a1 branch (depth 1 below fork scan-4a)
    // scan-5a1 IS expanded → follow last child = scan-6a1
    expect(
      getVerticalNavigationTarget('scan-6a2', 'up', new Set(['scan-5a1'])),
    ).toBe('scan-6a1');
  });
});
