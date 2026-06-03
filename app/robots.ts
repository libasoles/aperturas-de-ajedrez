import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get('host') ?? ''
  const isEnglishDomain = host.includes('chessopenings')

  const sitemapUrl = isEnglishDomain
    ? 'https://chessopenings.com.ar/sitemap.xml'
    : 'https://aperturasdeajedrez.com.ar/sitemap.xml'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '',
    },
    sitemap: sitemapUrl,
  }
}
