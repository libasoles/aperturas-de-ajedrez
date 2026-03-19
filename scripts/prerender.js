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
const HOME_TITLE_EN = "Chess Opening Tree | Explore Variations";
const HOME_DESC_EN =
  "Explore and compare the main chess openings in an interactive tree. Sicilian, Italian, Ruy López, French, Caro-Kann and Queen's Gambit. Visualize variations with an animated board.";

function injectMeta(template, { title, description, canonical, lang = "es", alternates = [] }) {
  let html = template;

  // Set <html lang="...">
  html = html.replace(/<html([^>]*)lang="[^"]*"/, `<html$1lang="${lang}"`);

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

  // Inject hreflang alternate links before </head>
  if (alternates.length > 0) {
    const altTags = alternates
      .map((a) => `  <link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
      .join("\n");
    html = html.replace("</head>", `${altTags}\n</head>`);
  }

  return html;
}

async function writePageAndDir(filePath, html) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, html, "utf8");
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

  const sitemapUrls = [];

  function addSitemapUrl(loc, priority, changefreq = "monthly") {
    sitemapUrls.push({ loc, priority, changefreq });
  }

  // ── 1. Home page (ES) ──────────────────────────────────────────────────────
  const homeHtml = injectMeta(rendered, {
    title: HOME_TITLE,
    description: HOME_DESC,
    canonical: `${BASE_URL}/`,
    lang: "es",
    alternates: [
      { hreflang: "es", href: `${BASE_URL}/` },
      { hreflang: "en", href: `${BASE_URL}/en/` },
    ],
  });
  await fs.writeFile(path.join(distDir, "index.html"), homeHtml, "utf8");
  process.stdout.write("Prerendered /\n");
  addSitemapUrl(`${BASE_URL}/`, "1.0", "weekly");

  // ── 2. Home page (EN) ──────────────────────────────────────────────────────
  const homeEnHtml = injectMeta(rendered, {
    title: HOME_TITLE_EN,
    description: HOME_DESC_EN,
    canonical: `${BASE_URL}/en/`,
    lang: "en",
    alternates: [
      { hreflang: "es", href: `${BASE_URL}/` },
      { hreflang: "en", href: `${BASE_URL}/en/` },
    ],
  });
  await writePageAndDir(path.join(distDir, "en", "index.html"), homeEnHtml);
  process.stdout.write("Prerendered /en/\n");
  addSitemapUrl(`${BASE_URL}/en/`, "1.0", "weekly");

  // ── 3. Help page (ES + EN) ─────────────────────────────────────────────────
  const helpHtml = injectMeta(rendered, {
    title: HELP_ROUTE.title,
    description: HELP_ROUTE.description,
    canonical: `${BASE_URL}/${HELP_ROUTE.slug}`,
    lang: "es",
    alternates: [
      { hreflang: "es", href: `${BASE_URL}/${HELP_ROUTE.slug}` },
      { hreflang: "en", href: `${BASE_URL}/en/${HELP_ROUTE.slugEn}` },
    ],
  });
  await writePageAndDir(path.join(distDir, HELP_ROUTE.slug, "index.html"), helpHtml);
  process.stdout.write(`Prerendered /${HELP_ROUTE.slug}\n`);
  addSitemapUrl(`${BASE_URL}/${HELP_ROUTE.slug}`, "0.5");

  const helpEnHtml = injectMeta(rendered, {
    title: HELP_ROUTE.titleEn,
    description: HELP_ROUTE.descriptionEn,
    canonical: `${BASE_URL}/en/${HELP_ROUTE.slugEn}`,
    lang: "en",
    alternates: [
      { hreflang: "es", href: `${BASE_URL}/${HELP_ROUTE.slug}` },
      { hreflang: "en", href: `${BASE_URL}/en/${HELP_ROUTE.slugEn}` },
    ],
  });
  await writePageAndDir(path.join(distDir, "en", HELP_ROUTE.slugEn, "index.html"), helpEnHtml);
  process.stdout.write(`Prerendered /en/${HELP_ROUTE.slugEn}\n`);
  addSitemapUrl(`${BASE_URL}/en/${HELP_ROUTE.slugEn}`, "0.5");

  // ── 4. Opening pages (ES + EN) ─────────────────────────────────────────────
  for (const route of OPENING_ROUTES) {
    const pageHtml = injectMeta(rendered, {
      title: route.title,
      description: route.description,
      canonical: `${BASE_URL}/${route.slug}`,
      lang: "es",
      alternates: [
        { hreflang: "es", href: `${BASE_URL}/${route.slug}` },
        { hreflang: "en", href: `${BASE_URL}/en/${route.slugEn}` },
      ],
    });
    await writePageAndDir(path.join(distDir, route.slug, "index.html"), pageHtml);
    process.stdout.write(`Prerendered /${route.slug}\n`);
    addSitemapUrl(`${BASE_URL}/${route.slug}`, "0.8");

    const pageEnHtml = injectMeta(rendered, {
      title: route.titleEn,
      description: route.descriptionEn,
      canonical: `${BASE_URL}/en/${route.slugEn}`,
      lang: "en",
      alternates: [
        { hreflang: "es", href: `${BASE_URL}/${route.slug}` },
        { hreflang: "en", href: `${BASE_URL}/en/${route.slugEn}` },
      ],
    });
    await writePageAndDir(path.join(distDir, "en", route.slugEn, "index.html"), pageEnHtml);
    process.stdout.write(`Prerendered /en/${route.slugEn}\n`);
    addSitemapUrl(`${BASE_URL}/en/${route.slugEn}`, "0.8");
  }

  // ── 5. Variant pages (ES + EN) ─────────────────────────────────────────────
  for (const route of VARIANT_ROUTES) {
    const pageHtml = injectMeta(rendered, {
      title: route.title,
      description: route.description,
      canonical: `${BASE_URL}/${route.slug}`,
      lang: "es",
      alternates: [
        { hreflang: "es", href: `${BASE_URL}/${route.slug}` },
        { hreflang: "en", href: `${BASE_URL}/en/${route.slugEn}` },
      ],
    });
    await writePageAndDir(path.join(distDir, route.slug, "index.html"), pageHtml);
    process.stdout.write(`Prerendered /${route.slug}\n`);
    addSitemapUrl(`${BASE_URL}/${route.slug}`, "0.6");

    const pageEnHtml = injectMeta(rendered, {
      title: route.titleEn,
      description: route.descriptionEn,
      canonical: `${BASE_URL}/en/${route.slugEn}`,
      lang: "en",
      alternates: [
        { hreflang: "es", href: `${BASE_URL}/${route.slug}` },
        { hreflang: "en", href: `${BASE_URL}/en/${route.slugEn}` },
      ],
    });
    await writePageAndDir(path.join(distDir, "en", route.slugEn, "index.html"), pageEnHtml);
    process.stdout.write(`Prerendered /en/${route.slugEn}\n`);
    addSitemapUrl(`${BASE_URL}/en/${route.slugEn}`, "0.6");
  }

  // ── 6. Sitemap ─────────────────────────────────────────────────────────────
  const sitemapEntries = sitemapUrls.map(
    ({ loc, priority, changefreq }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  );
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join("\n")}\n</urlset>\n`;
  await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
  process.stdout.write(`Generated sitemap.xml (${sitemapUrls.length} URLs)\n`);
}

run().catch((err) => {
  process.stderr.write(`${err.stack || err.message}\n`);
  process.exit(1);
});
