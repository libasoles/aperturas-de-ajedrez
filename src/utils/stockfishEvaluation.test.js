import { describe, expect, it } from "vitest";
import {
  DEFAULT_STOCKFISH_LABEL_THRESHOLD,
  isSignificantEngineGeneratedStockfishNode,
  resolveStockfishLabelThreshold,
} from "./stockfishEvaluation";

describe("stockfishEvaluation", () => {
  it("marks engine-generated nodes above the configured threshold", () => {
    expect(
      isSignificantEngineGeneratedStockfishNode(
        { engineGenerated: true, color: "black", stockfish: { depth: 14, score: 0.51 } },
        0.5,
      ),
    ).toBe(true);
  });

  it("does not mark non-engine nodes or scores at the threshold", () => {
    expect(
      isSignificantEngineGeneratedStockfishNode(
        { engineGenerated: true, stockfish: { depth: 14, score: 0.5 } },
        0.5,
      ),
    ).toBe(false);
    expect(
      isSignificantEngineGeneratedStockfishNode(
        { stockfish: { depth: 14, score: 0.9 } },
        0.5,
      ),
    ).toBe(false);
  });

  it("uses the absolute score and treats mate as significant", () => {
    expect(
      isSignificantEngineGeneratedStockfishNode(
        { engineGenerated: true, stockfish: { depth: 14, score: -0.7 } },
        0.5,
      ),
    ).toBe(true);
    expect(
      isSignificantEngineGeneratedStockfishNode(
        { engineGenerated: true, stockfish: { depth: 14, mate: -3 } },
        0.5,
      ),
    ).toBe(true);
  });

  it("resolves invalid thresholds to the default", () => {
    expect(resolveStockfishLabelThreshold("0.75")).toBe(0.75);
    expect(resolveStockfishLabelThreshold("bad")).toBe(
      DEFAULT_STOCKFISH_LABEL_THRESHOLD,
    );
  });
});
