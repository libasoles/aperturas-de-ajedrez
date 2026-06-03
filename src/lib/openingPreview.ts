/**
 * Pure server-safe computation of opening tree nodes for SSR preview.
 * No DOM, no window, no React — safe to import in Server Components.
 */
import { findPathToNode, toFrenchSAN, toSpanishSAN } from '../utils/chessPath'
import { OPENING_TREE } from '../data/openings'
import { OPENING_COLORS } from '../data/openingColors'
import { ROUTE_BY_SLUG, VARIANT_ROUTE_BY_SLUG } from '../data/routes'
import { OPENING_ENTRY_BY_NODE_ID } from '../data/openingCatalog'

const X_STEP = 160
const Y_STEP = 90

export type PreviewNode = {
  id: string
  move: string
  color: string
  hasChildren: boolean
  isExpanded: boolean
  position: { x: number; y: number }
  colors: { node: string; text: string; border: string; edge: string }
}

export type PreviewEdge = {
  id: string
  source: string
  target: string
  color: string
}

export type PreviewGraph = {
  nodes: PreviewNode[]
  edges: PreviewEdge[]
}

function collectAllIds(node: any, acc = new Set<string>()): Set<string> {
  acc.add(node.id)
  node.children?.forEach((c: any) => collectAllIds(c, acc))
  return acc
}

function buildOpeningExpandedIds(
  tree: any,
  nodeId: string,
  pathIds: string[] = [],
): Set<string> {
  const ids = new Set(['root', ...pathIds])
  function findAndCollect(node: any): boolean {
    if (node.id === nodeId) { collectAllIds(node, ids); return true }
    return (node.children || []).some(findAndCollect)
  }
  findAndCollect(tree)
  return ids
}

function buildVariantExpandedIds(tree: any, variantNodeId: string): Set<string> {
  const path = findPathToNode(tree, variantNodeId)
  if (!path.length) return new Set(['root'])
  const ids: Set<string> = new Set(path.map((n: any) => String(n.id)))
  collectAllIds(path.at(-1), ids)
  return ids
}

function computeNodes(
  node: any,
  expandedIds: Set<string>,
  colorMap: Record<string, any>,
  depth = 0,
  yOffset = 0,
): { nodes: PreviewNode[]; edges: PreviewEdge[]; height: number } {
  const c = colorMap[node.opening] ?? colorMap.root ?? { node: '#1a1a2e', text: '#fff', border: '#555' }
  const isExpanded = expandedIds.has(node.id)
  const hasChildren = node.children?.length > 0
  const n: PreviewNode = {
    id: node.id,
    move: node.move,
    color: node.color,
    hasChildren,
    isExpanded,
    position: { x: depth * X_STEP, y: yOffset },
    colors: { node: c.node, text: c.text, border: c.border, edge: c.edge },
  }
  const all: PreviewNode[] = [n]
  const edges: PreviewEdge[] = []

  if (isExpanded && hasChildren) {
    let childY = yOffset
    for (const child of node.children) {
      const { nodes: cn, edges: ce, height } = computeNodes(child, expandedIds, colorMap, depth + 1, childY)
      all.push(...cn)
      edges.push(...ce)
      edges.push({
        id: `${node.id}->${child.id}`,
        source: node.id,
        target: child.id,
        color: c.edge,
      })
      childY += height
    }
    const totalH = childY - yOffset
    n.position.y = yOffset + totalH / 2 - Y_STEP / 2
    return { nodes: all, edges, height: Math.max(totalH, Y_STEP) }
  }

  return { nodes: all, edges, height: Y_STEP }
}

export function getPreviewMoveLabel(
  node: PreviewNode,
  locale: 'es' | 'en' | 'fr' = 'es',
): string {
  if (node.id === 'root') {
    if (locale === 'en') return 'Initial'
    if (locale === 'fr') return 'Initiale'
    return 'Inicial'
  }
  if (locale === 'en') return node.move
  if (locale === 'fr') return toFrenchSAN(node.move)
  return toSpanishSAN(node.move)
}

export function getPreviewGraphForSlug(slug: string): PreviewGraph {
  const variantRoute = (VARIANT_ROUTE_BY_SLUG as any)[slug]
  if (variantRoute) {
    const expandedIds = buildVariantExpandedIds(OPENING_TREE, variantRoute.variantNodeId)
    const { nodes, edges } = computeNodes(OPENING_TREE, expandedIds, OPENING_COLORS)
    return { nodes, edges }
  }

  const openingRoute = (ROUTE_BY_SLUG as any)[slug]
  if (openingRoute) {
    const catalogEntry = (OPENING_ENTRY_BY_NODE_ID as any)[openingRoute.nodeId]
    const pathIds = catalogEntry?.pathIds ?? []
    const expandedIds = buildOpeningExpandedIds(OPENING_TREE, openingRoute.nodeId, pathIds)
    const { nodes, edges } = computeNodes(OPENING_TREE, expandedIds, OPENING_COLORS)
    return { nodes, edges }
  }

  return { nodes: [], edges: [] }
}

export function getPreviewNodesForSlug(slug: string): PreviewNode[] {
  return getPreviewGraphForSlug(slug).nodes
}

// Viewport approximation for SSR (same formula as computeInitialViewport, assumed 768px height).
// The preview won't be pixel-perfect on every device but will be close for typical screen heights.
export function computePreviewViewport(nodes: PreviewNode[]): {
  offsetX: number
  offsetY: number
  zoom: number
} {
  if (!nodes.length) return { offsetX: 36, offsetY: 0, zoom: 0.85 }

  const ASSUMED_HEIGHT = 768
  const rootY = nodes.find(n => n.id === 'root')?.position.y ?? 0
  const ys = nodes.map(n => n.position.y)
  const graphHeight = Math.max(Math.max(...ys) - Math.min(...ys) + Y_STEP, Y_STEP)
  const zoom = Math.min(1, Math.max(0.35, (ASSUMED_HEIGHT * 0.88) / graphHeight))

  return {
    offsetX: 36,
    offsetY: ASSUMED_HEIGHT / 2 - rootY * zoom,
    zoom,
  }
}
