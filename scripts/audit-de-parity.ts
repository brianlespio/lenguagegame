import { readFileSync, readdirSync } from "node:fs";
import { allEntries } from "../src/data/englishCatalog";
import { isVerbItem } from "../src/utils/vocabulary";
import {
  FROZEN_ENGLISH_BY_CATEGORY,
  PARITY_CATEGORIES,
  PARITY_TARGETS,
  floorParity,
} from "../src/data/parity";

const glossDir = "src/data/german";
const glossFiles = readdirSync(glossDir).filter((f) => f.startsWith("gloss-") && f.endsWith(".tsv"));
const glossIds = new Set<string>();
for (const file of glossFiles) {
  const raw = readFileSync(`${glossDir}/${file}`, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const id = trimmed.split("\t")[1]?.trim();
    if (id) glossIds.add(id);
  }
}

const haveByCat = Object.fromEntries(PARITY_CATEGORIES.map((c) => [c, 0])) as Record<string, number>;
const missingByCat = Object.fromEntries(PARITY_CATEGORIES.map((c) => [c, [] as string[]])) as Record<
  string,
  string[]
>;

for (const entry of allEntries) {
  if (glossIds.has(entry.id)) {
    haveByCat[entry.category] += 1;
  } else {
    missingByCat[entry.category].push(entry.id);
  }
}

console.log("gloss files", glossFiles.sort().join(", "));
console.log("gloss ids", glossIds.size);
console.log("english", allEntries.length);
console.log("--- by category ---");
let needMore = 0;
for (const cat of PARITY_CATEGORIES) {
  const have = haveByCat[cat];
  const need = PARITY_TARGETS.byCategory[cat];
  const gap = Math.max(0, need - have);
  needMore += gap;
  console.log(
    cat,
    "have",
    have,
    "need",
    need,
    "en",
    FROZEN_ENGLISH_BY_CATEGORY[cat],
    "gap",
    gap,
    "missing",
    missingByCat[cat].length,
  );
}
console.log("total have", glossIds.size, "target", PARITY_TARGETS.total, "cat-gap-sum", needMore);
console.log(
  "extra needed beyond cat floors for total",
  Math.max(0, PARITY_TARGETS.total - glossIds.size - needMore),
);

// Which en-chunks are fully covered?
const chunkDir = "scripts/en-chunks";
const parts = readdirSync(chunkDir)
  .filter((f) => f.startsWith("part-") && f.endsWith(".tsv"))
  .sort();
for (const part of parts) {
  const lines = readFileSync(`${chunkDir}/${part}`, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const ids = lines.map((l) => l.split("\t")[1]?.trim() ?? "");
  const covered = ids.filter((id) => glossIds.has(id)).length;
  console.log(part, "lines", lines.length, "covered", covered, covered === lines.length ? "FULL" : "partial");
}
