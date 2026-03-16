Audit the chess openings in `src/data/openings.js` for move legality and theory documentation.

## Step 1 — Legal move check

Run the validation script and report the result:

```bash
node scripts/audit-openings.js
```

If there are illegal moves, stop and report them clearly. Do NOT continue to theory verification until all moves are legal.

## Step 2 — Detect new nodes

Run:

```bash
git diff HEAD src/data/openings.js
```

Parse the added lines (starting with `+`, excluding `+++`) to extract new node objects. Look for lines containing `id:` and `move:` fields. Group them by their parent path context using the surrounding diff lines.

If no new nodes are detected, the audit is complete — report "✓ All moves valid, no new nodes to verify."

## Step 3 — Reconstruct move sequences for new nodes

For each new node ID, use `findPathToNode` logic on `OPENING_TREE` (from `src/utils/chessPath.js`) to reconstruct the full sequence of moves from root to that node. This gives you the exact line to look up in reference databases.

## Step 4 — Theory verification

For each new node's move sequence, verify against the sources listed in `.claude/opening-sources.md`:

1. **Lichess opening explorer** — search `https://lichess.org/opening/<moves>` or use WebSearch for the line
2. **365chess.com** — search by ECO code or move sequence
3. **Wikipedia / Chess.com / Wikibooks** — for named variations

Use WebSearch with queries like:
- `lichess opening explorer "<move sequence>"`
- `365chess ECO "<opening name>" "<moves>"`
- `chess theory "<move sequence>" opening`

For each new node, report one of:
- **Confirmed** — found in at least one authoritative source (cite it)
- **Not found** — not found in any source (flag for review)
- **Ambiguous** — found but with conflicting information (explain)

## Step 5 — Summary report

Output a structured summary:

```
=== Audit complete ===

Legal moves:   ✓ N nodes checked, 0 errors

New nodes:     X detected
  - node-id  Move  (opening)  →  Confirmed / Not found / Ambiguous
    Source: <URL or reference>

Audit trail:  Propose additions to .claude/opening-sources.md for confirmed new nodes.
```

If any new nodes are **Not found**, recommend the developer verify manually before merging.

## Step 6 — Update audit trail

For confirmed new nodes, propose an addition to the audit trail table in `.claude/opening-sources.md` following the existing format:

```
| <date> | `<node-id>` | new | <move> | <source URL or reference> |
```

Ask the user whether to write these additions before doing so.
