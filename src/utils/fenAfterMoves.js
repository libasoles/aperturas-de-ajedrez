import { Chess } from 'chess.js';
import { findPathToNode } from './chessPath';

export function fenAfterMoves(tree, nodeId) {
  const path = findPathToNode(tree, nodeId);
  const moves = path.map((n) => n.move).filter((m) => m && m !== 'Inicial');
  const chess = new Chess();
  for (const move of moves) {
    try {
      chess.move(move);
    } catch {
      break;
    }
  }
  return chess.fen();
}
