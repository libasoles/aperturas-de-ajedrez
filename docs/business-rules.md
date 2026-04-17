# Business Rules — Chess Opening Tree

Quick reference for non-obvious rules encoded in `src/hooks/useOpeningTreeState.js` and related modules. These complement CLAUDE.md (which covers the _how-to-add_ workflow) — this file covers the _why_ and _what_ of runtime behavior.

---

## State model: three independent axes

The UI has three separate state variables that control what the user sees. They are **independent** — changing one does not cascade into another unless explicitly coded.

| State variable | Controls | Lives in |
|---|---|---|
| `selectedNodeId` | What position the chessboard shows | `useOpeningTreeState` |
| `activeOpening` | Which opening branch is filtered/visible in the tree | `useOpeningTreeState` |
| `expandedIds` | Which individual nodes have been manually expanded/collapsed | `useOpeningTreeState` |

### Why this matters

Clicking a menu button **only** sets `activeOpening`/`activeVariant` — the chessboard won't update unless `selectedNodeId` is also set. The deliberate rule is:

> **Activating an opening or variant from the menu auto-selects its root node** (`selectedNodeId = nodeId`), so the board immediately shows that position. Deactivating (toggling off) leaves `selectedNodeId` unchanged — the board stays on the last viewed position.

This was added to `toggleOpening` and `toggleVariant` in April 2025. Before that, users had to click a tree node manually to see any position after clicking a menu button.

---

## Opening filter vs. manual expansion

Two different ways to show nodes in the tree; they must co-exist carefully.

### `activeOpening` / `activeVariant` (filter mode)
- Activated by clicking buttons in the top bar (desktop) or hamburger menu (mobile).
- Shows the **full subtree** of the selected opening/variant — computed eagerly into `OPENING_FULL_IDS` and `VARIANT_FULL_IDS` at module load time.
- Clears `activeVariant` when a new `activeOpening` is selected, and vice-versa.

### `expandedIds` (manual mode)
- Activated by clicking the expand arrow on a tree node, pressing Space, Tab, or arrow keys.
- Only tracks individual node IDs that the user has explicitly expanded.
- Completely independent of `activeOpening` — you can have both active at once.

### `absorbActiveIntoExpanded` — the bridge between modes
When the user manually interacts with the tree (click, keyboard) while a filter is active, the currently visible nodes are first **absorbed** into `expandedIds` so they don't disappear when the filter clears. Without this, switching from filter mode to manual mode would collapse the whole tree.

```
user clicks a node → absorbActiveIntoExpanded() → setActiveOpening(null) → setExpandedIds(...)
```

---

## Premium gating rules

```
canAccessContent(accessLevel) → accessLevel !== "premium" || hasPremiumAccess()
```

- `"free"` nodes → always accessible.
- `"premium"` nodes → accessible only when `VITE_PREMIUM_ACCESS=1` env var is set.
- Clicking a locked node **does not block navigation** — `selectedNodeId` is still set, so the board shows the position. This is intentional: it lets the user see the opening name and FEN but not expand children.
- Clicking a locked node increments `premiumOverlayVersion`, which triggers the paywall overlay (the overlay listens to this counter, not to a boolean).
- `toggleOpening` and `toggleVariant` also increment the counter for locked openings, AND still set `selectedNodeId`. This matches tree-node click behavior.

---

## `selectNode` vs. direct `setSelectedNodeId`

`selectNode` (the public function exposed for tree node clicks) does extra work beyond just setting `selectedNodeId`:
1. Fires `trackPremiumNodeClick` analytics event for premium nodes.
2. Increments `premiumOverlayVersion`.
3. Expands ancestor nodes into `expandedIds` so the selected node is visible.
4. Clears `activeOpening`/`activeVariant` if the selected node is outside the active branch.

`toggleOpening` and `toggleVariant` **bypass `selectNode`** and call `setSelectedNodeId` directly. This is intentional:
- The premium overlay is already triggered by `toggleOpening`/`toggleVariant` themselves — no double-trigger.
- The ancestor expansion is unnecessary because root/variant nodes are already visible in their own filter mode.
- Keeping them separate avoids accidentally clearing the active filter.

---

## URL ↔ State synchronization

### On page load (module level, before React mounts)
- `getRouteFromPathname()` maps the current URL slug to `activeOpening`/`activeVariant` initial state.
- `getInitialStateFromUrl()` reads `?node=<id>` query param to set initial `selectedNodeId` and expand ancestors.
- If the user's browser language is English or French and the URL has no locale prefix, a `history.replaceState` redirect runs immediately to add `/en/` or `/fr/`.

### During interaction
- `toggleOpening` / `toggleVariant` call `history.pushState` to update the URL to the canonical slug for the selected opening/variant.
- `selectNode` does **not** update the URL (the board position is not permalink-able, only the opening/variant page is).
- A `useEffect` watches `selectedNodeId` and updates the `?node=` query param — but only when `selectedNodeId` is not the root node and not part of an active opening/variant (to avoid redundant URL noise).

### Locale detection
`detectLocale()` reads from `window.location.pathname` — `/en/…` → `"en"`, `/fr/…` → `"fr"`, anything else → `"es"`. This runs synchronously wherever a locale-aware URL needs to be built.

---

## `displayIds` — the resolved set of visible node IDs

`displayIds` is a computed (`useMemo`) set that merges the three state axes into a single flat set used by `buildGraph()`:

```
if (activeVariant is locked)  → INITIAL_EXPANDED + path to variant (no subtree)
if (activeOpening is locked)  → INITIAL_EXPANDED + path to opening (no subtree)
if (activeVariant)            → VARIANT_FULL_IDS[activeVariant] ∪ expandedIds
if (activeOpening)            → OPENING_FULL_IDS[activeOpening] ∪ expandedIds
else                          → expandedIds
```

This is why changing `selectedNodeId` alone never collapses or expands the tree — `displayIds` doesn't depend on `selectedNodeId`.

---

## Keyboard navigation rules

| Key | Action |
|---|---|
| Space | Expand current node to next fork (all children until a branching point) |
| Tab | Move to first child; at leaf, cycles focus back to the opening menu buttons |
| Shift+Tab | Move to parent node |
| Arrow Right | Move to first child (expands node if needed) |
| Arrow Left | Move to parent |
| Arrow Up / Down | Move to previous/next visible sibling in `displayIds` order |

All keyboard handlers guard with `if (!selectedNodeId) return` — keyboard navigation is disabled until the user has selected a node.

Arrow Up/Down navigation uses `getVerticalNavigationTarget()` from `src/utils/chessPath.js`, which computes sibling order relative to the **current `displayIds`** set (so collapsed siblings are skipped).

---

## `INITIAL_EXPANDED` — the default tree view

The nodes visible on first load (no active opening, no URL params):

```js
["root", "e4", "scan-1", "span-1", "span-2", "span-3", "sic-1", "d4", "qg-1", "ki-1"]
```

This shows the top-level branching (e4 and d4) plus the first move of each major e4 opening, giving the user a populated tree without overwhelming depth.

---

## Mobile vs. desktop differences

- The layout is always **landscape** on mobile (horizontal orientation).
- Mobile uses a hamburger menu that lists both openings AND their variants inline. Tapping a variant calls `toggleVariant` directly (same as clicking in the desktop variant list in the panel).
- `MOBILE_BOARD_PANEL_HEIGHT` (imported from `src/components/panelLayout.js`) is used to compute the initial mobile viewport so the chessboard panel doesn't overlap the tree.
- The initial mobile viewport centers the root node horizontally (using `_INIT_ROOT_Y` as the canvas x-coordinate, since the mobile tree is rotated 90°).
