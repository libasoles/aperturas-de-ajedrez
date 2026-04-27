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

export function buildPremiumVariantIds(variantCatalog = []) {
  return new Set(
    variantCatalog
      .filter((variant) => variant.access === "premium")
      .map((variant) => variant.variantNodeId),
  );
}

export function buildPremiumNodeIds(tree, catalog = [], variantCatalog = []) {
  const premiumVariantRoots = variantCatalog.filter(
    (variant) => variant.access === "premium",
  );
  const premiumOpeningRoots = catalog.flatMap((group) =>
    group.openings.filter((opening) => opening.access === "premium"),
  );

  const ids = premiumVariantRoots.reduce((acc, variant) => {
    const node = findNode(tree, variant.variantNodeId);
    if (node) collectIds(node, acc);
    return acc;
  }, new Set());

  for (const opening of premiumOpeningRoots) {
    const node = findNode(tree, opening.nodeId);
    if (node) collectIds(node, ids);
  }

  return ids;
}

export function getPathIdsToNodeInTree(tree, nodeId) {
  return findPathIds(tree, nodeId) ?? [];
}
