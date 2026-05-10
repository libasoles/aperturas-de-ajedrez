"""
Ingesta de partidas PGN (ZIP o archivo plano) en un grafo Neo4j de posiciones.

Uso:
    python scripts/ingest_pgn.py <archivo.pgn|archivo.zip>

Variables de entorno requeridas (cargadas desde .env):
    NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD, NEO4J_DATABASE
"""

import io
import os
import sys
import zipfile
import hashlib

import chess.pgn
from dotenv import load_dotenv
from neo4j import GraphDatabase

BATCH_SIZE = 50

INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -"

QUERY_CONSTRAINTS = [
    "CREATE CONSTRAINT IF NOT EXISTS FOR (p:Position) REQUIRE p.fen IS UNIQUE",
    "CREATE CONSTRAINT IF NOT EXISTS FOR (g:Game)     REQUIRE g.game_id IS UNIQUE",
    "CREATE CONSTRAINT IF NOT EXISTS FOR (pl:Player)  REQUIRE pl.name IS UNIQUE",
]

QUERY_ROOT = "MERGE (:Position {fen: $fen})"

QUERY_GAMES = """
UNWIND $games AS g
MERGE (w:Player {name: g.white})
  ON CREATE SET w.elo = g.white_elo
MERGE (b:Player {name: g.black})
  ON CREATE SET b.elo = g.black_elo
MERGE (game:Game {game_id: g.game_id})
  ON CREATE SET game.date    = g.date,
               game.event   = g.event,
               game.result  = g.result
MERGE (w)-[:PLAYED_WHITE]->(game)
MERGE (b)-[:PLAYED_BLACK]->(game)
WITH game, g
MATCH (start:Position {fen: g.start_fen})
MERGE (game)-[:STARTED_AT]->(start)
"""

QUERY_MOVES = """
UNWIND $moves AS m
MERGE (from:Position {fen: m.from_fen})
MERGE (to:Position   {fen: m.to_fen})
MERGE (from)-[r:MOVE {san: m.san, from_fen: m.from_fen}]->(to)
ON CREATE SET
  r.uci         = m.uci,
  r.times_played = 1,
  r.white_wins  = CASE WHEN m.result = '1-0'       THEN 1 ELSE 0 END,
  r.black_wins  = CASE WHEN m.result = '0-1'       THEN 1 ELSE 0 END,
  r.draws       = CASE WHEN m.result = '1/2-1/2'   THEN 1 ELSE 0 END
ON MATCH SET
  r.times_played = r.times_played + 1,
  r.white_wins  = r.white_wins + CASE WHEN m.result = '1-0'     THEN 1 ELSE 0 END,
  r.black_wins  = r.black_wins + CASE WHEN m.result = '0-1'     THEN 1 ELSE 0 END,
  r.draws       = r.draws      + CASE WHEN m.result = '1/2-1/2' THEN 1 ELSE 0 END
"""


def normalize_fen(board: chess.Board) -> str:
    """Retorna el FEN sin el contador de medio movimiento ni el número de jugada.

    chess.Board.fen() → "rnbqkbnr/... w KQkq - 0 1"
    normalize_fen()   → "rnbqkbnr/... w KQkq -"
    """
    return " ".join(board.fen().split()[:4])


def game_id(headers: chess.pgn.Headers) -> str:
    key = (
        headers.get("White", "")
        + headers.get("Black", "")
        + headers.get("Date", "")
        + headers.get("Event", "")
    )
    return hashlib.sha1(key.encode()).hexdigest()


def _read_pgn_stream(text_stream):
    """Lee todas las partidas de un flujo de texto PGN; hace yield de cada chess.pgn.Game."""
    while True:
        game = chess.pgn.read_game(text_stream)
        if game is None:
            break
        yield game


