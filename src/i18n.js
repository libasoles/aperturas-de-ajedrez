import i18n from "i18next";
import { initReactI18next } from "react-i18next";

function detectLng() {
  if (typeof window === "undefined") return "es";
  const path = window.location.pathname;
  if (path === "/en" || path.startsWith("/en/")) return "en";
  if (path === "/fr" || path.startsWith("/fr/")) return "fr";
  return "es";
}

// Import only the detected language (avoid loading all 3 languages in bundle)
async function initializeI18n() {
  const lng = detectLng();

  const [{ default: ui }, { default: openings }] = await Promise.all([
    import(`./locales/${lng}/ui.json`),
    import(`./locales/${lng}/openings.json`),
  ]);

  i18n.use(initReactI18next).init({
    lng,
    fallbackLng: "es",
    ns: ["ui", "openings"],
    defaultNS: "ui",
    resources: {
      [lng]: { ui, openings },
    },
    interpolation: { escapeValue: false },
  });

  // Keep <html lang="..."> in sync with the active language
  if (typeof document !== "undefined") {
    document.documentElement.lang = i18n.language;
  }
}

initializeI18n();

export default i18n;
