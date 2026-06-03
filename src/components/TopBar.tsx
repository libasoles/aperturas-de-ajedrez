import enUi from '@/locales/en/ui.json'
import esUi from '@/locales/es/ui.json'
import frUi from '@/locales/fr/ui.json'

type Locale = 'es' | 'en' | 'fr'

const localeUi = { es: esUi, en: enUi, fr: frUi }

function homeHref(locale: Locale) {
  if (locale === 'en') return '/en/'
  if (locale === 'fr') return '/fr/'
  return '/'
}

export function TopBar({ locale = 'es' }: { locale?: Locale }) {
  const ui = localeUi[locale]

  return (
    <div
      data-topbar-static=""
      className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-3 z-10 border-b border-neon-purple/[0.14]"
      style={{
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--color-panel) 94%, transparent) 0%, color-mix(in srgb, var(--color-panel) 69%, transparent) 80%, transparent 100%)',
      }}
    >
      <a href={homeHref(locale)} className="flex flex-col gap-0.5 no-underline">
        <div className="neon-title">{ui.title}</div>
        <div className="neon-subtitle">{ui.subtitle}</div>
      </a>
      <div className="flex flex-col items-end gap-1 text-right">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white-soft/80">
          Stockfish 18 · {ui.evaluation.depth} 14
        </div>
        <div className="font-mono text-[12px] font-bold leading-none text-white-soft">
          0.0
        </div>
      </div>
    </div>
  )
}
