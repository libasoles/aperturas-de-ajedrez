# Core Web Vitals — Análisis de rendimiento

## Metodología

El análisis se ejecutó el **3 de junio de 2026** usando [Lighthouse CLI](https://github.com/GoogleChrome/lighthouse) v13.3.0 contra el servidor de producción local (`npm start`, puerto 3001, build Next.js 16 SSG).

Se descartó el servidor de desarrollo (`npm run dev` / Turbopack) porque sus chunks no están minificados ni tree-shakeados, lo que infla artificialmente las métricas de JS. Se realizaron dos pasadas independientes:

```bash
# Desktop (CPU/red sin throttling)
npx lighthouse http://localhost:3001 --preset=desktop --chrome-flags="--headless"

# Mobile (CPU throttling 4×, red 3G simulada — perfil Moto G Power)
npx lighthouse http://localhost:3001 --chrome-flags="--headless"
```

Categorías auditadas: Performance, Accessibility, Best Practices, SEO.

---

## Scores globales

| Categoría | Desktop | Mobile |
|---|:---:|:---:|
| **Performance** | 🟢 99 | 🟡 85 |
| **Accessibility** | 🟡 92 | 🟡 87 |
| **Best Practices** | 🟢 100 | 🟢 100 |
| **SEO** | 🟢 100 | 🟢 100 |

---

## Core Web Vitals

| Métrica | Desktop | Mobile | Umbral «Good» |
|---|:---:|:---:|:---:|
| **LCP** (Largest Contentful Paint) | 🟢 0.87s | 🔴 3.71s | < 2.5s |
| **FCP** (First Contentful Paint) | 🟢 0.47s | 🟡 1.95s | < 1.8s |
| **CLS** (Cumulative Layout Shift) | 🟢 0 | 🟢 0 | < 0.1 |
| **TBT** (Total Blocking Time — proxy INP) | 🟢 0ms | 🟢 118ms | < 200ms |
| **TTI** (Time to Interactive) | 🟢 0.87s | 🔴 3.71s | < 3.8s |
| **Speed Index** | 🟢 1.04s | 🟡 4.36s | < 3.4s |

---

## Oportunidades de mejora identificadas

### Performance

| Oportunidad | Ahorro estimado (mobile) |
|---|:---:|
| Unused JavaScript (3 chunks: `2zto07r8`, `2jx1kb770b2zt`, `19k_qypfi59ft`) | ~390ms |

**Causa raíz del LCP mobile (3.71s):** La app usa `AppClient` con `next/dynamic({ ssr: false })`, lo que impide al navegador pintar contenido hasta que React + ReactFlow están descargados, parseados y ejecutados. En mobile con throttling de CPU 4× y red 3G, eso acumula ~3.7s. El LCP desktop es 0.87s porque no hay throttling.

`ChessPanel` (tablero react-chessboard + chess.js) se sospecha que se importa estáticamente dentro de `AppClient`, aunque el usuario no lo necesita hasta hacer click en un nodo.

### Accesibilidad

| Fallo | Elemento afectado | Descripción |
|---|---|---|
| `aria-prohibited-attr` | Barra de evaluación Stockfish | `<div>` con `aria-label` pero sin `role` — el atributo no está permitido en rol `generic` |
| `color-contrast` | `<span class="... text-neon-cyan/50">` | Opacidad 50% sobre fondo `#0f1117` da ratio ~2.5:1 (mínimo 4.5:1) |
| `target-size` | Botones del menú lateral mobile | `role="button"` con área táctil menor de 44×44px |

> El link `<a href="https://reactflow.dev">` también falla contraste pero es inyectado automáticamente por `@xyflow/react` — no es código propio.

---

## Desktop: comportamiento excelente

En desktop todos los CWV están en verde con margen amplio. El único aviso es 120ms de JS no usado (insignificante). La app se comporta como un SSG puro desde el punto de vista del navegador: HTML estático → hidratación rápida → interactiva en < 1s.
