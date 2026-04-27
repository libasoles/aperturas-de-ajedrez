import londonSource from "./london.txt?raw";
import { parseIndentedTree } from "./parseIndentedTree";

export const LONDON_OPENING = "london-study";

export const LONDON_TREE = parseIndentedTree(londonSource, {
  idPrefix: "london",
  opening: LONDON_OPENING,
});
