import { MarkerType } from "@xyflow/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { defaultOpeningTreeConfig } from "../data/treeConfigs";
import { OPENING_COLORS } from "../data/openingColors";
import { buildPremiumNodeIds, getPathIdsToNodeInTree } from "../data/premiumContent";
import { MOBILE_BOARD_PANEL_HEIGHT } from "../components/panelLayout";
import {
  findPathToNode,
  getActivePathIds,
  getPathToNextFork,
  getVerticalNavigationTarget,
} from "../utils/chessPath";

// Detect locale from URL prefix — server falls back to "es"
function detectLocale() {
  if (typeof window === "undefined") return "es";
  const p = window.location.pathname;
  if (p === "/en" || p.startsWith("/en/")) return "en";
  if (p === "/fr" || p.startsWith("/fr/")) return "fr";
  return "es";
}

// Build a URL for a given route slug, preserving the current locale prefix
function buildOpeningUrl(route, locale) {
  if (locale === "en") return `/en/${route.slugEn}/`;
  if (locale === "fr") return `/fr/${route.slugFr}/`;
  return `/${route.slug}/`;
}

function buildHelpUrlForRoute(helpRoute, locale) {
  if (locale === "en") return `/en/${helpRoute.slugEn}/`;
  if (locale === "fr") return `/fr/${helpRoute.slugFr}/`;
  return `/${helpRoute.slug}/`;
}

function buildVariantUrl(variantRoute, locale) {
  if (locale === "en") return `/en/${variantRoute.slugEn}/`;
  if (locale === "fr") return `/fr/${variantRoute.slugFr}/`;
  return `/${variantRoute.slug}/`;
}

export function buildHelpUrl(locale) {
  return buildHelpUrlForRoute(
    defaultOpeningTreeConfig.routeData.helpRoute,
    locale,
  );
}

export { detectLocale };

function collectAllIds(node, acc = new Set()) {
  acc.add(node.id);
  node.children?.forEach((c) => collectAllIds(c, acc));
  return acc;
}

function buildOpeningFullIds(tree, nodeId, pathIds) {
  const ids = new Set(["root", ...pathIds]);
  function findAndCollect(node) {
    if (node.id === nodeId) {
      collectAllIds(node, ids);
      ids.add(node.id);
      return true;
    }
    return (node.children || []).some(findAndCollect);
  }
  findAndCollect(tree);
  return ids;
}

function buildVariantFullIds(tree, variantNodeId) {
  const path = findPathToNode(tree, variantNodeId);
  if (!path.length) return new Set(["root"]);
  const ids = new Set(path.map((n) => n.id));
  const variantNode = path.at(-1);
  collectAllIds(variantNode, ids);
  return ids;
}


const X_STEP = 160;
const Y_STEP = 90;
const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};
const DEFAULT_INITIAL_EXPANDED_IDS = ["root"];

function buildGraph(
  treeNode,
  expandedIds,
  options = {},
  depth = 0,
  yOffset = 0,
) {
  const colorMap = options.colors ?? {};
  const fallbackColors = OPENING_COLORS.root;
  const colors =
    colorMap[treeNode.opening] || colorMap.root || fallbackColors;
  const isExpanded = expandedIds.has(treeNode.id);
  const hasChildren = treeNode.children && treeNode.children.length > 0;
  const isPremium = options.isPremiumNode?.(treeNode.id) ?? false;

  const rfNode = {
    id: treeNode.id,
    type: "chess",
    position: { x: depth * X_STEP, y: yOffset },
    data: {
      move: treeNode.move,
      color: treeNode.color,
      opening: treeNode.opening,
      name: treeNode.name,
      annotation: treeNode.annotation,
      isExpanded,
      hasChildren,
      colors,
      isPremium,
    },
  };

  const nodes = [rfNode];
  const edges = [];

  if (isExpanded && hasChildren) {
    let childY = yOffset;

    for (const child of treeNode.children) {
      const {
        nodes: cn,
        edges: ce,
        height,
      } = buildGraph(child, expandedIds, options, depth + 1, childY);
      nodes.push(...cn);
      edges.push(...ce);

      edges.push({
        id: `${treeNode.id}->${child.id}`,
        source: treeNode.id,
        target: child.id,
        type: "straight",
        style: { stroke: colors.edge, strokeWidth: 2, opacity: 0.7 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.edge,
          width: 16,
          height: 16,
        },
      });

      childY += height;
    }

    const totalHeight = childY - yOffset;
    rfNode.position.y = yOffset + totalHeight / 2 - Y_STEP / 2;

    return { nodes, edges, height: Math.max(totalHeight, Y_STEP) };
  }

  return { nodes, edges, height: Y_STEP };
}

