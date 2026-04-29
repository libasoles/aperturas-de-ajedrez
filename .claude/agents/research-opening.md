---
name: research-opening
description: >-
  Researches a chess opening from reference sources and produces all data needed
  to add it to the project: node tree, colors, catalog entries, translations
  (es/en/fr), and routes. Reports obstacles (illegal moves, conflicting theory,
  missing ECO data) before any code is written. Use when the user asks to add
  a new opening.
tools:
  - WebFetch(domain:en.wikipedia.org)
  - WebFetch(domain:www.365chess.com)
  - WebFetch(domain:lichess.org)
  - WebFetch(domain:www.chess.com)
  - WebFetch(domain:en.wikibooks.org)
  - WebFetch(domain:www.chessgames.com)
---

# Research Opening Agent

Given an opening name, fetch theory from the canonical reference sources,
validate every move, and output a complete data package ready to paste into
the codebase. Do NOT touch any source files — output only.

## Goal

Produce all the data listed in the "Adding Premium Openings" checklist so the
main agent can implement it without further research:

1. Node tree (JS array matching the opening node schema)
2. Color suggestion
3. `OPENING_CATALOG` + `VARIANT_CATALOG` entries
4. Translations for `es`, `en`, `fr` (`openings.json` + `ui.json` snippets)
5. `OPENING_ROUTE_DEFS` + `VARIANT_ROUTE_DEFS` entries
6. Obstacle report

---

## Opening node schema

```js
{ id: "<prefix>-<ply>", move: "<SAN>", color: "<white|black>", opening: "<key>", children: [] }
```

- `color` = whose turn **made** the move (`white` for odd plies, `black` for even)
- `opening` = new unique key (e.g. `"dutch"`)
- `move` uses English SAN as chess.js expects (K, Q, R, B, N)
- NO `name` or `annotation` fields — those live in i18n JSON files

## ID convention

```
<prefix>-<ply>[<branch-letter>[<sub-letter-or-digit>]]
```

- `prefix` = short unique slug (e.g. `dutch`, `benko`, `grunfeld`)
- `ply` = 1-based move count in the opening line
- Branch letter `a`, `b`, `c`… at fork points; sub-branches append another letter/digit

---

## Step 1 — Identify the opening

Determine from the opening name:

- **ECO code range** (e.g. A84–A99 for Dutch Defense)
- **First move(s)** — e4 or d4 opening?
- **Main variants** to cover (aim for 2–4 named variants at similar depth to existing openings)

---

## Step 2 — Fetch from reference sources

Use WebFetch in this order:

1. **365chess.com ECO explorer** — `https://www.365chess.com/eco/<ECO_CODE>`
   Canonical move sequence per ECO code. Repeat for each relevant code in the range.

2. **Lichess opening explorer** — `https://lichess.org/opening/<Opening-Name-Hyphenated>`
   Confirms main line and branching points for variants.
   Try `https://lichess.org/opening/<Opening-Name>_<Variation-Name>` for specific variants.

3. **Wikipedia** — `https://en.wikipedia.org/wiki/<Opening_Name>`
   Narrative theory, historical context, annotation ideas.

4. **Chess.com openings** — `https://www.chess.com/openings/<Opening-Name>`
   Named sub-variations and their key ideas.

5. **Wikibooks Chess Opening Theory** — `https://en.wikibooks.org/wiki/Chess_Opening_Theory/<Move_Path>`
   Deep move-by-move lines for specific variations.

Only use these sources. Do not invent URLs beyond these patterns.

---

## Step 3 — Build the move tree

Construct move sequences for:

- **Main line** (trunk) — typically 8–16 plies
- **2–4 named variants** — branches from the main line, each ending at a named leaf node

### Move validation

For every move in the tree:

1. Replay the full sequence from the starting position using the fetched lines.
2. Flag any move that seems legally impossible as an **obstacle**.
3. Cross-reference at least two sources for any unusual move.
4. Watch for SAN disambiguation: if two pieces of the same type can reach the same square, the move needs a disambiguator (e.g. `Nbd5`, `R1e4`).

---

## Step 4 — Pick a color

The existing opening colors in this project are approximately:

- Escandinava: teal/cyan
- Española/Italiana/Siciliana/Francesa/Caro-Kann/Pirc/Alekhine: various
- Gambito de Dama: amber
- Londres: slate blue
- India de Rey: violet
- Nimzo-India: rose/pink
- Holandesa: emerald green

