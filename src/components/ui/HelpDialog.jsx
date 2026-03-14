import * as Dialog from "@radix-ui/react-dialog";

const rows = [
  {
    key: "click",
    label: "Clic en nodo",
    desc: "Selecciona el nodo y muestra las jugadas en el tablero",
  },
  {
    key: "tab",
    label: "Tab / Shift+Tab",
    desc: "Avanza al próximo nodo / retrocede al nodo anterior",
  },
  {
    key: "flecha",
    label: "→ (flecha)",
    desc: "Despliega los nodos hasta la próxima bifurcación",
  },
  {
    key: "space",
    label: "Espacio",
    desc: "Si hay un nodo seleccionado, despliega los hijos hasta la próxima bifurcación (igual que →)",
  },

  {
    key: "flip",
    label: "↻ Girar tablero",
    desc: "Invierte la perspectiva del tablero",
  },
  {
    key: "play",
    label: "▶ Reproducir",
    desc: "Anima las jugadas una por una",
  },
];

export default function HelpDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          tabIndex={-1}
          title="Ayuda"
          className="flex items-center justify-center w-7 h-7 rounded-full border font-mono font-bold text-[15px] leading-none transition-all duration-150 hover:brightness-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 cursor-pointer"
          style={{
            color: "var(--color-neon-purple)",
            borderColor:
              "color-mix(in srgb, var(--color-neon-purple) 40%, transparent)",
            background:
              "color-mix(in srgb, var(--color-neon-purple) 10%, transparent)",
          }}
        >
          ?
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}
        />
        <Dialog.Content className="panel fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[480px] max-w-[90vw] flex flex-col gap-5 px-7 py-6 focus:outline-none">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Dialog.Title
              className="font-mono text-[11px] tracking-[0.35em] uppercase"
              style={{ color: "var(--color-neon-purple)" }}
            >
              Ayuda
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                tabIndex={0}
                className="flex items-center justify-center w-6 h-6 rounded-full font-mono text-[14px] leading-none transition-all duration-150 hover:brightness-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-neon-purple) 60%, transparent)",
                }}
              >
                ✕
              </button>
            </Dialog.Close>
          </div>

          {/* Table */}
          <div className="flex flex-col">
            {rows.map((row, i) => (
              <div
                key={row.key}
                className="flex items-start gap-4 py-3"
                style={{
                  borderTop:
                    i === 0
                      ? "1px solid color-mix(in srgb, var(--color-neon-purple) 12%, transparent)"
                      : "1px solid color-mix(in srgb, var(--color-neon-purple) 12%, transparent)",
                }}
              >
                <span
                  className="font-mono text-[14px] font-bold shrink-0 w-36"
                  style={{ color: "var(--color-neon-purple)" }}
                >
                  {row.label}
                </span>
                <span
                  className="font-sans text-[14px] leading-snug"
                  style={{ color: "#c8bfe0" }}
                >
                  {row.desc}
                </span>
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
