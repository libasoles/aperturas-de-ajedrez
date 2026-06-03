# Bundle Analysis — Análisis de chunks JS

Análisis ejecutado el **3 de junio de 2026** con `@next/bundle-analyzer` sobre un build webpack (`ANALYZE=true npx next build --webpack`).

> **Nota:** Los IDs de chunk de Turbopack (`2zto07r8`, `2jx1kb770b2zt`, `19k_qypfi59ft`) citados en `cwv-analysis.md` no son válidos en webpack. Cada bundler genera su propio grafo de chunks. El análisis de webpack es la referencia más confiable para producción Netlify/Next.js.

---

## Cómo reproducir

```bash
npm install --save-dev @next/bundle-analyzer
# Añadir temporalmente en next.config.ts:
#   import withBundleAnalyzer from '@next/bundle-analyzer'
#   export default process.env.ANALYZE === 'true'
#     ? withBundleAnalyzer({ enabled: true })(config) : config
ANALYZE=true npx next build --webpack
# Abre .next/analyze/client.html en el navegador
```

---

## Mapa de chunks del bundle cliente

Ordenados por `parsedSize` (tamaño después de minificación, antes de gzip).

| Chunk | Parsed | Gzip | Contenido principal |
|---|---:|---:|---|
| `56` | 295 KB | 41 KB | `e4.js` (173KB stat) + `d4.js` (66KB) + `nf3.js` (19KB) + `routes.js` (14KB) + `useOpeningTreeState` |
| `727` | 221 KB | 75 KB | `@xyflow/system` 49KB + `i18next` 42KB + `chess.js` 33KB + `@floating-ui` 16KB + `react-ga4` 5KB + `@radix-ui/tooltip` 5KB |
| `794` | 216 KB | 59 KB | Next.js internals: segment-cache, router-reducer, PPR, React client |
| `4bd1b696` | 195 KB | 61 KB | `react-dom-client` (compilado por Next.js) |
| `framework` | 185 KB | 58 KB | `react-dom`, `react`, `scheduler` |
| `main` | 133 KB | 38 KB | Next.js router, route-loader, path-to-regexp |
| `163` | 118 KB | 31 KB | Locales: `es/openings.json` 36KB + `fr/openings.json` 37KB + `en/openings.json` 34KB + `ui.json` ×3 |
| `38170ce7` | 70 KB | 20 KB | `react-chessboard` — lazy ✓ (solo ChessPanel) |
| `1a258343` | 69 KB | 20 KB | `@xyflow/react` — lazy ✓ (solo OpeningTree/MobileOpeningTree) |
| `422` | 23 KB | 8 KB | `@radix-ui/react-dialog`, `react-remove-scroll`, aria-hidden |

---

## Problema encontrado y resuelto: chess.js en bundle eagerly cargado

### Causa raíz

`chess.js` (33KB minificado) aparecía en el chunk `727`, que se carga en la primera visita junto con `i18next` y la UI. La cadena de imports era:

```
AppClient.jsx (cliente, carga inmediata)
  └── useOpeningTreeState.js
        └── chessPath.js  ← import { Chess } from 'chess.js' a nivel de módulo
              └── chess.js — arrastrado eagerly
```

`chessPath.js` importaba `Chess` únicamente para la función `fenAfterMoves`. Pero `fenAfterMoves` **no se usa en la app** (solo en tests: `chessPath.test.js` y `ChessPanel.test.jsx`). El resto de funciones exportadas (`findPathToNode`, `getActivePathIds`, `toSpanishSAN`, `toFrenchSAN`, etc.) son puras y no necesitan chess.js.

### Fix aplicado

- Creado `src/utils/fenAfterMoves.js` con la función `fenAfterMoves` (incluye el import de chess.js)
- Eliminado `import { Chess } from 'chess.js'` y la función `fenAfterMoves` de `src/utils/chessPath.js`
- Actualizados `src/utils/chessPath.test.js` y `src/components/ChessPanel.test.jsx` para importar desde `fenAfterMoves.js`

