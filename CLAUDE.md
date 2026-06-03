# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js, port 3000)
npm run build    # Production build (next build)
npm run start    # Serve production build locally
npm run lint     # ESLint
```

No test suite exists in this project.

## Skills

Skills are in `.claude/skills/`. They are invoked **automatically** — read the skill instructions whenever the trigger conditions apply, without waiting to be asked.

| Skill                                                                | Trigger                                                                         |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [`sync-opening-routes`](.claude/skills/sync-opening-routes/SKILL.md) | Any edit to `src/data/openings.js` that adds a new opening node or variant node |
| [`ingest-player`](.claude/skills/ingest-player/SKILL.md)             | Ingesting a player's games into Neo4j, downloading PGN, cargar partidas, ingestar jugador |

## Agents (on demand)

Agents are in `.claude/agents/`. They are **not** invoked automatically — spawn them explicitly when needed.

| Agent                                                    | When to use                                                                                                                                                                              |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`research-opening`](.claude/agents/research-opening.md) | Before adding any new opening — fetches theory, validates moves, produces all data artifacts (node tree, colors, catalog, translations, routes). Output only; does not touch source files. |
| [`lookup-player-source`](.claude/agents/lookup-player-source.md) | Spawned by `ingest-player` when PGNMentor returns 404 — finds correct name or Lichess fallback URL. Output only; does not touch source files. |
| [`a11y-specialist`](.claude/agents/a11y-specialist.md) | When you need an accessibility audit/review (WCAG 2.2 AA), including keyboard navigation, focus management, contrast, semantics/ARIA, and screen reader usability. Output only by default. |

## Architecture

> **Tech stack: Next.js 16 App Router SSG — NOT Vite.**
> There is no `vite.config.js`, `index.html`, `src/entry-client.jsx`, `src/entry-server.jsx`, or `scripts/prerender.js`.
> Never create or restore those files. Never revert `package.json` to Vite dependencies.
> The build tool is `next build` (Turbopack in dev); pages are generated via `generateStaticParams`.

Next.js 16 App Router SSG app that renders an interactive chess opening tree using ReactFlow.

### Data flow

```text
src/data/openings.js              → Static tree of opening nodes
src/utils/chessPath.js            → findPathToNode / getActivePathIds (tree traversal)
src/hooks/useOpeningTreeState.js  → All tree state (expanded, selected, active opening/variant)
src/components/AppClient.jsx      → "use client" — initializes i18n, builds config, owns state
src/components/OpeningTree.jsx    → Desktop ReactFlow tree ("use client", dynamic ssr:false)
src/components/MobileOpeningTree.jsx → Mobile ReactFlow tree ("use client", dynamic ssr:false)
src/components/ChessNode.jsx      → Custom ReactFlow node renderer (pills)
src/components/ChessPanel.jsx     → Floating board panel (react-chessboard + chess.js)
src/components/ui/Tooltip.jsx     → Radix UI tooltip wrapper
```

### App Router structure

```text
app/
├── (es)/                        # ES route group (transparent in URL)
│   ├── layout.tsx               # <html lang="es">
│   ├── page.tsx                 # / (static)
│   ├── [...slug]/page.tsx       # /defensa-siciliana, /defensa-siciliana/najdorf, etc. (SSG)
│   ├── players/[player]/        # /players/:name (SSR dynamic)
│   └── sitemap.ts               # /sitemap.xml
├── fr/
│   ├── layout.tsx               # <html lang="fr">
│   ├── page.tsx                 # /fr/ (static)
│   └── [...slug]/page.tsx       # /fr/defense-sicilienne, etc. (SSG)
├── en/
│   ├── layout.tsx               # <html lang="en">
│   ├── page.tsx                 # /en/ (static)
│   ├── [...slug]/page.tsx       # /en/sicilian-defense, etc. (SSG)
│   └── sitemap.ts               # /en/sitemap.xml
src/
├── components/
│   ├── RootLayout.tsx           # Shared <html>/<body> wrapper imported by all layouts
│   ├── AppShell.jsx             # "use client" thin wrapper — dynamic(AppClient, ssr:false)
│   ├── AppClient.jsx            # "use client" — i18n init, tree state, responsive render
│   └── PlayerShell.jsx          # "use client" thin wrapper — dynamic(PlayerExplorerPage, ssr:false)
├── lib/
│   └── routes.ts                # findRouteBySlug(slug, locale) — used by generateMetadata
```

### Client boundary design

Pages are Server Components. They render `<AppShell>` which is a thin `"use client"` wrapper that uses `next/dynamic({ ssr: false })` to load `AppClient`. This two-level wrapper is necessary because:

- `ssr: false` in `next/dynamic` is only allowed inside Client Components
- `react-i18next` calls `React.createContext` at module evaluation time, which fails in the SSR worker when page configuration is being collected

`AppClient` (always client-side) imports all locale JSON resources itself and initializes i18n synchronously via `initI18nSync` inside `useState(() => ...)`.

### State ownership (useOpeningTreeState.js)

- `expandedIds` — which node IDs are expanded in the tree
- `activeOpening` — which opening filter is active (from the top bar buttons); overrides `expandedIds`
- `selectedNodeId` — which pill the user clicked; drives ChessPanel

`buildGraph()` is a pure function that converts the opening tree + `expandedIds` into ReactFlow `nodes` and `edges` arrays. It is recomputed via `useMemo` on every expand/collapse.

The hook accepts an optional second argument `{ pathname, initialNodeId }` — server-provided values used for initial route detection and `?node=` hydration. Falls back to `window.location` reads if not provided (backwards-compatible).

### SEO

- `generateMetadata()` in each `[...slug]/page.tsx` replaces the old `scripts/prerender.js` regex injection.
- Metadata includes `title`, `description`, `robots`, `alternates.canonical`, `alternates.languages` (es/en/fr/x-default), `openGraph`, and `twitter`.
- `src/lib/routes.ts` exports `findRouteBySlug(slug, locale)` — looks up routes from `OPENING_ROUTES`, `VARIANT_ROUTES`, `HELP_ROUTE`, and the London study route.
- Home pages have metadata defined inline in `page.tsx`.

### Critical library details

- **react-chessboard v5**: uses a single `options={{...}}` prop — NOT individual props. Passing `position={fen}` directly is silently ignored.
- **chess.js v1**: SAN notation is always English internally (K, Q, R, B, N). Use `toSpanishSAN()` exported from `ChessNode.jsx` for display.
- **Localized SAN in human text**: `move` values in opening nodes must stay English SAN for chess.js, but any user-facing Spanish/French text (`src/locales/{es,fr}/openings.json`, `ui.json`, routes/descriptions, docs) must use localized piece letters. Spanish: `R` rey, `D` dama, `T` torre, `A` alfil, `C` caballo. French: `R` roi, `D` dame, `T` tour, `F` fou, `C` cavalier. Never leave English `K/Q/R/B/N` piece initials in Spanish or French annotations/names such as `Nf6`, `Bb4`, `Qxd4`, `Re8`; write `Cf6`/`Ab4`/`Dxd4`/`Te8` in Spanish and `Cf6`/`Fb4`/`Dxd4`/`Te8` in French.
- **Stockfish 18**: opening tree nodes include precomputed local evaluations at depth 14 in their `stockfish` field.
- **@xyflow/react v12**: Do NOT add a `key` prop to `<ReactFlow>` — it forces a full remount (and fitView) on every state change.
- **Tailwind v4**: configured via `@tailwindcss/postcss` in `postcss.config.mjs`, no `tailwind.config.js`.
- **Environment variables**: Use `NEXT_PUBLIC_*` prefix (not `VITE_*`). Key vars: `NEXT_PUBLIC_HAS_PREMIUM_ACCESS`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_STOCKFISH_LABEL_THRESHOLD`.
- **london.txt**: The London study source is embedded in `src/data/studies/london-source.js` (a plain JS string export). The original `london.txt?raw` Vite import syntax is incompatible with Turbopack.

