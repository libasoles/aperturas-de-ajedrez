---
name: ingest-player
description: >-
  Descargar todas las partidas de un jugador desde PGNMentor e ingestarlas en
  Neo4j. Usar cuando: ingesting a player, downloading PGN, cargar partidas,
  ingestar jugador, agregar jugador a Neo4j.
user-invocable: true
argument-hint: "<PlayerName>  (e.g. Alekhine, Fischer, Kasparov)"
---

# Ingest Player Games into Neo4j

Descarga el archivo completo de partidas de un jugador desde PGNMentor.com
e ingesta en Neo4j AuraDB. Idempotente: re-ejecutar fusiona sin duplicar
(todo vía MERGE en Cypher).

## When to use

- Agregar partidas de un nuevo jugador al grafo
- Re-correr una ingesta para incorporar partidas nuevas
- Cualquier pedido de "cargar partidas", "descargar PGN", "ingestar jugador"

## Files involved

| File | Role |
|------|------|
| `scripts/download-player-pgn.js` | Descarga y descomprime PGN desde PGNMentor |
| `scripts/ingest_pgn.py` | Parsea PGN y escribe nodos/relaciones en Neo4j |
| `scripts/requirements.txt` | Dependencias Python |
| `.env` | Credenciales Neo4j (`NEO4J_URI`, `NEO4J_USERNAME`, `NEO4J_PASSWORD`, `NEO4J_DATABASE`) |
| `pgn/` | Directorio local donde caen los PGN descargados (gitignored) |

## Procedure

### Step 1 — Validar input

Extraer el nombre del jugador del argumento del skill.
- Trim whitespace
- Si el usuario escribió nombre completo ("Alexander Alekhine"), usar solo el
  apellido para la URL de PGNMentor — el sitio indexa por apellido
- Preservar capitalización exacta (PGNMentor es case-sensitive)

### Step 2 — Verificar dependencias Python

```bash
python3 -c "import chess; import neo4j; import dotenv"
```

Si falla, instalar:

```bash
pip3 install -r scripts/requirements.txt
```

Si `pip3 install` también falla, detener e informar al usuario que debe
instalar las dependencias Python manualmente.

### Step 3 — Descargar PGN desde PGNMentor

```bash
node scripts/download-player-pgn.js <PlayerName>
```

**Si tiene éxito (exit 0)**: parsear las líneas `EXTRACTED_PGN=<path>` del
stdout. Cada línea corresponde a un .pgn extraído. Si el ZIP contiene múltiples
archivos, ingestar todos en el Step 5.

**Si falla (exit non-zero)**:
- Invocar el agente `lookup-player-source` con el nombre del jugador
- Si devuelve `PGNMENTOR_NAME=<name>`: reintentar Step 3 con ese nombre
- Si devuelve `LICHESS_URL=<url>`:
  ```bash
  curl -L "<url>" -o "pgn/<PlayerName>.pgn"
  ```
  Luego continuar con `pgn/<PlayerName>.pgn`
- Si devuelve `NOT_FOUND`: informar al usuario y detener

### Step 4 — Verificar .env

Comprobar que `.env` existe y contiene `NEO4J_URI`. Si falta, detener e
indicar al usuario que cree `.env` con estas variables:
`NEO4J_URI`, `NEO4J_USERNAME`, `NEO4J_PASSWORD`, `NEO4J_DATABASE`

### Step 5 — Ingestar en Neo4j

Por cada archivo .pgn encontrado en Step 3:

```bash
python3 scripts/ingest_pgn.py <path-al-pgn>
```

El script imprime progreso cada 50 partidas y termina con:
`Listo. N partidas ingestadas, M omitidas.`

Si sale con código non-zero, reportar el output de error y detener.

### Step 6 — Reportar resultado

```
Jugador:   <PlayerName>
Fuente:    pgnmentor.com/<PlayerName>.zip  (o Lichess si fue fallback)
PGN:       <path(s) ingestados>
Resultado: N partidas ingestadas, M omitidas
Neo4j:     <NEO4J_URI de .env>
```

## Limpieza que ya maneja ingest_pgn.py

- **Deduplicación**: MERGE en Cypher — idempotente, re-ejecutar es seguro
- **Partidas incompletas**: resultado `*` descartado automáticamente
- **FEN normalizado**: 4 campos (sin contadores de semi-movimiento ni número de jugada)
- **Stats incrementales**: `times_played`, `white_wins`, `black_wins`, `draws` se acumulan en ON MATCH SET
- **Línea principal únicamente**: variaciones alternativas ignoradas
- **Partidas sin jugadas**: descartadas ("omitidas")