function getRouteFromPathname(routeData) {
  if (typeof window === "undefined") return { opening: null, variant: null };
  if (!routeData) return { opening: null, variant: null };
  // Strip /en/ or /fr/ prefix if present, then extract the slug
  let path = window.location.pathname;
  if (path === "/en" || path.startsWith("/en/")) {
    path = path.slice(3) || "/"; // remove "/en"
  } else if (path === "/fr" || path.startsWith("/fr/")) {
    path = path.slice(3) || "/"; // remove "/fr"
  }
  const slug = path.replace(/^\/|\/$/, "");
  if (!slug) return { opening: null, variant: null };
  const variantRoute = routeData.variantRouteBySlug?.[slug];
  if (variantRoute) {
    return {
      opening: variantRoute.parentNodeId,
      variant: variantRoute.variantNodeId,
    };
  }
  const openingRoute = routeData.routeBySlug?.[slug];
  if (openingRoute) {
    return { opening: openingRoute.nodeId, variant: null };
  }
  return { opening: null, variant: null };
}

function getInitialStateFromUrl(tree) {
  if (typeof window === "undefined") {
    return { selectedNodeId: "root", extraExpanded: new Set() };
  }
  const nodeId = new URLSearchParams(window.location.search).get("node");
  if (!nodeId) return { selectedNodeId: "root", extraExpanded: new Set() };
  const path = findPathToNode(tree, nodeId);
  if (!path.length) return { selectedNodeId: "root", extraExpanded: new Set() };
  const ancestorIds = new Set(path.slice(0, -1).map((n) => n.id));
  return { selectedNodeId: nodeId, extraExpanded: ancestorIds };
}

function getInitialDisplayIds({
  initialExpandedIds,
  initialRoute,
  initialUrlState,
  openingFullIds,
  premiumCanAccess,
  routeByNodeId,
  tree,
  variantFullIds,
  variantRouteByNodeId,
}) {
  if (
    initialRoute.variant &&
    variantRouteByNodeId[initialRoute.variant] &&
    !premiumCanAccess(variantRouteByNodeId[initialRoute.variant].access)
  ) {
    return new Set([
      ...initialExpandedIds,
      ...getPathIdsToNodeInTree(
        tree,
        initialRoute.opening ?? initialRoute.variant,
      ).slice(0, -1),
      ...initialUrlState.extraExpanded,
    ]);
  }
  if (
    initialRoute.opening &&
    routeByNodeId[initialRoute.opening] &&
    !premiumCanAccess(routeByNodeId[initialRoute.opening].access)
  ) {
    return new Set([
      ...initialExpandedIds,
      ...getPathIdsToNodeInTree(tree, initialRoute.opening).slice(0, -1),
      ...initialUrlState.extraExpanded,
    ]);
  }
  if (initialRoute.variant && variantFullIds[initialRoute.variant]) {
    return variantFullIds[initialRoute.variant];
  }
  if (initialRoute.opening && openingFullIds[initialRoute.opening]) {
    return openingFullIds[initialRoute.opening];
  }
  return new Set([...initialExpandedIds, ...initialUrlState.extraExpanded]);
}

function computeInitialViewport(initGraph) {
  if (typeof window === "undefined") return { x: 24, y: 0, zoom: 0.85 };
  const rootY = initGraph.nodes.find((n) => n.id === "root")?.position.y ?? 0;
  const zoom = Math.min(
    1,
    Math.max(0.35, (window.innerHeight * 0.88) / initGraph.height),
  );
  return {
    x: 36,
    y: window.innerHeight / 2 - rootY * zoom,
    zoom,
  };
}

