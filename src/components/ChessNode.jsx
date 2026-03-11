import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

function ChessNode({ id, data }) {
  const { move, name, annotation, color, opening, isExpanded, hasChildren, colors } = data;

  const isRoot = opening === 'root';
  const isWhite = color === 'white';

  return (
    <div
      className={[
        'flex flex-col items-center gap-1 select-none',
        hasChildren ? 'cursor-pointer' : 'cursor-default',
      ].join(' ')}
      title={annotation || undefined}
    >
      {/* Target handle (hidden visually) */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: 'transparent', border: 'none' }}
      />

      {/* Node pill */}
      <div
        style={{
          backgroundColor: colors.node,
          color: colors.text,
          borderColor: colors.border,
          boxShadow: `0 0 8px ${colors.border}90, 0 0 20px ${colors.edge}40`,
        }}
        className={[
          'flex items-center gap-1.5 px-4 py-2 rounded-full border-2 font-mono font-bold',
          'transition-all duration-150',
          isRoot ? 'text-base ring-2 ring-white/20' : 'text-sm',
          hasChildren ? 'hover:brightness-125 active:scale-95' : '',
        ].join(' ')}
      >
        {/* White/Black indicator dot */}
        {!isRoot && (
          <span
            className={[
              'inline-block w-2 h-2 rounded-full border',
              isWhite
                ? 'bg-white border-gray-400'
                : 'bg-gray-900 border-gray-500',
            ].join(' ')}
          />
        )}

        <span>{move}</span>

        {/* Expand/collapse indicator */}
        {hasChildren && (
          <span className="text-xs opacity-60 ml-0.5">
            {isExpanded ? '−' : '+'}
          </span>
        )}
      </div>

      {/* Opening name label */}
      {name && (
        <span
          style={{ color: colors.text }}
          className="text-[10px] font-sans opacity-70 max-w-[120px] text-center leading-tight"
        >
          {name}
        </span>
      )}

      {/* Source handle */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: 'transparent', border: 'none' }}
      />
    </div>
  );
}

export default memo(ChessNode);
