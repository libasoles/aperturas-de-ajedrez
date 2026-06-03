import { computePreviewViewport, getPreviewNodesForSlug } from '@/lib/openingPreview'

interface Props {
  slug: string
}

/**
 * Server-rendered visual preview of the opening tree.
 * Shows the expanded pills before JavaScript loads.
 * ReactFlow replaces it once the client bundle hydrates.
 */
export function OpeningTreePreview({ slug }: Props) {
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
        {nodes.map(node => (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: node.position.x,
              top: node.position.y,
              background: node.colors.node,
              border: `1px solid ${node.colors.border}`,
              color: node.colors.text,
              borderRadius: '9999px',
              padding: '3px 14px',
              fontSize: '13px',
              lineHeight: '1.5',
              whiteSpace: 'nowrap',
              transform: 'translateY(-50%)',
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            {node.move}
          </div>
        ))}
      </div>
    </div>
  )
}
