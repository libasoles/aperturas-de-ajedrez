# Core Web Vitals — Objetivos de mejora

Listado de acciones ordenadas por impacto esperado en las métricas de producción.
Ver [cwv-analysis.md](cwv-analysis.md) para el análisis completo.

---

## ✅ Resuelto — Performance mobile (85 → 99, LCP 3.71s → 2.1s)

- [x] **Convertir ChessPanel a `next/dynamic` para diferir su bundle**
  - Impacto real: TBT mobile 118ms → 20ms, LCP mobile 3.71s → 2.1s
  - `ChessPanel` solo se necesita cuando `selectedNodeId !== null`; no se carga en la pantalla inicial

- [x] **Mover `fenAfterMoves` fuera de `chessPath.js` para eliminar chess.js del bundle inicial**
  - Causa raíz: `chessPath.js` importaba `chess.js` a nivel de módulo; `useOpeningTreeState` lo jalaba en AppClient
  - Fix: `fenAfterMoves` movido a `src/utils/fenAfterMoves.js`; chess.js solo carga al abrir ChessPanel
  - Ver análisis completo en [bundle-analysis.md](bundle-analysis.md)

- [x] **Analizar chunks con mayor desperdicio**
  - IDs Turbopack `2zto07r8`, `2jx1kb770b2zt`, `19k_qypfi59ft` → ahora 69KB wasted (era ~390ms)
  - Ver [bundle-analysis.md](bundle-analysis.md)

---

## ✅ Resuelto — Accesibilidad (score 83 → objetivo 95+)

- [x] **`color-contrast`: labels de pills con alpha `cc` (80% opacidad)**
  - Elementos: `<span style="color:#ddd6fecc">`, `#a5f3fccc`, `#f5d0fecc`, `#ffe4e6cc` sobre `#0f1117`
  - Fix: eliminado el sufijo `cc` en `OpeningsPanel.jsx`, `MobileHamburgerMenu.jsx` y `StaticPanelsPreview.tsx`
  - El color activo/inactivo se diferencia por `textShadow` (glow en activo, ninguno en inactivo)
  - Peso en score: 7 (alto)

- [x] **`landmark-one-main`: el documento no tiene `<main>`**
  - Fix: `<div className="absolute inset-0">` → `<main className="absolute inset-0">` en `AppClient.jsx`
  - Peso en score: 3

---

## 🟡 Media prioridad — JS no usado (~69KB / ~150ms mobile)

- [ ] **Identificar y dividir los 2 chunks con mayor desperdicio**
  - `19k_qypfi59ft.js`: 39KB wasted (57%) — analizar qué exporta con `ANALYZE=true npx next build --webpack`
  - `2zto07r8-lizm.js`: 30KB wasted (62%)
  - Estos son los mismos chunks del baseline pero ahora mucho más pequeños; puede no valer la inversión
  - Condición: solo atacar si el bundle analyzer revela una causa raíz accionable

---

## 🟡 Media prioridad — Best Practices (96 → objetivo 100)

- [ ] **Investigar/reportar bug de chunks faltantes en Next.js 16 + Turbopack**
  - `3h44t7pvbs488.css` y `3qqqmxfpjveia.js` son referenciados en el HTML de producción pero no existen en `.next/static/chunks/`
  - Reproducible con clean build (`rm -rf .next && npm run build`)
  - El servidor devuelve HTTP 500 (no 404) para estas rutas
  - Causa probable: bug en el pipeline de emision de chunks CSS/JS de Turbopack producción (Next.js 16.2.7)
  - Acción: monitorear si se resuelve en una siguiente versión de Next.js; reportar upstream si persiste

---

## 🟢 Baja prioridad — LCP mobile (2.1s → objetivo < 1.8s)

- [ ] **Mostrar skeleton/placeholder en servidor antes de hidratar AppClient**
  - Impacto potencial: puede reducir LCP percibido otros 0.5–1s
  - Solución: `loading.tsx` en `app/(es)/`, `app/en/`, `app/fr/` con el layout vacío (sidebar + header en HTML estático)
  - Estado: ya no es urgente (LCP mobile en verde), pero mejoraría la experiencia percibida

---

## Fuera de alcance (sin acción necesaria)

- **CLS: 0** — sin layout shifts
- **TBT: 20ms mobile** — muy dentro del umbral bueno (< 200ms)
- **FCP: 1.5s mobile** — green (< 1.8s)
- **Link atribución ReactFlow** — falla contraste pero es inyectado por la librería, no es código propio
- **`aria-prohibited-attr`** — resuelto (baseline)
- **`target-size`** — resuelto (baseline)
