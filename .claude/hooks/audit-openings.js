import { Chess } from 'chess.js';
import { execSync } from 'child_process';
import { OPENING_TREE } from '../../src/data/openings.js';

// ─── DFS validation ───────────────────────────────────────────────────────────

function auditTree(node, chess, pathMoves) {
  const errors = [];

  if (node.move && node.move !== 'Inicial') {
    const result = chess.move(node.move);
    if (!result) {
      errors.push({ id: node.id, move: node.move, path: pathMoves.join(' → ') });
      return errors; // Can't continue down an illegal path
    }
    pathMoves = [...pathMoves, node.move];
  }

  for (const child of (node.children ?? [])) {
    errors.push(...auditTree(child, new Chess(chess.fen()), pathMoves));
  }

  return errors;
}

function countNodes(node) {
  let n = node.move && node.move !== 'Inicial' ? 1 : 0;
  for (const child of (node.children ?? [])) n += countNodes(child);
  return n;
}

// ─── Detect new nodes from git diff ──────────────────────────────────────────

function detectNewNodes() {
  try {
    const diff = execSync('git diff HEAD src/data/openings.js 2>/dev/null', {
      encoding: 'utf8',
      cwd: new URL('../..', import.meta.url).pathname,
    });
    const newNodes = [];
    for (const line of diff.split('\n')) {
      if (!line.startsWith('+') || line.startsWith('+++')) continue;
      const idMatch = line.match(/id:\s*["']([^"']+)["']/);
      const moveMatch = line.match(/move:\s*["']([^"']+)["']/);
      const openingMatch = line.match(/opening:\s*["']([^"']+)["']/);
      if (idMatch && moveMatch) {
        newNodes.push({
          id: idMatch[1],
          move: moveMatch[1],
          opening: openingMatch?.[1] ?? '',
        });
      }
    }
    return newNodes;
  } catch {
    return [];
  }
}

// ─── Main audit ───────────────────────────────────────────────────────────────

function runAudit() {
  const errors = auditTree(OPENING_TREE, new Chess(), []);
  const total = countNodes(OPENING_TREE);

  if (errors.length > 0) {
    process.stderr.write(`\n✗ ${errors.length} illegal move(s) found:\n\n`);
    for (const e of errors) {
      process.stderr.write(`  Node: ${e.id}  Move: ${e.move}\n`);
      process.stderr.write(`  Path: ${e.path}\n\n`);
    }
    process.stderr.write('Fix these before continuing.\n');
    process.exit(1);
  }

  const newNodes = detectNewNodes();
  process.stdout.write(`✓ ${total} nodes valid.\n`);

  if (newNodes.length > 0) {
    process.stdout.write(`\nNew nodes detected — verify theory against .claude/opening-sources.md:\n`);
    for (const n of newNodes) {
      const label = n.opening ? `  (${n.opening})` : '';
      process.stdout.write(`  - ${n.id}  ${n.move}${label}\n`);
    }
    process.stdout.write('\nRun /audit-openings to complete theory verification.\n');
  }
}

// ─── Hook mode ────────────────────────────────────────────────────────────────
// When run with --hook, reads Claude Code PostToolUse JSON from stdin.
// Only runs the audit if the edited file is openings.js.

const isHook = process.argv.includes('--hook');

if (isHook) {
  let stdin = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => { stdin += chunk; });
  process.stdin.on('end', () => {
    try {
      const payload = JSON.parse(stdin);
      const filePath = payload?.tool_input?.file_path ?? '';
      if (!filePath.includes('openings.js')) process.exit(0);
    } catch {
      // If we can't parse the input, skip silently
      process.exit(0);
    }
    runAudit();
  });
} else {
  runAudit();
}