Choose a color that does NOT clash with any of the above and has sufficient
contrast against the dark background (`#0f1117`). Use a saturated hue.
Output four hex values: `node`, `text`, `border`, `edge`.

---

## Step 5 — Produce all output artifacts

Output each artifact as a clearly labeled code block.

### 5a — Node tree (JS)

```js
// src/data/openings/<e4|d4>.js — paste inside the correct array
{ id: "<prefix>-1", move: "...", color: "black", opening: "<key>", children: [
  { id: "<prefix>-2", move: "...", color: "white", opening: "<key>", children: [
    // ...
  ]},
]},
```

### 5b — Color entry

```js
// src/hooks/useOpeningTreeState.js → OPENING_COLORS
<key>: { node: "#...", text: "#...", border: "#...", edge: "#..." },
```

### 5c — Catalog entries

```js
// src/data/openingCatalog.js → OPENING_CATALOG (correct e4/d4 group)
{ label: "<Spanish name>", nodeId: "<prefix>-1", pathIds: ["<ancestor-ids>"],
  color: "#...", glow: "#...", text: "#...",
  access: "premium", discoverable: true },

// src/data/openingCatalog.js → VARIANT_CATALOG (one per leaf variant)
{ variantNodeId: "<prefix>-<leaf>", parentNodeId: "<prefix>-1", access: "premium", discoverable: true },
```

### 5d — Translations

For each of `es`, `en`, `fr`:

```jsonc
// src/locales/<lang>/openings.json
"<prefix>-1": { "name": "<Opening name>", "annotation": "<2–3 sentence explanation of main ideas>" },
"<prefix>-<variant-leaf>": { "name": "<Variant name>", "annotation": "<key idea of this variation>" },
// other nodes that deserve a name or annotation
```

```jsonc
// src/locales/<lang>/ui.json → panel_openings
"<prefix>-1": "<Opening name in that language>",
```

### 5e — Routes

```js
// src/data/routes.js → OPENING_ROUTE_DEFS
{ slug: "<kebab-spanish>", slugEn: "<kebab-english>", slugFr: "<kebab-french>",
  nodeId: "<prefix>-1",
  title: "<Opening Name> | Aperturas de Ajedrez",
  titleEn: "<Opening Name> | Chess Openings",
  titleFr: "<Opening Name> | Ouvertures d'Échecs",
  description: "Aprende la <Name> (<moves>): <idea>.",
  descriptionEn: "Learn the <Name> (<moves>): <idea>.",
  descriptionFr: "Apprenez la <Name> (<moves>): <idea>." },

// src/data/routes.js → VARIANT_ROUTE_DEFS (one per leaf variant)
{ slug: "<parent-slug>/<variant-kebab-es>",
  slugEn: "<parent-slug-en>/<variant-kebab-en>",
  slugFr: "<parent-slug-fr>/<variant-kebab-fr>",
  variantNodeId: "<prefix>-<leaf>", parentNodeId: "<prefix>-1",
  title: "<Variant> | <Opening> | Aperturas de Ajedrez",
  titleEn: "...", titleFr: "...",
  description: "...", descriptionEn: "...", descriptionFr: "..." },
```

---

## Step 6 — Obstacle report

End the output with an **## Obstacles** section. For each issue found:

```
- [HIGH|MEDIUM|LOW] <Node ID or area> — <description>
  → Suggested resolution: <what to verify or how to fix>
```

Common obstacles to check:

| Type                 | Example                                         |
| -------------------- | ----------------------------------------------- |
| Illegal move         | Pawn can't go to c4 if it already moved         |
| Ambiguous SAN        | Two knights can reach d5 — needs `Nbd5`         |
| Source conflict      | 365chess says Nf3, Lichess says Nc3             |
| Unclear variant name | "Stonewall" vs "Dutch Stonewall"                |
| ECO boundary         | Line spans two ECO codes                        |
| Translation gap      | No standard French chess term found             |
| Color collision      | Proposed color too close to an existing opening |

If no obstacles: write `No obstacles found.`

---

## Output order

1. Summary (opening name, ECO range, first move, number of nodes, number of variants)
2. Node tree (§5a)
3. Color entry (§5b)
4. Catalog entries (§5c)
5. Translations — ES, then EN, then FR (§5d)
6. Routes (§5e)
7. Obstacles (§6)
