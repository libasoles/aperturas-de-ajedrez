# Árbol de Aperturas de Ajedrez

[![Netlify Status](https://api.netlify.com/api/v1/badges/768a9dbb-cb5e-4c2e-8645-ae496b9a7fc2/deploy-status)](https://app.netlify.com/projects/aperturas-de-ajedrez/deploys)

Explorador interactivo de aperturas de ajedrez. Visualiza las principales líneas de apertura como un árbol navegable.

**Demo:** [aperturasdeajedrez.com.ar](https://aperturasdeajedrez.com.ar/)

No es un repo para juzgar la calidad del código 🙏. Es un ejercicio de coding con agentes, un PoC personal.

![Vista general del árbol](docs/screenshot-opening-filter.png)

## Funcionalidades

- **Árbol navegable** — expande y colapsa ramas con los botones `+` / `−` de cada nodo
- **Filtros por apertura** — los botones del menú lateral (Escandinava, Española, Italiana, Siciliana, Francesa, Caro-Kann, Pirc, Alekhine, Gambito de Dama, Londres, India de Rey, Nimzo-India, Holandesa, Moderna, Nimzowitsch, Eslava, Zukertort, Marshall, Gambito Evans, Philidor, Ponziani, Contragambito de Falkbeer, Sistema Colle) muestran únicamente esa línea completa
- **Tablero de visualización** — al hacer clic en un nodo se muestra la posición resultante en el panel lateral; el botón **▶ Reproducir** anima los movimientos uno a uno.
- **Evaluación Stockfish** — cada nodo del árbol incluye una evaluación generada con Stockfish 18 a profundidad 14.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

### Premium

El contenido marcado con `access: "premium"` en `src/data/openingCatalog.js` se desbloquea con una variable de entorno de Vite:

```bash
VITE_HAS_PREMIUM_ACCESS=1
```

## Stack

- [React 19](https://react.dev) + [Vite 5](https://vite.dev)
- [@xyflow/react](https://reactflow.dev) — renderizado del grafo
- [chess.js](https://github.com/jhlywa/chess.js) — validación de movimientos y generación de FEN
- [Stockfish 18](https://stockfishchess.org/) — evaluación local de posiciones a profundidad 14
- [react-chessboard](https://github.com/Clariity/react-chessboard) v5 — visualización del tablero
- [Tailwind CSS v4](https://tailwindcss.com)
- [@radix-ui](https://www.radix-ui.com) — componentes accesibles
