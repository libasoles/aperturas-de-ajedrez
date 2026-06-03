import {
  computePreviewViewport,
  getPreviewMoveLabel,
  getPreviewNodesForSlug,
} from '@/lib/openingPreview'

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

export function OpeningTreePreview({ slug, locale = 'es' }: Props) {
  const nodes = getPreviewNodesForSlug(slug)
  if (!nodes.length) return null

  const { offsetX, offsetY, zoom } = computePreviewViewport(nodes)

  return (
    <div
      data-tree-preview=""
      className="absolute inset-0 overflow-hidden"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          transformOrigin: '0 0',
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`,
        }}
      >
        {nodes.map(node => {
          const piece = node.id === 'root' ? null : previewPiece(node.move, node.color)
          return (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: node.position.x,
                top: node.position.y,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: node.colors.node,
                border: `2px solid ${node.colors.border}`,
                color: node.colors.text,
                borderRadius: '9999px',
                padding: '8px 16px',
                fontSize: node.id === 'root' ? '16px' : '14px',
                fontWeight: 700,
                lineHeight: 1,
                whiteSpace: 'nowrap',
                transform: 'translateY(-50%)',
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
                  }}
                >
                  {piece}
                </span>
              )}
              <span>{getPreviewMoveLabel(node, locale)}</span>
              {node.hasChildren && (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    flexShrink: 0,
                    borderRadius: '9999px',
                    border: `1px solid ${node.colors.border}60`,
                    background: `${node.colors.border}30`,
                    color: node.colors.text,
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {node.isExpanded ? '−' : '+'}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
