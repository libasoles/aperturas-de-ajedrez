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
    ...OPENING_ROUTES.map((r) => ({ slug: r.slug.split('/') })),
    ...VARIANT_ROUTES.map((r) => ({ slug: r.slug.split('/') })),
    { slug: ['studies', 'london'] },
    { slug: [HELP_ROUTE.slug] },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug: slugParts } = await params
  const slug = slugParts.join('/')
  const route = findRouteBySlug(slug, 'es')
  return {
    title: route.title,
    description: route.description,
    robots: route.discoverable ? 'index,follow,max-image-preview:large' : 'noindex,nofollow',
    alternates: buildAlternates('es', { es: slug, en: route.slugEn || undefined, fr: route.slugFr || undefined }),
    openGraph: {
      title: route.title,
      description: route.description,
      url: urlForLocale('es', slug),
      locale: 'es_ES',
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

export default async function EsSlugPage({
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
      <OpeningTreePreview slug={slug} locale="es" />
      <StaticPanelsPreview slug={slug} locale="es" />
      <AppShell locale="es" pathname={`/${slug}/`} initialNodeId={sp?.node} />
    </div>
  )
}
