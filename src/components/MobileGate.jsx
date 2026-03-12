import { useEffect, useState } from 'react';

export default function MobileGate({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isMobile) return children;

  return (
    <div className="w-screen h-screen bg-app flex items-center justify-center px-8">
      <div className="panel flex flex-col items-center gap-6 px-8 py-10 max-w-sm text-center">
        <span style={{ fontSize: '3rem', lineHeight: 1 }}>♟</span>

        <div className="flex flex-col gap-2">
          <h1 className="neon-title" style={{ fontSize: '1.1rem' }}>
            Árbol de Aperturas
          </h1>
          <p className="neon-subtitle">Solo versión escritorio</p>
        </div>

        <p className="font-mono text-[13px] leading-relaxed text-neon-cyan/60">
          Esta app requiere una pantalla más grande para mostrar el árbol interactivo.
          <br />
          Ábrela desde tu computadora.
        </p>

        <div className="w-full h-px bg-neon-purple/12" />

        <p className="font-mono text-[11px] tracking-widest uppercase text-neon-purple/40">
          Mínimo 1024 px de ancho
        </p>
      </div>
    </div>
  );
}
