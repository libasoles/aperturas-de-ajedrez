import { Chess } from 'chess.js';
import initEngine from 'stockfish';

const nodeTree = {
  id: "traxler-1",
  move: "e4",
  color: "white",
  opening: "traxler",
  children: [
    {
      id: "traxler-2",
      move: "e5",
      color: "black",
      opening: "traxler",
      children: [
        {
          id: "traxler-3",
          move: "Nf3",
          color: "white",
          opening: "traxler",
          children: [
            {
              id: "traxler-4",
              move: "Nc6",
              color: "black",
              opening: "traxler",
              children: [
                {
                  id: "traxler-5",
                  move: "Bc4",
                  color: "white",
                  opening: "traxler",
                  children: [
                    {
                      id: "traxler-6",
                      move: "Nf6",
                      color: "black",
                      opening: "traxler",
                      children: [
                        {
                          id: "traxler-7",
                          move: "Ng5",
                          color: "white",
                          opening: "traxler",
                          children: [
                            {
                              id: "traxler-8",
                              move: "Bc5",
                              color: "black",
                              opening: "traxler",
                              children: [
                                {
                                  id: "traxler-9a",
                                  move: "Nxf7",
                                  color: "white",
                                  opening: "traxler",
                                  children: [
                                    {
                                      id: "traxler-10a",
                                      move: "Bxf2+",
                                      color: "black",
                                      opening: "traxler",
                                      children: [
                                        {
                                          id: "traxler-11a",
                                          move: "Kf1",
                                          color: "white",
                                          opening: "traxler",
                                          children: [
                                            {
                                              id: "traxler-12a",
                                              move: "Qe7",
                                              color: "black",
                                              opening: "traxler",
                                              children: []
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  id: "traxler-9b",
                                  move: "Bxf7+",
                                  color: "white",
                                  opening: "traxler",
                                  children: [
                                    {
                                      id: "traxler-10b",
                                      move: "Ke7",
                                      color: "black",
                                      opening: "traxler",
                                      children: [
                                        {
                                          id: "traxler-11b",
                                          move: "Bd5",
                                          color: "white",
                                          opening: "traxler",
                                          children: [
                                            {
                                              id: "traxler-12b",
                                              move: "Rf8",
                                              color: "black",
                                              opening: "traxler",
                                              children: [
                                                {
                                                  id: "traxler-13b",
                                                  move: "Qf3",
                                                  color: "white",
                                                  opening: "traxler",
                                                  children: []
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const evaluationCache = new Map();
const nodeScores = new Map(); // Store node ID -> score mapping
let engine = null;
let nodeCount = 0;
let evaluationResults = [];

async function initStockfish() {
  try {
    engine = await initEngine('lite-single');
    console.log('Stockfish 18 engine initialized (lite-single version)');
  } catch (err) {
    console.error('Failed to initialize Stockfish engine:', err);
    process.exit(1);
  }
}

function moveToMoveObject(chess, moveStr) {
  const moves = chess.moves({ verbose: true });
  for (const m of moves) {
    if (m.san === moveStr) {
      return m;
    }
  }
  return null;
}

async function evaluatePosition(fen) {
  if (evaluationCache.has(fen)) {
    return evaluationCache.get(fen);
  }

  return new Promise((resolve) => {
    let bestScore = 0;
    let isDone = false;

    engine.onmessage = (output) => {
      const line = output ? output.trim() : '';

      if (line && line.includes('info') && line.includes('score')) {
        const cpMatch = line.match(/score cp (-?\d+)/);
        if (cpMatch) {
          bestScore = parseInt(cpMatch[1]) / 100;
        } else {
          const mateMatch = line.match(/score mate (-?\d+)/);
          if (mateMatch) {
            const mateIn = parseInt(mateMatch[1]);
            bestScore = mateIn > 0 ? 999 : -999;
          }
        }
      }

      if (line && line.includes('bestmove')) {
        isDone = true;
      }
    };

    engine.sendCommand(`position fen ${fen}`);
    engine.sendCommand('go depth 14');

    const timeout = setTimeout(() => {
      isDone = true;
    }, 30000);

    const checkInterval = setInterval(() => {
      if (isDone) {
        clearInterval(checkInterval);
        clearTimeout(timeout);
        evaluationCache.set(fen, bestScore);
        resolve(bestScore);
      }
    }, 50);
  });
}

async function walkTree(node, chess) {
  nodeCount++;
  const nodeId = node.id;

  // First, make the move represented by this node
  const moveObj = moveToMoveObject(chess, node.move);
  if (!moveObj) {
    console.error(`ERROR: Invalid move ${node.move} in node ${nodeId}`);
    nodeScores.set(nodeId, 0);
    return;
  }

  chess.move(moveObj);

  // Now evaluate the position AFTER this move
  const fen = chess.fen();
  console.log(`Evaluating node ${nodeCount}: ${nodeId} (move: ${node.move})`);

  const score = await evaluatePosition(fen);
  nodeScores.set(nodeId, parseFloat(score.toFixed(2)));

  evaluationResults.push({
    id: node.id,
    score: parseFloat(score.toFixed(2)),
    fen: fen
  });

  // Recursively evaluate children
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      await walkTree(child, chess);
    }
  }

  // Undo the move before returning
  chess.undo();
}

function addStockfishScores(node) {
  const score = nodeScores.get(node.id);
  if (score !== undefined) {
    node.stockfish = {
      depth: 14,
      score: score
    };
  }
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      addStockfishScores(child);
    }
  }
}

async function main() {
  await initStockfish();

  const chess = new Chess();
  console.log(`\nStarting evaluation of Traxler Attack positions...\n`);

  const startTime = Date.now();
  await walkTree(nodeTree, chess);
  const endTime = Date.now();

  // Add scores to tree
  addStockfishScores(nodeTree);

  const duration = ((endTime - startTime) / 1000).toFixed(1);

  // Generate summary
  const advantageCount = evaluationResults.filter(r => r.score > 0.5).length;
  const disadvantageCount = evaluationResults.filter(r => r.score < -0.5).length;
  const cacheHits = Math.max(0, evaluationCache.size - nodeCount);

  console.log(`\n========================================`);
  console.log(`EVALUATION COMPLETE`);
  console.log(`========================================`);
  console.log(`Total nodes evaluated: ${nodeCount}`);
  console.log(`Positions with White advantage (score > 0.5): ${advantageCount}`);
  console.log(`Positions with Black advantage (score < -0.5): ${disadvantageCount}`);
  console.log(`Cache hits (duplicate positions): ${cacheHits}`);
  console.log(`Evaluation time: ${duration}s`);
  console.log(`========================================\n`);

  console.log('\n=== ANNOTATED TREE (ready to paste) ===\n');
  console.log(JSON.stringify(nodeTree, null, 2));

  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
