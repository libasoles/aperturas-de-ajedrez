# Chess opening reference sources

When validating or adding moves to `src/data/openings.js`, consult these sources.

## Primary sources

- **365chess.com ECO explorer** — `https://www.365chess.com/eco/<ECO_CODE>` (e.g. `C59` for Two Knights Knorre). Shows canonical move sequences per ECO classification.
- **Lichess opening explorer** — `https://lichess.org/opening/<opening-name>` and `https://lichess.org/analysis` with move input. Shows real game statistics (masters + community games).
- **Wikipedia chess opening articles** — `https://en.wikipedia.org/wiki/<Opening_Name>`. Good for narrative theory and historical context.
- **Chess.com opening pages** — `https://www.chess.com/openings/<Opening-Name>`. Good for named variations and sub-variations.
- **Wikibooks Chess Opening Theory** — `https://en.wikibooks.org/wiki/Chess_Opening_Theory`. Deep move-by-move coverage for specific lines.
- **chessgames.com ECO index** — `https://www.chessgames.com/perl/chessopening?eco=<ECO>`. Real game database.

## How to validate a specific position

1. Identify the ECO code (e.g. C59 = Two Knights Knorre, D20-D29 = QGA).
2. Look up the ECO code on 365chess.com for the canonical move list.
3. Cross-reference with the Lichess opening explorer for frequency data.
4. If a move seems wrong, verify with chess.js locally: a `.move()` that returns null is illegal.

## Verified fixes (audit trail)