### Opening node schema

```js
{
  id: string,          // unique, used as ReactFlow node id
  move: string,        // SAN (English) — fed directly to chess.js
  color: "white" | "black",  // whose turn made this move
  opening: string,     // key into OPENING_COLORS — e.g. "slav", "dutch", "queens_gambit"
  stockfish: { depth: 14, score: number }, // Stockfish 18 eval in pawns from White's perspective
  children: Node[]
  // NO name or annotation — those live in src/locales/*/openings.json
}
```

### Accessibility rules

- Minimum font size: **14px** for any readable text.
- All color choices must have sufficient contrast against the dark background (`#0f1117`). Never use opacity hacks (`color60`, `color30`) on readable text — reserve low opacity for decorative/border elements only.

## Adding Openings

**Free vs premium**: The checklist below applies to both. The only difference is the `access` field:

- `access: "free"` — visible to all users, no lock icon
- `access: "premium"` — entry node visible, children locked unless `NEXT_PUBLIC_HAS_PREMIUM_ACCESS=1`

Premium gating is controlled by `NEXT_PUBLIC_HAS_PREMIUM_ACCESS`. Default (unset or `1`) grants full access. Set to `0` to simulate the locked experience.

**Before writing any code**, run the [`research-opening`](.claude/agents/research-opening.md) agent to fetch theory, validate moves, and produce all data artifacts. Implement only after the research output is reviewed.

