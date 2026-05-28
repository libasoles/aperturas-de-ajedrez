import { Chess } from "chess.js";
import { createRequire } from "module";
import fs from "fs";

import { D4_TREE } from "../src/data/openings/d4.js";
import { E4_TREE } from "../src/data/openings/e4.js";
import { NF3_TREE } from "../src/data/openings/nf3.js";

const require = createRequire(import.meta.url);
const initStockfish = require("../.local/stockfish/node_modules/stockfish");

const DEPTH = Number(process.env.STOCKFISH_DEPTH ?? 14);
const MULTIPV = Number(process.env.STOCKFISH_MULTIPV ?? 2);
const DELTA_CP = Number(process.env.STOCKFISH_DELTA_CP ?? 0);
const MIN_GAIN_CP = Number(process.env.STOCKFISH_MIN_GAIN_CP ?? 50);
const MAX_PLY = Number(process.env.STOCKFISH_MAX_PLY ?? 14);
const SCORE_WORKERS = Number(process.env.STOCKFISH_SCORE_WORKERS ?? 1);
const ENGINE = process.env.STOCKFISH_ENGINE ?? "lite-single";
const WRITE = process.argv.includes("--write");

const FILES = [
  { exportName: "E4_TREE", filePath: "src/data/openings/e4.js", tree: E4_TREE },
  { exportName: "D4_TREE", filePath: "src/data/openings/d4.js", tree: D4_TREE },
  { exportName: "NF3_TREE", filePath: "src/data/openings/nf3.js", tree: NF3_TREE },
];

function cloneTree(tree) {
  return JSON.parse(JSON.stringify(tree));
}

function walk(node, path = [], acc = []) {
  const moves = node.move && node.move !== "Inicial" ? [...path, node.move] : path;
  acc.push({ node, moves, ply: moves.length });
  for (const child of node.children ?? []) {
    walk(child, moves, acc);
  }
  return acc;
}

function chessForMoves(moves) {
  const chess = new Chess();
  for (const move of moves) {
    const result = chess.move(move);
    if (!result) {
      throw new Error(`Illegal SAN in tree path: ${moves.join(" ")} at ${move}`);
    }
  }
  return chess;
}

function scoreFromLine(line, sideToMove) {
  const match = line.match(/\bscore (cp|mate) (-?\d+)/);
  if (!match) return null;

  const raw = Number(match[2]);
  const whiteMultiplier = sideToMove === "w" ? 1 : -1;

  if (match[1] === "mate") {
    const mate = raw * whiteMultiplier;
    return {
      raw,
      comparable: raw > 0 ? 100000 - raw : -100000 - raw,
      stockfish: { depth: DEPTH, mate },
    };
  }

  return {
    raw,
    comparable: raw,
    stockfish: { depth: DEPTH, score: Number(((raw * whiteMultiplier) / 100).toFixed(2)) },
  };
}

function parseInfoLine(line, sideToMove) {
  const multipvMatch = line.match(/\bmultipv (\d+)/);
  const pvMatch = line.match(/\bpv\s+(.+)$/);
  const score = scoreFromLine(line, sideToMove);
  if (!score || !pvMatch) return null;

  return {
    multipv: multipvMatch ? Number(multipvMatch[1]) : 1,
    pv: pvMatch[1].trim().split(/\s+/),
    ...score,
  };
}

