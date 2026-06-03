import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
    variantNodeId: 'ital-2a',
    parentNodeId: 'ital-1',
    title: 'Giuoco Piano | Apertura Italiana | Aperturas de Ajedrez',
    titleEn: 'Giuoco Piano | Italian Game | Chess Openings',
    titleFr: 'Giuoco Piano | Partie Italienne | Ouvertures',
  },
  {
    variantNodeId: 'evans-1',
    parentNodeId: 'ital-1',
    title: 'Gambito Evans | Apertura Italiana | Aperturas de Ajedrez',
    titleEn: 'Evans Gambit | Italian Game | Chess Openings',
    titleFr: 'Gambit Evans | Partie Italienne | Ouvertures',
    access: 'premium',
  },
  {
    variantNodeId: 'fried-1',
    parentNodeId: 'ital-1',
    title: 'Ataque Fegatello | Apertura Italiana | Aperturas de Ajedrez',
    titleEn: 'Fried Liver Attack | Italian Game | Chess Openings',
    titleFr: 'Attaque Fegatello | Partie Italienne | Ouvertures',
  },
  {
    variantNodeId: 'evans-8a',
    parentNodeId: 'ital-1',
    title: 'Defensa Mieses | Gambito Evans | Aperturas de Ajedrez',
    titleEn: 'Mieses Defense | Evans Gambit | Chess Openings',
    titleFr: 'Défense Mieses | Gambit Evans | Ouvertures',
    access: 'premium',
  },
];

const MOCK_VARIANT_CATALOG = [
  {
    variantNodeId: 'ital-2a',
    parentNodeId: 'ital-1',
    access: 'free',
  },
  {
    variantNodeId: 'evans-1',
    parentNodeId: 'ital-2a',
    access: 'premium',
  },
  {
    variantNodeId: 'fried-1',
    parentNodeId: 'ital-1',
    access: 'free',
  },
  {
    variantNodeId: 'evans-8a',
    parentNodeId: 'evans-1',
    access: 'premium',
  },
];

