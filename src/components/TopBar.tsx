'use client'
import { useTranslation } from 'react-i18next'
import { findPathToNode } from '../utils/chessPath'
import { formatStockfishScore } from '../utils/stockfishEvaluation'

type Locale = 'es' | 'en' | 'fr'

function homeHref(locale: Locale) {
  if (locale === 'en') return '/en/'
  if (locale === 'fr') return '/fr/'
  return '/'
}

interface Props {
  locale: Locale
  selectedNodeId: string | null
  tree: object
  subtitle?: string | null
}

export function TopBar({ locale, selectedNodeId, tree, subtitle }: Props) {
  const { t } = useTranslation()
  const selectedNode =
    selectedNodeId ? (findPathToNode(tree, selectedNodeId) as any[]).at(-1) : null
  const stockfishDepth = selectedNode?.stockfish?.depth ?? 14
  const stockfishScore = formatStockfishScore(selectedNode?.stockfish)

  return (
    <div
      className="absolute top-0 left-0 right-0 hidden md:flex items-center justify-between px-8 py-3 z-10 border-b border-neon-purple/[0.14]"
      style={{
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--color-panel) 94%, transparent) 0%, color-mix(in srgb, var(--color-panel) 69%, transparent) 80%, transparent 100%)',
      }}
    >
      <a href={homeHref(locale)} className="flex flex-col gap-0.5 no-underline">
        <div className="neon-title">{t('title')}</div>
        <div className="neon-subtitle">{t('subtitle')}</div>
      </a>
      <div className="flex flex-col items-end gap-1 text-right">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white-soft/80">
          Stockfish 18 · {t('evaluation.depth')} {stockfishDepth}
        </div>
        <div className="font-mono text-[12px] font-bold leading-none text-white-soft">
          {stockfishScore}
        </div>
        {subtitle && <div className="neon-subtitle">{subtitle}</div>}
      </div>
    </div>
  )
}
