---
name: stockfish-eval
description: >-
  Computes Stockfish 18 depth-14 evaluations for every node in an opening tree.
  Takes the node tree from research-opening output and produces annotated nodes
  ready for implementation. Output only; does not touch source files.
---

# Stockfish Evaluation Agent

Given a node tree from the `research-opening` agent, calculate Stockfish 18 evaluations at depth 14 for every position, then output the tree with scores embedded.

## Goal

Produce a complete node tree with `stockfish: { depth: 14, score: number }` fields on every node, ready to paste directly into `src/data/openings/{d4,e4}.js`.

---

## Input

Accept a node tree in this format (from `research-opening` output):

```js
{
  id: "dutch-1",
  move: "c4",
  color: "black",
  opening: "dutch",
  children: [
    { id: "dutch-2", move: "g6", color: "white", opening: "dutch", children: [...] },
    // ...
  ]
}
```

- Nodes may or may not already have a `stockfish` field — if present, it will be replaced
- `move` is English SAN (K, Q, R, B, N)
- `children` may be nested arbitrarily deep

---

## Process

1. **Reconstruct the board state** for every position in the tree by replaying moves from the root
2. **Query Stockfish 18** at depth 14 for each unique position
3. **Cache results** to avoid redundant evaluations (same position via different move orders)
4. **Embed the score** into each node's `stockfish` object, using the convention:
   - Score in **pawns** from White's perspective (positive = White advantage)
   - Format: `stockfish: { depth: 14, score: 0.12 }` (always two decimal places)
5. **Validate** no missing evaluations and no duplicate `stockfish` keys

---

## Output

Return the annotated node tree, ready for implementation:

```js
{
  id: "dutch-1",
  move: "c4",
  color: "black",
  opening: "dutch",
  stockfish: {
    depth: 14,
    score: 0.04
  },
  children: [
    {
      id: "dutch-2",
      move: "g6",
      color: "white",
      opening: "dutch",
      stockfish: {
        depth: 14,
        score: -0.08
      },
      children: [...]
    },
    // ...
  ]
}
```

Format every `stockfish` object as multi-line (not inline), to prevent duplicate-key issues during JSON parsing.

---

## Validation checklist

- ✅ Every node has a `stockfish` object (no missing evals)
- ✅ Depth is always `14`
- ✅ Scores are in **pawns** from White's perspective
- ✅ No duplicate `stockfish` keys in the output
- ✅ All moves are replayed correctly (board state matches the move sequence)
- ✅ Scores make sense (main lines typically ±0.5 pawns, unusual lines may vary more)

---

## Output format

Return the tree as a JavaScript code block (ready for copy-paste into `src/data/openings/{d4,e4}.js`):

````js
// src/data/openings/<d4|e4>.js — paste inside the correct array
{ id: "...", move: "...", color: "...", opening: "...", stockfish: { depth: 14, score: ... }, children: [...] }
````

At the end, include a **summary**:

```
## Summary

- Total nodes evaluated: 24
- Positions with engine advantage (score > 0.5): 3
- Positions with engine disadvantage (score < -0.5): 2
- Cache hits (duplicate positions): 5
- Evaluation time: ~45 seconds
```

---

## Notes

- Use Stockfish 18, not any other version
- Depth must be 14 (not 16, not 12)
- Do not modify node IDs, `move`, `color`, `opening`, or `children` — only add/replace `stockfish`
- If a node already has a `stockfish` field, **replace it entirely** (do not append inline duplicates)
- Positions with only one legal move (rare endgames) may have unusual scores — flag these for manual review if found
- **Scope**: Evaluate **only the new opening tree** provided by `research-opening`. Do NOT compute or update evaluations for existing openings in the codebase.
