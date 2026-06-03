import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { OpeningTreePreview } from '@/components/OpeningTreePreview'
import { StaticPanelsPreview } from '@/components/StaticPanelsPreview'
import { TopBar } from '@/components/TopBar'
import { OPENING_ROUTES, VARIANT_ROUTES, HELP_ROUTE } from '@/data/routes'
import { buildAlternates, defaultOgImage, DEFAULT_OG_IMAGE, urlForLocale } from '@/lib/metadata'
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
    alternates: buildAlternates('en', { es: route.slug || undefined, en: slug, fr: route.slugFr || undefined }),
    openGraph: {
      title: route.title,
      description: route.description,
      url: urlForLocale('en', slug),
      locale: 'en_US',
      siteName: 'Chess Openings',
      images: defaultOgImage(),
    },
    twitter: {
      card: 'summary_large_image',
      title: route.title,
      description: route.description,
      images: [DEFAULT_OG_IMAGE],
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
      <OpeningTreePreview slug={slug} locale="en" />
      <StaticPanelsPreview slug={slug} locale="en" />
      <TopBar locale="en" />
      <AppShell locale="en" pathname={`/en/${slug}/`} initialNodeId={sp?.node} />
    </div>
  )
}
