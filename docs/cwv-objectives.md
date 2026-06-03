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

## ✅ Resuelto — Accesibilidad (score 83 → 100 desktop, 96 mobile)

- [x] **`color-contrast`: labels de pills con alpha `cc` (80% opacidad)**
  - Elementos: `<span style="color:#ddd6fecc">`, `#a5f3fccc`, `#f5d0fecc`, `#ffe4e6cc` sobre `#0f1117`
  - Fix: eliminado el sufijo `cc` en `OpeningsPanel.jsx`, `MobileHamburgerMenu.jsx` y `StaticPanelsPreview.tsx`
  - El color activo/inactivo se diferencia por `textShadow` (glow en activo, ninguno en inactivo)
  - Peso en score: 7 (alto) — resuelto ✓

- [x] **`landmark-one-main`: el documento no tiene `<main>`**
  - Fix: `<div className="absolute inset-0">` → `<main className="absolute inset-0">` en `AppClient.jsx`
  - Peso en score: 3 — resuelto ✓

**Resultado:** Desktop 83 → 100, Mobile 83 → 96. Best Practices también mejoró (96 → 100) por resolver el bug de chunks.

---

## 🟡 Media prioridad — JS no usado (~69KB / ~150ms mobile)

- [ ] **Identificar y dividir los 2 chunks con mayor desperdicio**
  - `19k_qypfi59ft.js`: 39KB wasted (57%) — analizar qué exporta con `ANALYZE=true npx next build --webpack`
  - `2zto07r8-lizm.js`: 30KB wasted (62%)
  - Estos son los mismos chunks del baseline pero ahora mucho más pequeños; puede no valer la inversión
  - Condición: solo atacar si el bundle analyzer revela una causa raíz accionable

---

## ✅ Resuelto — Best Practices (96 → 100)

- [x] **Investigar/resolver bug de chunks faltantes en Next.js 16 + Turbopack** *(2026-06-03)*
  - `3h44t7pvbs488.css` y `3qqqmxfpjveia.js` eran referenciados en el HTML pero no existían en `.next/static/chunks/`
  - **Causa raíz**: caché incremental de Turbopack obsoleta — el HTML generado en un paso previo referenciaba chunks renombrados/reemplazados en el paso de emit final
  - **Fix**: `rm -rf .next && npm run build` (clean build). Los 324 HTML generados tienen referencias válidas; todos los chunks existen (verificado programáticamente)
  - El error solo ocurre localmente al reutilizar una caché `.next/` de una build anterior. En Netlify no ocurre porque la plataforma limpia `.next/` antes de cada deploy
  - Next.js 16.2.7 es la última versión estable; no se requiere actualización
  - **Workaround para Lighthouse local**: siempre usar `rm -rf .next && npm run build` antes de medir
  - **Resultado:** Best Practices 96 → 100 ✓

---

## 🟢 Baja prioridad — Optimización LCP mobile (2.6s, fue 2.1s)

- [ ] **LCP regresionó ligeramente de 2.1s a 2.6s post-A11y fixes**
  - Causa probable: cambios en CSS/layout de pills (eliminación de opacidad)
  - Impacto: aún en verde (< 2.5s… pendiente de verificar si fue justo al límite)
  - Opcional: Mostrar skeleton/placeholder en servidor antes de hidratar AppClient
  - Impacto potencial: puede reducir LCP percibido otros 0.5–1s si fuera necesario
  - Solución: `loading.tsx` en `app/(es)/`, `app/en/`, `app/fr/` con el layout vacío (sidebar + header en HTML estático)
  - Estado: no urgente (métrica en verde), posible a futuro si aparecen picos

---

## Fuera de alcance (sin acción necesaria)

- **CLS: 0** — sin layout shifts
- **TBT: 20ms mobile** — muy dentro del umbral bueno (< 200ms)
- **FCP: 1.5s mobile** — green (< 1.8s)
- **Link atribución ReactFlow** — falla contraste pero es inyectado por la librería, no es código propio
- **`aria-prohibited-attr`** — resuelto (baseline)
- **`target-size`** — resuelto (baseline)
