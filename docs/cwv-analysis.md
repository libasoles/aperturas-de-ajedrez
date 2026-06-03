# Core Web Vitals — Análisis de rendimiento

## Metodología

Los análisis se ejecutaron usando [Lighthouse CLI](https://github.com/GoogleChrome/lighthouse) v13.3.0 contra el servidor de producción local (`npm start`, puerto 3001, build Next.js 16 SSG). Se descarta el servidor de desarrollo (Turbopack) porque sus chunks no están minificados ni tree-shakeados.

```bash
# Desktop (CPU/red sin throttling)
npx lighthouse http://localhost:3001 --preset=desktop --chrome-flags="--headless"

# Mobile (CPU throttling 4×, red 3G simulada — perfil Moto G Power)
npx lighthouse http://localhost:3001 --chrome-flags="--headless"
```

Categorías auditadas: Performance, Accessibility, Best Practices, SEO.

---

## Resultados — 3 de junio de 2026 (run 2)

Build: Next.js 16.2.7 + Turbopack producción. ChessPanel lazy-loaded; chess.js movido fuera del bundle inicial.

### Scores globales

| Categoría | Desktop | Mobile | Δ Desktop | Δ Mobile |
|---|:---:|:---:|:---:|:---:|
| **Performance** | 🟢 100 | 🟢 99 | +1 | +14 |
| **Accessibility** | 🟡 83 | 🟡 83 | -9 | -4 |
| **Best Practices** | 🟡 96 | 🟡 96 | -4 | -4 |
| **SEO** | 🟢 100 | 🟢 100 | = | = |

### Core Web Vitals

| Métrica | Desktop | Mobile | Δ Mobile | Umbral «Good» |
|---|:---:|:---:|:---:|:---:|
| **LCP** | 🟢 0.6s | 🟢 2.1s | −1.61s | < 2.5s |
| **FCP** | 🟢 0.5s | 🟢 1.5s | −0.45s | < 1.8s |
| **CLS** | 🟢 0 | 🟢 0 | = | < 0.1 |
| **TBT** (proxy INP) | 🟢 0ms | 🟢 20ms | −98ms | < 200ms |
| **TTI** | 🟢 0.6s | 🟢 2.1s | −1.61s | < 3.8s |
| **Speed Index** | 🟢 0.8s | 🟢 1.5s | −2.86s | < 3.4s |

> **Hito:** LCP mobile pasó de 🔴 3.71s a 🟢 2.1s. Todos los CWV están en verde en ambos dispositivos.

### Oportunidades de mejora

| Oportunidad | Ahorro estimado (mobile) |
|---|:---:|
| Unused JavaScript (`19k_qypfi59ft`: 39KB, `2zto07r8-lizm`: 30KB) | ~69KB / ~150ms |

### Fallos de accesibilidad

| Fallo | Peso | Descripción |
|---|:---:|---|
| `color-contrast` | 7 | Inline styles con alpha `cc` (80% opacidad) en labels de pills: `#ddd6fecc`, `#a5f3fccc`, `#f5d0fecc`, `#ffe4e6cc` sobre `#0f1117` — ratio insuficiente |
| `landmark-one-main` | 3 | El documento no tiene elemento `<main>`. La app entera se renderiza en `<div>` sin landmark semántico. |

> Comparado con el baseline: se resolvieron `aria-prohibited-attr` y `target-size`. El `color-contrast` persiste con opacidad distinta. `landmark-one-main` es nuevo.

### Best Practices — regresión

| Fallo | Descripción |
|---|---|
| `errors-in-console` | 500 HTTP en `3h44t7pvbs488.css` y `3qqqmxfpjveia.js` — chunks referenciados en el HTML pero no emitidos al disco |

**Causa raíz:** Bug reproducible de Next.js 16 + Turbopack en producción (`next build` + `next start`). El servidor inyecta referencias a chunks que no existen en `.next/static/chunks/`. El app funciona visualmente pese a los errores. No se encontró workaround en esta versión.

---

## Baseline — 3 de junio de 2026 (run 1)

> Referencia original. No editar. Build: Next.js 16 SSG sin ChessPanel lazy-load, chess.js en bundle inicial.

### Scores globales

| Categoría | Desktop | Mobile |
|---|:---:|:---:|
| **Performance** | 🟢 99 | 🟡 85 |
| **Accessibility** | 🟡 92 | 🟡 87 |
| **Best Practices** | 🟢 100 | 🟢 100 |
| **SEO** | 🟢 100 | 🟢 100 |

### Core Web Vitals

| Métrica | Desktop | Mobile | Umbral «Good» |
|---|:---:|:---:|:---:|
| **LCP** | 🟢 0.87s | 🔴 3.71s | < 2.5s |
| **FCP** | 🟢 0.47s | 🟡 1.95s | < 1.8s |
| **CLS** | 🟢 0 | 🟢 0 | < 0.1 |
| **TBT** (proxy INP) | 🟢 0ms | 🟢 118ms | < 200ms |
| **TTI** | 🟢 0.87s | 🔴 3.71s | < 3.8s |
| **Speed Index** | 🟢 1.04s | 🟡 4.36s | < 3.4s |

### Oportunidades de mejora

| Oportunidad | Ahorro estimado (mobile) |
|---|:---:|
| Unused JavaScript (3 chunks Turbopack) | ~390ms |

**Causa raíz del LCP mobile (3.71s):** `AppClient` usa `next/dynamic({ ssr: false })`, impide pintar contenido hasta que React + ReactFlow estén descargados y ejecutados. `chess.js` (33KB) cargado eagerly.

### Fallos de accesibilidad (baseline)

| Fallo | Descripción |
|---|---|
| `aria-prohibited-attr` | `<div aria-label>` sin `role` en barra Stockfish |
| `color-contrast` | `text-neon-cyan/50` — ratio ~2.5:1 |
| `target-size` | Botones menú lateral mobile < 44×44px |
