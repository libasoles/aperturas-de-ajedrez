import { useState } from "react";

export default function MobileGate({ children }) {
  const [accepted, setAccepted] = useState(false);

  if (accepted) return children;

  return (
    <div className="w-screen h-screen bg-app flex items-center justify-center px-8">
      <div className="panel flex flex-col items-center gap-6 px-8 py-10 max-w-sm text-center">
        <span style={{ fontSize: "3rem", lineHeight: 1 }}>♟</span>

        <div className="flex flex-col gap-2">
          <h1 className="neon-title" style={{ fontSize: "1.1rem" }}>
            Árbol de Aperturas
          </h1>
          <p className="neon-subtitle">Advertencia</p>
        </div>

        <p className="font-mono text-[14px] leading-relaxed text-neon-cyan/60">
          Esta app está diseñada para pantallas grandes.
          <br />
          <br />
          La versión móvil está en{" "}
          <span className="text-neon-purple/80">beta</span>, y algunos elementos
          pueden no verse bien.
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
          Continuar
        </button>
      </div>
    </div>
  );
}