function renderPanel({
  activeOpening = null,
  activeVariant = null,
  onToggleOpening = vi.fn(),
  onToggleVariant = vi.fn(),
  openings = MOCK_OPENINGS,
  variantCatalog = [],
  variantRoutes = [],
} = {}) {
  return render(
    <OpeningsPanel
      openings={openings}
      variantCatalog={variantCatalog}
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

  it('keeps the top edge anchored while collapsed', async () => {
    const user = userEvent.setup();
    const { container } = renderPanel();
    const panel = container.querySelector('aside');

    expect(panel.style.top).toBe('calc(100dvh - 320px)');

    await user.click(screen.getByText('▾'));

    expect(panel.style.top).toBe('calc(100dvh - 320px)');
    expect(panel.style.bottom).toBe('');
  });

  it('hides the resize handle while collapsed', async () => {
    const user = userEvent.setup();
    renderPanel();

    expect(screen.getByLabelText('Redimensionar panel')).toBeInTheDocument();

    await user.click(screen.getByText('▾'));

    expect(
      screen.queryByLabelText('Redimensionar panel'),
    ).not.toBeInTheDocument();
  });

  it('collapses to its natural height without changing width after being dragged', async () => {
    const user = userEvent.setup();
    const { container } = renderPanel();
    const panel = container.querySelector('aside');
    const dragHandle = container.querySelector('.panel-divider');

    panel.getBoundingClientRect = () => ({
      left: 300,
      top: 120,
      width: 492,
      height: 300,
      right: 792,
      bottom: 420,
      x: 300,
      y: 120,
      toJSON: () => {},
    });

    fireEvent.mouseDown(dragHandle, { button: 0, clientX: 320, clientY: 140 });
    fireEvent.mouseMove(window, { clientX: 340, clientY: 160 });
    fireEvent.mouseUp(window);

    expect(panel.style.height).toBe('300px');

    await user.click(screen.getByText('▾'));

    await waitFor(() => {
      expect(panel.style.height).toBe('');
    });
    expect(panel.style.width).toBe('492px');
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
      variantCatalog: MOCK_VARIANT_CATALOG,
      variantRoutes: MOCK_VARIANT_ROUTES,
    });

    expect(screen.getByText('Italiana')).toBeInTheDocument();
    expect(screen.getByText('Giuoco Piano')).toBeInTheDocument();
    expect(screen.getByText('Gambito Evans')).toBeInTheDocument();
  });

  it('indents nested variants according to their hierarchy depth', () => {
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
      variantCatalog: MOCK_VARIANT_CATALOG,
      variantRoutes: MOCK_VARIANT_ROUTES,
    });

    expect(screen.getByText('Giuoco Piano').closest('button').parentElement).toHaveStyle({
      marginLeft: '20px',
    });
    expect(screen.getByText('Gambito Evans').closest('button').parentElement).toHaveStyle({
      marginLeft: '40px',
    });
    expect(screen.getByText('Defensa Mieses').closest('button').parentElement).toHaveStyle({
      marginLeft: '60px',
    });
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
      variantCatalog: MOCK_VARIANT_CATALOG,
      variantRoutes: MOCK_VARIANT_ROUTES,
      onToggleVariant,
    });

    await user.click(screen.getByText('Gambito Evans'));
    expect(onToggleVariant).toHaveBeenCalledWith('evans-1');
  });

  it('shows a matching opening with all of its variants', async () => {
    const user = userEvent.setup();
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
            {
              label: 'Escandinava',
              nodeId: 'scan-1',
              color: '#16a34a',
              glow: '#22c55e',
              text: '#bbf7d0',
            },
          ],
        },
      ],
      variantCatalog: MOCK_VARIANT_CATALOG,
      variantRoutes: MOCK_VARIANT_ROUTES,
    });

    await user.type(
      screen.getByRole('searchbox', { name: 'openings_panel.search_label' }),
      'italiana',
    );

    expect(screen.getByText('Italiana')).toBeInTheDocument();
    expect(screen.getByText('Giuoco Piano')).toBeInTheDocument();
    expect(screen.getByText('Gambito Evans')).toBeInTheDocument();
    expect(screen.getByText('Ataque Fegatello')).toBeInTheDocument();
    expect(screen.queryByText('Escandinava')).not.toBeInTheDocument();
  });

  it('shows a matching variant with its parent opening and hides sibling variants', async () => {
    const user = userEvent.setup();
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
      variantCatalog: MOCK_VARIANT_CATALOG,
      variantRoutes: MOCK_VARIANT_ROUTES,
    });

    await user.type(
      screen.getByRole('searchbox', { name: 'openings_panel.search_label' }),
      'evans',
    );

    expect(screen.getByText('Italiana')).toBeInTheDocument();
    expect(screen.getByText('Giuoco Piano')).toBeInTheDocument();
    expect(screen.getByText('Gambito Evans')).toBeInTheDocument();
    expect(screen.getByText('Defensa Mieses')).toBeInTheDocument();
    expect(screen.queryByText('Ataque Fegatello')).not.toBeInTheDocument();
  });

  it('keeps ancestors visible when a deep variant matches search', async () => {
    const user = userEvent.setup();
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
      variantCatalog: MOCK_VARIANT_CATALOG,
      variantRoutes: MOCK_VARIANT_ROUTES,
    });

    await user.type(
      screen.getByRole('searchbox', { name: 'openings_panel.search_label' }),
      'mieses',
    );

    expect(screen.getByText('Italiana')).toBeInTheDocument();
    expect(screen.getByText('Giuoco Piano')).toBeInTheDocument();
    expect(screen.getByText('Gambito Evans')).toBeInTheDocument();
    expect(screen.getByText('Defensa Mieses')).toBeInTheDocument();
    expect(screen.queryByText('Ataque Fegatello')).not.toBeInTheDocument();
  });
});
