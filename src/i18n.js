import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export function detectLng() {
  if (typeof window === "undefined") return "es";
  // Trust the html[lang] set by SSR — handles domain-based locale (chessopenings.com.ar)
  const htmlLang = document.documentElement.getAttribute("lang");
  if (htmlLang === "en" || htmlLang === "fr") return htmlLang;
  const path = window.location.pathname;
  if (path === "/en" || path.startsWith("/en/")) return "en";
  if (path === "/fr" || path.startsWith("/fr/")) return "fr";
  return "es";
}

export async function initI18n(lng, resources) {
  let ui, openings;

  if (resources) {
    // Provided directly (SSR/prerender path)
    ({ ui, openings } = resources);
  } else {
    // Use inline resources injected by pre-render — no async network request needed
    const inline = typeof window !== "undefined" ? window.__I18N__ : null;
    if (inline?.lng === lng) {
      ({ ui, openings } = inline);
    } else {
      [{ default: ui }, { default: openings }] = await Promise.all([
        import(`./locales/${lng}/ui.json`),
        import(`./locales/${lng}/openings.json`),
      ]);
    }
  }

  const hasPreloadedResources =
    !!resources ||
    (typeof window !== "undefined" && window.__I18N__?.lng === lng);

  if (i18n.isInitialized) {
    i18n.addResourceBundle(lng, "ui", ui, true, true);
    i18n.addResourceBundle(lng, "openings", openings, true, true);
    await i18n.changeLanguage(lng);
  } else {
    await i18n.use(initReactI18next).init({
      lng,
      fallbackLng: "es",
      ns: ["ui", "openings"],
      defaultNS: "ui",
      resources: { [lng]: { ui, openings } },
      interpolation: { escapeValue: false },
      // initImmediate: false makes init synchronous when resources are pre-loaded,
      // so i18n.isInitialized is true before React's first render — no flash
      ...(hasPreloadedResources && { initImmediate: false }),
    });
  }

  if (typeof document !== "undefined") {
    document.documentElement.lang = i18n.language;
  }
}

initI18n(detectLng());

export default i18n;
