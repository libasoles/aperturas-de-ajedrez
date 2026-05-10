const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const body = (data) => JSON.stringify(data);

export const ok = (data) => ({ statusCode: 200, headers: HEADERS, body: body(data) });

export const badRequest = (message) =>
  ({ statusCode: 400, headers: HEADERS, body: body({ error: message }) });

export const notFound = (message = 'No results found') =>
  ({ statusCode: 404, headers: HEADERS, body: body({ error: message }) });

export const serverError = (err) =>
  ({ statusCode: 500, headers: HEADERS, body: body({ error: 'Neo4j error', detail: err.message }) });

// Preflight handler — return before any auth/db logic
export const preflight = () => ({ statusCode: 204, headers: HEADERS, body: '' });
