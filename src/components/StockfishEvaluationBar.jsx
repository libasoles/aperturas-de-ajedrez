import { useTranslation } from "react-i18next";
import {
  formatStockfishScore,
  MAX_VISIBLE_STOCKFISH_SCORE,
} from "../utils/stockfishEvaluation";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getScoreValue(stockfish) {
  if (!stockfish) return 0;
  if (typeof stockfish.score === "number") return stockfish.score;
  if (typeof stockfish.mate === "number") {
    return stockfish.mate > 0
      ? MAX_VISIBLE_STOCKFISH_SCORE
      : -MAX_VISIBLE_STOCKFISH_SCORE;
  }
  return 0;
}

export default function StockfishEvaluationBar({
  stockfish,
  orientation = "vertical",
  className = "",
}) {
  const { t } = useTranslation();
  const score = getScoreValue(stockfish);
  const whitePct = clamp(
    50 + (score / MAX_VISIBLE_STOCKFISH_SCORE) * 50,
    4,
    96,
  );
  const blackPct = 100 - whitePct;
  const leader =
    score > 0.05
      ? t("evaluation.white")
      : score < -0.05
        ? t("evaluation.black")
        : t("evaluation.equal");

  if (orientation === "horizontal") {
    return (
      <div className={className}>
        <div
          className="relative h-1.5 w-full overflow-hidden bg-[#101010]"
          aria-label={`${t("evaluation.label")}: ${leader} ${formatStockfishScore(stockfish)}`}
          title={`${leader} ${formatStockfishScore(stockfish)}`}
        >
          <div
            className="absolute left-0 top-0 h-full bg-[#111]"
            style={{ width: `${blackPct}%` }}
          />
          <div
            className="absolute right-0 top-0 h-full bg-white-soft"
            style={{ width: `${whitePct}%` }}
          />
          <div className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-neon-purple/55" />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className="relative h-full w-1.5 overflow-hidden bg-[#111]"
        aria-label={`${t("evaluation.label")}: ${leader} ${formatStockfishScore(stockfish)}`}
        title={`${leader} ${formatStockfishScore(stockfish)}`}
      >
        <div
          className="absolute bottom-0 left-0 w-full bg-white-soft"
          style={{ height: `${whitePct}%` }}
        />
        <div
          className="absolute top-0 left-0 w-full bg-[#111]"
          style={{ height: `${blackPct}%` }}
        />
        <div className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 bg-neon-purple/55" />
      </div>
    </div>
  );
}
