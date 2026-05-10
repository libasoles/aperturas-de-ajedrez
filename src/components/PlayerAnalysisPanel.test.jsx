import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PlayerAnalysisPanel from "./PlayerAnalysisPanel";

function renderPanel(props = {}) {
  return render(
    <PlayerAnalysisPanel
      selectedNode={{
        move: "e4",
        times_played: 12,
        wins: 7,
        draws: 3,
        losses: 2,
        score_pct: 0.71,
        example_game_ids: [],
      }}
      continuations={[]}
      transpositions={[]}
      activeSequence={["e4"]}
      gameDetails={{}}
      onLoadGame={vi.fn()}
      locale="en"
      isLoading={false}
      {...props}
    />,
  );
}

describe("PlayerAnalysisPanel", () => {
  it("hides optional sections when there is no content", () => {
    renderPanel();

    expect(screen.queryByText("partidas modelo")).not.toBeInTheDocument();
    expect(screen.queryByText("también se llega por...")).not.toBeInTheDocument();
  });

  it("filters the active position out of transpositions", () => {
    renderPanel({
      transpositions: [
        { sequence: ["e4"] },
        { sequence: ["Nf3", "d5"] },
      ],
    });

    expect(screen.getByText("también se llega por...")).toBeInTheDocument();
    expect(screen.queryByText("1. e4")).not.toBeInTheDocument();
    expect(screen.getByText("1. Nf3 d5")).toBeInTheDocument();
  });

  it("keeps panel content scrollable", () => {
    const { container } = renderPanel({
      selectedNode: {
        move: "e4",
        times_played: 12,
        wins: 7,
        draws: 3,
        losses: 2,
        score_pct: 0.71,
        example_game_ids: ["game-1"],
      },
    });

    expect(screen.getByText("partidas modelo")).toBeInTheDocument();
    expect(container.querySelector(".overflow-y-auto")).toBeInTheDocument();
  });
});
