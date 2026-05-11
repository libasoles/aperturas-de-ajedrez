import { useCallback, useEffect, useRef, useState } from "react";
import {
  clampPanelToViewport,
  FLOATING_PANEL_VIEWPORT_INSET,
  getPanelViewportBoundsStyle,
} from "./floatingPanelBounds";

const DRAG_HANDLE_DOTS = [0, 1, 2, 3, 4, 5];

export default function FloatingPanel({
  children,
  defaultPosition,
  width = 492,
  className = "",
  style,
  ariaLabel,
  fillAvailableHeight = false,
  resizable = false,
  minWidth = 320,
  minHeight = 240,
}) {
  const panelRef = useRef(null);
  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });
  const resizeRef = useRef({
    resizing: false,
    startX: 0,
    startY: 0,
    originWidth: 0,
    originHeight: 0,
    originX: 0,
    originY: 0,
  });
  const [pos, setPos] = useState(null);
  const [size, setSize] = useState(null);

  const onMouseDown = useCallback((event) => {
    if (event.button !== 0 || !panelRef.current) return;
    event.preventDefault();

    const rect = panelRef.current.getBoundingClientRect();
    if (fillAvailableHeight || resizable) {
      setSize({ width: rect.width, height: rect.height });
    }
    dragRef.current = {
      dragging: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: rect.left,
      originY: rect.top,
    };
  }, [fillAvailableHeight, resizable]);

  const onResizeMouseDown = useCallback((event) => {
    if (event.button !== 0 || !panelRef.current) return;
    event.preventDefault();
    event.stopPropagation();

    const rect = panelRef.current.getBoundingClientRect();
    setPos({ x: rect.left, y: rect.top });
    setSize({ width: rect.width, height: rect.height });
    resizeRef.current = {
      resizing: true,
      startX: event.clientX,
      startY: event.clientY,
      originWidth: rect.width,
      originHeight: rect.height,
      originX: rect.left,
      originY: rect.top,
    };
  }, []);

  useEffect(() => {
    function onMouseMove(event) {
      if (resizeRef.current.resizing) {
        const maxWidth =
          window.innerWidth -
          resizeRef.current.originX -
          FLOATING_PANEL_VIEWPORT_INSET;
        const maxHeight =
          window.innerHeight -
          resizeRef.current.originY -
          FLOATING_PANEL_VIEWPORT_INSET;

        setSize({
          width: Math.min(
            Math.max(
              resizeRef.current.originWidth +
                event.clientX -
                resizeRef.current.startX,
              minWidth,
            ),
            maxWidth,
          ),
          height: Math.min(
            Math.max(
              resizeRef.current.originHeight +
                event.clientY -
                resizeRef.current.startY,
              minHeight,
            ),
            maxHeight,
          ),
        });
        return;
      }

      if (!dragRef.current.dragging) return;

      const rect = panelRef.current?.getBoundingClientRect();
      const nextPos = {
        x: dragRef.current.originX + event.clientX - dragRef.current.startX,
        y: dragRef.current.originY + event.clientY - dragRef.current.startY,
      };

      setPos(
        rect
          ? clampPanelToViewport({
              ...nextPos,
              width: rect.width,
              height: rect.height,
            })
          : nextPos,
      );
    }

    function onMouseUp() {
      dragRef.current.dragging = false;
      resizeRef.current.resizing = false;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [minHeight, minWidth]);

  const positionStyle = pos
    ? { left: pos.x, top: pos.y, bottom: "auto", right: "auto" }
    : defaultPosition;
  const viewportBoundsStyle = getPanelViewportBoundsStyle({
    pos,
    defaultPosition,
    fillAvailableHeight,
  });

  return (
    <aside
      ref={panelRef}
      className={`panel absolute z-20 flex flex-col overflow-hidden ${className}`}
      style={{
        ...positionStyle,
        width,
        ...viewportBoundsStyle,
        ...(size
          ? {
              width: size.width,
              height: size.height,
            }
          : null),
        ...style,
      }}
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

      {resizable ? (
        <button
          type="button"
          aria-label="Redimensionar panel"
          className="absolute bottom-1 right-1 h-4 w-4 cursor-nwse-resize border-0 bg-transparent p-0"
          onMouseDown={onResizeMouseDown}
          style={{
            background:
              "linear-gradient(135deg, transparent 0 45%, color-mix(in srgb, var(--color-neon-purple) 55%, transparent) 45% 55%, transparent 55% 100%)",
          }}
        />
      ) : null}
    </aside>
  );
}
