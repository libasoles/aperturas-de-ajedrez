import neo4j from 'neo4j-driver';

// Singleton driver — instantiated outside the handler so warm Netlify containers
// reuse the same connection without paying the TCP handshake on every request.
// Lazy init avoids throwing at module-parse time if env vars aren't loaded yet.
let _driver = null;

// AuraDB free tier hibernates and can throw these on first wake-up.
const RETRYABLE_CODES = new Set(['ServiceUnavailable', 'SessionExpired']);

function isRetryable(err) {
  return (
    RETRYABLE_CODES.has(err.code) ||
    /could not perform discovery|websocket|econnrefused/i.test(err.message ?? '')
  );
}

function getDriver() {
  if (_driver) return _driver;

  const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;
  if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) {
    throw new Error('Missing env vars: NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD');
  }

  _driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
    // Return plain JS numbers instead of neo4j.Integer wrapper objects
    { disableLosslessIntegers: true }
  );
  return _driver;
}

export function getSession() {
  return getDriver().session({
    database: process.env.NEO4J_DATABASE || 'neo4j',
  });
}

/**
 * Execute a read query with exponential-backoff retry for AuraDB cold starts.
 * Always closes the session in a finally block — never closes the driver.
 */
export async function executeRead(cypher, params = {}, maxRetries = 3) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let lastErr;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const session = getSession();
    try {
      const result = await session.executeRead((tx) => tx.run(cypher, params));
      return result.records;
    } catch (err) {
      lastErr = err;
      if (!isRetryable(err) || attempt === maxRetries) throw err;
      // 1 s → 2 s → 4 s  (AuraDB free typically wakes in < 10 s)
      await sleep(1000 * 2 ** (attempt - 1));
    } finally {
      await session.close();
    }
  }

  throw lastErr;
}

export async function closeDriver() {
  if (_driver) {
    await _driver.close();
    _driver = null;
  }
}
