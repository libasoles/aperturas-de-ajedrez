import { Chess } from "chess.js";
import { createRequire } from "module";
import fs from "fs";

import { D4_TREE } from "../src/data/openings/d4.js";
import { E4_TREE } from "../src/data/openings/e4.js";
import { NF3_TREE } from "../src/data/openings/nf3.js";

const require = createRequire(import.meta.url);
const initStockfish = require("../.local/stockfish/node_modules/stockfish");

const DEPTH = Number(process.env.STOCKFISH_DEPTH ?? 10);
const ENGINE = process.env.STOCKFISH_ENGINE ?? "lite-single";

function walk(node, path = [], acc = []) {
  const moves = node.move && node.move !== "Inicial" ? [...path, node.move] : path;
  acc.push({ id: node.id, moves });
  for (const child of node.children ?? []) {
    walk(child, moves, acc);
  }
  return acc;
}

function fenForMoves(moves) {
  const chess = new Chess();
  for (const move of moves) {
    chess.move(move);
  }
  return chess.fen();
}

function parseScore(line, sideToMove) {
  const match = line.match(/\bscore (cp|mate) (-?\d+)/);
  if (!match) return null;

  const multiplier = sideToMove === "w" ? 1 : -1;
  const value = Number(match[2]) * multiplier;

  if (match[1] === "mate") {
    return { mate: value };
  }

  return { score: Number((value / 100).toFixed(2)) };
}

function createEngine() {
  const pending = [];
  const output = [];

  return initStockfish(ENGINE).then((engine) => {
    engine.listener = (line) => {
      output.push(line);
      for (let i = 0; i < pending.length; i += 1) {
        if (pending[i].predicate(line)) {
          const pendingItem = pending.splice(i, 1)[0];
          pendingItem.resolve(line);
          i -= 1;
        }
      }
    };

    function send(command) {
      engine.sendCommand(command);
    }

    function waitFor(predicate, timeoutMs = 20000) {
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error(`Timed out waiting for Stockfish after ${timeoutMs}ms`));
        }, timeoutMs);

        pending.push({
          predicate,
          resolve: (line) => {
            clearTimeout(timeoutId);
            resolve(line);
          },
        });
      });
    }

    async function command(command, predicate) {
      send(command);
      return waitFor(predicate);
    }

    async function evaluate(fen) {
      output.length = 0;
      const sideToMove = fen.split(" ")[1];
      send(`position fen ${fen}`);
      send(`go depth ${DEPTH}`);
      await waitFor((line) => line.startsWith("bestmove "), 60000);

      const infoLines = output.filter((line) => line.startsWith("info "));
      for (let i = infoLines.length - 1; i >= 0; i -= 1) {
        const parsed = parseScore(infoLines[i], sideToMove);
        if (parsed) {
          return { depth: DEPTH, ...parsed };
        }
      }

      throw new Error(`No score returned for FEN: ${fen}`);
    }

    return {
      command,
      evaluate,
      send,
      quit: () => send("quit"),
    };
  });
}

function replacementForScore(source, id, score) {
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const idPattern = new RegExp(
    `((?:^|\\n)([ \\t]*)["']?id["']?\\s*:\\s*["']${escapedId}["'][\\s\\S]*?)(\\n\\2["']?children["']?\\s*:)`,
  );
  const match = source.match(idPattern);
  if (!match) {
    throw new Error(`Could not find node ${id}`);
  }

  const indent = match[2];
  const cleanPrefix = match[1].replace(
    new RegExp(`\\n${indent}["']?stockfish["']?\\s*:\\s*\\{[^\\n]*\\},?`),
    "",
  );
  const fields = [`"depth": ${score.depth}`];
  if ("score" in score) fields.push(`"score": ${score.score}`);
  if ("mate" in score) fields.push(`"mate": ${score.mate}`);
  const stockfishLine = `\n${indent}"stockfish": { ${fields.join(", ")} },`;

  return source.replace(idPattern, `${cleanPrefix}${stockfishLine}${match[3]}`);
}

function writeScores(filePath, nodes, scores) {
  let source = fs.readFileSync(filePath, "utf8");
  for (const node of nodes) {
    source = replacementForScore(source, node.id, scores.get(node.id));
  }
  fs.writeFileSync(filePath, source);
}

async function main() {
  const files = [
    { filePath: "src/data/openings/e4.js", tree: E4_TREE },
    { filePath: "src/data/openings/d4.js", tree: D4_TREE },
    { filePath: "src/data/openings/nf3.js", tree: NF3_TREE },
  ];
  const nodes = files.flatMap(({ tree }) => walk(tree));
  const scores = new Map();
  const engine = await createEngine();

  try {
    await engine.command("uci", (line) => line === "uciok");
    await engine.command("isready", (line) => line === "readyok");
    engine.send("ucinewgame");
    await engine.command("isready", (line) => line === "readyok");

    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      const fen = fenForMoves(node.moves);
      const score = await engine.evaluate(fen);
      scores.set(node.id, score);
      console.log(`${i + 1}/${nodes.length} ${node.id}: ${JSON.stringify(score)}`);
    }
  } finally {
    engine.quit();
  }

  for (const file of files) {
    writeScores(file.filePath, walk(file.tree), scores);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