function createEngine() {
  const pending = [];
  const output = [];

  return initStockfish(ENGINE).then((engine) => {
    engine.listener = (line) => {
      output.push(line);
      for (let i = 0; i < pending.length; i += 1) {
        if (pending[i].predicate(line)) {
          const item = pending.splice(i, 1)[0];
          item.resolve(line);
          i -= 1;
        }
      }
    };

    function send(command) {
      engine.sendCommand(command);
    }

    function waitFor(predicate, timeoutMs = 90000) {
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

    async function analyze(fen) {
      output.length = 0;
      const sideToMove = fen.split(" ")[1];
      send(`position fen ${fen}`);
      send(`go depth ${DEPTH}`);
      await waitFor((line) => line.startsWith("bestmove "));

      const byPv = new Map();
      for (const line of output) {
        if (!line.startsWith("info ")) continue;
        const parsed = parseInfoLine(line, sideToMove);
        if (parsed) byPv.set(parsed.multipv, parsed);
      }

      const suggestions = [...byPv.values()].sort((a, b) => a.multipv - b.multipv);
      if (suggestions.length === 0) {
        throw new Error(`No PV score returned for FEN: ${fen}`);
      }

      return suggestions;
    }

    return {
      command,
      analyze,
      send,
      quit: () => send("quit"),
    };
  });
}

async function initializeEngine(engine) {
  await engine.command("uci", (line) => line === "uciok");
  engine.send(`setoption name MultiPV value ${MULTIPV}`);
  await engine.command("isready", (line) => line === "readyok");
  engine.send("ucinewgame");
  await engine.command("isready", (line) => line === "readyok");
}

function moveKey(move) {
  return `${move.from}${move.to}${move.promotion ?? ""}`;
}

function findExistingChildByUci(chess, parent, uci) {
  for (const child of parent.children ?? []) {
    const probe = new Chess(chess.fen());
    const result = probe.move(child.move);
    if (result && moveKey(result) === uci) return child;
  }
  return null;
}

function createIdFactory(trees) {
  const used = new Set(trees.flatMap((tree) => walk(tree).map(({ node }) => node.id)));
  const nextByParent = new Map();

  return function nextId(parentId) {
    const base = `${parentId}-sf`;
    let next = nextByParent.get(parentId) ?? 1;
    while (used.has(`${base}${next}`)) next += 1;
    const id = `${base}${next}`;
    used.add(id);
    nextByParent.set(parentId, next + 1);
    return id;
  };
}

function addPvLine({ parent, chess, pv, parentPly, nextId, examples, stats }) {
  let current = parent;
  let position = new Chess(chess.fen());
  let ply = parentPly;

  for (const uci of pv) {
    if (ply >= MAX_PLY) return;

    const existingChild = findExistingChildByUci(position, current, uci);
    const result = position.move({
      from: uci.slice(0, 2),
      to: uci.slice(2, 4),
      promotion: uci[4],
    });

    if (!result) return;

    if (existingChild) {
      current = existingChild;
      ply += 1;
      continue;
    }

    const created = {
      id: nextId(current.id),
      move: result.san,
      color: result.color === "w" ? "white" : "black",
      opening: current.opening,
      engineGenerated: true,
      children: [],
    };

    current.children ??= [];
    current.children.push(created);
    current = created;
    ply += 1;
    stats.createdNodes += 1;

    if (examples.length < 12) {
      examples.push(`${parent.id}: added ${created.id} ${created.move}`);
    }
  }
}

function selectableSuggestions(suggestions, chess, node) {
  const best = suggestions[0]?.comparable;
  if (typeof best !== "number") return [];

  const representedScores = suggestions
    .filter((suggestion) => suggestion.pv[0] && findExistingChildByUci(chess, node, suggestion.pv[0]))
    .map((suggestion) => suggestion.comparable);
  const bestRepresented = representedScores.length > 0 ? Math.max(...representedScores) : null;

  return suggestions.filter((suggestion) => {
    if (!suggestion.pv[0]) return false;
    if (findExistingChildByUci(chess, node, suggestion.pv[0])) return false;
    if (best - suggestion.comparable > DELTA_CP) return false;
    return bestRepresented === null || suggestion.comparable - bestRepresented >= MIN_GAIN_CP;
  });
}

function updateNodeScore(node, suggestions) {
  const best = suggestions[0];
  if (!best) return;
  node.stockfish = best.stockfish;
}

async function analyzeExistingNodes({ engine, files, nextId, stats, examples }) {
  const originals = files
    .flatMap(({ tree }) => walk(tree))
    .filter(({ node }) => !node.engineGenerated);

  for (let i = 0; i < originals.length; i += 1) {
    const item = originals[i];
    const chess = chessForMoves(item.moves);
    const suggestions = await engine.analyze(chess.fen());
    updateNodeScore(item.node, suggestions);
    stats.analyzedNodes += 1;
    stats.suggestionsSeen += suggestions.length;

    for (const suggestion of selectableSuggestions(suggestions, chess, item.node)) {
      if (!suggestion.pv.length) continue;
      stats.newRootSuggestions += 1;
      addPvLine({
        parent: item.node,
        chess,
        pv: suggestion.pv,
        parentPly: item.ply,
        nextId,
        examples,
        stats,
      });
    }

    if ((i + 1) % 25 === 0 || i + 1 === originals.length) {
      console.log(`${i + 1}/${originals.length} analyzed, ${stats.createdNodes} nodes proposed`);
    }
  }
}

async function scoreMissingNodes({ engine, files, stats }) {
  const nodes = files.flatMap(({ tree }) => walk(tree));
  const missing = nodes.filter(({ node }) => !node.stockfish);

  if (!WRITE) {
    for (const { node } of missing) {
      node.stockfish = { depth: DEPTH, score: 0 };
    }
    stats.scoredCreatedNodes = 0;
    stats.unscoredDryRunNodes = missing.length;
    console.log(`Dry-run: skipped scoring ${missing.length} new nodes`);
    return;
  }

  const workerCount = Math.max(1, SCORE_WORKERS);
  const engines = [engine];
  let nextIndex = 0;
  let completed = 0;

  try {
    for (let i = 1; i < workerCount; i += 1) {
      const extraEngine = await createEngine();
      await initializeEngine(extraEngine);
      engines.push(extraEngine);
    }

    await Promise.all(
      engines.map(async (workerEngine) => {
        while (nextIndex < missing.length) {
          const item = missing[nextIndex];
          nextIndex += 1;

          const chess = chessForMoves(item.moves);
          const suggestions = await workerEngine.analyze(chess.fen());
          updateNodeScore(item.node, suggestions);
          stats.scoredCreatedNodes += 1;
          completed += 1;

          if (completed % 50 === 0 || completed === missing.length) {
            console.log(`${completed}/${missing.length} new nodes scored`);
          }
        }
      }),
    );
  } finally {
    for (const extraEngine of engines.slice(1)) {
      extraEngine.quit();
    }
  }
}

function assertTree(files) {
  const ids = new Set();
  const errors = [];

  for (const { tree, filePath } of files) {
    for (const { node, moves } of walk(tree)) {
      if (ids.has(node.id)) errors.push(`Duplicate id ${node.id}`);
      ids.add(node.id);

      if (!node.stockfish || node.stockfish.depth !== DEPTH) {
        errors.push(`${node.id} in ${filePath} missing stockfish depth ${DEPTH}`);
      }

      if (node.engineGenerated !== undefined && node.engineGenerated !== true) {
        errors.push(`${node.id} has invalid engineGenerated value`);
      }

      try {
        const chess = chessForMoves(moves);
        const seenChildren = new Set();
        for (const child of node.children ?? []) {
          const probe = new Chess(chess.fen());
          const result = probe.move(child.move);
          if (!result) {
            errors.push(`${child.id} has illegal move ${child.move} under ${node.id}`);
            continue;
          }
          const key = moveKey(result);
          if (seenChildren.has(key)) {
            errors.push(`${node.id} has duplicate child move ${child.move}`);
          }
          seenChildren.add(key);
        }
      } catch (error) {
        errors.push(error.message);
      }
    }
  }

  if (errors.length) {
    throw new Error(`Tree validation failed:\n${errors.slice(0, 50).join("\n")}`);
  }
}

function serializeTree(exportName, tree) {
  return `export const ${exportName} = ${JSON.stringify(tree, null, 2)};\n`;
}

function writeFiles(files) {
  for (const file of files) {
    fs.writeFileSync(file.filePath, serializeTree(file.exportName, file.tree));
  }
}

async function main() {
  const files = FILES.map((file) => ({ ...file, tree: cloneTree(file.tree) }));
  const stats = {
    analyzedNodes: 0,
    suggestionsSeen: 0,
    newRootSuggestions: 0,
    createdNodes: 0,
    scoredCreatedNodes: 0,
  };
  const examples = [];
  const nextId = createIdFactory(files.map(({ tree }) => tree));
  const engine = await createEngine();

  console.log(
    `${WRITE ? "WRITE" : "DRY-RUN"} depth=${DEPTH} multipv=${MULTIPV} deltaCp=${DELTA_CP} minGainCp=${MIN_GAIN_CP} maxPly=${MAX_PLY}`,
  );

  try {
    await initializeEngine(engine);

    await analyzeExistingNodes({ engine, files, nextId, stats, examples });
    await scoreMissingNodes({ engine, files, stats });
  } finally {
    engine.quit();
  }

  assertTree(files);

  console.log(JSON.stringify(stats, null, 2));
  if (examples.length) {
    console.log("Examples:");
    for (const example of examples) console.log(`- ${example}`);
  }

  if (WRITE) {
    writeFiles(files);
    console.log("Wrote opening tree files.");
  } else {
    console.log("Dry-run only. Re-run with --write to update files.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
