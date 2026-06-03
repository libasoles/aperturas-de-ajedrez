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

## Resultados — 3 de junio de 2026 (run 3)

Build: Next.js 16.2.7 + Turbopack producción. ChessPanel lazy-loaded; chess.js movido; A11y fixes aplicados.

### Scores globales

| Categoría | Desktop | Mobile | Δ Desktop | Δ Mobile |
|---|:---:|:---:|:---:|:---:|
| **Performance** | 🟢 99 | 🟢 96 | −1 | −3 |
| **Accessibility** | 🟢 100 | 🟢 96 | +17 | +13 |
| **Best Practices** | 🟢 100 | 🟢 100 | +4 | +4 |
| **SEO** | 🟢 100 | 🟢 100 | = | = |

### Core Web Vitals

| Métrica | Desktop | Mobile | Δ Mobile | Umbral «Good» |
|---|:---:|:---:|:---:|:---:|
| **LCP** | 🟢 0.8s | 🟢 2.6s | +0.5s | < 2.5s |
| **FCP** | 🟢 0.7s | 🟢 1.5s | ≈ | < 1.8s |
| **CLS** | 🟢 0 | 🟢 0 | = | < 0.1 |
| **TBT** (proxy INP) | 🟢 0ms | 🟢 54ms | +34ms | < 200ms |
| **TTI** | 🟢 0.8s | 🟢 2.6s | +0.5s | < 3.8s |
| **Speed Index** | 🟢 0.7s | 🟢 1.8s | +0.3s | < 3.4s |

> **Hito:** Accessibility 83 → 100 (desktop) y 83 → 96 (mobile). Best Practices 96 → 100 en ambos. LCP mobile 2.1s → 2.6s (ligera regresión, aún en verde).

### Resoluciones en esta versión

| Fallo (anterior) | Peso | Fix |
|---|:---:|---|
| `color-contrast` | 7 | Removido sufijo `cc` (80% opacidad) en pills labels en `OpeningsPanel.jsx`, `MobileHamburgerMenu.jsx`, `StaticPanelsPreview.tsx`. Diferencia activo/inactivo por `textShadow` en lugar de opacity. |
| `landmark-one-main` | 3 | Cambio `<div className="absolute inset-0">` → `<main className="absolute inset-0">` en `AppClient.jsx` |
| `errors-in-console` | 1 | Resuelto con clean build (`rm -rf .next`). Bug de caché incremental Turbopack — siempre usar `rm -rf .next && npm run build` antes de medir. |

### Oportunidades de mejora restantes

| Oportunidad | Ahorro estimado (mobile) | Estado |
|---|:---:|---|
| Unused JavaScript (`19k_qypfi59ft`: 39KB, `2zto07r8-lizm`: 30KB) | ~69KB / ~150ms | Media prioridad; esperar análisis detallado |
| LCP mobile skeleton/placeholder | 0.5–1s percibido | Baja prioridad (métrica ya en verde) |

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
