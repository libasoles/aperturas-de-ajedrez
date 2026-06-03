/**
 * Bootstrap one-time: populate Neo4j openings DB from the existing JSON tree.
 *
 * This script was used to seed the database from the static JS opening tree
 * (src/data/openings/*.js). It is not part of the normal workflow.
 *
 * Going forward, Neo4j is the source of truth:
 *   1. research-opening agent produces a validated opening report
 *   2. Nodes are written directly to Neo4j
 *   3. A generate script exports Neo4j → src/data/openings/*.js for the frontend
 *
 * Safe to re-run (idempotent via MERGE). Requires NEO4J_OPENINGS_* in .env
 * and the Docker container running (docker/neo4j-openings/docker-compose.yml).
 */

import { Chess } from 'chess.js';
import neo4j from 'neo4j-driver';
import { E4_TREE } from '../src/data/openings/e4.js';
import { D4_TREE } from '../src/data/openings/d4.js';
import { NF3_TREE } from '../src/data/openings/nf3.js';

// index.js uses extensionless imports that Next.js resolves but plain Node ESM cannot
const OPENING_TREE = {
  id: 'root', move: 'Inicial', color: 'white', opening: 'root',
  children: [E4_TREE, D4_TREE, NF3_TREE],
};

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -';
const normFen = (fen) => fen.split(' ').slice(0, 4).join(' ');

const allNodes = [];
const allEdges = [];

function traverse(node, chess, parentId) {
  const fen = node.move === 'Inicial' ? INITIAL_FEN : normFen(chess.fen());

  allNodes.push({
    id: node.id,
    move: node.move,
    color: node.color,
    opening: node.opening,
    fen,
    stockfish_depth: node.stockfish?.depth ?? null,
    stockfish_score: node.stockfish?.score ?? null,
  });

  if (parentId !== null) {
    allEdges.push({ parentId, childId: node.id });
  }

  for (const child of node.children ?? []) {
    chess.move(child.move);
    traverse(child, chess, node.id);
    chess.undo();
  }
}

traverse(OPENING_TREE, new Chess(), null);

const { NEO4J_OPENINGS_URI, NEO4J_OPENINGS_USERNAME, NEO4J_OPENINGS_PASSWORD, NEO4J_OPENINGS_DATABASE } = process.env;
if (!NEO4J_OPENINGS_URI || !NEO4J_OPENINGS_USERNAME || !NEO4J_OPENINGS_PASSWORD) {
  console.error('Missing env vars: NEO4J_OPENINGS_URI, NEO4J_OPENINGS_USERNAME, NEO4J_OPENINGS_PASSWORD');
  process.exit(1);
}

const driver = neo4j.driver(
  NEO4J_OPENINGS_URI,
  neo4j.auth.basic(NEO4J_OPENINGS_USERNAME, NEO4J_OPENINGS_PASSWORD),
  { disableLosslessIntegers: true }
);
const session = driver.session({ database: NEO4J_OPENINGS_DATABASE || 'neo4j' });

try {
  await session.run('CREATE CONSTRAINT IF NOT EXISTS FOR (n:OpeningNode) REQUIRE n.id IS UNIQUE');
  await session.run('CREATE CONSTRAINT IF NOT EXISTS FOR (p:Position) REQUIRE p.fen IS UNIQUE');

  await session.run(`
    UNWIND $nodes AS row
    MERGE (n:OpeningNode {id: row.id})
    ON CREATE SET n.move             = row.move,
                  n.color            = row.color,
                  n.opening          = row.opening,
                  n.stockfish_depth  = row.stockfish_depth,
                  n.stockfish_score  = row.stockfish_score
    ON MATCH  SET n.move             = row.move,
                  n.color            = row.color,
                  n.opening          = row.opening,
                  n.stockfish_depth  = row.stockfish_depth,
                  n.stockfish_score  = row.stockfish_score
    MERGE (p:Position {fen: row.fen})
    MERGE (n)-[:AT_POSITION]->(p)
  `, { nodes: allNodes });

  await session.run(`
    UNWIND $edges AS row
    MATCH (parent:OpeningNode {id: row.parentId})
    MATCH (child:OpeningNode  {id: row.childId})
    MERGE (parent)-[:NEXT_MOVE]->(child)
  `, { edges: allEdges });

  await session.run(`
    MATCH (p:Position)<-[:AT_POSITION]-(n:OpeningNode)
    WITH p, collect(n) AS nodes WHERE size(nodes) > 1
    UNWIND nodes AS a UNWIND nodes AS b
    WITH a, b WHERE a.id < b.id
    MERGE (a)-[:TRANSPOSES_TO]->(b)
  `);

  console.log(`✓ ${allNodes.length} nodes, ${allEdges.length} edges ingested.`);
} finally {
  await session.close();
  await driver.close();
}
