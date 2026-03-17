# Route Naming Patterns

Reference for slug, title, and description conventions used in `src/data/routes.js`.

## Slug conventions

### Opening slugs
- Use **kebab-case Spanish names**: `defensa-siciliana`, `gambito-de-dama`
- Prefix with the type: `defensa-`, `apertura-`, `gambito-de-`, `sistema-`
- Exceptions: `ruy-lopez` (proper name, no prefix)

### Variant slugs
- Format: `<parent-opening-slug>/<variant-kebab-case>`
- Examples:
  - `defensa-siciliana/najdorf`
  - `ruy-lopez/defensa-morphy`
  - `defensa-caro-kann/clasica`
  - `apertura-italiana/fried-liver`
- Variant portion uses short descriptive name, no prefix needed

## Title patterns

### Openings
```
<Opening Name> | Aperturas de Ajedrez
```
Examples:
- `Defensa Siciliana | Aperturas de Ajedrez`
- `Gambito de Dama | Aperturas de Ajedrez`
- `Ruy López (Apertura Española) | Aperturas de Ajedrez`

### Variants
```
<Variant Name> | <Parent Opening Name> | Aperturas de Ajedrez
```
Examples:
- `Variante Najdorf | Siciliana | Aperturas de Ajedrez`
- `Defensa Berlín | Ruy López | Aperturas de Ajedrez`
- `Gambito de Dama Aceptado | Aperturas de Ajedrez` (when variant IS the full name)

## Description patterns

- Start with a varied verb: `Aprende`, `Estudia`, `Explora`, `Domina`, `Analiza`, `Descubre`
- Include the move sequence in parentheses: `(1.e4 d5 2.exd5 Dxd5)`
- SAN notation in descriptions uses **Spanish piece letters**: Rey=R, Dama=D, Torre=T, Alfil=A, Caballo=C
- End with a hook about interactive features: `en un árbol interactivo con tablero animado` or `en un árbol interactivo`
- Keep descriptions between 120–180 characters for optimal SEO

### Opening description template
```
<Verb> la <Opening Name> (<moves>): <main variants or ideas> en un árbol interactivo con tablero animado.
```

### Variant description template
```
<Verb> la <Variant Name> de la <Opening> (<moves>): <description of character/ideas> en un árbol interactivo.
```

## parentNodeId lookup (for variant routes)

The `parentNodeId` is always the top-level opening's `nodeId`:

| Opening | parentNodeId |
|---------|-------------|
| Escandinava | scan-1 |
| Ruy López | span-4 |
| Italiana | ital-1 |
| Siciliana | sic-1 |
| Francesa | fr-1 |
| Caro-Kann | ck-1 |
| Pirc | pirc-1 |
| Alekhine | al-1 |
| Gambito de Dama | qg-2 |
| Londres | lon-2 |
| India de Rey | ki-3a |
| Nimzo-India | nim-3b |

## Comment sections in VARIANT_ROUTES

Each opening has a labeled comment section. Place new variants under the correct one:
```js
// ── Escandinava ──────────────────────────────────────────
// ── Ruy López ────────────────────────────────────────────
// ── Italiana ─────────────────────────────────────────────
// ── Siciliana ────────────────────────────────────────────
// ── Francesa ─────────────────────────────────────────────
// ── Caro-Kann ────────────────────────────────────────────
// ── Pirc ─────────────────────────────────────────────────
// ── Alekhine ─────────────────────────────────────────────
// ── Gambito de Dama ──────────────────────────────────────
// ── Londres ──────────────────────────────────────────────
// ── India de Rey ─────────────────────────────────────────
// ── Nimzo-India ──────────────────────────────────────────
```

For a new opening, create a new section with the same format of dashes.
