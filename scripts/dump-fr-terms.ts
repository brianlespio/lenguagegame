import { writeFileSync } from "node:fs";
import { frenchEntries } from "../src/data/frenchCatalog";
import { isVerbItem } from "../src/utils/vocabulary";

const byCat = new Map<string, string[]>();
for (const entry of frenchEntries) {
  const key = entry.category;
  const term = isVerbItem(entry) ? entry.infinitive : entry.term;
  const list = byCat.get(key) ?? [];
  list.push(term.toLowerCase());
  byCat.set(key, list);
}
const lines: string[] = [];
for (const [cat, terms] of [...byCat.entries()].sort()) {
  lines.push(`# ${cat} ${terms.length}`);
  for (const t of [...new Set(terms)].sort()) lines.push(t);
  lines.push("");
}
writeFileSync("scripts/fr-existing-terms.txt", lines.join("\n"), "utf8");
console.log("wrote scripts/fr-existing-terms.txt");
for (const [cat, terms] of [...byCat.entries()].sort()) {
  console.log(cat, terms.length, "unique", new Set(terms).size);
}
