import { executeRead } from './lib/neo4j.js';
import { ok, badRequest, notFound, serverError, preflight } from './lib/response.js';

const CYPHER = {
  white: `
    MATCH (p:Player {name: $player})-[:PLAYED_WHITE]->(g:Game)
    RETURN g
    ORDER BY g.date DESC
    LIMIT 100
  `,
  black: `
    MATCH (p:Player {name: $player})-[:PLAYED_BLACK]->(g:Game)
    RETURN g
    ORDER BY g.date DESC
    LIMIT 100
  `,
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();

  const { player_name, color = 'white' } = event.queryStringParameters ?? {};

  if (!player_name) return badRequest('Missing required parameter: player_name');
  if (!['white', 'black'].includes(color)) return badRequest('color must be "white" or "black"');

  try {
    const records = await executeRead(CYPHER[color], { player: player_name });
    if (records.length === 0) return notFound(`No games found for "${player_name}" playing ${color}`);

    const games = records.map((r) => r.get('g').properties);
    return ok({ player: player_name, color, count: games.length, games });
  } catch (err) {
    return serverError(err);
  }
};
