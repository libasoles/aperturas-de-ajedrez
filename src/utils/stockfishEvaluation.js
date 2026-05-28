export const MAX_VISIBLE_STOCKFISH_SCORE = 5;
export const DEFAULT_STOCKFISH_LABEL_THRESHOLD = 0.5;

export function resolveStockfishLabelThreshold(
  value = import.meta.env.VITE_STOCKFISH_LABEL_THRESHOLD,
) {
  const threshold = Number(value);
  return Number.isFinite(threshold) && threshold >= 0
    ? threshold
    : DEFAULT_STOCKFISH_LABEL_THRESHOLD;
}

export function isSignificantEngineGeneratedStockfishNode(
  node,
  threshold = DEFAULT_STOCKFISH_LABEL_THRESHOLD,
) {
  if (!node?.engineGenerated || !node.stockfish) return false;
  if (typeof node.stockfish.mate === "number") return true;
  if (typeof node.stockfish.score !== "number") return false;
  const score = node.stockfish.score;
  if (node.color === "black") return score > threshold;
  return score < -threshold;
}

export function formatStockfishScore(stockfish) {
  if (!stockfish) return "0.00";
  if (typeof stockfish.mate === "number") {
    return stockfish.mate > 0 ? `M${stockfish.mate}` : `-M${Math.abs(stockfish.mate)}`;
  }
  const score = typeof stockfish.score === "number" ? stockfish.score : 0;
  return score > 0 ? `+${score.toFixed(2)}` : score.toFixed(2);
}