**Resultado:** `chess.js` solo se carga cuando el usuario hace click en un nodo y se monta `ChessPanel` (ya dinámico con `next/dynamic({ ssr: false })`).

---

## Situación actual de los chunks grandes

### Chunk 56 — Datos del árbol (295KB / 41KB gzip)

**Esperado.** El árbol completo de aperturas (`e4.js`, `d4.js`, `nf3.js`) debe estar en cliente para que ReactFlow pueda renderizarlo. El grueso es el JSON de nodos, no código ejecutable: el ratio stat/gzip es muy favorable (295KB → 41KB).

Oportunidad futura: pasar el subárbol activo como prop desde el Server Component y cargar el árbol completo lazy. Complejidad alta.

### Chunk 727 — Librería mixta (221KB / 75KB gzip)

Después del fix, chess.js ya no debería estar aquí. Los módulos restantes:

- **`@xyflow/system` (49KB):** dependencia interna de `@xyflow/react`. Aunque `OpeningTree` es dinámico, webpack extrae módulos compartidos; `@xyflow/system` puede estar siendo referenciado en algún lugar del bundle principal. Investigar si hay algún import de `@xyflow` fuera de los componentes lazy.
- **`i18next` (42KB):** necesario en la carga inicial (`AppClient` llama `initI18nSync` en `useState`). No hay quick win aquí sin refactorizar i18n.
- **`@floating-ui` (16KB):** usado por Radix UI Tooltip, que está en la UI principal.

### Chunk 163 — Traducciones (118KB / 31KB gzip)

**Oportunidad de mejora media.** Las tres locales completas (`es` + `en` + `fr`) se cargan siempre, aunque el usuario solo usa una. Esto son ~100KB stat extra (31KB gzip total).

Potencial ahorro: ~20KB gzip (las dos locales no activas) si se carga solo la locale activa en la primera visita.

Implementación: en `AppClient.jsx` hacer import dinámico basado en `locale` en lugar de importar los tres JSON estáticamente en `i18n.js`.

### Chunks lazy correctos

| Chunk | Módulo | Cargado cuando |
|---|---|---|
| `38170ce7` (70KB) | `react-chessboard` | Usuario hace click en un nodo → ChessPanel |
| `1a258343` (69KB) | `@xyflow/react` | AppClient monta → OpeningTree / MobileOpeningTree |

---

## Seguridad: npm audit (3 junio 2026)

Ejecutado `npm audit`. Ninguna vulnerabilidad afecta al bundle de producción.

| Severidad | Paquete | Nota |
|---|---|---|
| CRITICAL | `vitest` | Solo dev — UI server de Vitest, no llega a producción |
| HIGH | `netlify-cli` | CLI de deploy, no incluido en bundle |
| HIGH | `flatted` | Prototype Pollution — dependencia de netlify-cli |
| HIGH | `tmp` | Path Traversal — dependencia de netlify-cli |
| MODERATE | `next` / `postcss` | XSS en CSS stringify — bajo riesgo en SSG |
| MODERATE | `vite` / `esbuild` | Dev server, no producción |
| MODERATE | `uuid`, `qs`, `ws` | Dependencias indirectas de netlify-cli |

Los glitches visuales en Chrome reportados no tienen relación con estos CVEs — son bugs de rendering (CSS transforms, Canvas/WebGL en react-chessboard, o Radix UI portals).

---

## Pendiente

- [ ] **Locales lazy por locale:** cargar solo `{locale}/openings.json` + `{locale}/ui.json` en la primera visita (~20KB gzip ahorro)
- [ ] **Investigar `@xyflow/system` en chunk eagerly:** confirmar si sigue en el bundle principal tras el fix de chess.js, y si hay algún import directo de `@xyflow/system` fuera de OpeningTree/MobileOpeningTree
- [ ] **Re-ejecutar Lighthouse** después de los fixes aplicados (ChessPanel lazy + chess.js fix) para medir el impacto real en LCP mobile
