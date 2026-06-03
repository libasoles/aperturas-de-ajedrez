import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Árbol de Aperturas de Ajedrez | Explora Variantes',
  description:
    'Explora y compara las principales aperturas de ajedrez en un árbol interactivo. Siciliana, Italiana, Ruy López, Francesa, Caro-Kann y Gambito de Dama. Cada variante incluye evaluación de Stockfish 18.',
  robots: 'index,follow,max-image-preview:large',
  alternates: {
    canonical: 'https://aperturasdeajedrez.com.ar/',
    languages: {
      es: 'https://aperturasdeajedrez.com.ar/',
      en: 'https://chessopenings.com.ar/',
      fr: 'https://aperturasdeajedrez.com.ar/fr/',
      'x-default': 'https://aperturasdeajedrez.com.ar/',
    },
  },
  openGraph: {
    title: 'Árbol de Aperturas de Ajedrez | Explora Variantes',
    description:
      'Explora y compara las principales aperturas de ajedrez en un árbol interactivo. Cada variante incluye evaluación de Stockfish 18.',
    url: 'https://aperturasdeajedrez.com.ar/',
    locale: 'es_ES',
    siteName: 'Aperturas de Ajedrez',
    images: [{ url: 'https://aperturasdeajedrez.com.ar/demo.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Árbol de Aperturas de Ajedrez | Explora Variantes',
    description:
      'Explora y compara las principales aperturas de ajedrez en un árbol interactivo. Cada variante incluye evaluación de Stockfish 18.',
    images: ['https://aperturasdeajedrez.com.ar/demo.png'],
  },
}

export default function EsHomePage() {
  return (
    <div className="h-screen" style={{ background: '#0f1117' }}>
      <AppShell locale="es" pathname="/" />
    </div>
  )
}
