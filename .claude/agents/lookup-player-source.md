---
name: lookup-player-source
description: >-
  Dado un nombre de jugador que devolvió 404 en PGNMentor, encuentra la
  capitalización correcta o una URL de Lichess para descargar sus partidas.
  Solo lectura — no toca archivos. Invocado por el skill ingest-player.
tools:
  - WebFetch(domain:www.pgnmentor.com)
  - WebFetch(domain:lichess.org)
  - WebSearch
---

# Lookup Player Source Agent

Recibe un nombre de jugador que no se encontró en PGNMentor. Busca dónde
obtener sus partidas. **Output-only — no toca archivos.**

## Step 1 — Buscar en PGNMentor

Fetch del índice de jugadores de PGNMentor:

```
https://www.pgnmentor.com/files.html
```

Buscar el nombre en la página (prueba variantes: apellido solo, con iniciales,
con guión, sin acento). Si se encuentra → output `PGNMENTOR_NAME=<ExactName>`
tal como aparece en el índice, y terminar.

## Step 2 — Buscar en Lichess (si PGNMentor falla)

```
https://lichess.org/api/user/<lowercase-player-name>
```

Si devuelve HTTP 200 con campo `id`, construir URL de exportación:

```
https://lichess.org/api/games/user/<id>?max=10000&rated=true
```

Output `LICHESS_URL=<url>` y terminar.

## Step 3 — WebSearch fallback

```
"<player name>" site:pgnmentor.com OR lichess.org chess games PGN download
```

Parsear resultados para URL directa de descarga PGN.

## Output format

Devolver **exactamente uno** de estos bloques:

```
PGNMENTOR_NAME=<ExactName>
```

```
LICHESS_URL=https://lichess.org/api/games/user/<id>?...
```

```
NOT_FOUND
Buscado en: PGNMentor index, Lichess user API, WebSearch
Sugerencia: <qué debe intentar el usuario>
```
