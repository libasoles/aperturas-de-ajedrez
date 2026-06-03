import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { StaticPanelsPreview } from '@/components/StaticPanelsPreview'
import { buildAlternates, defaultOgImage, DEFAULT_OG_IMAGE, urlForLocale } from '@/lib/metadata'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Chess Opening Tree | Explore Variations',
  description:
    "Explore and compare the main chess openings in an interactive tree. Sicilian, Italian, Ruy López, French, Caro-Kann, and Queen's Gambit. Every variation includes a Stockfish 18 evaluation.",
  robots: 'index,follow,max-image-preview:large',
  alternates: buildAlternates('en'),
  openGraph: {
    title: 'Chess Opening Tree | Explore Variations',
    description:
      'Explore and compare the main chess openings in an interactive tree. Every variation includes a Stockfish 18 evaluation.',
    url: urlForLocale('en'),
    locale: 'en_US',
    siteName: 'Chess Openings',
    images: defaultOgImage(),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chess Opening Tree | Explore Variations',
    description:
      'Explore and compare the main chess openings in an interactive tree. Every variation includes a Stockfish 18 evaluation.',
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function EnHomePage() {
  return (
    <div className="relative h-screen" style={{ background: '#0f1117' }}>
      <StaticPanelsPreview locale="en" />
      <AppShell locale="en" pathname="/en/" />
    </div>
  )
}
