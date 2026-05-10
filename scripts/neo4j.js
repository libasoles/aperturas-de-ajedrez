import neo4j from 'neo4j-driver';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function loadEnv() {
  const envPath = resolve(process.cwd(), '.env');
  const lines = readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length && !process.env[key.trim()]) {
      process.env[key.trim()] = rest.join('=').trim();
    }
  }
}

loadEnv();

const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD, NEO4J_DATABASE } = process.env;

if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) {
  throw new Error('Missing NEO4J_URI, NEO4J_USERNAME, or NEO4J_PASSWORD in .env');
}

const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

export function getSession() {
  return driver.session({ database: NEO4J_DATABASE });
}

export async function query(cypher, params = {}) {
  const session = getSession();
  try {
    const result = await session.run(cypher, params);
    return result.records;
  } finally {
    await session.close();
  }
}

export async function closeDriver() {
  await driver.close();
}

export default driver;
