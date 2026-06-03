import { OPENING_CATALOG } from '@/data/openingCatalog'
import { ROUTE_BY_SLUG, VARIANT_ROUTE_BY_SLUG } from '@/data/routes'
import enUi from '@/locales/en/ui.json'
import esUi from '@/locales/es/ui.json'
import frUi from '@/locales/fr/ui.json'
import {
  DESKTOP_CHESS_PANEL_BOTTOM,
  DESKTOP_OPENINGS_PANEL_BOTTOM,
  DESKTOP_PANEL_RIGHT,
  MOBILE_BOARD_PANEL_HEIGHT,
} from './panelLayout'

type Locale = 'es' | 'en' | 'fr'

interface Props {
  locale?: Locale
  slug?: string
}

const DESKTOP_BOARD_SIZE = 460
const MOBILE_BOARD_SIZE = 272
const OPENINGS_PANEL_DEFAULT_HEIGHT = 300
const OPENINGS_PANEL_WIDTH = 492
const VIEWPORT_INSET = 16
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const ranks = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
]

const localeUi = {
  es: esUi,
  en: enUi,
  fr: frUi,
}

function getActiveNodeId(slug?: string) {
  if (!slug) return null
  const variantRoute = (VARIANT_ROUTE_BY_SLUG as Record<string, any>)[slug]
  if (variantRoute) return variantRoute.parentNodeId
  const openingRoute = (ROUTE_BY_SLUG as Record<string, any>)[slug]
  return openingRoute?.nodeId ?? null
}

function getOpeningLabel(opening: { label: string; nodeId: string }, locale: Locale) {
  const ui = localeUi[locale] ?? esUi
  return (
    (ui.panel_openings as Record<string, string>)[opening.nodeId] ??
    opening.label
  )
}

function StaticTopBarTitle({ locale }: { locale: Locale }) {
  const ui = localeUi[locale] ?? esUi
  const href = locale === 'en' ? '/en/' : locale === 'fr' ? '/fr/' : '/'

  return (
    <div
      className="absolute top-0 left-0 right-0 hidden md:flex items-center justify-between px-8 py-3 z-10 border-b border-neon-purple/[0.14]"
      style={{
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--color-panel) 94%, transparent) 0%, color-mix(in srgb, var(--color-panel) 69%, transparent) 80%, transparent 100%)',
      }}
    >
      {/* pointer-events: auto overrides the parent's pointer-events: none */}
      <a href={href} className="flex flex-col gap-0.5 no-underline" style={{ pointerEvents: 'auto' }}>
        <div className="neon-title">{ui.title}</div>
        <div className="neon-subtitle">{ui.subtitle}</div>
      </a>
      <div className="flex flex-col items-end gap-1 text-right">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white-soft/80">
          Stockfish 18 · {ui.evaluation.depth} 14
        </div>
        <div className="font-mono text-[12px] font-bold leading-none text-white-soft">
          0.00
        </div>
      </div>
    </div>
  )
}

function StaticChessBoard({
  size = DESKTOP_BOARD_SIZE,
  pieceSize = 34,
}: {
  size?: number
  pieceSize?: number
}) {
  return (
    <div
      className="grid overflow-hidden shadow-[0_0_16px_rgba(0,0,0,0.38)]"
      style={{
        width: size,
        height: size,
        aspectRatio: '1 / 1',
        gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
        gridTemplateRows: 'repeat(8, minmax(0, 1fr))',
      }}
      aria-hidden="true"
    >
      {ranks.flatMap((rank, rankIndex) =>
        rank.map((piece, fileIndex) => {
          const isLight = (rankIndex + fileIndex) % 2 === 0
          const isBlackPiece = rankIndex < 2
          return (
            <div
              key={`${files[fileIndex]}${8 - rankIndex}`}
              className="flex items-center justify-center leading-none"
              style={{
                backgroundColor: isLight ? '#c8b89a' : '#6b4f3a',
                color: isBlackPiece ? '#17120d' : '#f7f3e8',
                textShadow: '0 1px 2px rgba(0,0,0,0.45)',
                fontSize: pieceSize,
              }}
            >
              {piece}
            </div>
          )
        }),
      )}
    </div>
  )
}

