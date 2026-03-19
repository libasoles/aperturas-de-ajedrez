import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { fenAfterMoves } from '../utils/chessPath';
import ChessPanel from './ChessPanel';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, opts) => opts?.defaultValue ?? key,
    i18n: { language: 'es' },
  }),
}));

vi.mock('react-chessboard', () => ({
  Chessboard: ({ options }) => (
    <div data-testid="chessboard" data-fen={options?.position} data-orientation={options?.boardOrientation} />
  ),
}));

// panelLayout constants — not relevant for tests
vi.mock('./panelLayout', () => ({
  DESKTOP_CHESS_PANEL_BOTTOM: 20,
  DESKTOP_PANEL_RIGHT: 20,
}));

describe('ChessPanel', () => {
  it('shows the initial FEN when no node is selected', () => {
    render(<ChessPanel selectedNodeId={null} />);
    const board = screen.getByTestId('chessboard');
    expect(board.dataset.fen).toBe(fenAfterMoves('root'));
  });

  it('shows the FEN for the selected node', () => {
    // span-2 is reached via e4 → e5 → Nf3
    render(<ChessPanel selectedNodeId="span-2" />);
    const board = screen.getByTestId('chessboard');
    expect(board.dataset.fen).toBe(fenAfterMoves('span-2'));
  });

  it('shows the FEN for a different node (e4 only)', () => {
    render(<ChessPanel selectedNodeId="e4" />);
    const board = screen.getByTestId('chessboard');
    expect(board.dataset.fen).toBe(fenAfterMoves('e4'));
  });

  it('renders the move list for the selected node', () => {
    render(<ChessPanel selectedNodeId="span-2" />);
    // formattedMoves is injected via dangerouslySetInnerHTML; the moves text
    // (e4, e5, Cf3) should appear in the document HTML
    expect(document.body.innerHTML).toMatch(/e4/);
    expect(document.body.innerHTML).toMatch(/e5/);
    expect(document.body.innerHTML).toMatch(/Cf3/); // Nf3 → Spanish notation
  });

  it('flips the board orientation when the flip button is clicked', async () => {
    const user = userEvent.setup();
    render(<ChessPanel selectedNodeId={null} />);
    const board = screen.getByTestId('chessboard');
    expect(board.dataset.orientation).toBe('white');

    const flipBtn = screen.getByTitle('chess_panel.flip_board');
    await user.click(flipBtn);

    expect(board.dataset.orientation).toBe('black');
  });
});
