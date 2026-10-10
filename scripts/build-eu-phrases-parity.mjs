/**
 * Phase 36 — translate shared phraseSets ES(+FR) → Basque Batua via MyMemory,
 * with local Batua fallback when the API empties / hits daily quota.
 *
 * Usage: node scripts/build-eu-phrases-parity.mjs [--kind polar|tech|open|school|all] [--emit-only] [--local-only]
 */
import fs from "node:fs";

const CACHE = "scripts/_eu-phrase-cache.json";
const MAP_DIR = "scripts/_eu-maps";
const EMAIL = process.env.MYMEMORY_EMAIL || "visualtrduction@users.noreply.github.com";
const SEED = JSON.parse(fs.readFileSync("scripts/_eu-rev-seed.json", "utf8"));

const kinds = (() => {
  const i = process.argv.indexOf("--kind");
  const k = i >= 0 ? process.argv[i + 1] : "all";
  return k === "all" ? ["polar", "tech", "open", "school"] : [k];
})();
const emitOnly = process.argv.includes("--emit-only");
const localOnly = process.argv.includes("--local-only");
let networkDisabled = localOnly;

fs.mkdirSync(MAP_DIR, { recursive: true });

/** @typedef {Record<string, string>} Cache */

function loadCache() {
  if (!fs.existsSync(CACHE)) return /** @type {Cache} */ ({});
  return /** @type {Cache} */ (JSON.parse(fs.readFileSync(CACHE, "utf8")));
}

function saveCache(cache) {
  fs.writeFileSync(CACHE, JSON.stringify(cache), "utf8");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function esc(s) {
  return JSON.stringify(s);
}

/** High-frequency ES phrase → Batua study forms (polar/open/tech/school crumbs). */
const PHRASE_OVR = {
  "Sí, a cinco minutos.": "Bai, bost minutura.",
  "Sí, a cinco minutos": "Bai, bost minutura",
  "No, más lejos.": "Ez, urrunago.",
  "Sí, por favor.": "Bai, mesedez.",
  "No, gracias.": "Ez, eskerrik asko.",
  "Sí.": "Bai.",
  "No.": "Ez.",
  "Sí, un poco.": "Bai, pixka bat.",
  "Ahora no, gracias.": "Orain ez, eskerrik asko.",
  "Todavía no.": "Oraindik ez.",
  "De nada.": "Ez horregatik.",
  "Por favor.": "Mesedez.",
  "Perdón.": "Barkatu.",
  "Lo siento.": "Barkatu.",
  "Hasta luego.": "Gero arte.",
  "Buenos días.": "Egun on.",
  "Buenas tardes.": "Arratsalde on.",
  "Buenas noches.": "Gabon.",
  "¿Cómo estás?": "Zelan zaude?",
  "¿Cómo te llamas?": "Nola duzu izena?",
  "¿Qué hora es?": "Zer ordu da?",
  "No lo sé.": "Ez dakit.",
  "No entiendo.": "Ez dut ulertzen.",
  "¿Puedes ayudarme?": "Lagun nazakezu?",
  "Está bien.": "Ondo dago.",
  "De acuerdo.": "Ados.",
};

const FUNC = {
  el: "",
  la: "",
  los: "",
  las: "",
  un: "",
  una: "",
  unos: "",
  unas: "",
  de: "",
  del: "",
  al: "",
  a: "",
  en: "",
  con: "-rekin",
  por: "",
  para: "",
  y: "eta",
  o: "edo",
  pero: "baina",
  que: "zein",
  sí: "bai",
  si: "baldin",
  no: "ez",
  más: "gehiago",
  menos: "gutxiago",
  muy: "oso",
  ya: "jada",
  aún: "oraindik",
  aun: "oraindik",
  también: "ere",
  tampoco: "ere ez",
  aquí: "hemen",
  allí: "han",
  ahora: "orain",
  hoy: "gaur",
  mañana: "bihar",
  ayer: "atzo",
  siempre: "beti",
  nunca: "inoiz",
  todo: "dena",
  todos: "denak",
  nada: "ezer",
  nadie: "inor",
  algo: "zerbait",
  alguien: "norbait",
  este: "hau",
  esta: "hau",
  eso: "hori",
  esto: "hau",
  ese: "hori",
  esa: "hori",
  mi: "nire",
  tu: "zure",
  su: "bere",
  me: "ni",
  te: "zu",
  se: "",
  le: "",
  lo: "",
  es: "da",
  son: "dira",
  está: "dago",
  están: "daude",
  hay: "badago",
  tiene: "du",
  tengo: "dut",
  tienes: "duzu",
  quiero: "nahi dut",
  quieres: "nahi duzu",
  puedo: "dezaket",
  puedes: "dezakezu",
  favor: "mesedez",
  gracias: "eskerrik asko",
  minutos: "minutu",
  minuto: "minutu",
  cinco: "bost",
  diez: "hamar",
  veinte: "hogei",
  lejos: "urrun",
  cerca: "gertu",
};

function stripDiacritics(s) {
  return s.normalize("NFD").replace(/\p{M}/gu, "");
}

function localPhrase(es) {
  const raw = es.trim();
  if (!raw) return "";
  if (PHRASE_OVR[raw]) return PHRASE_OVR[raw];
  const noPunctKey = raw.replace(/[¿?¡!]/g, "");
  if (PHRASE_OVR[noPunctKey]) return PHRASE_OVR[noPunctKey];
  if (PHRASE_OVR[`${noPunctKey}.`]) return PHRASE_OVR[`${noPunctKey}.`];

  const seedHit = SEED[raw.toLowerCase()] || SEED[stripDiacritics(raw).toLowerCase()];
  if (seedHit && !/\s/.test(raw)) return seedHit;

  const tokens = raw.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+|[¿?¡!.,;:]/g) || [];
  const out = [];
  for (const tok of tokens) {
    if (/^[¿?¡!.,;:]$/.test(tok)) {
      if (tok === "¿" || tok === "¡") continue;
      out.push(tok === "?" ? "?" : tok === "!" ? "!" : tok);
      continue;
    }
    const low = tok.toLowerCase();
    const stripped = stripDiacritics(low);
    if (Object.prototype.hasOwnProperty.call(FUNC, low) || Object.prototype.hasOwnProperty.call(FUNC, stripped)) {
      const f = FUNC[low] ?? FUNC[stripped];
      if (f) out.push(f);
      continue;
    }
    const hit = SEED[low] || SEED[stripped];
    if (hit) {
      out.push(hit);
      continue;
    }
    // light loan orthography for residual study tokens
    let loan = low
      .replace(/ch/g, "tx")
      .replace(/ll/g, "l")
      .replace(/qu/g, "k")
      .replace(/c([aouáóú])/g, "k$1")
      .replace(/c([eiéí])/g, "z$1")
      .replace(/v/g, "b")
      .replace(/ñ/g, "n")
      .replace(/y/g, "i");
    if (tok[0] === tok[0].toUpperCase()) {
      loan = loan.charAt(0).toUpperCase() + loan.slice(1);
    }
    out.push(loan);
  }
  return out.join(" ").replace(/\s+([.?!,;:])/g, "$1").replace(/\s+/g, " ").trim();
}

