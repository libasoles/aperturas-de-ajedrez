import { E4_TREE } from "./e4";
import { D4_TREE } from "./d4";

export { E4_TREE, D4_TREE };

export const OPENING_TREE = {
  id: "root",
  move: "Inicial",
  color: "white",
  opening: "root",
  children: [E4_TREE, D4_TREE],
};
