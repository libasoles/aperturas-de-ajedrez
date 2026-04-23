# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite, port 5173)
npm run build    # Production build
npm run lint     # ESLint
```

No test suite exists in this project.

## Skills

Skills are in `.claude/skills/`. They are invoked **automatically** — read the skill instructions whenever the trigger conditions apply, without waiting to be asked.

| Skill                                                                | Trigger                                                                         |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [`sync-opening-routes`](.claude/skills/sync-opening-routes/SKILL.md) | Any edit to `src/data/openings.js` that adds a new opening node or variant node |

## Architecture

Single-page React app that renders an interactive chess opening tree using ReactFlow.

### Data flow

```
src/data/openings.js          → Static tree of opening nodes
src/utils/chessPath.js        → findPathToNode / getActivePathIds (tree traversal)
src/components/OpeningTree.jsx → buildGraph() converts the tree to RF nodes/edges; owns all state
src/components/ChessNode.jsx   → Custom ReactFlow node renderer (pills)
src/components/ChessPanel.jsx  → Floating board panel (react-chessboard + chess.js)
src/components/ui/Tooltip.jsx  → Radix UI tooltip wrapper
```

### State ownership (OpeningTree.jsx)

- `expandedIds` — which node IDs are expanded in the tree
- `activeOpening` — which opening filter is active (from the top bar buttons); overrides `expandedIds`
- `selectedNodeId` — which pill the user clicked; drives ChessPanel

`buildGraph()` is a pure function that converts the opening tree + `expandedIds` into ReactFlow `nodes` and `edges` arrays. It is recomputed via `useMemo` on every expand/collapse.

### Critical library details

- **react-chessboard v5**: uses a single `options={{...}}` prop — NOT individual props. Passing `position={fen}` directly is silently ignored.
- **chess.js v1**: SAN notation is always English internally (K, Q, R, B, N). Use `toSpanishSAN()` exported from `ChessNode.jsx` for display.
- **@xyflow/react v12**: Do NOT add a `key` prop to `<ReactFlow>` — it forces a full remount (and fitView) on every state change.
- **Tailwind v4**: configured via `@tailwindcss/vite` plugin, no `tailwind.config.js`.

### Opening node schema

```js
{
  id: string,          // unique, used as ReactFlow node id
  move: string,        // SAN (English) — fed directly to chess.js
  name: string | null, // apertura name shown under the pill
  annotation: string | null, // shown in tooltip on hover
  color: "white" | "black",  // whose turn it is
  opening: string,     // key into OPENING_COLORS (root/scandinavian/spanish/italian/sicilian)
  children: Node[]
}
```

### Accessibility rules

- Minimum font size: **14px** for any readable text.
- All color choices must have sufficient contrast against the dark background (`#0f1117`). Never use opacity hacks (`color60`, `color30`) on readable text — reserve low opacity for decorative/border elements only.

## Adding Premium Openings

Premium gating is controlled by `VITE_HAS_PREMIUM_ACCESS`. Default (unset or `1`) grants full access — all premium content visible. Set to `0` to simulate the locked experience a non-premium user sees.

### Step-by-step checklist

1. **Add nodes to tree** — `src/data/openings/d4.js` or `src/data/openings/e4.js`
   - Node schema: `{ id, move, color, opening, children }` — NO `name` or `annotation` fields (those come from i18n)
   - Keep structure minimal; match existing openings
   - Example ID pattern: `dutch-1`, `dutch-2`, `dutch-5a`, `dutch-7b1`, `dutch-7b2` (number = ply, letter = variant branch)

2. **Add color** — `src/hooks/useOpeningTreeState.js` → `OPENING_COLORS` object
   - Add entry: `opening_key: { node: "#hex", text: "#hex", border: "#hex", edge: "#hex" }`
   - Test contrast against dark bg (`#0f1117`) — use saturated colors (e.g., emerald for Dutch)

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
- ✅ Routing: Visit `/en/dutch-defense`, `/dutch-defense/leningrad` (if bilingual)
- ✅ Premium gating:
  - Without premium env enabled: Entry node visible, children hidden, lock icon on button
  - With `VITE_HAS_PREMIUM_ACCESS=1`: Full tree expanded, all variants accessible
- ✅ Translations: Reload browser; menu labels and pill names appear in the active locale (e.g., "Dutch Defense" in `/en/...`)
- ✅ Colors: Verify contrast and no collision with existing openings

### Example: Dutch Defense (d4)

- **Tree**: 11 nodes (dutch-1 through dutch-11b1)
- **Variants**: 3 (Leningrad, Stonewall, Classical)
- **Colors**: Emerald green (#1c3a2a node, #10b981 border)
- **Translations**: 36 entries (3 languages × 12 concept nodes)
- **Routes**: 4 (1 opening + 3 variants)
