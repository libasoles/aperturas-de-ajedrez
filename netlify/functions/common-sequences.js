import { executeRead } from './lib/neo4j.js';
import { ok, badRequest, notFound, serverError, preflight } from './lib/response.js';

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -';

// ADVERTENCIA sobre complejidad:
// Los saltos variables (-[:MOVE*1..N]->) son potencialmente exponenciales.
// Se mitigan con tres guardas:
//   1. `min_played`  — poda ramas frías antes de expandir
//   2. depth  máx  5  — acota el árbol de búsqueda
//   3. LIMIT  15       — cap duro de caminos devueltos
const CYPHER = `
  MATCH path = (start:Position {fen: $fen})-[:MOVE*1..5]->(end:Position)
  WHERE all(r IN relationships(path) WHERE r.times_played >= $min_played)
  WITH path,
       [r IN relationships(path) | r.san]          AS moves,
       [n IN nodes(path)         | n.fen]           AS fens,
       reduce(s = 0, r IN relationships(path) | s + r.times_played) AS score
  RETURN fens, moves, score
  ORDER BY score DESC
  LIMIT 15
`;

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();

  const params = event.queryStringParameters ?? {};
  const fen = params.fen || INITIAL_FEN;
  const min_played = parseInt(params.min_played ?? '5', 10);

  if (isNaN(min_played) || min_played < 1) {
    return badRequest('min_played must be a positive integer');
  }

  try {
    const records = await executeRead(CYPHER, { fen, min_played });
    if (records.length === 0) return notFound(`No common sequences found from: ${fen}`);

    const sequences = records.map((r) => ({
      fens: r.get('fens'),
      moves: r.get('moves'),
      score: r.get('score'),
    }));

    return ok({ fen, min_played, count: sequences.length, sequences });
  } catch (err) {
    return serverError(err);
  }
};
