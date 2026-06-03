import {
  HELP_ROUTE,
  OPENING_ROUTES,
  VARIANT_ROUTES,
} from '../data/routes'

type RouteLocale = 'es' | 'en' | 'fr'

interface RouteEntry {
  slug: string
  slugEn: string
  slugFr: string
  title: string
  titleEn: string
  titleFr: string
  description: string
  descriptionEn: string
  descriptionFr: string
  discoverable?: boolean
  access?: string
  nodeId?: string
  variantNodeId?: string
  parentNodeId?: string
}

function slugKeyForLocale(route: RouteEntry, locale: RouteLocale): string {
  if (locale === 'en') return route.slugEn
  if (locale === 'fr') return route.slugFr
  return route.slug
}

function titleForLocale(route: RouteEntry, locale: RouteLocale): string {
  if (locale === 'en') return route.titleEn
  if (locale === 'fr') return route.titleFr
  return route.title
}

function descriptionForLocale(route: RouteEntry, locale: RouteLocale): string {
  if (locale === 'en') return route.descriptionEn
  if (locale === 'fr') return route.descriptionFr
  return route.description
}

export interface ResolvedRoute {
  slug: string
  slugEn: string
  slugFr: string
  title: string
  description: string
  discoverable: boolean
  nodeId?: string
  variantNodeId?: string
  parentNodeId?: string
}

// London study only has an ES slug for now
const LONDON_STUDY_ROUTE: RouteEntry = {
  slug: 'studies/london',
  slugEn: '',
  slugFr: '',
  title: 'Sistema de Londres | Estudio',
  titleEn: 'London System | Study',
  titleFr: 'Système de Londres | Étude',
  description: 'Estudio del Sistema de Londres: variantes principales, ideas estratégicas y plan de juego.',
  descriptionEn: 'London System study: main variations, strategic ideas, and game plan.',
  descriptionFr: 'Étude du Système de Londres : variantes principales, idées stratégiques et plan de jeu.',
  discoverable: true,
}

export function findRouteBySlug(slug: string, locale: RouteLocale): ResolvedRoute {
  const allRoutes: RouteEntry[] = [
    ...(OPENING_ROUTES as RouteEntry[]),
    ...(VARIANT_ROUTES as RouteEntry[]),
    HELP_ROUTE as RouteEntry,
    LONDON_STUDY_ROUTE,
  ]

  const match = allRoutes.find((r) => slugKeyForLocale(r, locale) === slug)
  if (!match) {
    throw new Error(`No route found for slug "${slug}" (locale: ${locale})`)
  }

  return {
    slug: match.slug,
    slugEn: match.slugEn,
    slugFr: match.slugFr,
    title: titleForLocale(match, locale),
    description: descriptionForLocale(match, locale),
    discoverable: match.discoverable ?? true,
    nodeId: match.nodeId,
    variantNodeId: match.variantNodeId,
    parentNodeId: match.parentNodeId,
  }
}