/**
 * @param {string} text
 * @param {"es|eu"|"fr|eu"} pair
 * @param {Cache} cache
 */
async function translate(text, pair, cache) {
  const key = `${pair}::${text}`;
  if (cache[key]) return cache[key];
  if (networkDisabled) return "";

  const max = 450;
  /** @type {string[]} */
  const chunks = [];
  let rest = text.trim();
  while (rest.length > max) {
    let cut = rest.lastIndexOf(". ", max);
    if (cut < max * 0.4) cut = rest.lastIndexOf(" ", max);
    if (cut < 1) cut = max;
    chunks.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest) chunks.push(rest);

  const out = [];
  for (const chunk of chunks) {
    let t = "";
    for (let attempt = 0; attempt < 6; attempt++) {
      try {
        const url =
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}` +
          `&langpair=${pair}&de=${encodeURIComponent(EMAIL)}`;
        const res = await fetch(url);
        if (res.status === 429) {
          await sleep(8000 * (attempt + 1));
          continue;
        }
        if (!res.ok) {
          await sleep(4000 * (attempt + 1));
          continue;
        }
        const json = await res.json();
        if (json.quotaFinished) {
          networkDisabled = true;
          console.warn("MyMemory quota finished — switching to local Batua fallback");
          return "";
        }
        const detail = String(json.responseDetails || "");
        if (/TOO MANY REQUESTS|RATE LIMIT|UNEXPECTED ERROR/i.test(detail)) {
          await sleep(8000 * (attempt + 1));
          continue;
        }
        t = json.responseData?.translatedText?.trim() || "";
        if (t && !/^MYMEMORY WARNING/i.test(t) && t.toLowerCase() !== chunk.toLowerCase()) break;
        if (t && !/^MYMEMORY WARNING/i.test(t) && attempt >= 2) break;
      } catch {
        await sleep(4000 * (attempt + 1));
      }
      await sleep(2000 * (attempt + 1));
    }
    if (!t) return "";
    out.push(t);
    await sleep(900);
  }
  const joined = out.join(" ").replace(/\s+/g, " ").trim();
  cache[key] = joined;
  saveCache(cache);
  return joined;
}

/**
 * Prefer ES→EU MT; fall back to FR→EU; then local Batua lexicon.
 * @param {string} es
 * @param {string} [fr]
 * @param {Cache} cache
 */
async function euFrom(es, fr, cache) {
  const localKey = `local|eu::${es}`;
  if (cache[localKey]) return cache[localKey];

  let eu = "";
  if (!networkDisabled) {
    eu = await translate(es, "es|eu", cache);
  }
  const bad =
    !eu ||
    eu === es ||
    /^MYMEMORY WARNING/i.test(eu) ||
    (es.length > 20 && eu.length < 3);
  if (bad && fr && !networkDisabled) {
    const frEu = await translate(fr, "fr|eu", cache);
    if (frEu && frEu !== fr && !/^MYMEMORY WARNING/i.test(frEu)) eu = frEu;
  }
  if (!eu || eu === es || /^MYMEMORY WARNING/i.test(eu)) {
    eu = localPhrase(es);
    cache[localKey] = eu;
    saveCache(cache);
  }
  return eu;
}

async function buildPolar(cache) {
  const rows = JSON.parse(fs.readFileSync("scripts/_eu-src-polar.json", "utf8"));
  /** @type {Record<string, {euQ:string,euY:string,euN:string}>} */
  const map = fs.existsSync(`${MAP_DIR}/polar.json`)
    ? JSON.parse(fs.readFileSync(`${MAP_DIR}/polar.json`, "utf8"))
    : {};
  let n = 0;
  for (const r of rows) {
    if (map[r.id]?.euQ && map[r.id]?.euY && map[r.id]?.euN) {
      n++;
      continue;
    }
    const euQ = await euFrom(r.esQ, r.frQ, cache);
    const euY = await euFrom(r.esY, r.frY, cache);
    const euN = await euFrom(r.esN, r.frN, cache);
    map[r.id] = { euQ, euY, euN };
    n++;
    if (n % 25 === 0) {
      fs.writeFileSync(`${MAP_DIR}/polar.json`, JSON.stringify(map, null, 2));
      console.log("polar", n, "/", rows.length);
    }
  }
  fs.writeFileSync(`${MAP_DIR}/polar.json`, JSON.stringify(map, null, 2));
  console.log("polar done", Object.keys(map).length);
}

async function buildQA(kind, cache) {
  const rows = JSON.parse(fs.readFileSync(`scripts/_eu-src-${kind}.json`, "utf8"));
  const file = `${MAP_DIR}/${kind}.json`;
  /** @type {Record<string, {euQ:string,euA:string}>} */
  const map = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
  let n = 0;
  for (const r of rows) {
    if (map[r.id]?.euQ && map[r.id]?.euA) {
      n++;
      continue;
    }
    const euQ = await euFrom(r.esQ, r.frQ, cache);
    const euA = await euFrom(r.esA, r.frA, cache);
    map[r.id] = { euQ, euA };
    n++;
    if (n % 20 === 0) {
      fs.writeFileSync(file, JSON.stringify(map, null, 2));
      console.log(kind, n, "/", rows.length);
    }
  }
  fs.writeFileSync(file, JSON.stringify(map, null, 2));
  console.log(kind, "done", Object.keys(map).length);
}

async function buildSchool(cache) {
  const rows = JSON.parse(fs.readFileSync("scripts/_eu-src-school.json", "utf8"));
  const file = `${MAP_DIR}/school.json`;
  /** @type {Record<string, {eu:string}>} */
  const map = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
  let n = 0;
  for (const r of rows) {
    if (map[r.id]?.eu) {
      n++;
      continue;
    }
    const eu = await euFrom(r.es, r.fr, cache);
    map[r.id] = { eu };
    n++;
    if (n % 20 === 0) {
      fs.writeFileSync(file, JSON.stringify(map, null, 2));
      console.log("school", n, "/", rows.length);
    }
  }
  fs.writeFileSync(file, JSON.stringify(map, null, 2));
  console.log("school done", Object.keys(map).length);
}

function emitPolar() {
  const rows = JSON.parse(fs.readFileSync("scripts/_eu-src-polar.json", "utf8"));
  const map = JSON.parse(fs.readFileSync(`${MAP_DIR}/polar.json`, "utf8"));
  const lines = [
    `import type { VocabularyItem } from "../types/vocabulary";`,
    `import { polar } from "./basquePhrases";`,
    ``,
    `/** Phase 36 — polar phrases (ES/FR → EU). */`,
    `export const basquePhrasesParityPolar: VocabularyItem[] = [`,
  ];
  for (const r of rows) {
    const m = map[r.id];
    if (!m) throw new Error(`missing polar map: ${r.id}`);
    lines.push(
      `  ...polar(${esc(r.id)}, ${esc(r.difficulty)}, ${esc(m.euQ)}, ${esc(m.euY)}, ${esc(m.euN)}, ${esc(r.esQ)}, ${esc(r.esY)}, ${esc(r.esN)}),`,
    );
  }
  lines.push(`];`, ``);
  fs.writeFileSync("src/data/basquePhrasesParityPolar.ts", lines.join("\n"), "utf8");
  return rows.length;
}

function emitQA(kind, helper, exportName) {
  const rows = JSON.parse(fs.readFileSync(`scripts/_eu-src-${kind}.json`, "utf8"));
  const map = JSON.parse(fs.readFileSync(`${MAP_DIR}/${kind}.json`, "utf8"));
  const lines = [
    `import type { VocabularyItem } from "../types/vocabulary";`,
    `import { ${helper} } from "./basquePhrases";`,
    ``,
    `/** Phase 36 — ${kind} phrases (ES/FR → EU). */`,
    `export const ${exportName}: VocabularyItem[] = [`,
  ];
  for (const r of rows) {
    const m = map[r.id];
    if (!m) throw new Error(`missing ${kind} map: ${r.id}`);
    lines.push(
      `  ...${helper}(${esc(r.id)}, ${esc(r.difficulty)}, ${esc(m.euQ)}, ${esc(m.euA)}, ${esc(r.esQ)}, ${esc(r.esA)}),`,
    );
  }
  lines.push(`];`, ``);
  const out =
    kind === "tech"
      ? "src/data/basquePhrasesParityTech.ts"
      : "src/data/basquePhrasesParityOpen.ts";
  fs.writeFileSync(out, lines.join("\n"), "utf8");
  return rows.length;
}

function emitSchool() {
  const rows = JSON.parse(fs.readFileSync("scripts/_eu-src-school.json", "utf8"));
  const map = JSON.parse(fs.readFileSync(`${MAP_DIR}/school.json`, "utf8"));
  const lines = [
    `import type { VocabularyItem } from "../types/vocabulary";`,
    `import { notice } from "./basquePhrases";`,
    ``,
    `/** Phase 36 — school notices (ES/FR → EU). */`,
    `export const basquePhrasesParitySchool: VocabularyItem[] = [`,
  ];
  for (const r of rows) {
    const m = map[r.id];
    if (!m) throw new Error(`missing school map: ${r.id}`);
    lines.push(`  notice(${esc(r.id)}, ${esc(r.difficulty)}, ${esc(m.eu)}, ${esc(r.es)}),`);
  }
  lines.push(`];`, ``);
  fs.writeFileSync("src/data/basquePhrasesParitySchool.ts", lines.join("\n"), "utf8");
  return rows.length;
}

function emitIndex() {
  const out = `import type { VocabularyItem } from "../types/vocabulary";
import { basquePhrasesParityOpen } from "./basquePhrasesParityOpen";
import { basquePhrasesParityPolar } from "./basquePhrasesParityPolar";
import { basquePhrasesParitySchool } from "./basquePhrasesParitySchool";
import { basquePhrasesParityTech } from "./basquePhrasesParityTech";

/** Phase 36 — phrases from shared phraseSets (ES/FR → EU). */
export const extraBasquePhrasesParity: VocabularyItem[] = [
  ...basquePhrasesParityPolar,
  ...basquePhrasesParityTech,
  ...basquePhrasesParityOpen,
  ...basquePhrasesParitySchool,
];
`;
  fs.writeFileSync("src/data/basquePhrasesParity.ts", out, "utf8");
}

async function main() {
  const cache = loadCache();
  if (!emitOnly) {
    for (const kind of kinds) {
      if (kind === "polar") await buildPolar(cache);
      else if (kind === "tech" || kind === "open") await buildQA(kind, cache);
      else if (kind === "school") await buildSchool(cache);
    }
  }

  const needed = ["polar", "tech", "open", "school"];
  for (const k of needed) {
    if (!fs.existsSync(`${MAP_DIR}/${k}.json`)) {
      console.error("missing map", k, "— run without --emit-only first");
      process.exit(1);
    }
  }

  const counts = {
    polar: emitPolar(),
    tech: emitQA("tech", "tech", "basquePhrasesParityTech"),
    open: emitQA("open", "open", "basquePhrasesParityOpen"),
    school: emitSchool(),
  };
  emitIndex();
  console.log("emitted", counts, "→ src/data/basquePhrasesParity*.ts");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
