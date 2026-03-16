#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, "dist");
const templatePath = path.join(distDir, "index.html");
const serverEntryPath = path.join(distDir, "server", "entry-server.js");
const outPath = path.join(distDir, "index.html");

async function run() {
  const [template, serverEntry] = await Promise.all([
    fs.readFile(templatePath, "utf8"),
    import(pathToFileURL(serverEntryPath).href),
  ]);

  if (typeof serverEntry.render !== "function") {
    throw new Error("dist/server/entry-server.js does not export render().");
  }

  const appHtml = serverEntry.render();
  const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  await fs.writeFile(outPath, html, "utf8");

  process.stdout.write("Prerendered dist/index.html\n");
}

run().catch((err) => {
  process.stderr.write(`${err.stack || err.message}\n`);
  process.exit(1);
});
