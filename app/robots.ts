import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export const dynamic = 'force-static'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get('host') ?? ''
  const isEnglishDomain = host.includes('chessopenings')

  if (isEnglishDomain) {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '',
      },
      sitemap: 'https://chessopenings.com.ar/sitemap.xml',
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '',
    },
    sitemap: [
      'https://aperturasdeajedrez.com.ar/sitemap.xml',
      'https://aperturasdeajedrez.com.ar/fr/sitemap.xml',
    ],
  }
}
