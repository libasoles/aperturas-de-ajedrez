import { executeRead } from './lib/neo4j.js';
import { ok, badRequest, serverError, preflight } from './lib/response.js';

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -';

// Find alternative move sequences from the initial position that reach the
// given FEN (transpositions). Searches up to 6 plies deep with a min_played
// guard to prune cold branches and cap runtime.
const CYPHER = `
  MATCH path = (start:Position {fen: $initial})-[:MOVE*1..6]->(target:Position {fen: $fen})
  WHERE all(r IN relationships(path) WHERE r.times_played >= $min_played)
  WITH [r IN relationships(path) | r.san] AS sequence,
       reduce(s = 0, r IN relationships(path) | s + r.times_played) AS score
  RETURN sequence, score
  ORDER BY score DESC
  LIMIT 8
`;

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();

  const { player_name, fen } = event.queryStringParameters ?? {};
  if (!player_name) return badRequest('Missing required parameter: player_name');
  if (!fen) return badRequest('Missing required parameter: fen');

  const min_played = 3;

  try {
    const records = await executeRead(CYPHER, { initial: INITIAL_FEN, fen, min_played });

    const transpositions = records.map((r) => ({
      sequence: r.get('sequence'),
      score: r.get('score'),
    }));

    return ok({ fen, count: transpositions.length, transpositions });
  } catch (err) {
    return serverError(err);
  }
};
