---
name: sync-opening-routes
description: >-
  Synchronize route definitions when openings or variants are added to openings.js.
  Use when: adding a new opening, adding a new variant, syncing routes, updating routes.js,
  nueva apertura, nueva variante, agregar ruta, sincronizar rutas, openings.js changed.
user-invocable: true
argument-hint: "Describe what was added to openings.js (opening name, node IDs, etc.)"
---

# Sync Opening Routes

> **This project uses Next.js 16 App Router SSG.** Pages are generated via `generateStaticParams` in `app/(es)/[...slug]/page.tsx`, `app/en/[...slug]/page.tsx`, and `app/fr/[...slug]/page.tsx`. There is no `scripts/prerender.js`, no `dist/` output folder, and no Vite.

Automatically creates route entries in `src/data/routes.js` (and catalog/i18n entries) whenever new openings or variants are added to `src/data/openings.js`.

## When to use

- A new top-level opening was added to `openings.js`
- A new variant branch was added inside an existing opening
- You want to audit which openings/variants are missing routes

## Files involved

| File | Role |
|------|------|
| `src/data/openings.js` | Source of truth — the full opening tree |
| `src/data/routes.js` | Route definitions for SSG pages (opening + variant routes) |
| `src/data/openingCatalog.js` | `OPENING_CATALOG` + `VARIANT_CATALOG` — opening buttons and variant registry |
| `src/locales/{es,en,fr}/ui.json` | `panel_openings` key — labels shown in the opening filter panel |
| `app/(es)/[...slug]/page.tsx` | SSG: reads `OPENING_ROUTES` + `VARIANT_ROUTES` via `generateStaticParams` |
| `app/en/[...slug]/page.tsx` | Same for `/en/` locale |
| `app/fr/[...slug]/page.tsx` | Same for `/fr/` locale |

## Procedure

### Step 1 — Identify what was added

Read `src/data/openings.js` and identify the new nodes. Collect:
- **Node ID** (`id` field) — e.g. `"dutch-1"`
- **Opening name** — from the `name` field or the user's description
- **Parent opening** — which top-level opening this belongs to (the `opening` field value)
- **Move sequence** — the path of SAN moves from root to this node
- Whether this is a **new top-level opening** or a **variant within an existing opening**

### Step 2 — Validate tree structure

**Critical**: Before proceeding, validate that `src/data/openings.js` has no duplicate sibling moves:

- For each parent node, all children must have unique `move` values
- If two openings share the same initial move sequence (e.g., both respond to d4 with d5), they must nest under the **same shared node**, not as separate siblings
- **Duplicate sibling moves are invalid** — they break the tree invariant and cause rendering errors

**Example of WRONG**:
```
d4
├── d5 [Gambito de Dama]
├── d5 [Sistema Colle] ← INVALID: same move as sibling
```

**Example of CORRECT**:
```
d4
└── d5 [shared node]
    ├── c4 [Gambito de Dama]
    ├── Nf3 [Sistema Colle]
    └── Bd3 [Sistema Londres]
```

If duplicates are found, flag them as a blocker and ask the developer to fix the tree structure before syncing routes.

### Step 3 — Check existing routes

Read `src/data/routes.js` and compare against the new nodes. Check:
- Is there already an `OPENING_ROUTES` entry with this `nodeId`?
- Is there already a `VARIANT_ROUTES` entry with this `variantNodeId`?
- Skip any nodes that already have routes.

### Step 3A — Add opening route (if new top-level opening)

Add an entry to `OPENING_ROUTES` in `src/data/routes.js` following this pattern:

```js
{
  slug: "<kebab-case-spanish-name>",
  nodeId: "<node-id>",
  title: "<Opening Name> | Aperturas de Ajedrez",
  description: "Aprende/Estudia/Explora/Domina/Analiza la <Opening Name> (<move sequence>): <brief description of main ideas> en un árbol interactivo con tablero animado.",
},
```

See `references/route-patterns.md` for slug conventions and description patterns.

### Step 3B — Add variant route (if new variant)

Add an entry to `VARIANT_ROUTES` in `src/data/routes.js` following this pattern:

```js
{
  slug: "<parent-opening-slug>/<variant-kebab-case>",
  variantNodeId: "<variant-node-id>",
  parentNodeId: "<parent-opening-node-id>",
  title: "<Variant Name> | <Parent Opening Name> | Aperturas de Ajedrez",
  description: "Aprende/Estudia/Explora/Domina/Analiza la <Variant Name> de la <Opening> (<move sequence>): <brief description> en un árbol interactivo.",
},
```

Place variant entries under the correct `// ── <Opening> ──` comment section. If the section doesn't exist, create it.

### Step 4 — Update README.md (only for new top-level openings)

Find the prose line in `README.md` that lists the opening filter buttons (contains "Escandinava, Española, Italiana…") and append the new opening name to the list.

Example — if adding "Holandesa":
```
**Before:** …Gambito de Dama, Londres, India de Rey, Nimzo-India…
**After:**  …Gambito de Dama, Londres, India de Rey, Nimzo-India, Holandesa…
```

### Step 5 — Register in catalog + i18n (only for new top-level openings)

If this is a brand-new opening (not a variant), add entries to two files:

**`src/data/openingCatalog.js`** — append to `OPENING_CATALOG` in the correct group (`e4` or `d4`):

```js
{ label: "<Short Spanish Name>", nodeId: "<node-id>",
  pathIds: [<every ancestor ID from root up to, but NOT including, the new node>],
  color: "<unique hex color>", glow: "<lighter variant>", text: "<lighter variant for text>",
  access: "free" | "premium", discoverable: true }
```

Also append to `VARIANT_CATALOG` one entry per leaf variant:

```js
{ variantNodeId: "<variant-node-id>", parentNodeId: "<node-id>", access: "free" | "premium", discoverable: true }
```

**`src/locales/{es,en,fr}/ui.json`** — add the opening label under `panel_openings` in all three locale files:

```json
"panel_openings": {
  "<node-id>": "<Opening Name in that language>"
}
```

**pathIds** must list every ancestor ID from the tree root down to the node just before the new opening. Example: for `ital-1` (path: root → e4 → span-1 → span-2 → span-3 → ital-1) the value is `["e4", "span-1", "span-2", "span-3"]`. Use `src/data/openings.js` to trace the exact path.

### Step 6 — Verify

1. Run `npm run build` — Next.js must generate all pages without errors (326+ static pages expected).
2. The sitemaps are regenerated automatically at build time by `app/(es)/sitemap.ts` and `app/en/sitemap.ts` — no manual edit needed.
3. Check that visiting the new URL in the browser correctly selects the opening/variant.

## Current opening → nodeId mapping

| Opening | nodeId | slug |
|---------|--------|------|
| Escandinava | scan-1 | defensa-escandinava |
| Ruy López | span-4 | ruy-lopez |
| Italiana | ital-1 | apertura-italiana |
| Siciliana | sic-1 | defensa-siciliana |
| Francesa | fr-1 | defensa-francesa |
| Caro-Kann | ck-1 | defensa-caro-kann |
| Pirc | pirc-1 | defensa-pirc |
| Alekhine | al-1 | defensa-alekhine |
| Gambito de Dama | qg-2 | gambito-de-dama |
| Londres | lon-2 | sistema-londres |
| India de Rey | ki-3a | defensa-india-de-rey |
| Nimzo-India | nim-3b | defensa-nimzo-india |
