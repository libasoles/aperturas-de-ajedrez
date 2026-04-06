import { useTranslation } from "react-i18next";
import PremiumLockIcon from "./PremiumLockIcon";

export default function PremiumContentGate({ contentId, onClose }) {
  const { t } = useTranslation();
  const contentName =
    t(`openings:${contentId}.name`, { defaultValue: "" }) ||
    t("premium_gate.fallback_name", { defaultValue: "esta variante" });

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-app/72 backdrop-blur-[2px]" />
      <div className="panel relative flex w-full max-w-md flex-col gap-3 px-4 py-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center border border-neon-cyan/20 text-neon-cyan/70 transition-all duration-150 hover:border-neon-cyan/40 hover:text-neon-cyan cursor-pointer"
          title={t("premium_gate.close", { defaultValue: "Cerrar" })}
        >
          <span className="text-[18px] leading-none">×</span>
        </button>

        <div className="flex items-start gap-3 pr-8">
          <span className="flex items-center justify-center w-8 h-8 rounded-full border border-amber-300/30 text-amber-200 bg-amber-400/8">
            <PremiumLockIcon className="w-5 h-5" title="Contenido bloqueado" />
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[15px] font-bold text-white-soft">
              {t("premium_gate.title", {
                defaultValue: "{{contentName}}",
                contentName,
              })}
            </span>
            <span className="font-sans text-[14px] leading-relaxed text-white-soft/75">
              {t("premium_gate.body", {
                defaultValue: "Esta apertura aún no está disponible.",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
