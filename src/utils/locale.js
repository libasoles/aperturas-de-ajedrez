const DOMAIN_LOCALES = {
  "chessopenings.com.ar": "en",
};

function normalizeHostname(hostname = "") {
  return hostname.toLowerCase().replace(/^www\./, "");
}

export function getDomainLocale(location = globalThis.window?.location) {
  const hostname = normalizeHostname(location?.hostname);
  return DOMAIN_LOCALES[hostname] ?? null;
}

export function usesDomainLocaleUrls(location = globalThis.window?.location) {
  return getDomainLocale(location) === "en";
}

export function detectLocaleFromPathname(
  pathname = globalThis.window?.location?.pathname ?? "/",
  {
    htmlLang =
      typeof document === "undefined"
        ? null
        : document.documentElement.getAttribute("lang"),
    location = globalThis.window?.location,
  } = {},
) {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
  const domainLocale = getDomainLocale(location);
  if (domainLocale) return domainLocale;
  if (htmlLang === "en" || htmlLang === "fr") return htmlLang;
  return "es";
}

export function stripLocalePrefix(pathname, options) {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return { locale: "en", path: pathname.slice(3) || "/" };
  }
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    return { locale: "fr", path: pathname.slice(3) || "/" };
  }
  return {
    locale: detectLocaleFromPathname(pathname, options),
    path: pathname,
  };
}

export function localizedPath({ locale, slug = "", location }) {
  const cleanSlug = slug.replace(/^\/|\/$/g, "");
  if (locale === "en") {
    return usesDomainLocaleUrls(location)
      ? `/${cleanSlug ? `${cleanSlug}/` : ""}`
      : `/en/${cleanSlug ? `${cleanSlug}/` : ""}`;
  }
  if (locale === "fr") return `/fr/${cleanSlug ? `${cleanSlug}/` : ""}`;
  return `/${cleanSlug ? `${cleanSlug}/` : ""}`;
}
