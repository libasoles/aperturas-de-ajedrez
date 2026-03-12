import { useState, useRef, useEffect, useCallback } from 'react';

export default function OpeningsPanel({
  openings,
  activeOpening,
  onToggleOpening,
  isAllExpanded,
  onToggleAll,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [pos, setPos] = useState(null);
  const panelRef = useRef(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const rect = panelRef.current.getBoundingClientRect();
    dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, originX: rect.left, originY: rect.top };
  }, []);

  useEffect(() => {
    function onMouseMove(e) {
      if (!dragRef.current.dragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPos({ x: dragRef.current.originX + dx, y: dragRef.current.originY + dy });
    }
    function onMouseUp() { dragRef.current.dragging = false; }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const positionStyle = pos
    ? { left: pos.x, top: pos.y }
    : { top: 72, right: 24 };

  return (
    <div
      ref={panelRef}
      className="absolute z-20 flex flex-col"
      style={{
        ...positionStyle,
        background: '#0a0a14f5',
        border: '1px solid #bf5fff40',
        boxShadow: '0 0 24px #bf5fff20, 0 0 48px #00000080',
        backdropFilter: 'blur(8px)',
        width: 492,
      }}
    >
      {/* Drag handle bar */}
      <div
        className="flex justify-center py-1 cursor-grab"
        onMouseDown={onMouseDown}
        style={{ borderBottom: '1px solid #bf5fff15' }}
      >
        <span className="flex gap-0.75 opacity-40 hover:opacity-70 transition-opacity">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="inline-block w-1 h-1 rounded-full"
              style={{ background: '#bf5fff' }}
            />
          ))}
        </span>
      </div>

      {/* Header row */}
      <div
        className="flex items-center justify-between px-4 py-2 cursor-grab"
        onMouseDown={onMouseDown}
      >
        <span
          className="font-mono text-[11px] tracking-[0.35em] uppercase"
          style={{ color: '#bf5fffb0' }}
        >
          Aperturas
        </span>
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => setCollapsed((c) => !c)}
          className="font-mono text-[14px] leading-none transition-all duration-150 hover:brightness-150"
          style={{ color: '#bf5fff80' }}
        >
          {collapsed ? '▸' : '▾'}
        </button>
      </div>

      {/* Body */}
      {!collapsed && (
        <div className="flex flex-col gap-3 px-4 pb-4">
          {openings.map((group) => (
            <div key={group.group} className="flex flex-col gap-1.5">
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: '#bf5fff60' }}
              >
                {group.group}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {group.openings.map((opening) => {
                  const isActive = activeOpening === opening.nodeId;
                  return (
                    <button
                      key={opening.label}
                      onClick={() => onToggleOpening(opening.nodeId)}
                      className="flex items-center gap-2 px-3 py-2 border transition-all duration-150 active:scale-95"
                      style={{
                        borderColor: isActive ? opening.glow : `${opening.color}40`,
                        background: isActive ? `${opening.color}20` : 'transparent',
                        boxShadow: isActive ? `0 0 12px ${opening.glow}40` : 'none',
                      }}
                    >
                      <span
                        className="inline-block w-2 h-2 shrink-0 transition-all duration-150"
                        style={{
                          backgroundColor: isActive ? opening.color : 'transparent',
                          border: `1px solid ${opening.color}`,
                          boxShadow: isActive ? `0 0 6px ${opening.glow}` : 'none',
                        }}
                      />
                      <span
                        className="font-mono text-[13px] tracking-wide"
                        style={{
                          color: isActive ? opening.text : `${opening.text}cc`,
                          textShadow: isActive ? `0 0 6px ${opening.glow}80` : 'none',
                        }}
                      >
                        {opening.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="w-full h-px" style={{ background: '#bf5fff20' }} />

          <button
            onClick={onToggleAll}
            className="self-start font-mono text-[12px] tracking-widest uppercase px-3 py-2 border transition-all duration-150 active:scale-95"
            style={{
              color: isAllExpanded ? '#ff2d78' : '#00f5ffcc',
              borderColor: isAllExpanded ? '#ff2d7860' : '#00f5ff60',
              background: isAllExpanded ? '#ff2d7810' : 'transparent',
              boxShadow: isAllExpanded ? '0 0 8px #ff2d7840' : 'none',
              textShadow: isAllExpanded ? '0 0 6px #ff2d78' : 'none',
            }}
          >
            {isAllExpanded ? '[ colapsar ]' : '[ expandir todo ]'}
          </button>
        </div>
      )}
    </div>
  );
}