### Step-by-step checklist

1. **Add nodes to tree** — `src/data/openings/d4.js` or `src/data/openings/e4.js`
   - Node schema: `{ id, move, color, opening, children }` — NO `name` or `annotation` fields (those come from i18n)
   - Keep structure minimal; match existing openings
   - Example ID pattern: `dutch-1`, `dutch-2`, `dutch-5a`, `dutch-7b1`, `dutch-7b2` (number = ply, letter = variant branch)

2. **Add color** — `src/data/openingColors.js` → `OPENING_COLORS` object
   - Add entry: `opening_key: { node: "#hex", text: "#hex", border: "#hex", edge: "#hex" }`
   - Test contrast against dark bg (`#0f1117`) — use saturated colors (e.g., emerald for Dutch)
   - All existing hues are taken; check existing entries before picking (rose, amber, violet, cyan, teal, red, orange, pink, green, indigo, magenta, blue, lime are all in use)

3. **Register in catalog** — `src/data/openingCatalog.js`
   - **OPENING_CATALOG**: Add to appropriate group (`e4` or `d4`)

   ```js
   { label: "Holandesa", nodeId: "dutch-1", pathIds: ["d4"],
     color: "#10b981", glow: "#10b981", text: "#ecfdf5",
     access: "premium", discoverable: true }
   ```

   - **VARIANT_CATALOG**: Add entries for each leaf variant (e.g., Leningrad, Stonewall, Classical)

   ```js
   { variantNodeId: "dutch-5a", parentNodeId: "dutch-1", access: "premium", discoverable: true }
   ```

4. **Add opening menu labels** — `src/locales/{es,en,fr}/ui.json`
   - Add the opening `nodeId` under `panel_openings` for every supported locale
   - Desktop and mobile opening menus read from `panel_openings`; if the key is missing, they fall back to the Spanish `label` from `OPENING_CATALOG`
   - Keep this in sync with every entry added to `OPENING_CATALOG`
   - Example:

   ```json
   "panel_openings": {
     "dutch-1": "Dutch Defense",
     "mod-1": "Modern Defense"
   }
   ```

5. **Add node translations** — `src/locales/{es,en,fr}/openings.json`
   - For every node with a concept, add `"node-id": { "name": "...", "annotation": "..." }`
   - Entry nodes (e.g., `dutch-1`) MUST have `name` — displayed on pill
   - Other nodes: `name` optional (shows on pill if present), `annotation` optional (tooltip)
   - Use localized SAN in Spanish and French names/annotations. The source `move` remains English SAN, but explanatory text must not say `Nf6`, `Bb4`, `Qxd4`, etc. in Spanish/French.
   - Example:

   ```json
   "dutch-1": { "name": "Dutch Defense", "annotation": "Black weakens e5..." },
   "dutch-5a": { "name": "Leningrad Variation", "annotation": "Aggressive fianchetto..." },
   "dutch-6a": { "annotation": "Knight development" }
   ```

