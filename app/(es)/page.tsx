import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { StaticPanelsPreview } from '@/components/StaticPanelsPreview'
import { buildAlternates, defaultOgImage, DEFAULT_OG_IMAGE, urlForLocale } from '@/lib/metadata'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Árbol de Aperturas de Ajedrez | Explora Variantes',
  description:
    'Explora y compara las principales aperturas de ajedrez en un árbol interactivo. Siciliana, Italiana, Ruy López, Francesa, Caro-Kann y Gambito de Dama. Cada variante incluye evaluación de Stockfish 18.',
  robots: 'index,follow,max-image-preview:large',
  alternates: buildAlternates('es', { es: '', en: '', fr: '' }),
  openGraph: {
    title: 'Árbol de Aperturas de Ajedrez | Explora Variantes',
    description:
      'Explora y compara las principales aperturas de ajedrez en un árbol interactivo. Cada variante incluye evaluación de Stockfish 18.',
    url: urlForLocale('es'),
    locale: 'es_ES',
    siteName: 'Aperturas de Ajedrez',
    images: defaultOgImage(),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Árbol de Aperturas de Ajedrez | Explora Variantes',
    description:
      'Explora y compara las principales aperturas de ajedrez en un árbol interactivo. Cada variante incluye evaluación de Stockfish 18.',
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function EsHomePage() {
  return (
    <div className="relative h-screen" style={{ background: '#0f1117' }}>
      <StaticPanelsPreview locale="es" />
      <AppShell locale="es" pathname="/" />
    </div>
  )
}
