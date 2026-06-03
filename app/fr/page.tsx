import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { StaticPanelsPreview } from '@/components/StaticPanelsPreview'
import { TopBar } from '@/components/TopBar'
import { buildAlternates, defaultOgImage, DEFAULT_OG_IMAGE, urlForLocale } from '@/lib/metadata'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Arbre des Ouvertures d'Échecs | Explorer les Variantes",
  description:
    "Explorez et comparez les principales ouvertures d'échecs dans un arbre interactif. Sicilienne, Italienne, Ruy López, Française, Caro-Kann et Gambit Dame. Chaque variante inclut une évaluation de Stockfish 18.",
  robots: 'index,follow,max-image-preview:large',
  alternates: buildAlternates('fr'),
  openGraph: {
    title: "Arbre des Ouvertures d'Échecs | Explorer les Variantes",
    description:
      "Explorez et comparez les principales ouvertures d'échecs dans un arbre interactif. Chaque variante inclut une évaluation de Stockfish 18.",
    url: urlForLocale('fr'),
    locale: 'fr_FR',
    siteName: 'Aperturas de Ajedrez',
    images: defaultOgImage(),
  },
  twitter: {
    card: 'summary_large_image',
    title: "Arbre des Ouvertures d'Échecs | Explorer les Variantes",
    description:
      "Explorez et comparez les principales ouvertures d'échecs dans un arbre interactif. Chaque variante inclut une évaluation de Stockfish 18.",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function FrHomePage() {
  return (
    <div className="relative h-screen" style={{ background: '#0f1117' }}>
      <StaticPanelsPreview locale="fr" />
      <TopBar locale="fr" />
      <AppShell locale="fr" pathname="/fr/" />
    </div>
  )
}
