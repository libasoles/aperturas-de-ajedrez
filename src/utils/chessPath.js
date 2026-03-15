import { OPENING_TREE } from '../data/openings';

// SAN usa notación inglesa internamente; esto convierte para mostrar al usuario
export function toSpanishSAN(move) {
  if (!move) return move;
  return move
    .replace(/^K/, "R") // King → Rey
    .replace(/^Q/, "D") // Queen → Dama
    .replace(/^R/, "T") // Rook → Torre
    .replace(/^B/, "A") // Bishop → Alfil
    .replace(/^N/, "C"); // Knight → Caballo
}

/**
 * Returns the array of nodes from root to the target node (inclusive),
 * or null if not found.
 */
export function findPathToNode(targetId) {
  function search(node, path) {
    const current = [...path, node];
    if (node.id === targetId) return current;
    for (const child of node.children || []) {
      const result = search(child, current);
      if (result) return result;
    }
    return null;
  }
  return search(OPENING_TREE, []) ?? [];
}

/**
 * Returns a Set of node IDs from root to the target node (for path highlighting).
 */
export function getActivePathIds(targetId) {
  const path = findPathToNode(targetId);
  return new Set(path.map((n) => n.id));
}

/**
 * Returns an array of node IDs to add to expandedIds, starting from startId
 * and walking down single-child chains until the next fork (≥2 children) or leaf.
 * The fork node is included so its branches (children) become visible.
 */
export function getPathToNextFork(startId) {
  function findNode(node) {
    if (node.id === startId) return node;
    for (const child of node.children || []) {
      const result = findNode(child);
      if (result) return result;
    }
    return null;
  }

  const startNode = findNode(OPENING_TREE);
  if (!startNode) return [];

  const ids = [];
  let current = startNode;

  while (true) {
    const children = current.children || [];
    if (children.length === 0) break; // leaf — nothing to expand
    // Add current so its children become visible
    ids.push(current.id);
    // Stop at a fork (children are now visible as branches)
    if (children.length >= 2) break;
    // Single child — keep walking down
    current = children[0];
  }

  return ids;
}

/**
 * Returns the target node ID for vertical (up/down) navigation between branches.
 *
 * Finds the nearest fork ancestor (node with ≥2 children), then picks the
 * prev/next sibling branch. Navigates as deep as the selected node's relative
 * depth by following first children, stopping at the last expanded/visible node
 * if the branch is shorter.
 *
 * @param {string} selectedId
 * @param {'up'|'down'} direction
 * @param {Set<string>} displayIds - IDs of currently expanded nodes (children visible)
 * @returns {string|null} target node ID, or null if no navigation is possible
 */
export function getVerticalNavigationTarget(selectedId, direction, displayIds) {
  const path = findPathToNode(selectedId);
  if (path.length <= 1) return null;

  // Walk up all fork ancestors from nearest to farthest.
  // At each fork, check whether there is a sibling branch in the desired direction.
  // If not, continue up (handles cousins, second-cousins, etc.).
  for (let i = path.length - 2; i >= 0; i--) {
    const node = path[i];
    if (!node.children || node.children.length <= 1) continue; // not a fork

    const nextNode = path[i + 1];
    const currentBranchIndex = node.children.findIndex(
      (c) => c.id === nextNode.id,
    );
    const targetBranchIndex =
      direction === "up" ? currentBranchIndex - 1 : currentBranchIndex + 1;

    if (targetBranchIndex < 0 || targetBranchIndex >= node.children.length) {
      continue; // no sibling in this direction — try the next ancestor fork
    }

    const targetBranchRoot = node.children[targetBranchIndex];

    // Steps from this fork's direct child down to the selected node
    const relativeDepth = path.length - 1 - i - 1;

    // Walk down relativeDepth steps, only through expanded nodes.
    // ↑: follow last child at each step (bottom of branch = visually closest to selected)
    // ↓: follow first child at each step (top of branch = visually closest to selected)
    let current = targetBranchRoot;
    for (let j = 0; j < relativeDepth; j++) {
      if (!displayIds.has(current.id)) break; // not expanded — stop here
      if (!current.children?.length) break; // leaf — stop here
      current =
        direction === "up"
          ? current.children[current.children.length - 1]
          : current.children[0];
    }

    return current.id;
  }

  return null;
}
