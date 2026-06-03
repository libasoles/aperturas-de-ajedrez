import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { OpeningTreePreview } from '@/components/OpeningTreePreview'
import { OPENING_ROUTES, VARIANT_ROUTES, HELP_ROUTE } from '@/data/routes'
import { findRouteBySlug } from '@/lib/routes'

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  return [
    ...OPENING_ROUTES.filter((r) => r.slugFr).map((r) => ({ slug: r.slugFr.split('/') })),
    ...VARIANT_ROUTES.filter((r) => r.slugFr).map((r) => ({ slug: r.slugFr.split('/') })),
    { slug: [HELP_ROUTE.slugFr] },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug: slugParts } = await params
  const slug = slugParts.join('/')
  const route = findRouteBySlug(slug, 'fr')
  return {
    title: route.title,
    description: route.description,
    robots: route.discoverable ? 'index,follow,max-image-preview:large' : 'noindex,nofollow',
    alternates: {
      canonical: `https://aperturasdeajedrez.com.ar/fr/${slug}/`,
      languages: {
        ...(route.slug && { es: `https://aperturasdeajedrez.com.ar/${route.slug}/` }),
        ...(route.slugEn && { en: `https://chessopenings.com.ar/${route.slugEn}/` }),
        fr: `https://aperturasdeajedrez.com.ar/fr/${slug}/`,
        'x-default': route.slug
          ? `https://aperturasdeajedrez.com.ar/${route.slug}/`
          : `https://aperturasdeajedrez.com.ar/fr/${slug}/`,
      },
    },
    openGraph: {
      title: route.title,
      description: route.description,
      url: `https://aperturasdeajedrez.com.ar/fr/${slug}/`,
      locale: 'fr_FR',
      siteName: 'Aperturas de Ajedrez',
      images: [{ url: 'https://aperturasdeajedrez.com.ar/demo.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: route.title,
      description: route.description,
      images: ['https://aperturasdeajedrez.com.ar/demo.png'],
    },
  }
}

export default async function FrSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>
  searchParams?: Promise<{ node?: string }>
}) {
  const { slug: slugParts } = await params
  const slug = slugParts.join('/')
  const sp = await searchParams
  return (
    <div className="relative h-screen" style={{ background: '#0f1117' }}>
      <OpeningTreePreview slug={slug} />
      <AppShell locale="fr" pathname={`/fr/${slug}/`} initialNodeId={sp?.node} />
    </div>
  )
}
