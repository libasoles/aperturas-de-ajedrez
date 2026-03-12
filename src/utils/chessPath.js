import { OPENING_TREE } from '../data/openings';

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
