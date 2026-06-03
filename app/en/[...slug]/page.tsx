import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { OpeningTreePreview } from '@/components/OpeningTreePreview'
import { OPENING_ROUTES, VARIANT_ROUTES, HELP_ROUTE } from '@/data/routes'
import { findRouteBySlug } from '@/lib/routes'

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  return [
    ...OPENING_ROUTES.filter((r) => r.slugEn).map((r) => ({ slug: r.slugEn.split('/') })),
    ...VARIANT_ROUTES.filter((r) => r.slugEn).map((r) => ({ slug: r.slugEn.split('/') })),
    { slug: [HELP_ROUTE.slugEn] },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug: slugParts } = await params
  const slug = slugParts.join('/')
  const route = findRouteBySlug(slug, 'en')
  return {
    title: route.title,
    description: route.description,
    robots: route.discoverable ? 'index,follow,max-image-preview:large' : 'noindex,nofollow',
    alternates: {
      canonical: `https://chessopenings.com.ar/${slug}/`,
      languages: {
        ...(route.slug && { es: `https://aperturasdeajedrez.com.ar/${route.slug}/` }),
        en: `https://chessopenings.com.ar/${slug}/`,
        ...(route.slugFr && { fr: `https://aperturasdeajedrez.com.ar/fr/${route.slugFr}/` }),
        'x-default': route.slug
          ? `https://aperturasdeajedrez.com.ar/${route.slug}/`
          : `https://chessopenings.com.ar/${slug}/`,
      },
    },
    openGraph: {
      title: route.title,
      description: route.description,
      url: `https://chessopenings.com.ar/${slug}/`,
      locale: 'en_US',
      siteName: 'Chess Openings',
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

export default async function EnSlugPage({
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
      <AppShell locale="en" pathname={`/en/${slug}/`} initialNodeId={sp?.node} />
    </div>
  )
}
