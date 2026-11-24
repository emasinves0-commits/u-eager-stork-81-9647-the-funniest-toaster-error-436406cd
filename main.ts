import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a toaster's heartbreak, exactly 64 characters, no newline.
const ENTRY_TEXT =
  "ERROR 07: Six years together, and today you chose the microwave.";
const ENTRY_FILENAME = "entry.txt";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, ENTRY_FILENAME), ENTRY_TEXT, "utf8");
