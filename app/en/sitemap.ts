import type { MetadataRoute } from 'next'
import { OPENING_ROUTES, VARIANT_ROUTES, HELP_ROUTE } from '@/data/routes'

export const dynamic = 'force-static'

const BASE_EN = 'https://chessopenings.com.ar'

export default function sitemap(): MetadataRoute.Sitemap {
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
