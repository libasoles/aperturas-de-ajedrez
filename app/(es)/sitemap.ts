import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get('host') ?? ''
  const isEnglishDomain = host.includes('chessopenings')

  if (isEnglishDomain) {
    return [{ url: 'https://chessopenings.com.ar/sitemaps/en.xml' }]
  }

  return [
    { url: 'https://aperturasdeajedrez.com.ar/sitemaps/es.xml' },
    { url: 'https://aperturasdeajedrez.com.ar/sitemaps/en.xml' },
    { url: 'https://aperturasdeajedrez.com.ar/sitemaps/fr.xml' },
  ]
}
