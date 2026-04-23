import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ChessNode from './ChessNode';

// Mutable so individual tests can switch language before rendering
let mockLanguage = 'es';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, opts) => opts?.defaultValue ?? key,
    i18n: { get language() { return mockLanguage; } },
  }),
}));

vi.mock('@xyflow/react', () => ({
  Handle: () => null,
  Position: { Left: 'left', Right: 'right' },
}));

vi.mock('react-chessboard', () => ({
  defaultPieces: new Proxy(
    {},
    {
      get: (_, pieceCode) =>
        ({ svgStyle }) =>
          <div data-testid={`piece-${pieceCode}`} style={svgStyle} />,
    },
  ),
}));

vi.mock('./ui/Tooltip', () => ({
  Tooltip: ({ children }) => children,
}));

const DEFAULT_COLORS = {
  node: '#111',
  text: '#fff',
  border: '#bf5fff',
  edge: '#bf5fff',
};

function makeData(overrides = {}) {
  return {
    move: 'Nf3',
    color: 'white',
    isExpanded: false,
    hasChildren: false,
    colors: DEFAULT_COLORS,
    isSelected: false,
    isInActivePath: false,
    isPremium: false,
    isLocked: false,
    onToggle: vi.fn(),
    onSelect: vi.fn(),
    onExpandToFork: vi.fn(),
    ...overrides,
  };
}

beforeEach(() => {
  mockLanguage = 'es';
});

// ─── Spanish (es) ──────────────────────────────────────────────────────────────

describe('ChessNode — Spanish notation (es)', () => {
  it('displays a knight move as Cf3', () => {
    render(<ChessNode id="span-2" data={makeData({ move: 'Nf3' })} />);
    expect(screen.getByText('Cf3')).toBeInTheDocument();
  });

  it('displays a bishop move as Af4', () => {
    render(<ChessNode id="any" data={makeData({ move: 'Bf4' })} />);
    expect(screen.getByText('Af4')).toBeInTheDocument();
  });

  it('displays a queen move as Dd5', () => {
    render(<ChessNode id="any" data={makeData({ move: 'Qd5' })} />);
    expect(screen.getByText('Dd5')).toBeInTheDocument();
  });
});

// ─── English (en) ──────────────────────────────────────────────────────────────

describe('ChessNode — English notation (en)', () => {
  beforeEach(() => { mockLanguage = 'en'; });

  it('displays a knight move as Nf3 (unchanged)', () => {
    render(<ChessNode id="span-2" data={makeData({ move: 'Nf3' })} />);
    expect(screen.getByText('Nf3')).toBeInTheDocument();
    expect(screen.queryByText('Cf3')).not.toBeInTheDocument();
  });

  it('displays a bishop move as Bf4 (unchanged)', () => {
    render(<ChessNode id="any" data={makeData({ move: 'Bf4' })} />);
    expect(screen.getByText('Bf4')).toBeInTheDocument();
  });

  it('displays a queen move as Qd5 (unchanged)', () => {
    render(<ChessNode id="any" data={makeData({ move: 'Qd5' })} />);
    expect(screen.getByText('Qd5')).toBeInTheDocument();
  });

  it('calls onSelect with the node id when clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ChessNode id="span-2" data={makeData({ move: 'Nf3', onSelect })} />);
    await user.click(screen.getByText('Nf3'));
    expect(onSelect).toHaveBeenCalledWith('span-2');
  });
});

// ─── French (fr) ───────────────────────────────────────────────────────────────

describe('ChessNode — French notation (fr)', () => {
  beforeEach(() => { mockLanguage = 'fr'; });

  it('displays a knight move as Cf3 (Cavalier)', () => {
    render(<ChessNode id="span-2" data={makeData({ move: 'Nf3' })} />);
    expect(screen.getByText('Cf3')).toBeInTheDocument();
  });

  it('displays a bishop move as Ff4 (Fou), not Af4', () => {
    render(<ChessNode id="any" data={makeData({ move: 'Bf4' })} />);
    expect(screen.getByText('Ff4')).toBeInTheDocument();
    expect(screen.queryByText('Af4')).not.toBeInTheDocument();
  });

  it('displays a queen move as Dd5 (Dame)', () => {
    render(<ChessNode id="any" data={makeData({ move: 'Qd5' })} />);
    expect(screen.getByText('Dd5')).toBeInTheDocument();
  });
});

// ─── Piece icons & interaction (language-independent) ─────────────────────────

describe('ChessNode — piece icons', () => {
  it('renders the correct piece icon for a knight move', () => {
    render(<ChessNode id="span-2" data={makeData({ move: 'Nf3', color: 'white' })} />);
    expect(screen.getByTestId('piece-wN')).toBeInTheDocument();
  });

  it('renders a black rook icon for a black rook move', () => {
    render(<ChessNode id="any" data={makeData({ move: 'Rd8', color: 'black' })} />);
    expect(screen.getByTestId('piece-bR')).toBeInTheDocument();
  });

  it('renders a pawn icon for a pawn move', () => {
    render(<ChessNode id="e4" data={makeData({ move: 'e4', color: 'white' })} />);
    expect(screen.getByTestId('piece-wP')).toBeInTheDocument();
  });
});

describe('ChessNode — keyboard interaction', () => {
  it('does not call onSelect when Enter is pressed (reserved for board flip)', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ChessNode id="e4" data={makeData({ move: 'e4', onSelect })} />);
    const pill = screen.getByRole('button', { name: /e4/i });
    await user.click(pill);
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledTimes(1); // only the click, not Enter
  });

  it('calls onSelect when Space is pressed on focused pill', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ChessNode id="e4" data={makeData({ move: 'e4', onSelect })} />);
    const pill = screen.getByRole('button', { name: /e4/i });
    pill.focus();
    await user.keyboard(' ');
    expect(onSelect).toHaveBeenCalledWith('e4');
  });
});

describe('ChessNode — expand/collapse', () => {
  it('shows + when node has children and is collapsed, calls onToggle on click', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <ChessNode
        id="span-2"
        data={makeData({ move: 'Nf3', hasChildren: true, isExpanded: false, onToggle })}
      />,
    );
    await user.click(screen.getByText('+'));
    expect(onToggle).toHaveBeenCalledWith('span-2');
  });

  it('shows − when node is expanded', () => {
    render(
      <ChessNode
        id="span-2"
        data={makeData({ move: 'Nf3', hasChildren: true, isExpanded: true })}
      />,
    );
    expect(screen.getByText('−')).toBeInTheDocument();
  });

  it('shows expand-to-fork for premium nodes when they are accessible', () => {
    render(
      <ChessNode
        id="mod-1"
        data={makeData({
          move: 'g6',
          hasChildren: true,
          isSelected: true,
          isPremium: true,
          isLocked: false,
        })}
      />,
    );

    expect(screen.getByText('→')).toBeInTheDocument();
  });
});
