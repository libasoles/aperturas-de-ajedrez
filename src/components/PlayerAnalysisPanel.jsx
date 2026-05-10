import { useMemo } from "react";
import { toFrenchSAN, toSpanishSAN } from "../utils/chessPath";

function pct(value) {
  return `${Math.round(value * 100)}%`;
}

function san(move, locale) {
  return locale === "en" ? move : locale === "fr" ? toFrenchSAN(move) : toSpanishSAN(move);
}

function formatSequence(sequence, locale) {
  return sequence
    .map((move, index) => `${index % 2 === 0 ? `${Math.floor(index / 2) + 1}. ` : ""}${san(move, locale)}`)
    .join(" ");
}

export default function PlayerAnalysisPanel({
  selectedNode,
  continuations,
  transpositions,
  gameDetails,
  onLoadGame,
  locale,
  isLoading,
}) {
  const modelGameIds = useMemo(
    () => selectedNode?.example_game_ids ?? [],
    [selectedNode?.example_game_ids],
  );
  const hasStats = selectedNode?.times_played > 0;
  const positionLabel = selectedNode?.move ? san(selectedNode.move, locale) : "Inicial";
  const loadedGames = useMemo(
    () => modelGameIds.map((id) => gameDetails[id]).filter(Boolean),
    [gameDetails, modelGameIds],
  );

  return (
    <aside
      className="panel absolute left-4 top-24 z-20 w-[360px] max-h-[calc(100vh-8rem)] overflow-auto p-4"
      aria-label="Análisis del jugador"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-neon-purple">posición</div>
          <h2 className="mt-1 text-lg font-bold text-white-soft">{positionLabel}</h2>
        </div>
        {isLoading ? <span className="font-mono text-xs text-neon-cyan/70">cargando</span> : null}
      </div>

      <section className="mt-4 grid grid-cols-4 gap-2 text-center font-mono">
        <div className="border border-neon-purple/20 p-2">
          <div className="text-[10px] uppercase text-neon-cyan/55">Veces</div>
          <div className="text-lg text-white-soft">{selectedNode?.times_played ?? "-"}</div>
        </div>
        <div className="border border-neon-purple/20 p-2">
          <div className="text-[10px] uppercase text-neon-cyan/55">Score</div>
          <div className="text-lg text-white-soft">{hasStats ? pct(selectedNode.score_pct) : "-"}</div>
        </div>
        <div className="border border-neon-purple/20 p-2">
          <div className="text-[10px] uppercase text-neon-cyan/55">G</div>
          <div className="text-lg text-white-soft">{selectedNode?.wins ?? "-"}</div>
        </div>
        <div className="border border-neon-purple/20 p-2">
          <div className="text-[10px] uppercase text-neon-cyan/55">T/P</div>
          <div className="text-lg text-white-soft">
            {hasStats ? `${selectedNode.draws}/${selectedNode.losses}` : "-"}
          </div>
        </div>
      </section>

      <section className="mt-5">
        <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-neon-purple">continuaciones</h3>
        <div className="mt-2 flex flex-col gap-2">
          {continuations.length ? (
            continuations.slice(0, 8).map((move) => (
              <div key={`${move.san}:${move.fen}`} className="flex items-center justify-between gap-3 border-b border-neon-purple/10 pb-2 font-mono text-sm">
                <span className="text-white-soft">{san(move.san, locale)}</span>
                <span className="text-neon-cyan/70">{move.times_played} · {pct(move.score_pct)}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-neon-cyan/55">Sin continuaciones en esta posición.</p>
          )}
        </div>
      </section>

      <section className="mt-5">
        <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-neon-purple">partidas modelo</h3>
        <div className="mt-2 flex flex-col gap-2">
          {modelGameIds.length ? (
            modelGameIds.map((gameId) => (
              <button
                key={gameId}
                onClick={() => onLoadGame(gameId)}
                className="text-left border border-neon-cyan/15 px-3 py-2 font-mono text-xs text-neon-cyan/75 hover:border-neon-cyan/45 hover:text-neon-cyan"
              >
                {gameDetails[gameId] ? `${gameDetails[gameId].white} - ${gameDetails[gameId].black}` : gameId.slice(0, 12)}
              </button>
            ))
          ) : (
            <p className="text-sm text-neon-cyan/55">Seleccioná una jugada para ver ejemplos.</p>
          )}
        </div>
        {loadedGames.length ? (
          <div className="mt-3 text-xs text-neon-cyan/50">
            {loadedGames[0].event} · {loadedGames[0].date} · {loadedGames[0].result}
          </div>
        ) : null}
      </section>

      <section className="mt-5">
        <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-neon-purple">también se llega por...</h3>
        <div className="mt-2 flex flex-col gap-2">
          {transpositions.length ? (
            transpositions.map((item) => (
              <div key={item.sequence.join(" ")} className="font-mono text-xs leading-relaxed text-neon-cyan/65">
                {formatSequence(item.sequence, locale)}
              </div>
            ))
          ) : (
            <p className="text-sm text-neon-cyan/55">No hay transposiciones agregadas para esta posición.</p>
          )}
        </div>
      </section>
    </aside>
  );
}
