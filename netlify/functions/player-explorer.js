import { executeRead } from './lib/neo4j.js';
import { ok, badRequest, notFound, serverError, preflight } from './lib/response.js';

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -';

// Returns the moves played from a given position, with per-color stats.
// The MOVE relationships are global aggregates across all ingested games,
// so player_name is validated but not used for filtering (only one player's
// games are in the DB at a time).
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

  const { player_name, color = 'white', fen = INITIAL_FEN } = event.queryStringParameters ?? {};
  if (!player_name) return badRequest('Missing required parameter: player_name');
  if (!['white', 'black'].includes(color)) return badRequest('color must be "white" or "black"');

  try {
    const records = await executeRead(CYPHER, { fen });
    if (records.length === 0) return notFound(`No moves found from position: ${fen}`);

    const moves = records.map((r) => {
      const times_played = r.get('times_played');
      const white_wins = r.get('white_wins');
      const black_wins = r.get('black_wins');
      const draws = r.get('draws');
      const wins = color === 'white' ? white_wins : black_wins;
      const losses = color === 'white' ? black_wins : white_wins;
      const score_pct = times_played > 0 ? (wins + 0.5 * draws) / times_played : 0;
      return {
        fen: r.get('fen'),
        san: r.get('san'),
        times_played,
        wins,
        draws,
        losses,
        score_pct: Math.round(score_pct * 1000) / 1000,
        example_game_ids: [],
      };
    });

    return ok({ fen, moves });
  } catch (err) {
    return serverError(err);
  }
};
