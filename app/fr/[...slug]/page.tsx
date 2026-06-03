import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { OpeningTreePreview } from '@/components/OpeningTreePreview'
import { StaticPanelsPreview } from '@/components/StaticPanelsPreview'
import { OPENING_ROUTES, VARIANT_ROUTES, HELP_ROUTE } from '@/data/routes'
import { buildAlternates, defaultOgImage, DEFAULT_OG_IMAGE, urlForLocale } from '@/lib/metadata'
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
    alternates: buildAlternates('fr', { es: route.slug || undefined, en: route.slugEn || undefined, fr: slug }),
    openGraph: {
      title: route.title,
      description: route.description,
      url: urlForLocale('fr', slug),
      locale: 'fr_FR',
      siteName: 'Aperturas de Ajedrez',
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
      <OpeningTreePreview slug={slug} locale="fr" />
      <StaticPanelsPreview slug={slug} locale="fr" />
      <AppShell locale="fr" pathname={`/fr/${slug}/`} initialNodeId={sp?.node} />
    </div>
  )
}