6. **Add routes** — `src/data/routes.js`
   - **OPENING_ROUTE_DEFS**: Main opening route

   ```js
   { slug: "defensa-holandesa", slugEn: "dutch-defense", slugFr: "defense-hollandaise",
     nodeId: "dutch-1", title: "...", titleEn: "...", titleFr: "...",
     description: "...", descriptionEn: "...", descriptionFr: "..." }
   ```

   - **VARIANT_ROUTE_DEFS**: One entry per leaf variant

   ```js
   { slug: "defensa-holandesa/leningrado", slugEn: "dutch-defense/leningrad",
     variantNodeId: "dutch-5a", parentNodeId: "dutch-1", title: "...", ... }
   ```

7. **Update README.md** — Add opening name to the feature list (line ~14)
   - Just append to the comma-separated list of openings

### Validation

- ✅ `npm run lint` — must pass
- ✅ `npm run build` — must pass (all 326+ pages generated without error)
- ✅ Routing: Visit `/en/dutch-defense`, `/dutch-defense/leningrad` (if bilingual)
- ✅ Premium gating:
  - Without premium env enabled: Entry node visible, children hidden, lock icon on button
  - With `NEXT_PUBLIC_HAS_PREMIUM_ACCESS=1`: Full tree expanded, all variants accessible
- ✅ Translations: Reload browser; menu labels and pill names appear in the active locale (e.g., "Dutch Defense" in `/en/...`)
- ✅ Colors: Verify contrast and no collision with existing openings

### Example: Dutch Defense (d4)

- **Tree**: 11 nodes (dutch-1 through dutch-11b1)
- **Variants**: 3 (Leningrad, Stonewall, Classical)
- **Colors**: Emerald green (#1c3a2a node, #10b981 border)
- **Translations**: 36 entries (3 languages × 12 concept nodes)
- **Routes**: 4 (1 opening + 3 variants)

### Example: Slav Defense (d4, nested)

- **Tree**: 30 nodes — reuses existing `qg-3c` subtree (changed `opening` to `"slav"`) + 17 new nodes (Exchange + Classical branches)
- **Variants**: 4 (Exchange `qg-4ce`, Accepted `qg-7c1`, Semi-Slav `qg-7c2`, Classical `qg-7c3`)
- **Colors**: Deep crimson (#1c0810 node, #9f1239 border)
- **pathIds**: `["d4", "qg-1", "qg-2"]` — lists every ancestor up to (not including) the entry node
- **Routes**: 5 (1 opening + 4 variants)

### Nested / promoted openings

When an opening already exists as nodes inside another opening's tree (e.g. Slav inside Queen's Gambit):

1. **Change the `opening` field** on the entry node and all its descendants from the parent key to the new key. This gives them distinct colors.
2. **`pathIds`** in `OPENING_CATALOG` must list every ancestor node ID from the tree root down to (but NOT including) the entry node.
3. **Keep** the existing `VARIANT_CATALOG` entry that links the node to its parent opening — it stays discoverable as a QG variant.
4. **Add new** `VARIANT_CATALOG` entries for the opening's own variants using the new opening as `parentNodeId`.
5. **No node ID changes needed** — reuse the existing IDs (`qg-3c`, etc.) even though the `opening` key changes.

## Uso de subagentes

- Antes de modificar código en archivos desconocidos, usa el subagente **Explore**
  para entender el contexto y dependencias.
- Para tareas que solo requieran lectura/búsqueda en el codebase, delega siempre
  a **Explore** en lugar de leer archivos directamente.
- Para tareas complejas multi-paso, considera usar **general-purpose**.
- Cuando estés en modo plan, usa **Plan** para investigar el codebase.
