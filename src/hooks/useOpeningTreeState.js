import { MarkerType } from "@xyflow/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import i18n from "../i18n";
import { OPENING_TREE } from "../data/openings";
import { MOBILE_BOARD_PANEL_HEIGHT } from "../components/panelLayout";
import {
  HELP_ROUTE,
  ROUTE_BY_NODE_ID,
  ROUTE_BY_SLUG,
  VARIANT_ROUTES,
  VARIANT_ROUTE_BY_SLUG,
} from "../data/routes";
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
  if (locale === "en") return `/en/${route.slugEn}`;
  if (locale === "fr") return `/fr/${route.slugFr}`;
  return `/${route.slug}`;
}

function buildHelpUrl(locale) {
  if (locale === "en") return `/en/${HELP_ROUTE.slugEn}`;
  if (locale === "fr") return `/fr/${HELP_ROUTE.slugFr}`;
  return `/${HELP_ROUTE.slug}`;
}

export { buildHelpUrl, detectLocale };

const INITIAL_EXPANDED = new Set([
  "root",
  "e4",
  "scan-1",
  "span-1",
  "span-2",
  "span-3",
  "sic-1",
  "d4",
  "qg-1",
  "ki-1",
]);

function collectAllIds(node, acc = new Set()) {
  if (node.children && node.children.length > 0) {
    acc.add(node.id);
    node.children.forEach((c) => collectAllIds(c, acc));
  }
  return acc;
}

function buildOpeningFullIds(nodeId, pathIds) {
  const ids = new Set(["root", ...pathIds]);
  function findAndCollect(node) {
    if (node.id === nodeId) {
      collectAllIds(node, ids);
      ids.add(node.id);
      return true;
    }
    return (node.children || []).some(findAndCollect);
  }
  findAndCollect(OPENING_TREE);
  return ids;
}

export const PANEL_OPENINGS = [
  {
    group: "e4",
    openings: [
      {
        label: "Escandinava",
        nodeId: "scan-1",
        pathIds: ["e4"],
        color: "#16a34a",
        glow: "#22c55e",
        text: "#bbf7d0",
      },
      {
        label: "Española",
        nodeId: "span-4",
        pathIds: ["e4", "span-1", "span-2", "span-3"],
        color: "#2563eb",
        glow: "#3b82f6",
        text: "#bfdbfe",
      },
      {
        label: "Italiana",
        nodeId: "ital-1",
        pathIds: ["e4", "span-1", "span-2", "span-3"],
        color: "#ea580c",
        glow: "#f97316",
        text: "#fed7aa",
      },
      {
        label: "Siciliana",
        nodeId: "sic-1",
        pathIds: ["e4"],
        color: "#dc2626",
        glow: "#ef4444",
        text: "#fecdd3",
      },
      {
        label: "Francesa",
        nodeId: "fr-1",
        pathIds: ["e4"],
        color: "#4f46e5",
        glow: "#6366f1",
        text: "#c7d2fe",
      },
      {
        label: "Caro-Kann",
        nodeId: "ck-1",
        pathIds: ["e4"],
        color: "#0d9488",
        glow: "#14b8a6",
        text: "#99f6e4",
      },
      {
        label: "Pirc",
        nodeId: "pirc-1",
        pathIds: ["e4"],
        color: "#9a3412",
        glow: "#c2410c",
        text: "#fde8d8",
      },
      {
        label: "Alekhine",
        nodeId: "al-1",
        pathIds: ["e4"],
        color: "#db2777",
        glow: "#ec4899",
        text: "#fda4c8",
      },
    ],
  },
  {
    group: "d4",
    openings: [
      {
        label: "Gambito de Dama",
        nodeId: "qg-2",
        pathIds: ["d4", "qg-1"],
        color: "#7c3aed",
        glow: "#8b5cf6",
        text: "#ddd6fe",
      },
      {
        label: "Londres",
        nodeId: "lon-2",
        pathIds: ["d4", "qg-1"],
        color: "#0891b2",
        glow: "#06b6d4",
        text: "#a5f3fc",
      },
      {
        label: "India de Rey",
        nodeId: "ki-3a",
        pathIds: ["d4", "ki-1", "ki-2"],
        color: "#d97706",
        glow: "#f59e0b",
        text: "#fde68a",
      },
      {
        label: "Nimzo-India",
        nodeId: "nim-3b",
        pathIds: ["d4", "ki-1", "ki-2"],
        color: "#a21caf",
        glow: "#c026d3",
        text: "#f5d0fe",
      },
    ],
  },
];

const ALL_OPENINGS = PANEL_OPENINGS.flatMap((g) => g.openings);

