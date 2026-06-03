import type { MetadataRoute } from 'next'
import { OPENING_ROUTES, VARIANT_ROUTES, HELP_ROUTE } from '@/data/routes'

export const dynamic = 'force-static'

const BASE = 'https://aperturasdeajedrez.com.ar'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE}/fr/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/fr/${HELP_ROUTE.slugFr}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  for (const r of OPENING_ROUTES) {
    if (!r.discoverable || !r.slugFr) continue
    entries.push({ url: `${BASE}/fr/${r.slugFr}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 })
  }

  for (const r of VARIANT_ROUTES) {
    if (!r.discoverable || !r.slugFr) continue
    entries.push({ url: `${BASE}/fr/${r.slugFr}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 })
  }

  return entries
}