def game_generator(source_path: str):
    """Generador que produce partidas válidas desde un .pgn o un .zip con PGNs.

    Filtra partidas cuyo resultado sea '*' (incompletas o corruptas).
    """
    if source_path.lower().endswith(".zip"):
        with zipfile.ZipFile(source_path, "r") as zf:
            for name in zf.namelist():
                if not name.lower().endswith(".pgn"):
                    continue
                with zf.open(name) as raw:
                    stream = io.TextIOWrapper(raw, encoding="utf-8", errors="replace")
                    for game in _read_pgn_stream(stream):
                        if game.headers.get("Result", "*") != "*":
                            yield game
    else:
        with open(source_path, encoding="utf-8", errors="replace") as f:
            for game in _read_pgn_stream(f):
                if game.headers.get("Result", "*") != "*":
                    yield game


def _parse_elo(headers: chess.pgn.Headers, key: str):
    """Convierte el ELO del header a int, o None si no está disponible."""
    raw = headers.get(key, "")
    try:
        return int(raw)
    except (ValueError, TypeError):
        return None


def parse_game(game: chess.pgn.Game):
    """Convierte una partida en (game_meta dict, moves list).

    Retorna (None, None) si la partida no tiene jugadas.
    """
    headers = game.headers
    result = headers.get("Result", "*")

    board = game.board()
    start_fen = normalize_fen(board)

    moves = []
    node = game
    while node.variations:
        # Solo seguimos la línea principal (variación 0)
        next_node = node.variations[0]
        move = next_node.move
        from_fen = normalize_fen(board)
        san = board.san(move)
        uci = move.uci()
        board.push(move)
        to_fen = normalize_fen(board)
        moves.append(
            {
                "from_fen": from_fen,
                "to_fen": to_fen,
                "san": san,
                "uci": uci,
                "result": result,
            }
        )
        node = next_node

    if not moves:
        return None, None

    meta = {
        "game_id": game_id(headers),
        "white": headers.get("White", "Unknown"),
        "white_elo": _parse_elo(headers, "WhiteElo"),
        "black": headers.get("Black", "Unknown"),
        "black_elo": _parse_elo(headers, "BlackElo"),
        "date": headers.get("Date", ""),
        "event": headers.get("Event", ""),
        "result": result,
        "start_fen": start_fen,
    }

    return meta, moves


def setup_database(session):
    """Crea constraints e inserta el nodo raíz (posición inicial)."""
    for cypher in QUERY_CONSTRAINTS:
        session.run(cypher)
    session.run(QUERY_ROOT, fen=INITIAL_FEN)
    print("Constraints e índices listos. Nodo raíz creado.")


def _run_batch(tx, query, params):
    tx.run(query, **params)


def ingest_batch(session, games_batch: list, moves_batch: list):
    session.execute_write(_run_batch, QUERY_GAMES, {"games": games_batch})
    session.execute_write(_run_batch, QUERY_MOVES, {"moves": moves_batch})


def main():
    load_dotenv()

    if len(sys.argv) < 2:
        print("Uso: python scripts/ingest_pgn.py <archivo.pgn|archivo.zip>")
        sys.exit(1)

    source_path = sys.argv[1]
    if not os.path.exists(source_path):
        print(f"Archivo no encontrado: {source_path}")
        sys.exit(1)

    uri = os.environ["NEO4J_URI"]
    user = os.environ["NEO4J_USERNAME"]
    password = os.environ["NEO4J_PASSWORD"]
    database = os.environ.get("NEO4J_DATABASE", "neo4j")

    driver = GraphDatabase.driver(uri, auth=(user, password))

    try:
        with driver.session(database=database) as session:
            setup_database(session)

            games_batch: list = []
            moves_batch: list = []
            total = 0
            skipped = 0

            for game in game_generator(source_path):
                meta, moves = parse_game(game)
                if meta is None:
                    skipped += 1
                    continue

                games_batch.append(meta)
                moves_batch.extend(moves)

                if len(games_batch) >= BATCH_SIZE:
                    ingest_batch(session, games_batch, moves_batch)
                    total += len(games_batch)
                    print(f"  {total} partidas procesadas…")
                    games_batch = []
                    moves_batch = []

            if games_batch:
                ingest_batch(session, games_batch, moves_batch)
                total += len(games_batch)

        print(f"\nListo. {total} partidas ingestadas, {skipped} omitidas.")
    finally:
        driver.close()


if __name__ == "__main__":
    main()
