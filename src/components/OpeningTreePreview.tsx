import {
  computePreviewViewport,
  type PreviewEdge,
  type PreviewNode,
  getPreviewGraphForSlug,
  getPreviewMoveLabel,
} from '@/lib/openingPreview'
import esUi from '@/locales/es/ui.json'
import enUi from '@/locales/en/ui.json'
import frUi from '@/locales/fr/ui.json'
import { MOBILE_BOARD_PANEL_HEIGHT } from './panelLayout'

interface Props {
  slug: string
  locale?: 'es' | 'en' | 'fr'
}

/**
 * Server-rendered visual preview of the opening tree.
 * Shows the expanded pills before JavaScript loads.
 * ReactFlow replaces it once the client bundle hydrates.
 */
function previewPiece(move: string, color: string) {
  if (!move) return null
  const san = move.replace(/[+#!=?]/g, '')
  const isWhite = color === 'white'
  if (san.startsWith('K')) return isWhite ? '♔' : '♚'
  if (san.startsWith('Q')) return isWhite ? '♕' : '♛'
  if (san.startsWith('R')) return isWhite ? '♖' : '♜'
  if (san.startsWith('B')) return isWhite ? '♗' : '♝'
  if (san.startsWith('N')) return isWhite ? '♘' : '♞'
  return isWhite ? '♙' : '♟'
}

function estimateNodeWidth(label: string, hasPiece: boolean, hasChildren: boolean, isRoot: boolean) {
  const charWidth = isRoot ? 9.6 : 8.4
  return (
    label.length * charWidth +
    32 +
    (hasPiece ? 24 + 8 : 0) +
    (hasChildren ? 8 + 20 : 0) +
    4
  )
}

const PREVIEW_NODE_HEIGHT = 44
const DESKTOP_PREVIEW_NODE_MIN_WIDTH = 80
const MOBILE_PREVIEW_NODE_WIDTH = 44
const MOBILE_PREVIEW_NODE_MIN_HEIGHT = 94
const MOBILE_PREVIEW_ASSUMED_WIDTH = 390
const localeUi = {
  es: esUi,
  en: enUi,
  fr: frUi,
}

type PreviewMode = 'desktop' | 'mobile'
type RenderNode = PreviewNode & {
  previewPosition: { x: number; y: number }
}

function estimateMobileNodeHeight(label: string, hasPiece: boolean, hasChildren: boolean) {
  return Math.max(
    MOBILE_PREVIEW_NODE_MIN_HEIGHT,
    label.length * 8.4 + 32 + (hasPiece ? 32 : 0) + (hasChildren ? 28 : 0),
  )
}

function getNodeSize(node: PreviewNode, locale: Props['locale'], mode: PreviewMode) {
  const label = getPreviewMoveLabel(node, locale)
  const hasPiece = node.id !== 'root'

  if (mode === 'mobile') {
    return {
      width: MOBILE_PREVIEW_NODE_WIDTH,
      height: estimateMobileNodeHeight(label, hasPiece, node.hasChildren),
    }
  }

  return {
    width: Math.max(
      DESKTOP_PREVIEW_NODE_MIN_WIDTH,
      estimateNodeWidth(label, hasPiece, node.hasChildren, node.id === 'root'),
    ),
    height: PREVIEW_NODE_HEIGHT,
  }
}

function renderPreviewGraph(
  renderNodes: RenderNode[],
  edges: PreviewEdge[],
  locale: Props['locale'],
  mode: PreviewMode,
) {
  const nodesById = new Map(renderNodes.map(node => [node.id, node]))
  const minX = Math.min(
    ...renderNodes.map(node => node.previewPosition.x),
  ) - 120
  const maxX = Math.max(
    ...renderNodes.map(node => {
      const size = getNodeSize(node, locale, mode)
      return node.previewPosition.x + size.width
    }),
  ) + 120
  const maxY = Math.max(
    ...renderNodes.map(node => {
      const size = getNodeSize(node, locale, mode)
      return node.previewPosition.y + size.height
    }),
  ) + 120
  const minY = Math.min(...renderNodes.map(node => node.previewPosition.y)) - 120
  const width = maxX - minX
  const height = maxY - minY

  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox={`${minX} ${minY} ${width} ${height}`}
        style={{
          position: 'absolute',
          left: minX,
          top: minY,
          overflow: 'visible',
        }}
      >
        <defs>
          {edges.map((edge, index) => (
            <marker
              key={edge.id}
              id={`preview-arrow-${mode}-${index}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={edge.color} />
            </marker>
          ))}
        </defs>
        {edges.map((edge, index) => {
          const source = nodesById.get(edge.source)
          const target = nodesById.get(edge.target)
          if (!source || !target) return null

          const sourceSize = getNodeSize(source, locale, mode)
          const targetSize = getNodeSize(target, locale, mode)

          let d: string
          if (mode === 'mobile') {
            const x1 = source.previewPosition.x + sourceSize.width / 2
            const y1 = source.previewPosition.y
            const x2 = target.previewPosition.x + targetSize.width / 2
            const y2 = target.previewPosition.y + targetSize.height
            const midY = y1 - Math.max(24, (y1 - y2) / 2)
            d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`
          } else {
            const x1 = source.previewPosition.x + sourceSize.width
            const y1 = source.previewPosition.y + sourceSize.height / 2
            const x2 = target.previewPosition.x
            const y2 = target.previewPosition.y + targetSize.height / 2
            const midX = x1 + Math.max(24, (x2 - x1) / 2)
            d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`
          }

          return (
            <path
              key={edge.id}
              d={d}
              fill="none"
              stroke={edge.color}
              strokeWidth="2"
              strokeOpacity="0.7"
              markerEnd={`url(#preview-arrow-${mode}-${index})`}
            />
          )
        })}
      </svg>
      {renderNodes.map(node => {
        const piece = node.id === 'root' ? null : previewPiece(node.move, node.color)
        const size = getNodeSize(node, locale, mode)
        const isMobile = mode === 'mobile'

        return (
          <div
            key={node.id}
            data-preview-node-id={node.id}
            style={{
              position: 'absolute',
              left: node.previewPosition.x,
              top: node.previewPosition.y,
              boxSizing: 'border-box',
              width: size.width,
              height: isMobile ? undefined : size.height,
              minHeight: isMobile ? MOBILE_PREVIEW_NODE_MIN_HEIGHT : undefined,
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : undefined,
              gap: '8px',
              background: node.colors.node,
              border: `2px solid ${node.colors.border}`,
              color: node.colors.text,
              borderRadius: '9999px',
              padding: isMobile ? '12px 8px' : '8px 16px',
              fontSize: node.id === 'root' ? '16px' : '14px',
              fontWeight: 700,
              lineHeight: 1,
              whiteSpace: 'nowrap',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              boxShadow: `0 0 8px ${node.colors.border}90, 0 0 20px ${node.colors.edge}40`,
            }}
          >
            {piece && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  flexShrink: 0,
                  borderRadius: '9999px',
                  border: `1px solid ${node.colors.border}60`,
                  background: node.color === 'black' ? node.colors.text : `${node.colors.border}30`,
                  color: node.color === 'black' ? node.colors.node : node.colors.text,
                  fontSize: '18px',
                  lineHeight: 1,
                  transform: isMobile ? 'rotate(270deg)' : undefined,
                }}
              >
                {piece}
              </span>
            )}
            <span
              style={
                isMobile
                  ? {
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      transform: 'rotate(180deg)',
                    }
                  : undefined
              }
            >
              {getPreviewMoveLabel(node, locale)}
            </span>
            {node.hasChildren && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: isMobile ? '20px' : '20px',
                  height: isMobile ? '20px' : '20px',
                  flexShrink: 0,
                  borderRadius: '9999px',
                  border: `1px solid ${node.colors.border}60`,
                  background: `${node.colors.border}30`,
                  color: node.colors.text,
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: 1,
                  transform: isMobile ? 'rotate(270deg)' : undefined,
                }}
              >
                {node.isExpanded ? '−' : '+'}
              </span>
            )}
          </div>
        )
      })}
    </>
  )
}