function StaticChessPanel({ locale }: { locale: Locale }) {
  const ui = localeUi[locale] ?? esUi

  return (
    <div
      className="panel absolute z-20 hidden flex-col gap-3 overflow-hidden px-4 pb-4 pt-2 lg:flex"
      style={{
        right: DESKTOP_PANEL_RIGHT,
        bottom: DESKTOP_CHESS_PANEL_BOTTOM,
        width: DESKTOP_BOARD_SIZE + 32,
        maxWidth: `calc(100dvw - ${VIEWPORT_INSET * 2}px)`,
        maxHeight: `calc(100dvh - ${DESKTOP_CHESS_PANEL_BOTTOM + VIEWPORT_INSET}px)`,
      }}
      aria-hidden="true"
    >
      <div className="panel-divider -mx-4 flex justify-center py-1">
        <span className="flex gap-0.75 opacity-40">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="inline-block h-1 w-1 rounded-full bg-neon-purple" />
          ))}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-neon-purple">
            {ui.chess_panel.position}
          </span>
          <span
            className="font-mono text-[15px] font-bold tracking-wide text-white-soft"
            style={{
              textShadow:
                '0 0 8px color-mix(in srgb, var(--color-neon-purple) 38%, transparent)',
            }}
          >
            {ui.chess_panel.initial}
          </span>
        </div>
        <div className="flex items-center gap-2 text-neon-purple/55">
          <span className="flex h-8 w-8 items-center justify-center bg-neon-purple/6 text-[16px]">▶</span>
          <span className="flex h-8 w-8 items-center justify-center text-[17px]">◉</span>
          <span className="flex h-8 w-8 items-center justify-center text-neon-cyan/60">↻</span>
        </div>
      </div>

      <StaticChessBoard size={DESKTOP_BOARD_SIZE} pieceSize={34} />

      <div
        className="relative font-mono text-[14px] leading-relaxed text-neon-cyan/50"
        style={{ width: DESKTOP_BOARD_SIZE, height: 48 }}
      />
    </div>
  )
}

