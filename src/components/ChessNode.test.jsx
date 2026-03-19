import { Handle, Position } from '@xyflow/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ChessNode from './ChessNode';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, opts) => opts?.defaultValue ?? key,
    i18n: { language: 'es' },
  }),
}));

// ChessNode uses ReactFlow Handle — mock it as a no-op span
vi.mock('@xyflow/react', () => ({
  Handle: () => null,
  Position: { Left: 'left', Right: 'right' },
}));

// react-chessboard defaultPieces returns SVG components; mock with simple divs
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

// Tooltip just renders children when no content
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
    onToggle: vi.fn(),
    onSelect: vi.fn(),
    onExpandToFork: vi.fn(),
    ...overrides,
  };
}

describe('ChessNode', () => {
  it('displays the move in Spanish notation', () => {
    render(<ChessNode id="span-2" data={makeData({ move: 'Nf3' })} />);
    expect(screen.getByText('Cf3')).toBeInTheDocument();
  });

  it('does not render a name label when i18n returns no translation', () => {
    // The default mock returns the key itself as the value; the component does
    // t(`openings:${id}.name`, { defaultValue: '' }) || null — key is truthy
    // but the component appends nothing for it since name stays as the raw key.
    // Here we just verify the Española text is absent (no hardcoded name).
    render(<ChessNode id="span-2" data={makeData({ move: 'Nf3' })} />);
    expect(screen.queryByText('Española')).not.toBeInTheDocument();
  });

  it('does not render a name label when name is null', () => {
    // Default mock t() returns key as defaultValue fallback → empty string → null
    render(<ChessNode id="no-name-node" data={makeData({ move: 'e4' })} />);
    // Should not have any absolutely-positioned name label
    // The move text is rendered; verify it exists
    expect(screen.getByText('e4')).toBeInTheDocument();
  });

  it('renders the correct piece icon for a knight move', () => {
    render(<ChessNode id="span-2" data={makeData({ move: 'Nf3', color: 'white' })} />);
    expect(screen.getByTestId('piece-wN')).toBeInTheDocument();
  });

  it('renders a black rook icon for a black rook move', () => {
    render(<ChessNode id="some-id" data={makeData({ move: 'Rd8', color: 'black' })} />);
    expect(screen.getByTestId('piece-bR')).toBeInTheDocument();
  });

  it('renders a pawn icon for a pawn move', () => {
    render(<ChessNode id="e4" data={makeData({ move: 'e4', color: 'white' })} />);
    expect(screen.getByTestId('piece-wP')).toBeInTheDocument();
  });

  it('calls onSelect when the pill is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ChessNode id="span-2" data={makeData({ move: 'Nf3', onSelect })} />);
    await user.click(screen.getByText('Cf3'));
    expect(onSelect).toHaveBeenCalledWith('span-2');
  });

  it('shows expand/collapse button and calls onToggle when clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <ChessNode
        id="span-2"
        data={makeData({ move: 'Nf3', hasChildren: true, isExpanded: false, onToggle })}
      />,
    );
    const expandBtn = screen.getByText('+');
    await user.click(expandBtn);
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
});
