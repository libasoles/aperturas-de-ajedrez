import { executeRead } from './lib/neo4j.js';
import { ok, badRequest, notFound, serverError, preflight } from './lib/response.js';

// Encuentra todos los pares de posiciones que alcanzan el FEN objetivo por distintos
// órdenes de jugadas (transposiciones). WHERE p1 <> p2 evita el par trivial.
const CYPHER = `
  MATCH (p1:Position)-[m1:MOVE]->(target:Position {fen: $fen})<-[m2:MOVE]-(p2:Position)
  WHERE p1.fen <> p2.fen
  RETURN p1.fen AS from_fen_a,
         m1.san AS san_a,
         p2.fen AS from_fen_b,
         m2.san AS san_b
  LIMIT 50
`;

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return preflight();

  const { fen } = event.queryStringParameters ?? {};
  if (!fen) return badRequest('Missing required parameter: fen');

  try {
    const records = await executeRead(CYPHER, { fen });
    if (records.length === 0) return notFound(`No transpositions found for: ${fen}`);

    const transpositions = records.map((r) => ({
      from_fen_a: r.get('from_fen_a'),
      san_a: r.get('san_a'),
      from_fen_b: r.get('from_fen_b'),
      san_b: r.get('san_b'),
    }));

    return ok({ fen, count: transpositions.length, transpositions });
  } catch (err) {
    return serverError(err);
  }
};
