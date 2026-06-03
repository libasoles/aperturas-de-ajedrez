# Core Web Vitals — Objetivos de mejora

Listado de acciones ordenadas por impacto esperado en las métricas de producción.
Ver [cwv-analysis.md](cwv-analysis.md) para el análisis completo.

---

## 🔴 Alta prioridad — LCP mobile (3.71s → objetivo < 2.5s)

- [ ] **Mostrar skeleton/placeholder en servidor antes de hidratar AppClient**
  - Impacto: puede reducir el LCP percibido en 1–2s sin cambiar la arquitectura de fondo
  - Solución: añadir un `loading.tsx` en `app/(es)/`, `app/en/`, `app/fr/` que devuelva el layout vacío (sidebar + header en HTML estático). Next.js App Router lo muestra de forma inmediata mientras `AppClient` carga en cliente
  - Alternativa más simple: pasar el contenido de la primera pantalla como `children` al `AppShell` y renderizarlo en el server component, moviéndolo fuera del `ssr:false`

- [ ] **Evaluar si OpeningTree y MobileOpeningTree pueden tener un fallback visible**
  - Impacto: medio — evita que el usuario vea pantalla en blanco durante la hidratación
  - Solución: pasar un `loading` prop a `next/dynamic(...)` con un spinner o el primer nodo del árbol renderizado en HTML puro

---

## 🟡 Media prioridad — JS no usado (~390ms mobile)

- [x] **Convertir ChessPanel a `next/dynamic` para diferir su bundle**
  - Impacto: ~100–200ms en mobile según lo que pese el bundle de `react-chessboard` + `chess.js`
  - Solución: en `AppClient.jsx`, reemplazar el import estático de `ChessPanel` por `next/dynamic(() => import('./ChessPanel'), { ssr: false, loading: () => null })`
  - Condición: `ChessPanel` solo es visible cuando `selectedNodeId !== null`, por lo que nunca se necesita en la carga inicial
  - Estado: **en progreso** (subagente ejecutándose)

- [ ] **Analizar los 3 chunks anónimos con mayor desperdicio**
  - Chunks: `2zto07r8` (28KB waste), `2jx1kb770b2zt` (26KB waste), `19k_qypfi59ft` (21KB waste)
  - Herramienta: `npx @next/bundle-analyzer` — añadir `ANALYZE=true npm run build` para visualizar qué módulos componen cada chunk
  - Acción posible: si alguno es `chess.js` o partes de `@xyflow/react` que no se usan en la primera pantalla, encapsularlos en imports dinámicos

---

## 🟢 Baja prioridad — Accesibilidad (score 87 mobile → objetivo 95+)

- [x] **`aria-prohibited-attr`: Barra Stockfish**
  - Elemento: `<div aria-label="Evaluación Stockfish: ...">` sin `role`
  - Solución: añadir `role="img"` al `<div>` para que `aria-label` sea semánticamente válido
  - Estado: **en progreso** (subagente ejecutándose)

- [x] **`color-contrast`: clase `text-neon-cyan/50`**
  - Elemento: `<span class="... text-neon-cyan/50">` — ratio ~2.5:1, necesita ≥ 4.5:1
  - Solución: reemplazar por color sólido con contraste suficiente sobre `#0f1117`, p. ej. `text-[#4db6c4]` o subir opacidad a `/80`
  - Estado: **en progreso** (subagente ejecutándose)

- [x] **`target-size`: Botones del menú lateral mobile**
  - Elemento: `role="button"` en menú con área táctil < 44×44px
  - Solución: añadir `min-w-[44px] min-h-[44px]` o aumentar padding en los botones de `MobileOpeningTree.jsx`
  - Estado: **en progreso** (subagente ejecutándose)

---

## Fuera de alcance (sin acción necesaria)

- **CLS: 0** — sin layout shifts, no requiere acción
- **TBT: 118ms mobile** — dentro del umbral bueno (< 200ms), no requiere acción
- **FCP mobile: 1.95s** — límite del umbral «necesita mejora» (> 1.8s) pero mejorará automáticamente al resolver el LCP
- **Link atribución ReactFlow** — falla contraste pero es inyectado por la librería, no es código propio
