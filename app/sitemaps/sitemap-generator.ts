import { OPENING_ROUTES, VARIANT_ROUTES, HELP_ROUTE } from '@/data/routes'

export function generateSitemapXml(
  base: string,
  locale: 'es' | 'en' | 'fr'
): string {
  const entries: Array<{
    loc: string
    lastmod: string
    changefreq: string
    priority: number
  }> = []

  const now = new Date().toISOString()

  if (locale === 'es') {
    entries.push(
      { loc: `${base}/`, lastmod: now, changefreq: 'weekly', priority: 1.0 },
      { loc: `${base}/${HELP_ROUTE.slug}/`, lastmod: now, changefreq: 'monthly', priority: 0.5 },
      { loc: `${base}/studies/london/`, lastmod: now, changefreq: 'monthly', priority: 0.7 }
    )

    for (const r of OPENING_ROUTES) {
      if (!r.discoverable) continue
      entries.push({
        loc: `${base}/${r.slug}/`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.9,
      })
    }

    for (const r of VARIANT_ROUTES) {
      if (!r.discoverable) continue
      entries.push({
        loc: `${base}/${r.slug}/`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.8,
      })
    }
  } else if (locale === 'en') {
    entries.push(
      { loc: `${base}/`, lastmod: now, changefreq: 'weekly', priority: 1.0 },
      { loc: `${base}/${HELP_ROUTE.slugEn}/`, lastmod: now, changefreq: 'monthly', priority: 0.5 }
    )

    for (const r of OPENING_ROUTES) {
      if (!r.discoverable || !r.slugEn) continue
      entries.push({
        loc: `${base}/${r.slugEn}/`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.9,
      })
    }

    for (const r of VARIANT_ROUTES) {
      if (!r.discoverable || !r.slugEn) continue
      entries.push({
        loc: `${base}/${r.slugEn}/`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.8,
      })
    }
  } else if (locale === 'fr') {
    entries.push(
      { loc: `${base}/fr/`, lastmod: now, changefreq: 'weekly', priority: 1.0 },
      { loc: `${base}/fr/${HELP_ROUTE.slugFr}/`, lastmod: now, changefreq: 'monthly', priority: 0.5 }
    )

    for (const r of OPENING_ROUTES) {
      if (!r.discoverable || !r.slugFr) continue
      entries.push({
        loc: `${base}/fr/${r.slugFr}/`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.9,
      })
    }

    for (const r of VARIANT_ROUTES) {
      if (!r.discoverable || !r.slugFr) continue
      entries.push({
        loc: `${base}/fr/${r.slugFr}/`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.8,
      })
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return xml
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
