import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OPENING_TREE } from '../data/openings';
import { fenAfterMoves } from '../utils/chessPath';
import ChessPanel from './ChessPanel';

let mockLanguage = 'es';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, opts) => opts?.defaultValue ?? key,
    i18n: { get language() { return mockLanguage; } },
  }),
}));

vi.mock('react-chessboard', () => ({
  Chessboard: ({ options }) => (
    <div
      data-testid="chessboard"
      data-fen={options?.position}
      data-orientation={options?.boardOrientation}
    />
  ),
}));

vi.mock('./panelLayout', () => ({
  DESKTOP_CHESS_PANEL_BOTTOM: 20,
  DESKTOP_PANEL_RIGHT: 20,
}));

beforeEach(() => {
  mockLanguage = 'es';
});

// ─── Board position ────────────────────────────────────────────────────────────

describe('ChessPanel — board position', () => {
  it('shows the initial FEN when no node is selected', () => {
    render(<ChessPanel tree={OPENING_TREE} selectedNodeId={null} />);
    expect(screen.getByTestId('chessboard').dataset.fen).toBe(fenAfterMoves(OPENING_TREE, 'root'));
  });

  it('shows the FEN for the selected node (span-2: e4 e5 Nf3)', () => {
    render(<ChessPanel tree={OPENING_TREE} selectedNodeId="span-2" />);
    expect(screen.getByTestId('chessboard').dataset.fen).toBe(fenAfterMoves(OPENING_TREE, 'span-2'));
  });

  it('shows the FEN for a single-move node (e4)', () => {
    render(<ChessPanel tree={OPENING_TREE} selectedNodeId="e4" />);
    expect(screen.getByTestId('chessboard').dataset.fen).toBe(fenAfterMoves(OPENING_TREE, 'e4'));
  });

  it('flips the board orientation when the flip button is clicked', async () => {
    const user = userEvent.setup();
    render(<ChessPanel tree={OPENING_TREE} selectedNodeId={null} />);
    const board = screen.getByTestId('chessboard');
    expect(board.dataset.orientation).toBe('white');
    await user.click(screen.getByTitle('chess_panel.flip_board'));
    expect(board.dataset.orientation).toBe('black');
  });
});

// ─── Move list — Spanish (es) ──────────────────────────────────────────────────

describe('ChessPanel — move list in Spanish (es)', () => {
  it('shows moves in Spanish notation (Nf3 → Cf3)', () => {
    render(<ChessPanel tree={OPENING_TREE} selectedNodeId="span-2" />);
    expect(document.body.innerHTML).toMatch(/Cf3/);
    expect(document.body.innerHTML).not.toMatch(/\bNf3\b/);
  });

  it('shows pawn moves unchanged (e4, e5)', () => {
    render(<ChessPanel tree={OPENING_TREE} selectedNodeId="span-2" />);
    expect(document.body.innerHTML).toMatch(/e4/);
    expect(document.body.innerHTML).toMatch(/e5/);
  });
});

// ─── Move list — English (en) ──────────────────────────────────────────────────

describe('ChessPanel — move list in English (en)', () => {
  beforeEach(() => { mockLanguage = 'en'; });

  it('shows moves in English notation (Nf3, not Cf3)', () => {
    render(<ChessPanel tree={OPENING_TREE} selectedNodeId="span-2" />);
    expect(document.body.innerHTML).toMatch(/Nf3/);
    expect(document.body.innerHTML).not.toMatch(/\bCf3\b/);
  });

  it('shows pawn moves unchanged (e4, e5)', () => {
    render(<ChessPanel tree={OPENING_TREE} selectedNodeId="span-2" />);
    expect(document.body.innerHTML).toMatch(/e4/);
    expect(document.body.innerHTML).toMatch(/e5/);
  });
});

// ─── Move list — French (fr) ───────────────────────────────────────────────────

describe('ChessPanel — move list in French (fr)', () => {
  beforeEach(() => { mockLanguage = 'fr'; });

  it('shows knight moves as Cf3 (Cavalier)', () => {
    render(<ChessPanel tree={OPENING_TREE} selectedNodeId="span-2" />);
    expect(document.body.innerHTML).toMatch(/Cf3/);
    expect(document.body.innerHTML).not.toMatch(/\bNf3\b/);
  });

  it('shows pawn moves unchanged (e4, e5)', () => {
    render(<ChessPanel tree={OPENING_TREE} selectedNodeId="span-2" />);
    expect(document.body.innerHTML).toMatch(/e4/);
    expect(document.body.innerHTML).toMatch(/e5/);
  });

  it('shows bishop moves as F (Fou), not A (Alfil)', () => {
    // span-4 is Bb5 (Spanish/Ruy López: e4 e5 Nf3 Nc6 Bb5)
    render(<ChessPanel tree={OPENING_TREE} selectedNodeId="span-4" />);
    expect(document.body.innerHTML).toMatch(/Fb5/);
    expect(document.body.innerHTML).not.toMatch(/\bAb5\b/);
  });
});
