import * as Dialog from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";

const ROW_KEYS = ["click", "flecha", "tab", "space", "arrows-lr", "arrows-ud", "flip", "play"];

export default function HelpDialog({ open, onOpenChange }) {
  const { t } = useTranslation();
  const isControlled = typeof open === "boolean";

  return (
    <Dialog.Root {...(isControlled ? { open, onOpenChange } : {})}>
      <Dialog.Trigger asChild>
        <button
          tabIndex={-1}
          title={t("help.title")}
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
              {t("help.title")}
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
            {ROW_KEYS.map((key) => (
              <div
                key={key}
                className="flex items-start gap-4 py-3"
                style={{
                  borderTop: "1px solid color-mix(in srgb, var(--color-neon-purple) 12%, transparent)",
                }}
              >
                <span
                  className="font-mono text-[14px] font-bold shrink-0 w-36"
                  style={{ color: "var(--color-neon-purple)" }}
                >
                  {t(`help.rows.${key}.label`)}
                </span>
                <span
                  className="font-sans text-[14px] leading-snug"
                  style={{ color: "#c8bfe0" }}
                >
                  {t(`help.rows.${key}.desc`)}
                </span>
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
