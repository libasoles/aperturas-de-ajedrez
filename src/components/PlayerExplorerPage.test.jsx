import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { usePlayerExplorer } from "./PlayerExplorerPage";

const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -";
const PLAYER = { id: "capablanca", name: "Capablanca" };

function response(payload, { status = 200, ok = true } = {}) {
  return {
    ok,
    status,
    json: vi.fn().mockResolvedValue(payload),
  };
}

function explorerCalls() {
  return fetch.mock.calls
    .map(([url]) => String(url))
    .filter((url) => url.startsWith("/api/player-explorer"));
}

function fenFromUrl(url) {
  return new URL(url, "http://localhost").searchParams.get("fen");
}

beforeEach(() => {
  globalThis.fetch = vi.fn(async (url) => {
    const parsed = new URL(String(url), "http://localhost");
    const endpoint = parsed.pathname.replace("/api/", "");
    const fen = parsed.searchParams.get("fen");

    if (endpoint === "player-profile") {
      return response({ player: { white_games: 10, black_games: 7 } });
    }

    if (endpoint === "player-transpositions") {
      return response({ transpositions: [] });
    }

    if (endpoint === "player-explorer" && fen === INITIAL_FEN) {
      return response({
        fen,
        moves: [
          move("e4", "fen-e4", 8),
          move("d4", "fen-d4", 6),
        ],
      });
    }

    if (endpoint === "player-explorer" && fen === "fen-e4") {
      return response({
        fen,
        moves: [move("e5", "fen-e4-e5", 5)],
      });
    }

    if (endpoint === "player-explorer" && fen === "fen-d4") {
      return response({
        fen,
        moves: [move("d5", "fen-d4-d5", 4)],
      });
    }

    return response({ error: "No moves found" }, { ok: false, status: 404 });
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

function move(san, fen, times_played) {
  return {
    san,
    fen,
    times_played,
    wins: times_played,
    draws: 0,
    losses: 0,
    score_pct: 1,
    example_game_ids: [],
  };
}

describe("usePlayerExplorer prefetch", () => {
  it("prefetches the immediate next level after loading a node", async () => {
    renderHook(() => usePlayerExplorer(PLAYER));

    await waitFor(() => {
      const calledFens = explorerCalls().map(fenFromUrl);
      expect(calledFens).toContain(INITIAL_FEN);
      expect(calledFens).toContain("fen-e4");
      expect(calledFens).toContain("fen-d4");
    });
  });

  it("does not request an already prefetched child again when it is selected", async () => {
    const { result } = renderHook(() => usePlayerExplorer(PLAYER));

    await waitFor(() => {
      expect(explorerCalls().map(fenFromUrl)).toContain("fen-e4");
    });

    const e4Node = result.current.nodes.find((node) => node.data.move === "e4");
    expect(e4Node).toBeDefined();
    const e4CallsBefore = explorerCalls().filter(
      (url) => fenFromUrl(url) === "fen-e4",
    ).length;

    act(() => {
      e4Node.data.onSelect(e4Node.id);
    });

    await waitFor(() => {
      expect(result.current.selectedNode.id).toBe(e4Node.id);
    });

    const e4CallsAfter = explorerCalls().filter(
      (url) => fenFromUrl(url) === "fen-e4",
    ).length;
    expect(e4CallsAfter).toBe(e4CallsBefore);
  });

  it("treats a prefetched 404 as a loaded leaf without setting a global error", async () => {
    fetch.mockImplementation(async (url) => {
      const parsed = new URL(String(url), "http://localhost");
      const endpoint = parsed.pathname.replace("/api/", "");
      const fen = parsed.searchParams.get("fen");

      if (endpoint === "player-profile") {
        return response({ player: { white_games: 10, black_games: 7 } });
      }

      if (endpoint === "player-explorer" && fen === INITIAL_FEN) {
        return response({ fen, moves: [move("e4", "fen-e4", 8)] });
      }

      return response({ error: "No moves found" }, { ok: false, status: 404 });
    });

    const { result } = renderHook(() => usePlayerExplorer(PLAYER));

    await waitFor(() => {
      const e4Node = result.current.nodes.find((node) => node.data.move === "e4");
      expect(e4Node?.data.hasChildren).toBe(false);
    });

    expect(result.current.error).toBe("");
  });

  it("expands a player node through the expand-to-fork action", async () => {
    const { result } = renderHook(() => usePlayerExplorer(PLAYER));

    await waitFor(() => {
      expect(result.current.nodes.find((node) => node.data.move === "e4")).toBeDefined();
    });

    const e4Node = result.current.nodes.find((node) => node.data.move === "e4");
    act(() => {
      e4Node.data.onExpandToFork(e4Node.id);
    });

    await waitFor(() => {
      expect(result.current.nodes.find((node) => node.data.move === "e5")).toBeDefined();
    });
  });

  it("expands the selected player node when Space is pressed", async () => {
    const { result } = renderHook(() => usePlayerExplorer(PLAYER));

    await waitFor(() => {
      expect(result.current.nodes.find((node) => node.data.move === "e4")).toBeDefined();
    });

    const e4Node = result.current.nodes.find((node) => node.data.move === "e4");
    act(() => {
      e4Node.data.onSelect(e4Node.id);
    });

    await waitFor(() => {
      expect(result.current.selectedNode.id).toBe(e4Node.id);
    });

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    });

    await waitFor(() => {
      expect(result.current.nodes.find((node) => node.data.move === "e5")).toBeDefined();
    });
  });
});
