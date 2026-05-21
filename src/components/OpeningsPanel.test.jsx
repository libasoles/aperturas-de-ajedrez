import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import OpeningsPanel from './OpeningsPanel';

vi.mock('react-i18next', () => ({
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
  useTranslation: () => ({
    t: (key, fallback) => (typeof fallback === 'string' ? fallback : key),
    i18n: { language: 'es' },
  }),
}));

vi.mock('./panelLayout', () => ({
  DESKTOP_OPENINGS_PANEL_BOTTOM: 20,
  DESKTOP_PANEL_RIGHT: 20,
  MOBILE_BOARD_PANEL_HEIGHT: 310,
}));

vi.mock('../hooks/useOpeningTreeState', () => ({
  detectLocale: () => 'es',
}));

vi.mock('../lib/access', () => ({
  hasPremiumAccess: () => false,
}));

vi.mock('../lib/analytics', () => ({
  trackPremiumMenuClick: vi.fn(),
}));

const MOCK_OPENINGS = [
  {
    group: 'e4',
    openings: [
      {
        label: 'Escandinava',
        nodeId: 'scan-1',
        color: '#16a34a',
        glow: '#22c55e',
        text: '#bbf7d0',
      },
      {
        label: 'Española',
        nodeId: 'span-4',
        color: '#2563eb',
        glow: '#3b82f6',
        text: '#bfdbfe',
      },
    ],
  },
  {
    group: 'd4',
    openings: [
      {
        label: 'Gambito de Dama',
        nodeId: 'qg-2',
        color: '#7c3aed',
        glow: '#8b5cf6',
        text: '#ddd6fe',
      },
    ],
  },
];

const MOCK_VARIANT_ROUTES = [
  {
    variantNodeId: 'evans-1',
    parentNodeId: 'ital-1',
    title: 'Gambito Evans | Apertura Italiana | Aperturas de Ajedrez',
    titleEn: 'Evans Gambit | Italian Game | Chess Openings',
    titleFr: 'Gambit Evans | Partie Italienne | Ouvertures',
    access: 'premium',
  },
];

function renderPanel({
  activeOpening = null,
  activeVariant = null,
  onToggleOpening = vi.fn(),
  onToggleVariant = vi.fn(),
  openings = MOCK_OPENINGS,
  variantRoutes = [],
} = {}) {
  return render(
    <OpeningsPanel
      openings={openings}
      variantRoutes={variantRoutes}
      activeOpening={activeOpening}
      activeVariant={activeVariant}
      onToggleOpening={onToggleOpening}
      onToggleVariant={onToggleVariant}
      firstButtonRef={{ current: null }}
    />,
  );
}

describe('OpeningsPanel', () => {
  it('renders a button for each opening', () => {
    renderPanel();
    expect(screen.getByText('Escandinava')).toBeInTheDocument();
    expect(screen.getByText('Española')).toBeInTheDocument();
    expect(screen.getByText('Gambito de Dama')).toBeInTheDocument();
  });

  it('renders group headers', () => {
    renderPanel();
    expect(screen.getByText('e4')).toBeInTheDocument();
    expect(screen.getByText('d4')).toBeInTheDocument();
  });

  it('calls onToggleOpening with the correct nodeId when a button is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    renderPanel({ onToggleOpening: onToggle });

    await user.click(screen.getByText('Escandinava'));
    expect(onToggle).toHaveBeenCalledWith('scan-1');
  });

  it('calls onToggleOpening with a different nodeId for a second opening', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    renderPanel({ onToggleOpening: onToggle });

    await user.click(screen.getByText('Gambito de Dama'));
    expect(onToggle).toHaveBeenCalledWith('qg-2');
  });

  it('does not show opening buttons when collapsed', async () => {
    const user = userEvent.setup();
    renderPanel();

    // The collapse toggle button (▾)
    const collapseBtn = screen.getByText('▾');
    await user.click(collapseBtn);

    expect(screen.queryByText('Escandinava')).not.toBeInTheDocument();
  });

  it('shows the expand indicator (▸) after collapsing', async () => {
    const user = userEvent.setup();
    renderPanel();

    await user.click(screen.getByText('▾'));
    expect(screen.getByText('▸')).toBeInTheDocument();
  });

  it('renders variants under their parent opening', () => {
    renderPanel({
      openings: [
        {
          group: 'e4',
          openings: [
            {
              label: 'Italiana',
              nodeId: 'ital-1',
              color: '#ea580c',
              glow: '#f97316',
              text: '#fed7aa',
            },
          ],
        },
      ],
      variantRoutes: MOCK_VARIANT_ROUTES,
    });

    expect(screen.getByText('Italiana')).toBeInTheDocument();
    expect(screen.getByText('Gambito Evans')).toBeInTheDocument();
  });

  it('calls onToggleVariant when a variant is clicked', async () => {
    const user = userEvent.setup();
    const onToggleVariant = vi.fn();
    renderPanel({
      openings: [
        {
          group: 'e4',
          openings: [
            {
              label: 'Italiana',
              nodeId: 'ital-1',
              color: '#ea580c',
              glow: '#f97316',
              text: '#fed7aa',
            },
          ],
        },
      ],
      variantRoutes: MOCK_VARIANT_ROUTES,
      onToggleVariant,
    });

    await user.click(screen.getByText('Gambito Evans'));
    expect(onToggleVariant).toHaveBeenCalledWith('evans-1');
  });
});
