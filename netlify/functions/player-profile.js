import { executeRead } from './lib/neo4j.js';
import { ok, badRequest, notFound, serverError, preflight } from './lib/response.js';

const CYPHER = `
  MATCH (p:Player {name: $player})
  OPTIONAL MATCH (p)-[:PLAYED_WHITE]->(wg:Game)
  OPTIONAL MATCH (p)-[:PLAYED_BLACK]->(bg:Game)
  RETURN p.name AS name,
         count(DISTINCT wg) AS white_games,
         count(DISTINCT bg) AS black_games
`;

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();

  const { player_name } = event.queryStringParameters ?? {};
  if (!player_name) return badRequest('Missing required parameter: player_name');

  try {
    const records = await executeRead(CYPHER, { player: player_name });
    if (records.length === 0) return notFound(`Player not found: "${player_name}"`);

    const r = records[0];
    if (r.get('name') === null) return notFound(`Player not found: "${player_name}"`);

    return ok({
      player: {
        name: r.get('name'),
        white_games: r.get('white_games'),
        black_games: r.get('black_games'),
      },
    });
  } catch (err) {
    return serverError(err);
  }
};
