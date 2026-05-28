import { executeRead } from './lib/neo4j.js';
import { ok, notFound, serverError, preflight } from './lib/response.js';

// FEN inicial estándar (sin contadores de semi-movimiento ni número de jugada)
const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -';

const CYPHER = `
  MATCH (start:Position {fen: $fen})-[m:MOVE]->(next:Position)
  RETURN next.fen       AS fen,
         m.san          AS san,
         m.times_played AS times_played,
         m.white_wins   AS white_wins,
         m.black_wins   AS black_wins,
         m.draws        AS draws
  ORDER BY m.times_played DESC
  LIMIT 20
`;

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();

  const { fen = INITIAL_FEN } = event.queryStringParameters ?? {};

  try {
    const records = await executeRead(CYPHER, { fen });
    if (records.length === 0) return notFound(`No moves found from position: ${fen}`);

    const moves = records.map((r) => ({
      fen: r.get('fen'),
      san: r.get('san'),
      times_played: r.get('times_played'),
      white_wins: r.get('white_wins'),
      black_wins: r.get('black_wins'),
      draws: r.get('draws'),
    }));

    return ok({ fen, moves });
  } catch (err) {
    return serverError(err);
  }
};
