import { OPENING_TREE } from "./openings";
import { OPENING_CATALOG, VARIANT_CATALOG } from "./openingCatalog";

function findNode(root, targetId) {
  if (root.id === targetId) return root;
  for (const child of root.children || []) {
    const match = findNode(child, targetId);
    if (match) return match;
  }
  return null;
}

function findPathIds(root, targetId, path = []) {
  const currentPath = [...path, root.id];
  if (root.id === targetId) return currentPath;
  for (const child of root.children || []) {
    const match = findPathIds(child, targetId, currentPath);
    if (match) return match;
  }
  return null;
}

function collectIds(node, ids = new Set()) {
  ids.add(node.id);
  for (const child of node.children || []) {
    collectIds(child, ids);
  }
  return ids;
}

const premiumVariantRoots = VARIANT_CATALOG.filter(
  (variant) => variant.access === "premium",
);
const premiumOpeningRoots = OPENING_CATALOG.flatMap((group) =>
  group.openings.filter((opening) => opening.access === "premium"),
);

export const PREMIUM_VARIANT_IDS = new Set(
  premiumVariantRoots.map((variant) => variant.variantNodeId),
);

export const PREMIUM_NODE_IDS = premiumVariantRoots.reduce((ids, variant) => {
  const node = findNode(OPENING_TREE, variant.variantNodeId);
  if (node) collectIds(node, ids);
  return ids;
}, new Set());

for (const opening of premiumOpeningRoots) {
  const node = findNode(OPENING_TREE, opening.nodeId);
  if (node) collectIds(node, PREMIUM_NODE_IDS);
}

export function getPathIdsToNode(nodeId) {
  return findPathIds(OPENING_TREE, nodeId) ?? [];
}

export function isPremiumNode(nodeId) {
  return PREMIUM_NODE_IDS.has(nodeId);
}
