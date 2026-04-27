import i18n from "../i18n";
import { trackPremiumMenuClick, trackPremiumNodeClick } from "../lib/analytics";
import { canAccessContent, hasPremiumAccess } from "../lib/access";
import { OPENING_CATALOG, VARIANT_CATALOG } from "./openingCatalog";
import { OPENING_COLORS } from "./openingColors";
import { OPENING_TREE } from "./openings";
import { LONDON_OPENING, LONDON_TREE } from "./studies/londonTree";
import {
  HELP_ROUTE,
  OPENING_ROUTES,
  ROUTE_BY_NODE_ID,
  ROUTE_BY_SLUG,
  VARIANT_ROUTES,
  VARIANT_ROUTE_BY_NODE_ID,
  VARIANT_ROUTE_BY_SLUG,
} from "./routes";

const LONDON_STUDY_COLORS = {
  root: OPENING_COLORS.root,
  [LONDON_OPENING]: {
    node: "#132f2b",
    text: "#ccfbf1",
    border: "#14b8a6",
    edge: "#2dd4bf",
  },
  "london-jobava": {
    node: "#2a1a3a",
    text: "#f5d0fe",
    border: "#a21caf",
    edge: "#c026d3",
  },
};

export const DEFAULT_INITIAL_EXPANDED_IDS = [
  "root",
  "e4",
  "scan-1",
  "span-1",
  "span-2",
  "span-3",
  "sic-1",
  "d4",
  "qg-1",
  "ki-1",
];

const REPERTOIRE_TREE = {
  id: "root",
  move: "Inicial",
  color: null,
  opening: "root",
  children: [
    {
      id: "rep-e4",
      move: "e4",
      color: "white",
      opening: "root",
      children: [
        {
          id: "rep-c5",
          move: "c5",
          color: "black",
          opening: "root",
          children: [
            {
              id: "rep-nf3",
              move: "Nf3",
              color: "white",
              opening: "root",
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

export const defaultOpeningTreeConfig = {
  id: "default",
  tree: OPENING_TREE,
  catalog: OPENING_CATALOG,
  variantCatalog: VARIANT_CATALOG,
  initialExpandedIds: DEFAULT_INITIAL_EXPANDED_IDS,
  colors: OPENING_COLORS,
  routes: null,
  routeData: {
    helpRoute: HELP_ROUTE,
    openingRoutes: OPENING_ROUTES,
    routeBySlug: ROUTE_BY_SLUG,
    routeByNodeId: ROUTE_BY_NODE_ID,
    variantRoutes: VARIANT_ROUTES,
    variantRouteBySlug: VARIANT_ROUTE_BY_SLUG,
    variantRouteByNodeId: VARIANT_ROUTE_BY_NODE_ID,
  },
  premium: {
    enabled: true,
    hasAccess: hasPremiumAccess,
    canAccessContent,
    trackNodeClick: trackPremiumNodeClick,
    trackMenuClick: trackPremiumMenuClick,
  },
};

export const repertoireTreeConfig = {
  id: "my-repertoire",
  routes: {
    es: "mi-repertorio",
    en: "my-repertoire",
    fr: "mon-repertoire",
  },
  tree: REPERTOIRE_TREE,
  catalog: [],
  variantCatalog: [],
  initialExpandedIds: ["root", "rep-e4"],
  colors: {},
  routeData: null,
  premium: null,
};

export const londonStudyTreeConfig = {
  id: "london-study",
  routes: {
    es: "studies/london",
  },
  tree: LONDON_TREE,
  catalog: [],
  variantCatalog: [],
  initialExpandedIds: [
    "root",
    "london-d4",
    "london-d5",
    "london-bf4",
    "london-nf6",
    "london-e3-2",
    "london-c5",
  ],
  colors: LONDON_STUDY_COLORS,
  routeData: null,
  premium: null,
  subtitle: "Londres",
};

export const TREE_CONFIGS = [
  defaultOpeningTreeConfig,
  repertoireTreeConfig,
  londonStudyTreeConfig,
];

function stripLocalePrefix(pathname) {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return { locale: "en", path: pathname.slice(3) || "/" };
  }
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    return { locale: "fr", path: pathname.slice(3) || "/" };
  }
  return { locale: "es", path: pathname };
}

function normalizeSlug(pathname) {
  return pathname.replace(/^\/|\/$/g, "");
}

function getPreferredLocale() {
  if (typeof navigator === "undefined") return "es";
  const lang = navigator.language ?? "";
  if (lang.startsWith("en")) return "en";
  if (lang.startsWith("fr")) return "fr";
  return "es";
}

function configSlugForLocale(config, locale) {
  return config.routes?.[locale] ?? "";
}

function findConfigBySlug(slug) {
  return TREE_CONFIGS.find((config) =>
    Object.values(config.routes ?? {}).includes(slug),
  );
}

export function resolveTreeConfigFromPathname(pathname) {
  const { path } = stripLocalePrefix(pathname);
  const slug = normalizeSlug(path);
  if (!slug) return defaultOpeningTreeConfig;
  return findConfigBySlug(slug) ?? defaultOpeningTreeConfig;
}

export function applyLocaleRedirectForTreeConfigs() {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  const hasLocalePrefix =
    path === "/en" ||
    path.startsWith("/en/") ||
    path === "/fr" ||
    path.startsWith("/fr/");
  if (hasLocalePrefix) return;

  const slug = normalizeSlug(path);
  const locale = getPreferredLocale();
  if (locale === "es") return;

  const config = slug ? findConfigBySlug(slug) : defaultOpeningTreeConfig;
  const defaultRoute =
    defaultOpeningTreeConfig.routeData.variantRouteBySlug[slug] ??
    defaultOpeningTreeConfig.routeData.routeBySlug[slug];

  const localizedSlug =
    !config || config === defaultOpeningTreeConfig
      ? (() => {
          if (!slug) return "";
          if (defaultRoute && locale === "en") return defaultRoute.slugEn;
          if (defaultRoute && locale === "fr") return defaultRoute.slugFr;
          return slug;
        })()
      : configSlugForLocale(config, locale);

  if (config && config !== defaultOpeningTreeConfig && !localizedSlug) return;

  const nextPath = localizedSlug
    ? `/${locale}/${localizedSlug}`
    : `/${locale}/`;
  history.replaceState(null, "", nextPath);
  try {
    i18n.changeLanguage(locale);
  } catch {
    // i18n may not be fully initialized yet.
  }
}
