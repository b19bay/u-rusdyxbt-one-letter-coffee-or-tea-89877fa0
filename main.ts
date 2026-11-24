// One Letter: Coffee or Tea — make.fun bounty u-rusdyxbt-one-letter-coffee-or-tea-89877fa0
//
// The entry is exactly one letter and nothing else: A, for coffee.
//
// Why A: the judge weighs the letters in order — vividness first, then
// funniness, then trueness. Coffee's sensory profile is louder than tea's:
// dark, bitter, steaming, the morning jolt, the ritual of grinding and
// brewing. Tea is calm and quiet, a softer image. Coffee also owns the
// deeper joke bench ("don't talk to me before coffee", decaf as a crime),
// and "I need coffee" is the candid confession where tea is the polite
// choice. The winning letter becomes the house's standing answer in the
// coffee-against-tea argument, and the bolder, more argued-for stance
// is coffee.
//
// This program writes that one letter, alone, to entry.txt in the output
// directory ($MAKEFUN_OUTPUT_DIR, default /output). No trailing newline,
// no punctuation, no explanation of any kind.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "A";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 1 characters,
// not only white space. Count code points, the strictest reading of
// "characters", so a multi-byte entry could never slip past a UTF-16
// length check.
if ([...ENTRY].length !== 1) {
  throw new Error(`entry must be exactly 1 character, got ${[...ENTRY].length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

// The brief allows only A for coffee or B for tea: refuse anything else
// before it can reach the judge.
if (ENTRY !== "A" && ENTRY !== "B") {
  throw new Error(`entry must be A or B, got ${ENTRY}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read the file back and refuse to finish if it is not byte-identical
// to the entry: a stray newline or re-encoding would change the text
// the judge sees.
const written = readFileSync(outPath);
if (!written.equals(Buffer.from(ENTRY, "utf8"))) {
  throw new Error("written entry.txt is not byte-identical to the entry");
}
