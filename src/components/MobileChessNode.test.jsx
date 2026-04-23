import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import MobileChessNode from './MobileChessNode';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'es' },
  }),
}));

vi.mock('@xyflow/react', () => ({
  Handle: () => null,
  Position: { Bottom: 'bottom', Top: 'top' },
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

const DEFAULT_COLORS = {
  node: '#111',
  text: '#fff',
  border: '#bf5fff',
  edge: '#bf5fff',
};

function makeData(overrides = {}) {
  return {
    move: 'g6',
    name: 'Moderna',
    color: 'black',
    opening: 'modern',
    isExpanded: false,
    hasChildren: true,
    colors: DEFAULT_COLORS,
    isSelected: false,
    isInActivePath: false,
    isPremium: true,
    isLocked: false,
    onToggle: vi.fn(),
    onSelect: vi.fn(),
    onExpandToFork: vi.fn(),
    ...overrides,
  };
}

describe('MobileChessNode', () => {
  it('allows expanding premium nodes when they are not locked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <MobileChessNode
        id="mod-1"
        data={makeData({ onToggle, isLocked: false })}
      />,
    );

    await user.click(screen.getByText('+'));

    expect(onToggle).toHaveBeenCalledWith('mod-1');
  });

  it('shows a lock icon for locked premium nodes', () => {
    render(
      <MobileChessNode
        id="mod-1"
        data={makeData({ isLocked: true })}
      />,
    );

    expect(
      screen.getByRole('img', { name: /contenido bloqueado/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText('+')).not.toBeInTheDocument();
  });
});
