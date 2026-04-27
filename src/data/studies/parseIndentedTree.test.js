import { describe, expect, it } from "vitest";
import { parseIndentedTree } from "./parseIndentedTree";

describe("parseIndentedTree", () => {
  it("applies configured openings by node name and inherits them in descendants", () => {
    const tree = parseIndentedTree(
      `
root
1. d4
  d5
    2. Af4
      Cf6
        3. Cc3 (Londres Jobava)
          Cf6
            4. Cb5
      e6
`,
      {
        idPrefix: "test",
        opening: "london-study",
        openingByName: {
          "Londres Jobava": "london-jobava",
        },
      },
    );

    const d4 = tree.children[0];
    const d5 = d4.children[0];
    const bf4 = d5.children[0];
    const nf6 = bf4.children[0];
    const jobava = nf6.children[0];
    const jobavaReply = jobava.children[0];
    const regularReply = bf4.children[1];

    expect(d4.opening).toBe("london-study");
    expect(jobava.opening).toBe("london-jobava");
    expect(jobavaReply.opening).toBe("london-jobava");
    expect(regularReply.opening).toBe("london-study");
  });
});
