import { executeRead } from './lib/neo4j.js';
import { ok, badRequest, notFound, serverError, preflight } from './lib/response.js';

const CYPHER = `
  MATCH (g:Game {game_id: $game_id})
  OPTIONAL MATCH (w:Player)-[:PLAYED_WHITE]->(g)
  OPTIONAL MATCH (b:Player)-[:PLAYED_BLACK]->(g)
  RETURN g.game_id AS game_id,
         g.date    AS date,
         g.event   AS event,
         g.result  AS result,
         w.name    AS white,
         b.name    AS black
`;

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();

  const { game_id } = event.queryStringParameters ?? {};
  if (!game_id) return badRequest('Missing required parameter: game_id');

  try {
    const records = await executeRead(CYPHER, { game_id });
    if (records.length === 0) return notFound(`Game not found: "${game_id}"`);

    const r = records[0];
    return ok({
      game: {
        game_id: r.get('game_id'),
        date: r.get('date'),
        event: r.get('event'),
        result: r.get('result'),
        white: r.get('white'),
        black: r.get('black'),
      },
    });
  } catch (err) {
    return serverError(err);
  }
};
