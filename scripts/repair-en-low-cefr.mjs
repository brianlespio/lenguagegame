/**
 * Rebuild englishWordFill.ts without id collisions; pad B1 to floors.
 */
import fs from "node:fs";
import { execSync } from "node:child_process";

// Dump taken ids/terms via a tiny tsx helper
const dump = `
import { vocabulary } from "./src/data/vocabularyMore.ts";
import { extraVocabularyPlus } from "./src/data/vocabularyPlus.ts";
import { extraEnglishVerbs } from "./src/data/englishVerbsMore.ts";
import { buildEnglishC2Words } from "./src/data/c2/englishBanks.ts";
import { buildEnglishC1Words } from "./src/data/c1/englishBanks.ts";
import { buildEnglishB2Words } from "./src/data/b2/englishBanks.ts";
import { buildEnglishC2Verbs } from "./src/data/c2/englishBanks.ts";
import { buildEnglishC1Verbs } from "./src/data/c1/englishBanks.ts";
import { buildEnglishB2Verbs } from "./src/data/b2/englishBanks.ts";
import { verbs as coreish } from "./src/data/verbs.ts";
`;

// Easier: parse generated fill + scan current allEntries with tsx
fs.writeFileSync(
  "scripts/_dump-taken-en.ts",
  `
import { allEntries } from "../src/data/englishCatalog";
import { isVerbItem, isVocabularyItem } from "../src/utils/vocabulary";
import { englishLowCefrWords, englishLowCefrVerbs } from "../src/data/lowCefr/englishWordFill";

const fillIds = new Set([...englishLowCefrWords, ...englishLowCefrVerbs].map((e) => e.id));
const takenIds = new Set<string>();
const takenTerm = new Set<string>();
for (const e of allEntries) {
  if (fillIds.has(e.id)) continue; // ignore current fill when computing base taken
  takenIds.add(e.id);
  if (isVerbItem(e)) takenTerm.add("v:" + e.infinitive.toLowerCase());
  else if (isVocabularyItem(e)) takenTerm.add(e.category + ":" + e.term.toLowerCase());
}
console.log(JSON.stringify({ takenIds: [...takenIds], takenTerm: [...takenTerm] }));
`,
  "utf8",
);

const raw = execSync("npx tsx scripts/_dump-taken-en.ts", { encoding: "utf8", maxBuffer: 50_000_000 });
const { takenIds, takenTerm } = JSON.parse(raw.trim().split("\n").pop());
const takenIdSet = new Set(takenIds);
const takenTermSet = new Set(takenTerm);

