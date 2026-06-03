import type { Metadata } from 'next'

export type MetadataLocale = 'es' | 'en' | 'fr'

export const SITE_URL = {
  es: 'https://aperturasdeajedrez.com.ar',
  en: 'https://chessopenings.com.ar',
  fr: 'https://aperturasdeajedrez.com.ar',
} as const

export const DEFAULT_OG_IMAGE = `${SITE_URL.es}/demo.png`

type LocalizedSlugs = Partial<Record<MetadataLocale, string>>

function normalizeSlug(slug = ''): string {
  return slug.replace(/^\/+|\/+$/g, '')
}

export function urlForLocale(locale: MetadataLocale, slug = ''): string {
  const normalizedSlug = normalizeSlug(slug)
  const localizedPath = locale === 'fr' ? ['fr', normalizedSlug].filter(Boolean).join('/') : normalizedSlug
  return `${SITE_URL[locale]}/${localizedPath ? `${localizedPath}/` : ''}`
}

export function buildAlternates(locale: MetadataLocale, slugs: LocalizedSlugs): Metadata['alternates'] {
  const canonicalSlug = slugs[locale] ?? ''
  const canonical = urlForLocale(locale, canonicalSlug)

  return {
    canonical,
    languages: {
      ...(slugs.es !== undefined && { es: urlForLocale('es', slugs.es) }),
      ...(slugs.en !== undefined && { en: urlForLocale('en', slugs.en) }),
      ...(slugs.fr !== undefined && { fr: urlForLocale('fr', slugs.fr) }),
      'x-default': slugs.es !== undefined ? urlForLocale('es', slugs.es) : canonical,
    },
  }
}

export function defaultOgImage() {
  return [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }]
}
