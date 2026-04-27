const PIECES_BY_SPANISH_SAN = {
  R: "K",
  D: "Q",
  T: "R",
  A: "B",
  C: "N",
};

function normalizeMove(move) {
  const castling = move.toUpperCase();
  if (castling === "O-O" || castling === "0-0") return "O-O";
  if (castling === "O-O-O" || castling === "0-0-0") return "O-O-O";

  const normalized = move.replace(
    /^[RDTAC]/,
    (piece) => PIECES_BY_SPANISH_SAN[piece],
  );
  return normalized;
}

function parseLine(rawLine, previousLine) {
  const rawText = rawLine.trim();
  const moveNumber = rawText.match(/^(\d+)\.\s*/);
  const text = rawText.replace(/^\d+\.\s*/, "").replace(/^(\d+)\.(\S+)/, "$2");
  const move = text.match(/^(\S+)/)?.[1];
  if (!move) return null;

  let detail = text.slice(move.length).trim();
  let name = null;
  const nameMatch = detail.match(/^\(([^)]+)\)\s*/);
  if (nameMatch) {
    name = nameMatch[1].trim();
    detail = detail.slice(nameMatch[0].length).trim();
  }

  const indentLevel = Math.floor(rawLine.match(/^ */)[0].length / 2);
  let level = moveNumber ? 2 * (Number(moveNumber[1]) - 1) : indentLevel;

  if (
    !moveNumber &&
    previousLine?.hasMoveNumber &&
    (level === previousLine.indentLevel ||
      level === previousLine.indentLevel + 1)
  ) {
    level = previousLine.level + 1;
  }
  if (
    !moveNumber &&
    previousLine &&
    !previousLine.hasMoveNumber &&
    level === previousLine.indentLevel
  ) {
    level = previousLine.level;
  }

  return {
    annotation: detail || null,
    hasMoveNumber: Boolean(moveNumber),
    indentLevel,
    level,
    move: normalizeMove(move),
    name,
  };
}

function nodeIdForMove(move, counts, idPrefix) {
  const slug =
    move
      .toLowerCase()
      .replace(/[#=+!?]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "move";
  const base = `${idPrefix}-${slug}`;
  const count = (counts.get(base) ?? 0) + 1;
  counts.set(base, count);
  return count === 1 ? base : `${base}-${count}`;
}

export function parseIndentedTree(source, options) {
  const {
    idPrefix,
    opening,
    rootOpening = "root",
    rootMove = "Inicial",
  } = options;
  const root = {
    id: "root",
    move: rootMove,
    color: "white",
    opening: rootOpening,
    children: [],
  };
  const stack = [root];
  const counts = new Map();
  let previousLine = null;

  for (const rawLine of source.split(/\r?\n/)) {
    if (!rawLine.trim() || rawLine.trim().startsWith("root")) continue;
    const parsed = parseLine(rawLine, previousLine);
    if (!parsed) continue;
    previousLine = parsed;

    let parentLevel = parsed.level;
    while (!stack[parentLevel] && parentLevel > 0) {
      parentLevel -= 1;
    }
    const parent = stack[parentLevel] ?? root;
    const nodeLevel = parentLevel + 1;
    const node = {
      id: nodeIdForMove(parsed.move, counts, idPrefix),
      move: parsed.move,
      color: nodeLevel % 2 === 1 ? "white" : "black",
      opening,
      children: [],
    };
    if (parsed.name) node.name = parsed.name;
    if (parsed.annotation) node.annotation = parsed.annotation;

    parent.children.push(node);
    stack[nodeLevel] = node;
    stack.length = nodeLevel + 1;
  }

  return root;
}
