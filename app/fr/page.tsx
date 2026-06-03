import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Arbre des Ouvertures d'Échecs | Explorer les Variantes",
  description:
    "Explorez et comparez les principales ouvertures d'échecs dans un arbre interactif. Sicilienne, Italienne, Ruy López, Française, Caro-Kann et Gambit Dame. Chaque variante inclut une évaluation de Stockfish 18.",
  robots: 'index,follow,max-image-preview:large',
  alternates: {
    canonical: 'https://aperturasdeajedrez.com.ar/fr/',
    languages: {
      es: 'https://aperturasdeajedrez.com.ar/',
      en: 'https://chessopenings.com.ar/',
      fr: 'https://aperturasdeajedrez.com.ar/fr/',
      'x-default': 'https://aperturasdeajedrez.com.ar/',
    },
  },
  openGraph: {
    title: "Arbre des Ouvertures d'Échecs | Explorer les Variantes",
    description:
      "Explorez et comparez les principales ouvertures d'échecs dans un arbre interactif. Chaque variante inclut une évaluation de Stockfish 18.",
    url: 'https://aperturasdeajedrez.com.ar/fr/',
    locale: 'fr_FR',
    siteName: 'Aperturas de Ajedrez',
    images: [{ url: 'https://aperturasdeajedrez.com.ar/demo.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Arbre des Ouvertures d'Échecs | Explorer les Variantes",
    description:
      "Explorez et comparez les principales ouvertures d'échecs dans un arbre interactif. Chaque variante inclut une évaluation de Stockfish 18.",
    images: ['https://aperturasdeajedrez.com.ar/demo.png'],
  },
}

export default function FrHomePage() {
  return (
    <div className="h-screen" style={{ background: '#0f1117' }}>
      <AppShell locale="fr" pathname="/fr/" />
    </div>
  )
}