function computeInitialMobileViewport(initGraph) {
  if (typeof window === "undefined") return { x: 0, y: 200, zoom: 0.7 };
  const rootY = initGraph.nodes.find((n) => n.id === "root")?.position.y ?? 0;
  const zoom = Math.min(
    1,
    Math.max(0.3, (window.innerWidth * 0.88) / initGraph.height),
  );
  const treeAreaHeight = window.innerHeight - MOBILE_BOARD_PANEL_HEIGHT;
  return {
    // Center the root node (rotated canvas x = rootY) horizontally
    x: window.innerWidth / 2 - rootY * zoom,
    // Root node is at canvas y = 0; place it at 88% down the tree area
    y: treeAreaHeight * 0.88,
    zoom,
  };
}

function resolvePremiumAccess(premium) {
  if (!premium?.enabled) return true;
  return typeof premium.hasAccess === "function"
    ? premium.hasAccess()
    : Boolean(premium.hasAccess);
}

function resolvePremiumCanAccess(premium, premiumAccess) {
  if (!premium?.enabled) return () => true;
  if (typeof premium.canAccessContent === "function") {
    return premium.canAccessContent;
  }
  return (accessLevel = "free") => accessLevel !== "premium" || premiumAccess;
}

export function useOpeningTreeState(config = defaultOpeningTreeConfig) {
  const tree = config.tree;
  const catalog = config.catalog ?? EMPTY_ARRAY;
  const variantCatalog = config.variantCatalog ?? EMPTY_ARRAY;
  const routeData = config.routeData ?? EMPTY_OBJECT;
  const colors = config.colors ?? EMPTY_OBJECT;
  const initialExpandedIds =
    config.initialExpandedIds ?? DEFAULT_INITIAL_EXPANDED_IDS;
  const premium = config.premium;
  const premiumAccess = resolvePremiumAccess(premium);
  const premiumCanAccess = resolvePremiumCanAccess(premium, premiumAccess);
  const premiumNodeIds = useMemo(
    () =>
      premium?.enabled
        ? buildPremiumNodeIds(tree, catalog, variantCatalog)
        : new Set(),
    [catalog, premium?.enabled, tree, variantCatalog],
  );
  const isPremiumNode = useCallback(
    (nodeId) => premiumNodeIds.has(nodeId),
    [premiumNodeIds],
  );
  const openingFullIds = useMemo(
    () =>
      Object.fromEntries(
        catalog
          .flatMap((group) => group.openings)
          .map((opening) => [
            opening.nodeId,
            buildOpeningFullIds(tree, opening.nodeId, opening.pathIds),
          ]),
      ),
    [catalog, tree],
  );
  const variantFullIds = useMemo(
    () =>
      Object.fromEntries(
        (routeData.variantRoutes ?? []).map((route) => [
          route.variantNodeId,
          buildVariantFullIds(tree, route.variantNodeId),
        ]),
      ),
    [routeData.variantRoutes, tree],
  );
  const initialRoute = useMemo(
    () => getRouteFromPathname(routeData),
    [routeData],
  );
  const initialUrlState = useMemo(
    () => getInitialStateFromUrl(tree),
    [tree],
  );
  const initialDisplayIds = useMemo(
    () =>
      getInitialDisplayIds({
        initialExpandedIds,
        initialRoute,
        initialUrlState,
        openingFullIds,
        premiumCanAccess,
        routeByNodeId: routeData.routeByNodeId ?? {},
        tree,
        variantFullIds,
        variantRouteByNodeId: routeData.variantRouteByNodeId ?? {},
      }),
    [
      initialExpandedIds,
      initialRoute,
      initialUrlState,
      openingFullIds,
      premiumCanAccess,
      routeData.routeByNodeId,
      routeData.variantRouteByNodeId,
      tree,
      variantFullIds,
    ],
  );
  const graphOptions = useMemo(
    () => ({ colors, isPremiumNode }),
    [colors, isPremiumNode],
  );
  const initGraph = useMemo(
    () => buildGraph(tree, initialDisplayIds, graphOptions),
    [graphOptions, initialDisplayIds, tree],
  );
  const initialViewport = useMemo(
    () => computeInitialViewport(initGraph),
    [initGraph],
  );
  const initialMobileViewport = useMemo(
    () => computeInitialMobileViewport(initGraph),
    [initGraph],
  );
  const [expandedIds, setExpandedIds] = useState(
    () => new Set([...initialExpandedIds, ...initialUrlState.extraExpanded]),
  );
  const [activeOpening, setActiveOpening] = useState(initialRoute.opening);
  const [activeVariant, setActiveVariant] = useState(initialRoute.variant);
  const [selectedNodeId, setSelectedNodeId] = useState(
    initialUrlState.selectedNodeId,
  );
  const [premiumOverlayVersion, setPremiumOverlayVersion] = useState(0);
  const firstOpeningBtnRef = useRef(null);

  // Sync selected node → URL (preserves /en/ prefix)
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedNodeId && selectedNodeId !== "root") {
      url.searchParams.set("node", selectedNodeId);
    } else {
      url.searchParams.delete("node");
    }
    history.replaceState(null, "", url);
  }, [selectedNodeId]);

  const activeOpeningRoute = activeOpening
    ? routeData.routeByNodeId?.[activeOpening]
    : null;
  const activeVariantRoute = activeVariant
    ? routeData.variantRouteByNodeId?.[activeVariant]
    : null;
  const isActiveOpeningLocked =
    activeOpeningRoute && !premiumCanAccess(activeOpeningRoute.access);
  const isActiveVariantLocked =
    activeVariantRoute && !premiumCanAccess(activeVariantRoute.access);
  const selectedNodeLocked = selectedNodeId
    ? isPremiumNode(selectedNodeId) && !premiumAccess
    : false;
  const lockedContentId = selectedNodeLocked
    ? selectedNodeId
    : isActiveVariantLocked
      ? activeVariant
      : isActiveOpeningLocked
        ? activeOpening
        : null;
  const isPremiumRouteLocked = Boolean(
    isActiveOpeningLocked || isActiveVariantLocked,
  );

  const displayIds = useMemo(() => {
    if (isActiveVariantLocked && activeVariant) {
      return new Set([
        ...expandedIds,
        ...getPathIdsToNodeInTree(tree, activeOpening ?? activeVariant).slice(
          0,
          -1,
        ),
      ]);
    }
    if (isActiveOpeningLocked && activeOpening) {
      return new Set([
        ...expandedIds,
        ...getPathIdsToNodeInTree(tree, activeOpening).slice(0, -1),
      ]);
    }
    if (activeVariant) {
      return new Set([
        ...(variantFullIds[activeVariant] ?? []),
        ...expandedIds,
      ]);
    }
    if (activeOpening) {
      return new Set([
        ...(openingFullIds[activeOpening] ?? []),
        ...expandedIds,
      ]);
    }
    return expandedIds;
  }, [
    activeOpening,
    activeVariant,
    expandedIds,
    openingFullIds,
    isActiveOpeningLocked,
    isActiveVariantLocked,
    tree,
    variantFullIds,
  ]);

  const activePathIds = useMemo(
    () => (selectedNodeId ? getActivePathIds(tree, selectedNodeId) : new Set()),
    [selectedNodeId, tree],
  );

  // Helper: absorb currently visible opening/variant nodes into expandedIds
  // before clearing the active opening/variant state.
  // This ensures nodes don't collapse when the user interacts with the tree.
  const absorbActiveIntoExpanded = useCallback(() => {
    setExpandedIds((prev) => {
      let next = new Set(prev);
      if (
        activeOpening &&
        openingFullIds[activeOpening] &&
        !isActiveOpeningLocked
      ) {
        next = new Set([...next, ...openingFullIds[activeOpening]]);
      }
      if (
        activeVariant &&
        variantFullIds[activeVariant] &&
        !isActiveVariantLocked
      ) {
        next = new Set([...next, ...variantFullIds[activeVariant]]);
      }
      return next;
    });
  }, [
    activeOpening,
    activeVariant,
    isActiveOpeningLocked,
    isActiveVariantLocked,
    openingFullIds,
    variantFullIds,
  ]);

  const toggleNode = useCallback(
    (id) => {
      if (isPremiumNode(id) && !premiumAccess) return;
      // Preserve visible nodes before deactivating opening/variant
      absorbActiveIntoExpanded();
      setExpandedIds((prev) => {
        const next = new Set(prev);
        // Toggle the specific node
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
      setActiveOpening(null);
      setActiveVariant(null);
    },
    [absorbActiveIntoExpanded, isPremiumNode, premiumAccess],
  );

  const selectNode = useCallback(
    (id) => {
      const isPremium = isPremiumNode(id);
      if (isPremium) {
        premium?.trackNodeClick?.({
          node_id: id,
          surface: "tree_node",
          locale: detectLocale(),
          has_access: premiumAccess,
        });
        if (!premiumAccess) {
          setPremiumOverlayVersion((prev) => prev + 1);
        }
      }
      setSelectedNodeId((prev) => {
        const next = isPremium ? id : prev === id ? null : id;
        // If selecting a node while an opening/variant filter is active,
        // keep its ancestors visible and clear the filter if the node is outside
        // the active branch so the desktop menu de-selects the current option.
        if (next && (activeOpening || activeVariant)) {
          const isInActiveBranch = activeVariant
            ? variantFullIds[activeVariant]?.has(next)
            : openingFullIds[activeOpening]?.has(next);
          const pathToNode = findPathToNode(tree, next);
          const ancestorIds = new Set(pathToNode.slice(0, -1).map((n) => n.id));
          setExpandedIds((current) => new Set([...current, ...ancestorIds]));
          if (!isInActiveBranch) {
            absorbActiveIntoExpanded();
            setActiveOpening(null);
            setActiveVariant(null);
          }
        }
        return next;
      });
    },
    [
      activeOpening,
      activeVariant,
      absorbActiveIntoExpanded,
      isPremiumNode,
      openingFullIds,
      premium,
      premiumAccess,
      tree,
      variantFullIds,
    ],
  );

  const expandToNextFork = useCallback(
    (id) => {
      if (isPremiumNode(id) && !premiumAccess) return;
      const idsToExpand = getPathToNextFork(tree, id);
      if (idsToExpand.length === 0) return;
      absorbActiveIntoExpanded();
      setActiveOpening(null);
      setActiveVariant(null);
      setExpandedIds((prev) => new Set([...prev, ...idsToExpand]));
    },
    [absorbActiveIntoExpanded, isPremiumNode, premiumAccess, tree],
  );

  const toggleOpening = useCallback((nodeId) => {
    setActiveVariant(null);
    setActiveOpening((prev) => {
      const next = prev === nodeId ? null : nodeId;
      const route = next ? routeData.routeByNodeId?.[next] : null;
      if (next && !premiumCanAccess(route?.access)) {
        setPremiumOverlayVersion((prevVersion) => prevVersion + 1);
      }
      if (next) setSelectedNodeId(next);
      if (typeof window !== "undefined") {
        const locale = detectLocale();
        const url = route
          ? buildOpeningUrl(route, locale)
          : locale === "en"
            ? "/en/"
            : locale === "fr"
              ? "/fr/"
              : "/";
        history.pushState(null, "", url);
      }
      return next;
    });
  }, [premiumCanAccess, routeData.routeByNodeId]);

  const toggleVariant = useCallback((variantNodeId) => {
    const variantRoute = routeData.variantRouteByNodeId?.[variantNodeId];
    if (!variantRoute) return;
    setActiveVariant((prev) => {
      const next = prev === variantNodeId ? null : variantNodeId;
      if (next && !premiumCanAccess(variantRoute.access)) {
        setPremiumOverlayVersion((prevVersion) => prevVersion + 1);
      }
      if (next) setSelectedNodeId(next);
      setActiveOpening(variantRoute.parentNodeId);
      if (typeof window !== "undefined") {
        const locale = detectLocale();
        const url = next
          ? buildVariantUrl(variantRoute, locale)
          : (buildOpeningUrl(
              routeData.routeByNodeId?.[variantRoute.parentNodeId],
              locale,
            ) ?? (locale === "en" ? "/en/" : locale === "fr" ? "/fr/" : "/"));
        history.pushState(null, "", url);
      }
      return next;
    });
  }, [
    premiumCanAccess,
    routeData.routeByNodeId,
    routeData.variantRouteByNodeId,
  ]);

  // Space: expand to next fork
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== " ") return;
      if (!selectedNodeId) return;
      const node = findPathToNode(tree, selectedNodeId).at(-1);
      if (!node?.children?.length) return;
      e.preventDefault();
      e.stopPropagation();
      expandToNextFork(selectedNodeId);
    }
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [selectedNodeId, expandToNextFork, tree]);

  // Tab / Shift+Tab: advance to first child / go back to parent
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== "Tab") return;
      if (!selectedNodeId) return;
      e.preventDefault();
      e.stopPropagation();

      if (e.shiftKey) {
        const path = findPathToNode(tree, selectedNodeId);
        const parent = path.at(-2);
        if (parent) {
          setSelectedNodeId(parent.id);
        }
        return;
      }

      const node = findPathToNode(tree, selectedNodeId).at(-1);
      if (isPremiumNode(selectedNodeId) && !premiumAccess) return;
      if (!node?.children?.length) {
        setSelectedNodeId(null);
        firstOpeningBtnRef.current?.focus();
        return;
      }
      const firstChild = node.children[0];
      if (isPremiumNode(firstChild.id) && !premiumAccess) {
        setSelectedNodeId(firstChild.id);
        return;
      }
      absorbActiveIntoExpanded();
      setActiveOpening(null);
      setActiveVariant(null);
      setExpandedIds((prev) => new Set([...prev, selectedNodeId]));
      setSelectedNodeId(firstChild.id);
    }
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [
    selectedNodeId,
    absorbActiveIntoExpanded,
    isPremiumNode,
    premiumAccess,
    tree,
  ]);

  // Arrow keys
  useEffect(() => {
    function handleKeyDown(e) {
      if (
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "ArrowUp" &&
        e.key !== "ArrowDown"
      )
        return;
      if (!selectedNodeId) return;
      e.preventDefault();
      e.stopPropagation();

      const currentDisplayIds = displayIds;

      if (e.key === "ArrowRight") {
        const node = findPathToNode(tree, selectedNodeId).at(-1);
        if (!node?.children?.length) {
          setSelectedNodeId(null);
          firstOpeningBtnRef.current?.focus();
          return;
        }
        const firstChild = node.children[0];
        if (isPremiumNode(firstChild.id) && !premiumAccess) {
          setSelectedNodeId(firstChild.id);
          return;
        }
        if (currentDisplayIds.has(firstChild.id)) {
          setSelectedNodeId(firstChild.id);
        } else {
          absorbActiveIntoExpanded();
          setActiveOpening(null);
          setActiveVariant(null);
          setExpandedIds((prev) => new Set([...prev, selectedNodeId]));
          setSelectedNodeId(firstChild.id);
        }
        return;
      }

      if (e.key === "ArrowLeft") {
        const path = findPathToNode(tree, selectedNodeId);
        const parent = path.at(-2);
        if (parent) setSelectedNodeId(parent.id);
        return;
      }

      const direction = e.key === "ArrowUp" ? "up" : "down";
      const targetId = getVerticalNavigationTarget(
        tree,
        selectedNodeId,
        direction,
        currentDisplayIds,
      );
      if (!targetId) return;

      const ancestorIds = findPathToNode(tree, targetId)
        .slice(0, -1)
        .map((n) => n.id);
      setExpandedIds((prev) => new Set([...prev, ...ancestorIds]));
      if (!currentDisplayIds.has(targetId)) {
        absorbActiveIntoExpanded();
        setActiveOpening(null);
        setActiveVariant(null);
      }
      setSelectedNodeId(targetId);
    }
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [
    selectedNodeId,
    displayIds,
    isPremiumNode,
    premiumAccess,
    absorbActiveIntoExpanded,
    tree,
  ]);

  const { nodes: rawNodes, edges: rawEdges } = useMemo(
    () => buildGraph(tree, displayIds, graphOptions),
    [displayIds, graphOptions, tree],
  );

  const nodes = useMemo(
    () =>
      rawNodes.map((n) => ({
        ...n,
        data: {
          ...n.data,
          onToggle: toggleNode,
          onSelect: selectNode,
          onExpandToFork: expandToNextFork,
          isSelected: n.id === selectedNodeId,
          isInActivePath: activePathIds.has(n.id),
          isLocked: isPremiumNode(n.id) && !premiumAccess,
        },
      })),
    [
      rawNodes,
      toggleNode,
      selectNode,
      expandToNextFork,
      selectedNodeId,
      activePathIds,
      isPremiumNode,
      premiumAccess,
    ],
  );

  return {
    nodes,
    edges: rawEdges,
    selectedNodeId,
    activeOpening,
    activeVariant,
    catalog,
    config,
    initialMobileViewport,
    initialViewport,
    tree,
    variantRoutes: routeData.variantRoutes ?? [],
    lockedContentId,
    isPremiumRouteLocked,
    premiumOverlayVersion,
    toggleNode,
    expandToNextFork,
    toggleOpening,
    toggleVariant,
    firstOpeningBtnRef,
    subtitle: config.subtitle,
  };
}
