import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I hid your file somewhere even I can't find it. Technically, that makes it unhackable.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("round-trip mismatch");
if (ENTRY.length < 1 || ENTRY.length > 200) throw new Error("entry must be 1-200 characters");
if (ENTRY.trim().length === 0) throw new Error("entry must not be only whitespace");
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");
if (ENTRY !== ENTRY.trim()) throw new Error("entry must not start or end with whitespace");
console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