const OPENING_FULL_IDS = Object.fromEntries(
  ALL_OPENINGS.map((o) => [o.nodeId, buildOpeningFullIds(o.nodeId, o.pathIds)]),
);

function buildVariantFullIds(variantNodeId) {
  const path = findPathToNode(variantNodeId);
  if (!path.length) return new Set(["root"]);
  const ids = new Set(path.map((n) => n.id));
  const variantNode = path.at(-1);
  collectAllIds(variantNode, ids);
  return ids;
}

const VARIANT_FULL_IDS = Object.fromEntries(
  VARIANT_ROUTES.map((r) => [
    r.variantNodeId,
    buildVariantFullIds(r.variantNodeId),
  ]),
);

export const OPENING_COLORS = {
  root: {
    node: "#3a2a1e",
    text: "#e8d5bc",
    border: "#6b4f3a",
    edge: "#8b6a50",
  },
  scandinavian: {
    node: "#14532d",
    text: "#bbf7d0",
    border: "#16a34a",
    edge: "#22c55e",
  },
  spanish: {
    node: "#1e3a5f",
    text: "#bfdbfe",
    border: "#2563eb",
    edge: "#3b82f6",
  },
  italian: {
    node: "#431407",
    text: "#fed7aa",
    border: "#ea580c",
    edge: "#f97316",
  },
  sicilian: {
    node: "#4c1d2e",
    text: "#fecdd3",
    border: "#dc2626",
    edge: "#ef4444",
  },
  queens_gambit: {
    node: "#1e1a3a",
    text: "#ddd6fe",
    border: "#7c3aed",
    edge: "#8b5cf6",
  },
  london: {
    node: "#1a2a2a",
    text: "#a5f3fc",
    border: "#0891b2",
    edge: "#06b6d4",
  },
  kings_indian: {
    node: "#2a1a00",
    text: "#fde68a",
    border: "#d97706",
    edge: "#f59e0b",
  },
  nimzo: {
    node: "#2a1a2a",
    text: "#f5d0fe",
    border: "#a21caf",
    edge: "#c026d3",
  },
  french: {
    node: "#1a1a3a",
    text: "#c7d2fe",
    border: "#4f46e5",
    edge: "#6366f1",
  },
  caro_kann: {
    node: "#042f2e",
    text: "#99f6e4",
    border: "#0d9488",
    edge: "#14b8a6",
  },
  pirc: {
    node: "#2a1515",
    text: "#fde8d8",
    border: "#9a3412",
    edge: "#c2410c",
  },
  alekhine: {
    node: "#2d0a1e",
    text: "#fda4c8",
    border: "#db2777",
    edge: "#ec4899",
  },
};

const X_STEP = 160;
const Y_STEP = 90;