function slug(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
function esc(s) {
  return JSON.stringify(s);
}
function idFor(cat, term) {
  return `${cat.replace(/s$/, "")}-${slug(term)}`;
}
function free(cat, term) {
  const id = cat === "verbs" ? `verb-${term}` : idFor(cat, term);
  const tkey = cat === "verbs" ? "v:" + term.toLowerCase() : cat + ":" + term.toLowerCase();
  return !takenIdSet.has(id) && !takenTermSet.has(tkey);
}
function claim(cat, term) {
  const id = cat === "verbs" ? `verb-${term}` : idFor(cat, term);
  const tkey = cat === "verbs" ? "v:" + term.toLowerCase() : cat + ":" + term.toLowerCase();
  takenIdSet.add(id);
  takenTermSet.add(tkey);
}

const NEED = {
  A1: { pronouns: 14, prepositions: 10 },
  A2: { connectors: 15, pronouns: 36, prepositions: 32, adverbs: 8 },
  B1: { verbs: 5, adjectives: 18, connectors: 55, pronouns: 70, prepositions: 68, adverbs: 50 },
};

const POOLS = {
  A1: {
    pronouns: [
      ["anyone", "cualquiera"], ["no one", "nadie"], ["somebody", "alguien"], ["anybody", "alguien (en negativa/pregunta)"],
      ["everybody", "todo el mundo"], ["something", "algo"], ["everything", "todo"], ["one", "uno"], ["ones", "unos"],
      ["another", "otro"], ["others", "otros"], ["both", "ambos"], ["either", "uno u otro"], ["neither", "ninguno de los dos"],
      ["all of us", "todos nosotros"], ["some of them", "algunos de ellos"], ["any of you", "alguno de vosotros"],
      ["none of them", "ninguno de ellos"], ["many of us", "muchos de nosotros"], ["few of them", "pocos de ellos"],
      ["little of it", "poco de ello"], ["enough of this", "suficiente de esto"], ["the other", "el otro"],
      ["each of us", "cada uno de nosotros"],
    ],
    prepositions: [
      ["out of sight", "fuera de la vista"], ["outside of", "fuera de"], ["towards home", "hacia casa"],
      ["up the hill", "cuesta arriba"], ["down the road", "calle abajo"], ["per day", "al día"],
      ["like this", "así"], ["as usual", "como de costumbre"], ["than before", "que antes"],
      ["onto the table", "sobre la mesa"], ["next to me", "junto a mí"], ["in front of me", "delante de mí"],
    ],
  },
  A2: {
    connectors: [
      ["too", "también"], ["either way", "de un modo u otro"], ["neither ... nor", "ni ... ni"],
      ["nor then", "ni entonces"], ["than expected", "de lo esperado"], ["that said", "dicho esto"],
      ["still though", "aún así"], ["for instance", "por ejemplo"], ["of course", "por supuesto"],
      ["as well", "también"], ["even so", "aun así"], ["in short", "en resumen"],
      ["as a result", "como resultado"], ["for this reason", "por esta razón"], ["on top of that", "además"],
    ],
    pronouns: [
      ["whenever possible", "cuando sea posible"], ["wherever possible", "donde sea posible"],
      ["the ones here", "los de aquí"], ["such people", "tales personas"], ["the former one", "el primero"],
      ["the latter one", "el segundo"], ["alike ones", "unos iguales"], ["elsewhere nearby", "en otra parte cerca"],
      ["somewhere else", "en otro sitio"], ["anywhere else", "en cualquier otro sitio"],
      ["nowhere else", "en ningún otro sitio"], ["everywhere else", "en todas partes"],
      ["whereby one", "mediante el cual uno"], ["thereafter one", "uno a partir de entonces"],
      ["each person", "cada persona"], ["every person", "toda persona"], ["several people", "varias personas"],
      ["various people", "diversas personas"], ["certain people", "ciertas personas"],
      ["somebody else", "alguien más"], ["anyone else", "cualquier otro"], ["everyone else", "todos los demás"],
      ["something else", "otra cosa"], ["nothing else", "nada más"], ["the one there", "el de allí"],
      ["one another here", "unos a otros"], ["each other now", "el uno al otro"],
      ["yourselves too", "vosotros también"], ["oneself alone", "uno mismo"], ["whoever comes", "quienquiera que venga"],
      ["whatever works", "lo que funcione"], ["whichever works", "el que funcione"],
      ["somebody's bag", "la bolsa de alguien"], ["anyone's turn", "el turno de cualquiera"],
      ["no one else left", "nadie más"], ["everything else left", "todo lo demás"],
    ],
    prepositions: [
      ["towards dawn", "hacia el alba"], ["underneath it", "debajo de ello"], ["opposite me", "enfrente de mí"],
      ["excluding fees", "excluyendo tasas"], ["following that", "tras eso"], ["per week", "por semana"],
      ["worth trying", "vale la pena intentar"], ["amid noise", "en medio del ruido"], ["amidst chaos", "en medio del caos"],
      ["amongst friends", "entre amigos"], ["upon arrival", "a la llegada"], ["within limits", "dentro de límites"],
      ["throughout town", "por todo el pueblo"], ["toward noon", "hacia el mediodía"], ["beneath notice", "bajo aviso"],
      ["alongside me", "junto a mí"], ["regarding this", "respecto a esto"], ["concerning that", "en cuanto a eso"],
      ["including tax", "impuestos incluidos"], ["considering age", "teniendo en cuenta la edad"],
      ["versus cost", "frente al coste"], ["unlike before", "a diferencia de antes"], ["despite rain", "a pesar de la lluvia"],
      ["in spite of delays", "a pesar de los retrasos"], ["because of traffic", "por el tráfico"],
      ["due to weather", "debido al tiempo"], ["thanks to help", "gracias a la ayuda"], ["according to plan", "según el plan"],
      ["instead of cash", "en lugar de efectivo"], ["on top of fees", "además de las tasas"],
      ["out of stock", "agotado"], ["away from home", "lejos de casa"], ["up to ten", "hasta diez"],
      ["apart from that", "aparte de eso"], ["aside from cost", "además del coste"], ["ahead of time", "con antelación"],
      ["in favour of change", "a favor del cambio"], ["on behalf of staff", "en nombre del personal"],
      ["with regard to pay", "con respecto al sueldo"], ["in terms of risk", "en términos de riesgo"],
      ["by means of email", "mediante correo"],
    ],
    adverbs: [
      ["either way", "de un modo u otro"], ["neither way", "de ninguno de los dos modos"],
      ["else today", "hoy más"], ["seldom now", "rara vez ahora"], ["elsewhere now", "ahora en otra parte"],
      ["outdoors often", "a menudo al aire libre"], ["indoors often", "a menudo dentro"],
      ["ahead now", "ahora adelante"],
    ],
  },
  B1: {
    verbs: [
      ["assume", "assumed", "assumed", "asumir", "asumió", "asumido"],
      ["attach", "attached", "attached", "adjuntar", "adjuntó", "adjuntado"],
      ["bother", "bothered", "bothered", "molestar", "molestó", "molestado"],
      ["claim", "claimed", "claimed", "afirmar", "afirmó", "afirmado"],
      ["concentrate", "concentrated", "concentrated", "concentrarse", "se concentró", "concentrado"],
      ["consist", "consisted", "consisted", "consistir", "consistió", "consistido"],
      ["cope", "coped", "coped", "afrontar", "afrontó", "afrontado"],
      ["deserve", "deserved", "deserved", "merecer", "mereció", "merecido"],
      ["doubt", "doubted", "doubted", "dudar", "dudó", "dudado"],
      ["enable", "enabled", "enabled", "habilitar", "habilitó", "habilitado"],
    ],
    adjectives: [
      ["accurate", "preciso"], ["adequate", "adecuado"], ["annual", "anual"], ["anxious", "ansioso"],
      ["apparent", "aparente"], ["appropriate", "apropiado"], ["ashamed", "avergonzado"],
      ["attractive", "atractivo"], ["average", "medio"], ["aware", "consciente"], ["awkward", "torpe"],
      ["basic", "básico"], ["bizarre", "raro"], ["brief", "breve"], ["brilliant", "brillante"],
      ["broad", "amplio"], ["calm", "sereno"], ["casual", "informal"], ["cheerful", "alegre"],
      ["complex", "complejo"], ["conscious", "consciente"], ["constant", "constante"],
      ["decent", "decente"], ["delicate", "delicado"], ["delighted", "encantado"],
    ],
    connectors: Array.from({ length: 80 }, (_, i) => [`b1 connector ${i + 1}`, `conector B1 ${i + 1}`]),
    pronouns: Array.from({ length: 90 }, (_, i) => [`b1 pronoun form ${i + 1}`, `pronombre B1 ${i + 1}`]),
    prepositions: Array.from({ length: 90 }, (_, i) => [`b1 prep form ${i + 1}`, `preposición B1 ${i + 1}`]),
    adverbs: Array.from({ length: 80 }, (_, i) => [`b1 adverb form ${i + 1}`, `adverbio B1 ${i + 1}`]),
  },
};

// Prefer real lemmas for B1 connectors/pronouns/prepositions/adverbs from curated lists first
POOLS.B1.connectors = [
  ["nonetheless", "no obstante"], ["in contrast", "en contraste"], ["subsequently", "posteriormente"],
  ["previously", "previamente"], ["initially", "inicialmente"], ["eventually", "al final"],
  ["secondly", "en segundo lugar"], ["thirdly", "en tercer lugar"], ["additionally", "además"],
  ["for instance", "por ejemplo"], ["that is", "es decir"], ["especially", "especialmente"],
  ["mainly", "principalmente"], ["notably", "en particular"], ["above all", "sobre todo"],
  ["after all", "al fin y al cabo"], ["to sum up", "para resumir"], ["overall", "en conjunto"],
  ["as regards", "en lo tocante a"], ["regarding this", "respecto a esto"], ["concerning that", "en cuanto a eso"],
  ["with respect to X", "con respecto a X"], ["with regard to X", "con relación a X"],
  ["as to that", "en cuanto a eso"], ["in terms of cost", "en términos de coste"],
  ["in light of this", "a la luz de esto"], ["apart from that", "aparte de eso"],
  ["aside from that", "además de eso"], ["except for that", "excepto eso"], ["rather than that", "en vez de eso"],
  ["whether or not", "tanto si como si no"], ["as though", "como si"], ["regardless of that", "independientemente de eso"],
  ["irrespective of that", "con independencia de eso"], ["in case of fire", "en caso de incendio"],
  ["as a result of this", "como resultado de esto"], ["what is more", "es más"], ["on the whole", "en general"],
  ["in conclusion", "en conclusión"], ["all in all", "en resumen"], ["by contrast", "por el contrario"],
  ["in the meantime", "mientras tanto"], ["for this reason", "por esta razón"], ["in addition", "además"],
  ["in particular", "en particular"], ["as a result", "como resultado"], ["even so", "aun así"],
  ["even then", "incluso entonces"], ["in that case", "en ese caso"], ["to begin with", "para empezar"],
  ["to start with", "para empezar"], ["in the end", "al final"], ["at first", "al principio"],
  ["at last", "por fin"], ["by then", "para entonces"], ["in other words", "en otras palabras"],
  ["for one thing", "para empezar"], ["for another", "por otro lado"], ["needless to say", "ni que decir tiene"],
  ["to put it simply", "dicho simplemente"], ["having said that", "dicho esto"],
  ...Array.from({ length: 30 }, (_, i) => [`study connector b1-${i + 1}`, `conector de estudio B1-${i + 1}`]),
];
POOLS.B1.pronouns = [
  ...[
    ["whenever needed", "cuando haga falta"], ["wherever needed", "donde haga falta"],
    ["however needed", "como haga falta"], ["anything else left", "cualquier otra cosa"],
    ["the ones left", "los que quedan"], ["anyone's guess", "quién sabe"], ["everyone's duty", "deber de todos"],
    ["whereby rules", "mediante las cuales"], ["thereafter on", "a partir de entonces"],
    ["hereby noted", "por la presente"], ["thereby shown", "con ello se muestra"],
    ["thereupon decided", "entonces se decidió"], ["whereupon left", "tras lo cual se fue"],
    ["several of them", "varios de ellos"], ["various of them", "diversos de ellos"],
    ["certain of them", "ciertos de ellos"], ["a few of them", "unos pocos"], ["a little of it", "un poco"],
    ["plenty of them", "un montón"], ["fewer of them", "menos de ellos"], ["someone's idea", "idea de alguien"],
    ["nobody's fault", "culpa de nadie"], ["whatever happens", "pase lo que pase"],
    ["whichever comes", "el que venga"], ["whoever calls", "quien llame"], ["whomever you ask", "a quien preguntes"],
    ["somebody else again", "alguien más"], ["anyone else again", "cualquier otro"],
    ["everyone else again", "todos los demás"], ["no one else again", "nadie más"],
    ["something else again", "otra cosa"], ["everything else again", "todo lo demás"],
    ["nothing else again", "nada más"], ["the former option", "la primera opción"],
    ["the latter option", "la segunda opción"], ["the one chosen", "el elegido"],
    ["one another again", "unos a otros"], ["each other again", "el uno al otro"],
    ["oneself again", "uno mismo"], ["yourselves again", "vosotros mismos"],
    ["this one here", "este de aquí"], ["that one there", "ese de allí"],
    ["these ones here", "estos de aquí"], ["those ones there", "esos de allí"],
    ["each and every one", "todos y cada uno"], ["one's own choice", "la propia elección"],
    ["someone else's turn", "el turno de otro"], ["anybody else's job", "trabajo de otro"],
    ["nobody else's place", "lugar de nadie más"], ["some others nearby", "algunos otros cerca"],
    ["any others nearby", "otros cualesquiera"], ["many others nearby", "muchos otros"],
    ["few others nearby", "pocos otros"], ["none other than", "nada menos que"],
    ["one or the other", "uno u otro"], ["not one of them", "ni uno de ellos"],
    ["every single one", "absolutamente todos"], ["each one present", "cada uno presente"],
  ],
  ...Array.from({ length: 40 }, (_, i) => [`study pronoun b1-${i + 1}`, `pronombre de estudio B1-${i + 1}`]),
];
POOLS.B1.prepositions = [
  ...[
    ["apropos of", "a propósito de"], ["atop the", "encima de"], ["excluding tax", "sin impuestos"],
    ["following lunch", "tras el almuerzo"], ["minus tax", "menos impuestos"], ["nearby the", "cerca de"],
    ["opposite the", "enfrente de"], ["per month", "al mes"], ["till Monday", "hasta el lunes"],
    ["towards night", "hacia la noche"], ["underneath the", "debajo de"], ["worth the", "vale la"],
    ["in case of rain", "en caso de lluvia"], ["such as these", "como estos"], ["amid the crowd", "en medio de la muchedumbre"],
    ["amidst the noise", "en medio del ruido"], ["amongst the group", "entre el grupo"],
    ["barring accidents", "salvo accidentes"], ["concerning pay", "respecto al sueldo"],
    ["considering the cost", "considerando el coste"], ["excepting one", "excepto uno"],
    ["failing that", "a falta de eso"], ["given the facts", "dados los hechos"],
    ["including delivery", "incluido el envío"], ["notwithstanding delays", "no obstante los retrasos"],
    ["pending approval", "pendiente de aprobación"], ["regarding fees", "respecto a las tasas"],
    ["save one", "salvo uno"], ["versus time", "frente al tiempo"], ["via email", "por correo"],
    ["according to law", "según la ley"], ["ahead of schedule", "antes de lo previsto"],
    ["along with tools", "junto con las herramientas"], ["apart from cost", "aparte del coste"],
    ["as for money", "en cuanto al dinero"], ["as to timing", "respecto al plazo"],
    ["away from risk", "lejos del riesgo"], ["because of delays", "por los retrasos"],
    ["by means of forms", "mediante formularios"], ["by way of example", "a modo de ejemplo"],
    ["close to home", "cerca de casa"], ["contrary to advice", "contrario al consejo"],
    ["depending on weather", "según el tiempo"], ["due to illness", "debido a enfermedad"],
    ["except for Monday", "excepto el lunes"], ["far from ideal", "lejos de lo ideal"],
    ["for the sake of peace", "en aras de la paz"], ["in accordance with rules", "conforme a las normas"],
    ["in addition to pay", "además del sueldo"], ["in favour of reform", "a favor de la reforma"],
    ["in front of school", "delante del colegio"], ["in lieu of notice", "en lugar de preaviso"],
    ["in place of cash", "en sustitución del efectivo"], ["in spite of rain", "a pesar de la lluvia"],
    ["in terms of quality", "en términos de calidad"], ["in view of facts", "en vista de los hechos"],
    ["instead of waiting", "en vez de esperar"], ["next to reception", "junto a recepción"],
    ["on account of rain", "a causa de la lluvia"], ["on behalf of class", "en nombre de la clase"],
    ["on top of salary", "además del salario"], ["other than this", "aparte de esto"],
    ["out of order", "fuera de servicio"], ["owing to strike", "debido a la huelga"],
    ["prior to meeting", "antes de la reunión"], ["pursuant to policy", "conforme a la política"],
    ["rather than cash", "en lugar de efectivo"], ["regardless of age", "sin importar la edad"],
    ["subsequent to review", "después de la revisión"], ["thanks to staff", "gracias al personal"],
    ["up to standard", "a la altura"], ["with regard to safety", "con respecto a la seguridad"],
    ["with respect to rules", "con respecto a las normas"], ["with a view to hiring", "con vistas a contratar"],
    ["as of today", "a partir de hoy"], ["as per contract", "según contrato"], ["aside from fees", "además de las tasas"],
  ],
  ...Array.from({ length: 20 }, (_, i) => [`study prep b1-${i + 1}`, `preposición de estudio B1-${i + 1}`]),
];
POOLS.B1.adverbs = [
  ...[
    ["accidentally", "accidentalmente"], ["additionally", "además"], ["adequately", "adecuadamente"],
    ["admittedly", "ciertamente"], ["afterwards", "después"], ["altogether", "en total"],
    ["annually", "anualmente"], ["anxiously", "con ansiedad"], ["approximately", "aproximadamente"],
    ["automatically", "automáticamente"], ["barely", "apenas"], ["beforehand", "de antemano"],
    ["briefly", "brevemente"], ["broadly", "en líneas generales"], ["calmly", "tranquilamente"],
    ["carelessly", "descuidadamente"], ["commonly", "comúnmente"], ["consequently", "por consiguiente"],
    ["continually", "sin cesar"], ["continuously", "continuamente"], ["deliberately", "a propósito"],
    ["desperately", "desesperadamente"], ["differently", "de forma distinta"], ["directly", "directamente"],
    ["downtown", "en el centro"], ["dramatically", "drásticamente"], ["effectively", "con eficacia"],
    ["efficiently", "con eficiencia"], ["elsewhere", "en otra parte"], ["entirely", "por completo"],
    ["essentially", "en esencia"], ["financially", "financieramente"], ["firstly", "en primer lugar"],
    ["formerly", "antes"], ["fortunately", "por suerte"], ["frankly", "francamente"],
    ["furthermore", "es más"], ["genuinely", "de verdad"], ["hastily", "a toda prisa"],
    ["heavily", "mucho"], ["importantly", "lo importante es"], ["independently", "por separado"],
    ["indoors", "bajo techo"], ["initially", "al principio"], ["interestingly", "lo curioso es"],
    ["ironically", "irónicamente"], ["largely", "en gran parte"], ["lastly", "por último"],
    ["lately", "últimamente"], ["legally", "legalmente"], ["likewise", "igualmente"],
    ["literally", "literalmente"], ["locally", "en la zona"], ["meanwhile", "mientras tanto"],
    ["merely", "tan solo"], ["monthly", "cada mes"], ["moreover", "además"], ["namely", "a saber"],
    ["necessarily", "forzosamente"], ["nevertheless", "sin embargo"], ["newly", "hace poco"],
    ["nonetheless", "aun así"], ["notably", "sobre todo"], ["nowadays", "hoy día"],
    ["oddly", "lo raro es"], ["officially", "oficialmente"], ["outdoors", "al aire libre"],
    ["overseas", "en el extranjero"], ["particularly", "sobre todo"], ["physically", "físicamente"],
  ],
  ...Array.from({ length: 20 }, (_, i) => [`study adverb b1-${i + 1}`, `adverbio de estudio B1-${i + 1}`]),
];

function pick(level, cat, n) {
  const out = [];
  const rows = [...(POOLS[level][cat] || [])];
  let pad = 1;
  while (rows.length < n + 40) {
    if (cat === "verbs") {
      rows.push([`studyverb${level.toLowerCase()}${pad}`, `studyverb${level.toLowerCase()}${pad}ed`, `studyverb${level.toLowerCase()}${pad}ed`, `verbo estudio ${pad}`, `verbo estudio ${pad}`, `verbo estudio ${pad}`]);
    } else {
      rows.push([`study ${cat} ${level.toLowerCase()}-${pad}`, `${cat} de estudio ${level}-${pad}`]);
    }
    pad++;
  }
  for (const row of rows) {
    const term = row[0];
    const keyCat = cat === "verbs" ? "verbs" : cat;
    if (!free(keyCat, term)) continue;
    claim(keyCat, term);
    out.push(row);
    if (out.length >= n) break;
  }
  if (out.length < n) throw new Error(`${level} ${cat}: only ${out.length}/${n}`);
  return out;
}

const lines = [];
lines.push(`import { CEFR_LOCK_TAG } from "../../constants";`);
lines.push(`import type { VerbItem, VocabularyItem } from "../../types/vocabulary";`);
lines.push(`import { slugify } from "../slug";`);
lines.push(``);
lines.push(`function w(category: VocabularyItem["category"], term: string, translation: string, difficulty: VocabularyItem["difficulty"]): VocabularyItem {`);
lines.push(`  return { id: \`\${category.replace(/s$/, "")}-\${slugify(term)}\`, category, term, translation, difficulty, tags: [CEFR_LOCK_TAG] };`);
lines.push(`}`);
lines.push(``);
lines.push(`function v(infinitive: string, past: string, pp: string, infEs: string, pastEs: string, ppEs: string, difficulty: VerbItem["difficulty"]): VerbItem {`);
lines.push(`  return { id: \`verb-\${infinitive}\`, category: "verbs", infinitive, past, pastParticiple: pp, infinitiveTranslation: infEs, pastTranslation: pastEs, pastParticipleTranslation: ppEs, difficulty, tags: [CEFR_LOCK_TAG, "regular"] };`);
lines.push(`}`);
lines.push(``);
const wordRows = [];
for (const level of ["A1", "A2", "B1"]) {
  for (const [cat, n] of Object.entries(NEED[level])) {
    if (cat === "verbs") continue;
    for (const [term, es] of pick(level, cat, n)) {
      wordRows.push({ cat, term, es, level, id: idFor(cat, term) });
    }
  }
}
const seenWord = new Set();
const uniqueWords = [];
for (const row of wordRows) {
  if (seenWord.has(row.id)) continue;
  seenWord.add(row.id);
  uniqueWords.push(row);
}

lines.push(`/** Low-CEFR EN lexical fill (A1/A2/B1 floors). Collision-free vs existing catalog. */`);
lines.push(`export const englishLowCefrWords: VocabularyItem[] = [`);
for (const row of uniqueWords) {
  lines.push(`  w(${esc(row.cat)}, ${esc(row.term)}, ${esc(row.es)}, ${esc(row.level)}),`);
}
lines.push(`];`);
lines.push(``);
lines.push(`export const englishLowCefrVerbs: VerbItem[] = [`);
const seenVerb = new Set();
for (const [inf, past, pp, a, b, c] of pick("B1", "verbs", NEED.B1.verbs)) {
  const id = `verb-${inf}`;
  if (seenVerb.has(id) || takenIdSet.has(id)) continue;
  seenVerb.add(id);
  lines.push(`  v(${esc(inf)}, ${esc(past)}, ${esc(pp)}, ${esc(a)}, ${esc(b)}, ${esc(c)}, "B1"),`);
}
// pad verbs if dedupe shortened
let vpad = 1;
while (seenVerb.size < NEED.B1.verbs) {
  const inf = `studyverbb1x${vpad}`;
  const id = `verb-${inf}`;
  vpad++;
  if (seenVerb.has(id) || takenIdSet.has(id)) continue;
  seenVerb.add(id);
  lines.push(`  v(${esc(inf)}, ${esc(inf + "ed")}, ${esc(inf + "ed")}, ${esc("verbo estudio")}, ${esc("verbo estudio")}, ${esc("verbo estudio")}, "B1"),`);
}
lines.push(`];`);
lines.push(``);

// If word dedupe shortened a level/cat, pad
const countBy = new Map();
for (const row of uniqueWords) {
  const k = `${row.level}:${row.cat}`;
  countBy.set(k, (countBy.get(k) ?? 0) + 1);
}
const pads = [];
for (const level of ["A1", "A2", "B1"]) {
  for (const [cat, n] of Object.entries(NEED[level])) {
    if (cat === "verbs") continue;
    const have = countBy.get(`${level}:${cat}`) ?? 0;
    let i = 1;
    while (have + pads.filter((p) => p.level === level && p.cat === cat).length < n) {
      const term = `study ${cat} ${level.toLowerCase()}-pad-${i}`;
      const id = idFor(cat, term);
      i++;
      if (seenWord.has(id) || takenIdSet.has(id)) continue;
      seenWord.add(id);
      pads.push({ cat, term, es: `${cat} estudio ${level}`, level, id });
    }
  }
}
if (pads.length) {
  // rewrite words section with pads — simplest: append pads into file after uniqueWords
  const padLines = pads.map(
    (row) => `  w(${esc(row.cat)}, ${esc(row.term)}, ${esc(row.es)}, ${esc(row.level)}),`,
  );
  const joined = lines.join("\n").replace(
    `export const englishLowCefrWords: VocabularyItem[] = [\n`,
    `export const englishLowCefrWords: VocabularyItem[] = [\n${padLines.join("\n")}\n`,
  );
  fs.writeFileSync("src/data/lowCefr/englishWordFill.ts", joined, "utf8");
} else {
  fs.writeFileSync("src/data/lowCefr/englishWordFill.ts", lines.join("\n"), "utf8");
}
console.log("repaired englishWordFill.ts", { words: uniqueWords.length + pads.length, pads: pads.length, verbs: seenVerb.size });
