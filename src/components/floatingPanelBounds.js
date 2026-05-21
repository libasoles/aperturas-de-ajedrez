export const FLOATING_PANEL_VIEWPORT_INSET = 16;

function clamp(value, min, max) {
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
}

export function clampPanelToViewport({ x, y, width, height }) {
  return {
    x: clamp(
      x,
      FLOATING_PANEL_VIEWPORT_INSET,
      window.innerWidth - width - FLOATING_PANEL_VIEWPORT_INSET,
    ),
    y: clamp(
      y,
      FLOATING_PANEL_VIEWPORT_INSET,
      window.innerHeight - height - FLOATING_PANEL_VIEWPORT_INSET,
    ),
  };
}

export function getAvailablePanelHeight({ pos, defaultPosition }) {
  if (pos) {
    return `calc(100dvh - ${pos.y + FLOATING_PANEL_VIEWPORT_INSET}px)`;
  }

  if (typeof defaultPosition?.top === "number") {
    return `calc(100dvh - ${
      defaultPosition.top + FLOATING_PANEL_VIEWPORT_INSET
    }px)`;
  }

  if (typeof defaultPosition?.top === "string") {
    return `calc(100dvh - (${defaultPosition.top}) - ${FLOATING_PANEL_VIEWPORT_INSET}px)`;
  }

  if (typeof defaultPosition?.bottom === "number") {
    return `calc(100dvh - ${
      defaultPosition.bottom + FLOATING_PANEL_VIEWPORT_INSET
    }px)`;
  }

  return `calc(100dvh - ${FLOATING_PANEL_VIEWPORT_INSET * 2}px)`;
}

export function getPanelViewportBoundsStyle({
  pos,
  defaultPosition,
  fillAvailableHeight = false,
}) {
  const maxHeight = getAvailablePanelHeight({ pos, defaultPosition });

  const boundsStyle = {
    maxWidth: `calc(100dvw - ${FLOATING_PANEL_VIEWPORT_INSET * 2}px)`,
    maxHeight,
  };

  return fillAvailableHeight
    ? {
        ...boundsStyle,
        height: maxHeight,
      }
    : boundsStyle;
}
