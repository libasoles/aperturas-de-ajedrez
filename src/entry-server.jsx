import { renderToString } from "react-dom/server";
import { initI18n } from "./i18n";
import Root from "./Root";

function lngFromUrl(url) {
  if (url === "/en" || url.startsWith("/en/")) return "en";
  if (url === "/fr" || url.startsWith("/fr/")) return "fr";
  return "es";
}

export async function render(url = "/", resources) {
  const lng = lngFromUrl(url);
  await initI18n(lng, resources);
  return renderToString(<Root />);
}