| Date | Node ID | Wrong move | Correct move | Source |
|------|---------|-----------|--------------|--------|
| 2026-03-15 | `ital-12b1` | `d5` (pawn, impossible) | `Nd5` | 365chess C58: `8.Bd3 h6 9.Ne4 Nd5`; Chess.com forum confirms `8.Bd3 Nd5` mainline |
| 2026-03-15 | `qg-11a2` | `d5` (pawn, impossible) | `Nd5` | Chess logic: d-pawn moved to c4 on move 2 (dxc4), no d-pawn remains; `6...Nd5 7.Nb5` is natural theory |
| 2026-03-15 | `scan-6b1` | `Nf3` | `Nc3` | Chess logic: Nxc3 child requires a White piece on c3; Nc3 development is standard Scandinavian 3...Nxd5 4.Nc3 |
| 2026-03-15 | `scan-8b1a` | `c4` | `Bc4` | Chess logic: c3 knight blocks c2→c4 pawn advance; Bc4 is standard Scandinavian development attacking d5 knight |
| 2026-03-15 | `scan-9b1b` | `Bg7` | `g6` | Chess logic: g7 pawn blocks bishop; must play g6 first to prepare fianchetto |
| 2026-03-15 | `scan-10b1a` | `Nc3` | `Nf3` | Chess logic: knight already on c3; Nf3 develops the g1 knight |
| 2026-03-15 | `scan-11b1b` | `O-O` | `Bg7` | Chess logic: f8 bishop not yet cleared; Bg7 fianchetto (after g6) precedes castling |
| 2026-03-15 | `scan-12b1b` | `O-O` | `Nf3` | Chess logic: g1 knight blocks kingside castling; must develop Nf3 first |
| 2026-03-15 | `scan-13b1b` | `Nd7` | `c5` | Chess logic: Black's only knight was traded on move 4 (Nxc3); c5 is thematic Scandinavian Modern move |
| 2026-03-15 | `span-10a1b` | `Ba3` | `Bb3` | Chess logic: bishop on a4 moves diagonally; a3 is not on any diagonal from a4 |
| 2026-03-15 | `span-11a1b` | `O-O` | `Be7` | Chess logic: f8 bishop not cleared for castling; Be7 is the standard Ruy Lopez developing move |
| 2026-03-15 | `span-12b1` | `Rxe5+` | `Re1` | Chess logic: rook is on f1 after O-O, not on e-file; Re1 develops rook before Rxe5 |
| 2026-03-15 | `span-14a1b` | `cxd4` | `Nxd4` | Chess logic: no c3 pawn in this line; f3 knight recaptures on d4 |
| 2026-03-15 | `span-14b1` | `d4` | `Rxe5` | Chess logic: d4 already played; after Re1 Be7, White recaptures the knight on e5 |
| 2026-03-15 | `span-16a1b` | `d5` | `Re1` | Chess logic: no White d-pawn remaining; Re1 attacks the e4 knight naturally |
| 2026-03-15 | `span-10c` | `Ng5` | `Nfg5` | Chess logic: both White knights (e4 and f3) can reach g5; SAN disambiguation required |
| 2026-03-15 | `span-12c` | `exd6` | `Nd6+` | Chess logic: no White e-pawn (captured earlier); e4-knight leaps to d6 giving check |
| 2026-03-15 | `span-9b2` | `exd4` | `Be7` | ECO C67 (365chess): Río de Janeiro is 5...Be7, not 5...exd4 |
| 2026-03-15 | `span-10b2` | `Nxd4` | `Qe2` | ECO C67: White plays 6.Qe2 in the Río de Janeiro |
| 2026-03-15 | `span-11b2` | `Nxe4` | `Nd6` | ECO C67: Black retreats 6...Nd6 (e4 knight to d6) |
| 2026-03-15 | `span-12b2` | `Rxe4` | `Bxc6` | ECO C67: White plays 7.Bxc6 exchanging bishop for knight |
| 2026-03-15 | `span-13b2` | `Be7` | `bxc6` | ECO C67: Black recaptures 7...bxc6 |
| 2026-03-15 | `span-14b2` | `Nf5` | `dxe5` | ECO C67: White plays 8.dxe5 |
| 2026-03-15 | `span-15b2` | `O-O` | `Nb7` | ECO C67: Black plays 8...Nb7 retreating the knight |
| 2026-03-15 | `ital-7b3` | `exd5` | `Bxd5` | Chess.com/Italian theory: after 5.Re1 d5, 6.Bxd5 is correct (no e-pawn for exd5) |
| 2026-03-15 | `ital-8b3` | `Nxd5` | `Qxd5` | Theory: Black queen recaptures the bishop on d5 |
| 2026-03-15 | `ital-9b3` | `Nxd5` | `Nc3` | Theory: White develops knight to c3 attacking the queen |
| 2026-03-15 | `ital-10b3` | `Qxd5` | `Qa5` | Theory: Black queen retreats to a5 |
| 2026-03-15 | `ital-11b3` | `Re1+` | `Nxe4` | Theory: White's c3 knight captures the e4 knight (c3→e4 = (2,1) valid) |
| 2026-03-15 | `sic-11a3` | `O-O` | `Bg7` | Chess logic: Dragon variation requires Bg7 (fianchetto) before castling |
| 2026-03-15 | `sic-11c2a` | `Nf6` | `a6` | Chess logic: knight already on f6; a6 is the standard Scheveningen/Najdorf pawn |
| 2026-03-15 | `sic-13c2b` | `Nf6` | `O-O` | Chess logic: knight already on f6; Black castles after the piece trades |
| 2026-03-15 | `fr-13d1` | `O-O` | `Nf6` | Chess logic: g8 knight not yet developed; Nf6 clears g8 before castling |
| 2026-03-15 | `ck-13b` | `Nf5` | `Ng6` | Chess logic: bishop occupies f5; knight from e7 goes to g6 instead |
| 2026-03-15 | `ck-10d` | `O-O-O` | `Qd2` | Chess logic: queen on d1 blocks queenside castling; Qd2 clears d1 |
| 2026-03-15 | `qg-9b2` | `Qa5` | `c6` | Chess logic: queen can't reach a5 from d8 through c7 (pawn blocks) |
| 2026-03-15 | `lon-8a` | `O-O` | `Bd3` | Chess logic: f1 bishop not yet developed; Bd3 clears f1 before castling |
| 2026-03-15 | `ki-16a1` | `Ne1` | `O-O` | Chess logic: White hasn't castled yet; O-O is the correct move |
| 2026-03-15 | `ki-16a2` | `Nxe5` | `f4` | Chess logic: no White knight can reach e5; f4 attacks the Ne5 knight |
| 2026-03-15 | `ki-17a2` | `fxe5` | `Neg4` | Chess logic: no Black f-pawn on f6 (still on f7); Neg4 retreats the e5 knight to g4 |