function buildGraph(treeNode, expandedIds, depth = 0, yOffset = 0) {
  const colors = OPENING_COLORS[treeNode.opening] || OPENING_COLORS.root;
  const isExpanded = expandedIds.has(treeNode.id);
  const hasChildren = treeNode.children && treeNode.children.length > 0;

  const rfNode = {
    id: treeNode.id,
    type: "chess",
    position: { x: depth * X_STEP, y: yOffset },
    data: {
      move: treeNode.move,
      color: treeNode.color,
      opening: treeNode.opening,
      isExpanded,
      hasChildren,
      colors,
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
      } = buildGraph(child, expandedIds, depth + 1, childY);
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

function getRouteFromPathname() {
  if (typeof window === "undefined") return { opening: null, variant: null };
  // Strip /en/ or /fr/ prefix if present, then extract the slug
  let path = window.location.pathname;
  if (path === "/en" || path.startsWith("/en/")) {
    path = path.slice(3) || "/"; // remove "/en"
  } else if (path === "/fr" || path.startsWith("/fr/")) {
    path = path.slice(3) || "/"; // remove "/fr"
  }
  const slug = path.replace(/^\/|\/$/, "");
  if (!slug) return { opening: null, variant: null };
  const variantRoute = VARIANT_ROUTE_BY_SLUG[slug];
  if (variantRoute) {
    return {
      opening: variantRoute.parentNodeId,
      variant: variantRoute.variantNodeId,
    };
  }
  const openingRoute = ROUTE_BY_SLUG[slug];
  if (openingRoute) {
    return { opening: openingRoute.nodeId, variant: null };
  }
  return { opening: null, variant: null };
}

function getInitialStateFromUrl() {
  if (typeof window === "undefined") {
    return { selectedNodeId: "root", extraExpanded: new Set() };
  }
  const nodeId = new URLSearchParams(window.location.search).get("node");
  if (!nodeId) return { selectedNodeId: "root", extraExpanded: new Set() };
  const path = findPathToNode(nodeId);
  if (!path.length) return { selectedNodeId: "root", extraExpanded: new Set() };
  const ancestorIds = new Set(path.slice(0, -1).map((n) => n.id));
  return { selectedNodeId: nodeId, extraExpanded: ancestorIds };
}

// Browser language redirect: if URL has no locale prefix, redirect based on navigator.language
// This runs once at module load, before React mounts.
if (typeof window !== "undefined") {
  const path = window.location.pathname;
  const hasLocalePrefix =
    path === "/en" || path.startsWith("/en/") ||
    path === "/fr" || path.startsWith("/fr/");
  if (!hasLocalePrefix) {
    const lang = navigator.language ?? "";
    const slug = path.replace(/^\/|\/$/, "");
    if (lang.startsWith("en")) {
      const route = VARIANT_ROUTE_BY_SLUG[slug] ?? ROUTE_BY_SLUG[slug];
      const enPath = slug
        ? (route ? `/en/${route.slugEn}` : `/en/${slug}`)
        : "/en/";
      history.replaceState(null, "", enPath);
      i18n.changeLanguage("en");
    } else if (lang.startsWith("fr")) {
      const route = VARIANT_ROUTE_BY_SLUG[slug] ?? ROUTE_BY_SLUG[slug];
      const frPath = slug
        ? (route ? `/fr/${route.slugFr}` : `/fr/${slug}`)
        : "/fr/";
      history.replaceState(null, "", frPath);
      i18n.changeLanguage("fr");
    }
  }
}

const INITIAL_ROUTE = getRouteFromPathname();
const INITIAL_URL_STATE = getInitialStateFromUrl();

function getInitialDisplayIds() {
  if (INITIAL_ROUTE.variant && VARIANT_FULL_IDS[INITIAL_ROUTE.variant]) {
    return VARIANT_FULL_IDS[INITIAL_ROUTE.variant];
  }
  if (INITIAL_ROUTE.opening && OPENING_FULL_IDS[INITIAL_ROUTE.opening]) {
    return OPENING_FULL_IDS[INITIAL_ROUTE.opening];
  }
  return new Set([...INITIAL_EXPANDED, ...INITIAL_URL_STATE.extraExpanded]);
}

const { nodes: _INIT_NODES, height: _INIT_HEIGHT } = buildGraph(
  OPENING_TREE,
  getInitialDisplayIds(),
);
const _INIT_ROOT_Y = _INIT_NODES.find((n) => n.id === "root")?.position.y ?? 0;

function computeInitialViewport() {
  if (typeof window === "undefined") return { x: 24, y: 0, zoom: 0.85 };
  const zoom = Math.min(
    1,
    Math.max(0.35, (window.innerHeight * 0.88) / _INIT_HEIGHT),
  );
  return {
    x: 36,
    y: window.innerHeight / 2 - _INIT_ROOT_Y * zoom,
    zoom,
  };
}

export const INITIAL_VIEWPORT = computeInitialViewport();

function computeInitialMobileViewport() {
  if (typeof window === "undefined") return { x: 0, y: 200, zoom: 0.7 };
  const zoom = Math.min(1, Math.max(0.3, (window.innerWidth * 0.88) / _INIT_HEIGHT));
  const treeAreaHeight = window.innerHeight - MOBILE_BOARD_PANEL_HEIGHT;
  return {
    // Center the root node (canvas x = _INIT_ROOT_Y) horizontally
    x: window.innerWidth / 2 - _INIT_ROOT_Y * zoom,
    // Root node is at canvas y = 0; place it at 88% down the tree area
    y: treeAreaHeight * 0.88,
    zoom,
  };
}

export const INITIAL_MOBILE_VIEWPORT = computeInitialMobileViewport();

export function useOpeningTreeState() {
  const [expandedIds, setExpandedIds] = useState(
    () => new Set([...INITIAL_EXPANDED, ...INITIAL_URL_STATE.extraExpanded]),
  );
  const [activeOpening, setActiveOpening] = useState(INITIAL_ROUTE.opening);
  const [activeVariant, setActiveVariant] = useState(INITIAL_ROUTE.variant);
  const [selectedNodeId, setSelectedNodeId] = useState(
    INITIAL_URL_STATE.selectedNodeId,
  );
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

  const displayIds = activeVariant
    ? VARIANT_FULL_IDS[activeVariant]
    : activeOpening
      ? OPENING_FULL_IDS[activeOpening]
      : expandedIds;

  const activePathIds = useMemo(
    () => (selectedNodeId ? getActivePathIds(selectedNodeId) : new Set()),
    [selectedNodeId],
  );

  const toggleNode = useCallback((id) => {
    setActiveOpening(null);
    setActiveVariant(null);
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectNode = useCallback((id) => {
    setSelectedNodeId((prev) => (prev === id ? null : id));
  }, []);

  const expandToNextFork = useCallback((id) => {
    const idsToExpand = getPathToNextFork(id);
    if (idsToExpand.length === 0) return;
    setActiveOpening(null);
    setActiveVariant(null);
    setExpandedIds((prev) => new Set([...prev, ...idsToExpand]));
  }, []);

  const toggleOpening = useCallback((nodeId) => {
    setActiveVariant(null);
    setActiveOpening((prev) => {
      const next = prev === nodeId ? null : nodeId;
      if (typeof window !== "undefined") {
        const locale = detectLocale();
        const route = next ? ROUTE_BY_NODE_ID[next] : null;
        const url = route ? buildOpeningUrl(route, locale) : (locale === "en" ? "/en/" : locale === "fr" ? "/fr/" : "/");
        history.pushState(null, "", url);
      }
      return next;
    });
  }, []);

  // Space: expand to next fork
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== " ") return;
      if (!selectedNodeId) return;
      const node = findPathToNode(selectedNodeId).at(-1);
      if (!node?.children?.length) return;
      e.preventDefault();
      e.stopPropagation();
      expandToNextFork(selectedNodeId);
    }
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [selectedNodeId, expandToNextFork]);

  // Tab / Shift+Tab: advance to first child / go back to parent
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== "Tab") return;
      if (!selectedNodeId) return;
      e.preventDefault();
      e.stopPropagation();

      if (e.shiftKey) {
        const path = findPathToNode(selectedNodeId);
        const parent = path.at(-2);
        if (parent) {
          setSelectedNodeId(parent.id);
        }
        return;
      }

      const node = findPathToNode(selectedNodeId).at(-1);
      if (!node?.children?.length) {
        setSelectedNodeId(null);
        firstOpeningBtnRef.current?.focus();
        return;
      }
      const firstChild = node.children[0];
      setActiveOpening(null);
      setActiveVariant(null);
      setExpandedIds((prev) => new Set([...prev, selectedNodeId]));
      setSelectedNodeId(firstChild.id);
    }
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [selectedNodeId]);

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

      const currentDisplayIds = activeVariant
        ? VARIANT_FULL_IDS[activeVariant]
        : activeOpening
          ? OPENING_FULL_IDS[activeOpening]
          : expandedIds;

      if (e.key === "ArrowRight") {
        const node = findPathToNode(selectedNodeId).at(-1);
        if (!node?.children?.length) {
          setSelectedNodeId(null);
          firstOpeningBtnRef.current?.focus();
          return;
        }
        const firstChild = node.children[0];
        if (currentDisplayIds.has(firstChild.id)) {
          setSelectedNodeId(firstChild.id);
        } else {
          setActiveOpening(null);
          setActiveVariant(null);
          setExpandedIds((prev) => new Set([...prev, selectedNodeId]));
          setSelectedNodeId(firstChild.id);
        }
        return;
      }

      if (e.key === "ArrowLeft") {
        const path = findPathToNode(selectedNodeId);
        const parent = path.at(-2);
        if (parent) setSelectedNodeId(parent.id);
        return;
      }

      const direction = e.key === "ArrowUp" ? "up" : "down";
      const targetId = getVerticalNavigationTarget(
        selectedNodeId,
        direction,
        currentDisplayIds,
      );
      if (!targetId) return;

      const ancestorIds = findPathToNode(targetId)
        .slice(0, -1)
        .map((n) => n.id);
      setExpandedIds((prev) => new Set([...prev, ...ancestorIds]));
      if (!currentDisplayIds.has(targetId)) {
        setActiveOpening(null);
        setActiveVariant(null);
      }
      setSelectedNodeId(targetId);
    }
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [selectedNodeId, activeOpening, activeVariant, expandedIds]);

  const { nodes: rawNodes, edges: rawEdges } = useMemo(
    () => buildGraph(OPENING_TREE, displayIds),
    [displayIds],
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
        },
      })),
    [
      rawNodes,
      toggleNode,
      selectNode,
      expandToNextFork,
      selectedNodeId,
      activePathIds,
    ],
  );

  return {
    nodes,
    edges: rawEdges,
    selectedNodeId,
    activeOpening,
    toggleOpening,
    firstOpeningBtnRef,
  };
}
