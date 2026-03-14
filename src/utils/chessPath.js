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