function StaticMobileChessPanel({ locale }: { locale: Locale }) {
  const ui = localeUi[locale] ?? esUi

  return (
    <div
      className="panel absolute left-0 right-0 top-0 z-20 block overflow-hidden md:hidden"
      style={{
        height: MOBILE_BOARD_PANEL_HEIGHT,
        borderBottom:
          '1px solid color-mix(in srgb, var(--color-grid) 60%, transparent)',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          containerType: 'size',
        }}
      >
        <div
          className="flex flex-col gap-1 px-3 pb-3 pt-2"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            transformOrigin: 'center',
            width: '100cqh',
            height: '100cqw',
          }}
        >
          <div className="flex shrink-0 flex-col gap-2">
            <div className="flex items-center justify-end gap-2">
              <span className="flex h-8 w-8 items-center justify-center border border-neon-purple/38 bg-neon-purple/6 font-mono text-[13px] leading-none text-neon-purple">
                ▶
              </span>
              <span className="flex h-8 w-8 items-center justify-center border border-neon-purple/30 text-neon-purple/70">
                ◉
              </span>
              <span className="flex h-8 w-8 items-center justify-center border border-neon-cyan/25 text-neon-cyan/60">
                ↻
              </span>
            </div>

            <span
              className="font-mono text-[13px] font-bold tracking-wide text-white-soft"
              style={{
                textShadow:
                  '0 0 8px color-mix(in srgb, var(--color-neon-purple) 38%, transparent)',
              }}
            >
              {ui.chess_panel.initial}
            </span>
          </div>

          <div className="mobile-board-scroll min-h-0 flex-1 overflow-hidden">
            <div className="relative flex min-h-full flex-col gap-1">
              <div className="relative" style={{ width: MOBILE_BOARD_SIZE }}>
                <StaticChessBoard size={MOBILE_BOARD_SIZE} pieceSize={24} />
              </div>
              <div
                className="font-mono text-[14px] leading-relaxed text-neon-cyan/50"
                style={{ width: MOBILE_BOARD_SIZE, minHeight: 48, paddingBottom: 6 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StaticOpeningsPanel({ locale, activeNodeId }: { locale: Locale; activeNodeId: string | null }) {
  const ui = localeUi[locale] ?? esUi

  return (
    <div
      className="panel absolute z-20 hidden flex-col overflow-hidden lg:flex"
      style={{
        top: `calc(100dvh - ${
          DESKTOP_OPENINGS_PANEL_BOTTOM + OPENINGS_PANEL_DEFAULT_HEIGHT
        }px)`,
        right: DESKTOP_PANEL_RIGHT,
        width: OPENINGS_PANEL_WIDTH,
        height: OPENINGS_PANEL_DEFAULT_HEIGHT,
        maxWidth: `calc(100dvw - ${VIEWPORT_INSET * 2}px)`,
        maxHeight: `calc(100dvh - (calc(100dvh - ${
          DESKTOP_OPENINGS_PANEL_BOTTOM + OPENINGS_PANEL_DEFAULT_HEIGHT
        }px)) - ${VIEWPORT_INSET}px)`,
      }}
      aria-hidden="true"
    >
      <div className="panel-divider flex justify-center py-1">
        <span className="flex gap-0.75 opacity-40">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="inline-block h-1 w-1 rounded-full bg-neon-purple" />
          ))}
        </span>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-neon-purple/70">
          {ui.openings_panel.header}
        </span>
        <span className="font-mono text-[20px] leading-none text-neon-purple/50">▾</span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-4 pb-4">
        <div className="relative mb-3 flex">
          <div className="min-h-9 w-full border border-neon-purple/30 bg-black/30 py-2 pl-3 pr-9 font-mono text-[12px] tracking-wide text-neon-purple/55">
            {ui.openings_panel.search_placeholder}
          </div>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neon-cyan/70">⌕</span>
        </div>

        <div className="flex flex-col gap-1.5">
          {OPENING_CATALOG.map((group) => (
            <div key={group.group} className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan/50">
                {(ui.panel_groups as Record<string, string>)[group.group] ?? group.group}
              </span>
              <div className="flex flex-col gap-1">
                {group.openings.map((opening) => {
                  const isActive = activeNodeId === opening.nodeId
                  return (
                    <div
                      key={opening.nodeId}
                      className="flex min-h-9 items-center gap-2 border-l px-3 py-2"
                      style={{
                        borderColor: isActive ? opening.glow : `${opening.color}40`,
                        background: isActive ? `${opening.color}20` : `${opening.color}08`,
                        boxShadow: isActive ? `0 0 12px ${opening.glow}30` : 'none',
                      }}
                    >
                      <span
                        className="inline-block h-2 w-2 shrink-0"
                        style={{
                          backgroundColor: isActive ? opening.color : 'transparent',
                          border: `1px solid ${opening.color}`,
                          boxShadow: isActive ? `0 0 6px ${opening.glow}` : 'none',
                        }}
                      />
                      <span
                        className="min-w-0 flex-1 truncate font-mono text-[13px] tracking-wide"
                        style={{
                          color: isActive ? opening.text : `${opening.text}cc`,
                          textShadow: isActive ? `0 0 6px ${opening.glow}80` : 'none',
                        }}
                      >
                        {getOpeningLabel(opening, locale)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function StaticPanelsPreview({ locale = 'es', slug }: Props) {
  const activeNodeId = getActiveNodeId(slug)

  return (
    <div data-ssg-preview="" className="absolute inset-0" style={{ pointerEvents: 'none' }}>
      <StaticTopBarTitle locale={locale} />
      <StaticOpeningsPanel locale={locale} activeNodeId={activeNodeId} />
      <StaticChessPanel locale={locale} />
      <StaticMobileChessPanel locale={locale} />
    </div>
  )
}
