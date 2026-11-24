import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the toaster reports a real fault (crumb tray over capacity)
// and escalates it the way an overworked appliance would — 79 characters,
// no trailing newline.
const ENTRY_TEXT =
  "Crumb tray at 112% capacity. Clear it immediately or I am unionizing the slots.";
const ENTRY_FILENAME = "entry.txt";
const MAX_CHARS = 120;

function validateEntry(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (/\s$/.test(text) || text.trim() !== text) {
    throw new Error("entry must not start or end with whitespace");
  }
  // A one-line appliance message must stay one line: no control characters.
  if (/[\u0000-\u001f]/.test(text)) {
    throw new Error("entry must not contain control characters");
  }
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

validateEntry(ENTRY_TEXT);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, ENTRY_FILENAME), ENTRY_TEXT, "utf8");
