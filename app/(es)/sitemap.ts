import type { MetadataRoute } from 'next'
import { OPENING_ROUTES, VARIANT_ROUTES, HELP_ROUTE } from '@/data/routes'

export const dynamic = 'force-static'

const BASE = 'https://aperturasdeajedrez.com.ar'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/${HELP_ROUTE.slug}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/studies/london/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  for (const r of OPENING_ROUTES) {
    if (!r.discoverable) continue
    entries.push({ url: `${BASE}/${r.slug}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 })
  }

  for (const r of VARIANT_ROUTES) {
    if (!r.discoverable) continue
    entries.push({ url: `${BASE}/${r.slug}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 })
  }

  return entries
}
