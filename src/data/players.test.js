import { describe, expect, it } from "vitest";
import { resolvePlayerBySlug, resolvePlayerRoute } from "./players";

describe("players catalog", () => {
  it("maps Capablanca slug to the exact Neo4j player key", () => {
    expect(resolvePlayerBySlug("capablanca")?.keyName).toBe("Capablanca, Jose Raul");
  });

  it("resolves localized Capablanca routes", () => {
    expect(resolvePlayerRoute("/jugadores/capablanca/")).toMatchObject({
      locale: "es",
      player: { name: "Jose Raul Capablanca" },
    });
    expect(resolvePlayerRoute("/en/players/capablanca/")).toMatchObject({
      locale: "en",
      player: { name: "Jose Raul Capablanca" },
    });
    expect(resolvePlayerRoute("/fr/joueurs/capablanca/")).toMatchObject({
      locale: "fr",
      player: { name: "Jose Raul Capablanca" },
    });
  });
});
