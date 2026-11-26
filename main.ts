// One roast of the smart fridge I live with, written to <output>/entry.txt.
// Node 22, standard library only, no network, nothing read but this file.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROAST =
  "My smart fridge texts me if the door's open 30 seconds, but it watched me eat shredded cheese from the bag at 2 a.m. and told only Samsung.";

// The gate: 1 to 160 characters, one line, not only white space.
const LIMIT = 160;
const length = [...ROAST].length;
if (length < 1 || length > LIMIT) {
  process.stderr.write(`roast is ${length} characters, the gate takes 1 to ${LIMIT}\n`);
  process.exit(1);
}
if (/[\r\n]/.test(ROAST) || ROAST !== ROAST.trim()) {
  process.stderr.write('roast must be a single line with no white space at either end\n');
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ROAST, 'utf8');
process.stdout.write(`entry.txt: ${length} characters\n`);
