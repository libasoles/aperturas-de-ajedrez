#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, "dist");
const templatePath = path.join(distDir, "index.html");
const serverEntryPath = path.join(distDir, "server", "entry-server.js");

const BASE_URL = "https://aperturasdeajedrez.com.ar";
const HOME_TITLE = "Árbol de Aperturas de Ajedrez | Explora Variantes";
const HOME_DESC =
  "Explora y compara las principales aperturas de ajedrez en un árbol interactivo. Siciliana, Italiana, Ruy López, Francesa, Caro-Kann y Gambito de Dama. Visualiza variantes con tablero animado.";

function injectMeta(template, { title, description, canonical }) {
  let html = template;
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`,
  );
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`,
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${description}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${description}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:url" content="${canonical}" />`,
  );
  return html;
}

async function run() {
  const [template, serverEntry, routesMod] = await Promise.all([
    fs.readFile(templatePath, "utf8"),
    import(pathToFileURL(serverEntryPath).href),
    import(pathToFileURL(path.join(distDir, "server", "entry-server.js")).href.replace("entry-server.js", "../server/entry-server.js")).catch(
      () => null,
    ),
  ]);

  // Dynamic import of routes from source (ESM)
  const { OPENING_ROUTES } = await import(
    pathToFileURL(path.resolve(rootDir, "src", "data", "routes.js")).href
  );

  if (typeof serverEntry.render !== "function") {
    throw new Error("dist/server/entry-server.js does not export render().");
  }

  const appHtml = serverEntry.render();
  const rendered = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );

  // 1. Home page
  const homeHtml = injectMeta(rendered, {
    title: HOME_TITLE,
    description: HOME_DESC,
    canonical: `${BASE_URL}/`,
  });
  await fs.writeFile(path.join(distDir, "index.html"), homeHtml, "utf8");
  process.stdout.write("Prerendered /\n");

  // 2. Opening pages
  for (const route of OPENING_ROUTES) {
    const dir = path.join(distDir, route.slug);
    await fs.mkdir(dir, { recursive: true });

    const pageHtml = injectMeta(rendered, {
      title: route.title,
      description: route.description,
      canonical: `${BASE_URL}/${route.slug}`,
    });
    await fs.writeFile(path.join(dir, "index.html"), pageHtml, "utf8");
    process.stdout.write(`Prerendered /${route.slug}\n`);
  }
}

run().catch((err) => {
  process.stderr.write(`${err.stack || err.message}\n`);
  process.exit(1);
});
