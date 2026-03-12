import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

function ChessNode({ id, data }) {
  const {
    move, name, annotation, color, opening,
    isExpanded, hasChildren, colors,
    isSelected, isInActivePath,
    onToggle, onSelect,
  } = data;

  const isRoot = opening === 'root';
  const isWhite = color === 'white';

  const ringStyle = isSelected
    ? { boxShadow: `0 0 0 2px #fff, 0 0 12px ${colors.border}, 0 0 8px ${colors.border}90, 0 0 20px ${colors.edge}40` }
    : isInActivePath
      ? { boxShadow: `0 0 0 2px ${colors.border}90, 0 0 8px ${colors.border}90, 0 0 20px ${colors.edge}40` }
      : { boxShadow: `0 0 8px ${colors.border}90, 0 0 20px ${colors.edge}40` };

  return (
    <div className="flex flex-col items-center gap-1 select-none">
      {/* Target handle */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: 'transparent', border: 'none' }}
      />

      {/* Node pill */}
      <div
        onClick={() => onSelect?.(id)}
        style={{
          backgroundColor: colors.node,
          color: colors.text,
          borderColor: isSelected ? '#fff' : colors.border,
          ...ringStyle,
        }}
        className={[
          'flex items-center gap-2 px-4 py-2 rounded-full border-2 font-mono font-bold cursor-pointer',
          'transition-all duration-150',
          isRoot ? 'text-base ring-2 ring-white/20' : 'text-sm',
          'hover:brightness-125 active:scale-95',
        ].join(' ')}
        title={annotation || undefined}
      >
        {/* White/Black dot */}
        {!isRoot && (
          <span
            className={[
              'inline-block w-2 h-2 rounded-full border flex-shrink-0',
              isWhite ? 'bg-white border-gray-400' : 'bg-gray-900 border-gray-500',
            ].join(' ')}
          />
        )}

        <span>{move}</span>

        {/* Expand/collapse button — separate click area */}
        {hasChildren && (
          <span
            onClick={(e) => { e.stopPropagation(); onToggle?.(id); }}
            className="flex items-center justify-center w-5 h-5 rounded-full text-sm font-bold leading-none flex-shrink-0 transition-all duration-150 hover:brightness-150"
            style={{
              background: `${colors.border}30`,
              border: `1px solid ${colors.border}60`,
              color: colors.text,
            }}
          >
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
