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
  const [template, serverEntry] = await Promise.all([
    fs.readFile(templatePath, "utf8"),
    import(pathToFileURL(serverEntryPath).href),
  ]);

  // Dynamic import of routes from source (ESM)
  const { HELP_ROUTE, OPENING_ROUTES, VARIANT_ROUTES } = await import(
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

  // 2. Help page
  const helpDir = path.join(distDir, HELP_ROUTE.slug);
  await fs.mkdir(helpDir, { recursive: true });
  const helpHtml = injectMeta(rendered, {
    title: HELP_ROUTE.title,
    description: HELP_ROUTE.description,
    canonical: `${BASE_URL}/${HELP_ROUTE.slug}`,
  });
  await fs.writeFile(path.join(helpDir, "index.html"), helpHtml, "utf8");
  process.stdout.write(`Prerendered /${HELP_ROUTE.slug}\n`);

  // 3. Opening pages
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

  // 4. Variant pages
  for (const route of VARIANT_ROUTES) {
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

  // 5. Generate sitemap.xml from route definitions
  const sitemapEntries = [
    `  <url>\n    <loc>${BASE_URL}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`,
    `  <url>\n    <loc>${BASE_URL}/${HELP_ROUTE.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>`,
    ...OPENING_ROUTES.map(
      (r) =>
        `  <url>\n    <loc>${BASE_URL}/${r.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    ),
    ...VARIANT_ROUTES.map(
      (r) =>
        `  <url>\n    <loc>${BASE_URL}/${r.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
    ),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join("\n")}\n</urlset>\n`;
  await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
  process.stdout.write(`Generated sitemap.xml (${2 + OPENING_ROUTES.length + VARIANT_ROUTES.length} URLs)\n`);
}

run().catch((err) => {
  process.stderr.write(`${err.stack || err.message}\n`);
  process.exit(1);
});
