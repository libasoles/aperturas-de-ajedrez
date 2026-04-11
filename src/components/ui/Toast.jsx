import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Toast({ message, isVisible, onDismiss, duration = 4000 }) {
  useEffect(() => {
    if (!isVisible || !message) {
      return;
    }

    // Auto-close after duration
    const timeoutId = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isVisible, message, duration, onDismiss]);

  if (!isVisible || !message) return null;

  const toastContent = (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-90deg)",
          transformOrigin: "center",
          width: "100dvh",
          height: "100dvw",
        }}
      >
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="absolute bottom-1 left-1 max-w-sm animate-[slide-up_0.3s_ease-out] pointer-events-auto"
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm"
            style={{
              background: "color-mix(in srgb, var(--color-panel) 92%, transparent)",
              borderColor: "var(--color-neon-purple)",
              color: "var(--color-text)",
              boxShadow: "0 0 16px color-mix(in srgb, var(--color-neon-purple) 18%, transparent)",
            }}
          >
            <p className="text-xs flex-1 leading-snug font-sans">{message}</p>
            <button
              onClick={onDismiss}
              aria-label="Cerrar notificación"
              className="shrink-0 flex items-center justify-center w-4 h-4 rounded hover:bg-white/10 transition-colors"
              style={{ color: "var(--color-neon-purple)" }}
            >
              <span className="text-sm leading-none">✕</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(toastContent, document.body);
}
