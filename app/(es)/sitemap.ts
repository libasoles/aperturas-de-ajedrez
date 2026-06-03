import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { OPENING_ROUTES, VARIANT_ROUTES, HELP_ROUTE } from '@/data/routes'

const BASE_ES = 'https://aperturasdeajedrez.com.ar'
const BASE_EN = 'https://chessopenings.com.ar'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get('host') ?? ''
  const isEnglishDomain = host.includes('chessopenings')

  if (isEnglishDomain) {
    const entries: MetadataRoute.Sitemap = [
      { url: `${BASE_EN}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
      { url: `${BASE_EN}/${HELP_ROUTE.slugEn}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ]

    for (const r of OPENING_ROUTES) {
      if (!r.discoverable || !r.slugEn) continue
      entries.push({ url: `${BASE_EN}/${r.slugEn}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 })
    }

    for (const r of VARIANT_ROUTES) {
      if (!r.discoverable || !r.slugEn) continue
      entries.push({ url: `${BASE_EN}/${r.slugEn}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 })
    }

    return entries
  }

  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE_ES}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_ES}/${HELP_ROUTE.slug}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_ES}/studies/london/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  for (const r of OPENING_ROUTES) {
    if (!r.discoverable) continue
    entries.push({ url: `${BASE_ES}/${r.slug}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 })
  }

  for (const r of VARIANT_ROUTES) {
    if (!r.discoverable) continue
    entries.push({ url: `${BASE_ES}/${r.slug}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 })
  }

  return entries
}
