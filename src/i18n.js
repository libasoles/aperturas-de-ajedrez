import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import esUi from "./locales/es/ui.json";
import enUi from "./locales/en/ui.json";
import esOpenings from "./locales/es/openings.json";
import enOpenings from "./locales/en/openings.json";

function detectLng() {
  if (typeof window === "undefined") return "es";
  const path = window.location.pathname;
  return path === "/en" || path.startsWith("/en/") ? "en" : "es";
}

i18n.use(initReactI18next).init({
  lng: detectLng(),
  fallbackLng: "es",
  ns: ["ui", "openings"],
  defaultNS: "ui",
  resources: {
    es: { ui: esUi, openings: esOpenings },
    en: { ui: enUi, openings: enOpenings },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
