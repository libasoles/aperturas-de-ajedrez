export const MAX_VISIBLE_STOCKFISH_SCORE = 5;

export function formatStockfishScore(stockfish) {
  if (!stockfish) return "0.00";
  if (typeof stockfish.mate === "number") {
    return stockfish.mate > 0 ? `M${stockfish.mate}` : `-M${Math.abs(stockfish.mate)}`;
  }
  const score = typeof stockfish.score === "number" ? stockfish.score : 0;
  return score > 0 ? `+${score.toFixed(2)}` : score.toFixed(2);
}