export function OpeningTreePreview({ slug, locale = 'es' }: Props) {
  const { nodes, edges } = getPreviewGraphForSlug(slug)
  if (!nodes.length) return null

  const ui = localeUi[locale] ?? esUi
  const { offsetX, offsetY, zoom } = computePreviewViewport(nodes)
  const desktopNodes = nodes.map(node => ({
    ...node,
    previewPosition: node.position,
  }))
  const mobileNodes = nodes.map(node => ({
    ...node,
    previewPosition: {
      x: node.position.y,
      y: -node.position.x,
    },
  }))
  const mobileRootX = nodes.find(node => node.id === 'root')?.position.y ?? 0
  const mobileGraphWidth = Math.max(
    Math.max(...nodes.map(node => node.position.y)) -
      Math.min(...nodes.map(node => node.position.y)) +
      90,
    90,
  )
  const mobileZoom = Math.min(
    1,
    Math.max(0.3, (MOBILE_PREVIEW_ASSUMED_WIDTH * 0.88) / mobileGraphWidth),
  )

  return (
    <div
      data-tree-preview=""
      className="absolute inset-0 overflow-hidden"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <div
        className="absolute top-0 left-0 right-0 z-10 hidden items-center justify-between border-b border-neon-purple/[0.14] px-8 py-3 md:flex"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--color-panel) 94%, transparent) 0%, color-mix(in srgb, var(--color-panel) 69%, transparent) 80%, transparent 100%)',
        }}
      >
        <div className="flex flex-col gap-0.5 no-underline">
          <div className="neon-title">{ui.title}</div>
          <div className="neon-subtitle">{ui.subtitle}</div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white-soft/80">
            Stockfish 18 · {ui.evaluation.depth} 14
          </div>
          <div className="font-mono text-[12px] font-bold leading-none text-white-soft">
            0.00
          </div>
        </div>
      </div>
      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          transformOrigin: '0 0',
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`,
        }}
      >
        {renderPreviewGraph(desktopNodes, edges, locale, 'desktop')}
      </div>
      <div
        className="block md:hidden"
        style={{
          position: 'absolute',
          transformOrigin: '0 0',
          transform: `translate(calc(50vw - ${mobileRootX * mobileZoom}px), calc(${MOBILE_BOARD_PANEL_HEIGHT}px + (100dvh - ${MOBILE_BOARD_PANEL_HEIGHT}px) * 0.88)) scale(${mobileZoom})`,
        }}
      >
        {renderPreviewGraph(mobileNodes, edges, locale, 'mobile')}
      </div>
    </div>
  )
}
