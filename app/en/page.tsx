import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Chess Opening Tree | Explore Variations',
  description:
    "Explore and compare the main chess openings in an interactive tree. Sicilian, Italian, Ruy López, French, Caro-Kann, and Queen's Gambit. Every variation includes a Stockfish 18 evaluation.",
  robots: 'index,follow,max-image-preview:large',
  alternates: {
    canonical: 'https://chessopenings.com.ar/',
    languages: {
      es: 'https://aperturasdeajedrez.com.ar/',
      en: 'https://chessopenings.com.ar/',
      fr: 'https://aperturasdeajedrez.com.ar/fr/',
      'x-default': 'https://aperturasdeajedrez.com.ar/',
    },
  },
  openGraph: {
    title: 'Chess Opening Tree | Explore Variations',
    description:
      'Explore and compare the main chess openings in an interactive tree. Every variation includes a Stockfish 18 evaluation.',
    url: 'https://chessopenings.com.ar/',
    locale: 'en_US',
    siteName: 'Chess Openings',
    images: [{ url: 'https://aperturasdeajedrez.com.ar/demo.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chess Opening Tree | Explore Variations',
    description:
      'Explore and compare the main chess openings in an interactive tree. Every variation includes a Stockfish 18 evaluation.',
    images: ['https://aperturasdeajedrez.com.ar/demo.png'],
  },
}

export default function EnHomePage() {
  return (
    <div className="h-screen" style={{ background: '#0f1117' }}>
      <AppShell locale="en" pathname="/en/" />
    </div>
  )
}
