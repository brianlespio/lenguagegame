import { writeFileSync, mkdirSync } from "node:fs";
import { allEntries } from "../src/data/englishCatalog";
import { isVerbItem } from "../src/utils/vocabulary";

const dir = "scripts/en-chunks";
mkdirSync(dir, { recursive: true });

const counts = new Map<string, number>();
const lines: string[] = [];
for (const entry of allEntries) {
  counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
  if (isVerbItem(entry)) {
    lines.push(["V", entry.id, entry.infinitive, entry.infinitiveTranslation].join("\t"));
  } else {
    lines.push(["W", entry.id, entry.category, entry.term, entry.translation].join("\t"));
  }
}
const chunk = 800;
for (let i = 0; i < lines.length; i += chunk) {
  const name = `${dir}/part-${String(i / chunk).padStart(2, "0")}.tsv`;
  writeFileSync(name, lines.slice(i, i + chunk).join("\n"), "utf8");
}
const summary = [...counts.entries()].map(([k, n]) => `${k}\t${n}`).join("\n");
writeFileSync(`${dir}/counts.tsv`, `${summary}\nTOTAL\t${allEntries.length}\n`, "utf8");
console.log(summary);
console.log("TOTAL", allEntries.length, "chunks", Math.ceil(lines.length / chunk));
