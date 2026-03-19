import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function MobileGate({ children }) {
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState(false);

  if (accepted) return children;

  return (
    <div className="w-screen h-screen bg-app flex items-center justify-center px-8">
      <div className="panel flex flex-col items-center gap-6 px-8 py-10 max-w-sm text-center">
        <span style={{ fontSize: "3rem", lineHeight: 1 }}>♟</span>

        <div className="flex flex-col gap-2">
          <h1 className="neon-title" style={{ fontSize: "1.1rem" }}>
            {t("title")}
          </h1>
          <p className="neon-subtitle">{t("mobile_gate.warning")}</p>
        </div>

        <p className="font-mono text-[14px] leading-relaxed text-neon-cyan/60">
          {t("mobile_gate.designed_for_large")}
          <br />
          <br />
          {t("mobile_gate.mobile_version")}{" "}
          <span className="text-neon-purple/80">{t("mobile_gate.beta")}</span>{t("mobile_gate.may_not_look_good")}
        </p>

        <div className="w-full h-px bg-neon-purple/12" />

        <button
          onClick={() => setAccepted(true)}
          className="w-full py-3 font-mono text-[13px] tracking-widest uppercase border border-neon-purple/38 text-neon-purple bg-neon-purple/6 transition-all duration-150 hover:bg-neon-purple/12 hover:border-neon-purple/60 active:scale-95 cursor-pointer"
          style={{
            boxShadow:
              "0 0 12px color-mix(in srgb, var(--color-neon-purple) 14%, transparent)",
          }}
        >
          {t("mobile_gate.continue")}
        </button>
      </div>
    </div>
  );
}
