# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite, port 5173)
npm run build    # Production build
npm run lint     # ESLint
```

No test suite exists in this project.

## Architecture

Single-page React app that renders an interactive chess opening tree using ReactFlow.

### Data flow

```
src/data/openings.js          → Static tree of opening nodes
src/utils/chessPath.js        → findPathToNode / getActivePathIds (tree traversal)
src/components/OpeningTree.jsx → buildGraph() converts the tree to RF nodes/edges; owns all state
src/components/ChessNode.jsx   → Custom ReactFlow node renderer (pills)
src/components/ChessPanel.jsx  → Floating board panel (react-chessboard + chess.js)
src/components/ui/Tooltip.jsx  → Radix UI tooltip wrapper
```

### State ownership (OpeningTree.jsx)

- `expandedIds` — which node IDs are expanded in the tree
- `activeOpening` — which opening filter is active (from the top bar buttons); overrides `expandedIds`
- `selectedNodeId` — which pill the user clicked; drives ChessPanel

`buildGraph()` is a pure function that converts the opening tree + `expandedIds` into ReactFlow `nodes` and `edges` arrays. It is recomputed via `useMemo` on every expand/collapse.

### Critical library details

- **react-chessboard v5**: uses a single `options={{...}}` prop — NOT individual props. Passing `position={fen}` directly is silently ignored.
- **chess.js v1**: SAN notation is always English internally (K, Q, R, B, N). Use `toSpanishSAN()` exported from `ChessNode.jsx` for display.
- **@xyflow/react v12**: Do NOT add a `key` prop to `<ReactFlow>` — it forces a full remount (and fitView) on every state change.
- **Tailwind v4**: configured via `@tailwindcss/vite` plugin, no `tailwind.config.js`.

### Opening node schema

```js
{
  id: string,          // unique, used as ReactFlow node id
  move: string,        // SAN (English) — fed directly to chess.js
  name: string | null, // apertura name shown under the pill
  annotation: string | null, // shown in tooltip on hover
  color: "white" | "black",  // whose turn it is
  opening: string,     // key into OPENING_COLORS (root/scandinavian/spanish/italian/sicilian)
  children: Node[]
}
```

### Accessibility rules

- Minimum font size: **14px** for any readable text.
- All color choices must have sufficient contrast against the dark background (`#0f1117`). Never use opacity hacks (`color60`, `color30`) on readable text — reserve low opacity for decorative/border elements only.
