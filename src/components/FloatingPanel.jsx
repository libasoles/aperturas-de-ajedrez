import { useCallback, useEffect, useRef, useState } from "react";

const DRAG_HANDLE_DOTS = [0, 1, 2, 3, 4, 5];

export default function FloatingPanel({
  children,
  defaultPosition,
  width = 492,
  className = "",
  style,
  ariaLabel,
}) {
  const panelRef = useRef(null);
  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });
  const [pos, setPos] = useState(null);

  const onMouseDown = useCallback((event) => {
    if (event.button !== 0 || !panelRef.current) return;
    event.preventDefault();

    const rect = panelRef.current.getBoundingClientRect();
    dragRef.current = {
      dragging: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: rect.left,
      originY: rect.top,
    };
  }, []);

  useEffect(() => {
    function onMouseMove(event) {
      if (!dragRef.current.dragging) return;

      setPos({
        x: dragRef.current.originX + event.clientX - dragRef.current.startX,
        y: dragRef.current.originY + event.clientY - dragRef.current.startY,
      });
    }

    function onMouseUp() {
      dragRef.current.dragging = false;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const positionStyle = pos
    ? { left: pos.x, top: pos.y, bottom: "auto", right: "auto" }
    : defaultPosition;
  return (
    <aside
      ref={panelRef}
      className={`panel absolute z-20 flex flex-col ${className}`}
      style={{ ...positionStyle, width, ...style }}
      aria-label={ariaLabel}
    >
      <div
        className="panel-divider flex justify-center py-1 cursor-grab"
        onMouseDown={onMouseDown}
      >
        <span className="flex gap-0.75 opacity-40 hover:opacity-70 transition-opacity">
          {DRAG_HANDLE_DOTS.map((dot) => (
            <span
              key={dot}
              className="inline-block w-1 h-1 rounded-full bg-neon-purple"
            />
          ))}
        </span>
      </div>

      {children}
    </aside>
  );
}
