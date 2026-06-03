import { generateSitemapXml } from '../sitemap-generator'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return [{ lang: 'es.xml' }, { lang: 'en.xml' }, { lang: 'fr.xml' }]
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params
  const langKey = lang.replace('.xml', '') as 'es' | 'en' | 'fr'

  const baseMap: Record<string, string> = {
    es: 'https://aperturasdeajedrez.com.ar',
    en: 'https://chessopenings.com.ar',
    fr: 'https://aperturasdeajedrez.com.ar',
  }

  const base = baseMap[langKey]
  if (!base) {
    return new Response('Not found', { status: 404 })
  }

  const xml = generateSitemapXml(base, langKey)
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
