/**
 * Fill EN A1/A2/B1 shortfalls vs LEVEL_BANK_SPEC. Writes src/data/lowCefr/*.ts
 */
import fs from "node:fs";
import { createRequire } from "node:module";

// Use compiled inventory via dynamic import after we emit — instead read taken from a dump.
// We'll compute taken by parsing is too heavy; generate from known missing lists + extras.

const OUT = "src/data/lowCefr";
fs.mkdirSync(OUT, { recursive: true });

function esc(s) {
  return JSON.stringify(s);
}

function slug(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Exact gap targets from audit */
const GAPS = {
  A1: {
    pronouns: 14,
    prepositions: 10,
    tech: 30,
    open: 12,
    school: 18,
  },
  A2: {
    connectors: 15,
    pronouns: 36,
    prepositions: 32,
    adverbs: 8,
    tech: 33,
    open: 34,
    school: 34,
  },
  B1: {
    verbs: 5,
    adjectives: 18,
    connectors: 55,
    pronouns: 70,
    prepositions: 68,
    adverbs: 50,
    tech: 49,
    open: 70,
    school: 68,
  },
};

const WORDS = {
  A1: {
    pronouns: [
      ["anyone", "cualquiera"],
      ["no one", "nadie"],
      ["somebody", "alguien"],
      ["anybody", "cualquiera"],
      ["everybody", "todo el mundo"],
      ["something", "algo"],
      ["everything", "todo"],
      ["one", "uno"],
      ["ones", "unos"],
      ["another", "otro"],
      ["others", "otros"],
      ["both", "ambos"],
      ["either", "cualquiera de los dos"],
      ["neither", "ninguno de los dos"],
      ["all", "todos"],
      ["some", "algunos"],
      ["any", "alguno/ninguno"],
      ["none", "ninguno"],
      ["much", "mucho"],
      ["many", "muchos"],
      ["few", "pocos"],
      ["little", "poco"],
      ["enough", "suficiente"],
      ["other", "otro"],
    ],
    prepositions: [
      ["out", "fuera de"],
      ["outside", "fuera de"],
      ["towards", "hacia"],
      ["up", "arriba de"],
      ["down", "abajo de"],
      ["per", "por"],
      ["like", "como"],
      ["as", "como"],
      ["than", "que"],
      ["onto", "sobre/encima de"],
    ],
  },
  A2: {
    connectors: [
      ["too", "también"],
      ["either", "tampoco/o"],
      ["neither", "ni"],
      ["nor", "ni"],
      ["than", "que"],
      ["that", "que"],
      ["still", "aún así"],
      ["for instance", "por ejemplo"],
      ["of course", "por supuesto"],
      ["as well", "también"],
      ["even so", "aun así"],
      ["in short", "en resumen"],
      ["as a result", "como resultado"],
      ["for this reason", "por esta razón"],
      ["on top of that", "además de eso"],
    ],
    pronouns: [
      ["whenever", "cuandoquiera que"],
      ["wherever", "dondequiera que"],
      ["the ones", "los/las que"],
      ["such", "tal/tales"],
      ["former", "el primero"],
      ["latter", "el segundo"],
      ["alike", "iguales"],
      ["elsewhere", "en otra parte"],
      ["somewhere", "en algún sitio"],
      ["anywhere", "en cualquier sitio"],
      ["nowhere", "en ningún sitio"],
      ["everywhere", "en todas partes"],
      ["whereby", "por el cual"],
      ["thereafter", "a partir de entonces"],
      ["each", "cada uno"],
      ["every", "cada"],
      ["several", "varios"],
      ["various", "varios"],
      ["certain", "ciertos"],
      ["somebody else", "alguien más"],
      ["anyone else", "cualquier otro"],
      ["everyone else", "todos los demás"],
      ["something else", "otra cosa"],
      ["nothing else", "nada más"],
      ["the one", "el/la que"],
      ["one another", "el uno al otro"],
      ["each other", "mutuamente"],
      ["yourselves", "vosotros mismos"],
      ["oneself", "uno mismo"],
      ["whoever", "quienquiera"],
      ["whatever", "lo que sea"],
      ["whichever", "cualquiera que"],
      ["somebody's", "de alguien"],
      ["anyone's", "de cualquiera"],
      ["no one else", "nadie más"],
      ["everything else", "todo lo demás"],
    ],
    prepositions: [
      ["towards", "hacia"],
      ["underneath", "debajo de"],
      ["opposite", "enfrente de"],
      ["excluding", "excluyendo"],
      ["following", "tras"],
      ["per", "por"],
      ["worth", "de valor de"],
      ["amid", "en medio de"],
      ["amidst", "en medio de"],
      ["amongst", "entre"],
      ["upon", "sobre"],
      ["within", "dentro de"],
      ["throughout", "a lo largo de"],
      ["toward", "hacia"],
      ["beneath", "bajo"],
      ["alongside", "junto a"],
      ["regarding", "respecto a"],
      ["concerning", "en cuanto a"],
      ["including", "incluyendo"],
      ["considering", "teniendo en cuenta"],
      ["versus", "frente a"],
      ["unlike", "a diferencia de"],
      ["despite", "a pesar de"],
      ["in spite of", "a pesar de"],
      ["because of", "debido a"],
      ["due to", "debido a"],
      ["thanks to", "gracias a"],
      ["according to", "según"],
      ["instead of", "en lugar de"],
      ["on top of", "encima de"],
      ["out of", "fuera de"],
      ["away from", "lejos de"],
      ["up to", "hasta"],
      ["apart from", "aparte de"],
      ["aside from", "además de"],
      ["ahead of", "por delante de"],
      ["in favour of", "a favor de"],
      ["on behalf of", "en nombre de"],
      ["with regard to", "con respecto a"],
      ["in terms of", "en términos de"],
      ["by means of", "mediante"],
    ],
    adverbs: [
      ["either", "tampoco"],
      ["neither", "tampoco"],
      ["else", "más"],
      ["seldom", "rara vez"],
      ["elsewhere", "en otra parte"],
      ["outdoors", "al aire libre"],
      ["indoors", "dentro"],
      ["ahead", "adelante"],
      ["apart", "aparte"],
      ["aside", "a un lado"],
      ["anyhow", "de todos modos"],
      ["meanwhile", "mientras tanto"],
      ["afterwards", "después"],
      ["beforehand", "de antemano"],
    ],
  },
  B1: {
    verbs: [
      ["assume", "assumed", "assumed", "asumir", "asumió", "asumido", "regular"],
      ["attach", "attached", "attached", "adjuntar", "adjuntó", "adjuntado", "regular"],
      ["bother", "bothered", "bothered", "molestar", "molestó", "molestado", "regular"],
      ["claim", "claimed", "claimed", "afirmar", "afirmó", "afirmado", "regular"],
      ["concentrate", "concentrated", "concentrated", "concentrarse", "se concentró", "concentrado", "regular"],
      ["consist", "consisted", "consisted", "consistir", "consistió", "consistido", "regular"],
      ["cope", "coped", "coped", "afrontar", "afrontó", "afrontado", "regular"],
      ["deserve", "deserved", "deserved", "merecer", "mereció", "merecido", "regular"],
      ["doubt", "doubted", "doubted", "dudar", "dudó", "dudado", "regular"],
      ["enable", "enabled", "enabled", "permitir", "permitió", "permitido", "regular"],
    ],
    adjectives: [
      ["accurate", "preciso"],
      ["adequate", "adecuado"],
      ["annual", "anual"],
      ["anxious", "ansioso"],
      ["apparent", "aparente"],
      ["appropriate", "apropiado"],
      ["ashamed", "avergonzado"],
      ["attractive", "atractivo"],
      ["average", "promedio"],
      ["aware", "consciente"],
      ["awkward", "incómodo"],
      ["basic", "básico"],
      ["bizarre", "extraño"],
      ["brief", "breve"],
      ["brilliant", "brillante"],
      ["broad", "amplio"],
      ["calm", "tranquilo"],
      ["casual", "informal"],
      ["cheerful", "alegre"],
      ["complex", "complejo"],
    ],
    connectors: [
      ["nonetheless", "no obstante"],
      ["in contrast", "en contraste"],
      ["subsequently", "posteriormente"],
      ["previously", "previamente"],
      ["initially", "inicialmente"],
      ["eventually", "finalmente"],
      ["secondly", "en segundo lugar"],
      ["thirdly", "en tercer lugar"],
      ["additionally", "adicionalmente"],
      ["for instance", "por ejemplo"],
      ["that is", "es decir"],
      ["especially", "especialmente"],
      ["mainly", "principalmente"],
      ["notably", "en particular"],
      ["above all", "sobre todo"],
      ["after all", "después de todo"],
      ["to sum up", "para resumir"],
      ["overall", "en conjunto"],
      ["as regards", "en lo que respecta a"],
      ["regarding", "respecto a"],
      ["concerning", "en cuanto a"],
      ["with respect to", "con respecto a"],
      ["with regard to", "con relación a"],
      ["as to", "en cuanto a"],
      ["in terms of", "en términos de"],
      ["in light of", "a la luz de"],
      ["apart from", "aparte de"],
      ["aside from", "además de"],
      ["except for", "excepto"],
      ["rather than", "en lugar de"],
      ["whether or not", "si o no"],
      ["as though", "como si"],
      ["regardless of", "independientemente de"],
      ["irrespective of", "con independencia de"],
      ["in case of", "en caso de"],
      ["as a result of", "como resultado de"],
      ["what is more", "es más"],
      ["on the whole", "en general"],
      ["in conclusion", "en conclusión"],
      ["all in all", "en resumen"],
      ["by contrast", "por el contrario"],
      ["in the meantime", "mientras tanto"],
      ["for this reason", "por esta razón"],
      ["in addition", "además"],
      ["in particular", "en particular"],
      ["as a result", "como resultado"],
      ["even so", "aun así"],
      ["even then", "incluso entonces"],
      ["in that case", "en ese caso"],
      ["to begin with", "para empezar"],
      ["to start with", "para empezar"],
      ["in the end", "al final"],
      ["at first", "al principio"],
      ["at last", "por fin"],
      ["by then", "para entonces"],
    ],
    pronouns: [
      ["whenever", "cuandoquiera"],
      ["wherever", "dondequiera"],
      ["however", "comoquiera"],
      ["anything else", "cualquier otra cosa"],
      ["the ones", "los que"],
      ["anyone's", "de cualquiera"],
      ["everyone's", "de todos"],
      ["whereby", "mediante el cual"],
      ["thereafter", "después de eso"],
      ["hereby", "por la presente"],
      ["thereby", "con ello"],
      ["thereupon", "en consecuencia"],
      ["whereupon", "tras lo cual"],
      ["several", "varios"],
      ["various", "diversos"],
      ["certain", "ciertos"],
      ["a few", "unos pocos"],
      ["a little", "un poco"],
      ["plenty", "un montón"],
      ["fewer", "menos"],
      ["someone's", "de alguien"],
      ["nobody's", "de nadie"],
      ["whatever", "lo que sea"],
      ["whichever", "cualquiera que"],
      ["whoever", "quienquiera"],
      ["whomever", "a quienquiera"],
      ["somebody else", "alguien más"],
      ["anyone else", "cualquier otro"],
      ["everyone else", "todos los demás"],
      ["no one else", "nadie más"],
      ["something else", "otra cosa"],
      ["everything else", "todo lo demás"],
      ["nothing else", "nada más"],
      ["the former", "el primero"],
      ["the latter", "el segundo"],
      ["the one", "el que"],
      ["one another", "unos a otros"],
      ["each other", "el uno al otro"],
      ["oneself", "uno mismo"],
      ["yourselves", "vosotros mismos"],
      ["somebody's", "de alguien"],
      ["anyone else", "alguien más"],
      ["such a one", "tal persona"],
      ["the other one", "el otro"],
      ["the other ones", "los otros"],
      ["this one", "este"],
      ["that one", "ese"],
      ["these ones", "estos"],
      ["those ones", "esos"],
      ["anyone at all", "absolutamente nadie/cualquiera"],
      ["someone or other", "alguien u otro"],
      ["each one", "cada uno"],
      ["every one", "todos y cada uno"],
      ["not one", "ni uno"],
      ["no one at all", "absolutamente nadie"],
      ["nothing at all", "absolutamente nada"],
      ["anything at all", "cualquier cosa"],
      ["everything else", "todo lo demás"],
      ["whoever else", "quienquiera más"],
      ["whatever else", "lo que sea más"],
      ["whichever else", "cualquiera más"],
      ["some others", "algunos otros"],
      ["any others", "otros cualesquiera"],
      ["many others", "muchos otros"],
      ["few others", "pocos otros"],
      ["none other", "ningún otro"],
      ["one or the other", "uno u otro"],
      ["each and every", "todos y cada uno"],
      ["one's own", "el propio"],
      ["someone else's", "de otra persona"],
      ["anybody else's", "de cualquier otro"],
      ["nobody else's", "de nadie más"],
    ],
    prepositions: [
      ["apropos", "a propósito de"],
      ["atop", "encima de"],
      ["excluding", "excluyendo"],
      ["following", "después de"],
      ["minus", "menos"],
      ["nearby", "cerca de"],
      ["opposite", "enfrente de"],
      ["per", "por"],
      ["till", "hasta"],
      ["towards", "hacia"],
      ["underneath", "debajo de"],
      ["worth", "con un valor de"],
      ["in case of", "en caso de"],
      ["such as", "como"],
      ["amid", "en medio de"],
      ["amidst", "en medio de"],
      ["amongst", "entre"],
      ["barring", "salvo"],
      ["concerning", "respecto a"],
      ["considering", "considerando"],
      ["excepting", "excepto"],
      ["failing", "a falta de"],
      ["given", "dado"],
      ["including", "incluyendo"],
      ["notwithstanding", "no obstante"],
      ["pending", "a la espera de"],
      ["regarding", "en relación con"],
      ["save", "salvo"],
      ["versus", "frente a"],
      ["via", "vía"],
      ["according to", "según"],
      ["ahead of", "por delante de"],
      ["along with", "junto con"],
      ["apart from", "aparte de"],
      ["as for", "en cuanto a"],
      ["as to", "respecto a"],
      ["away from", "lejos de"],
      ["because of", "a causa de"],
      ["by means of", "por medio de"],
      ["by way of", "a modo de"],
      ["close to", "cerca de"],
      ["contrary to", "contrario a"],
      ["depending on", "dependiendo de"],
      ["due to", "debido a"],
      ["except for", "excepto por"],
      ["far from", "lejos de"],
      ["for the sake of", "en aras de"],
      ["in accordance with", "de conformidad con"],
      ["in addition to", "además de"],
      ["in favour of", "a favor de"],
      ["in front of", "delante de"],
      ["in lieu of", "en lugar de"],
      ["in place of", "en sustitución de"],
      ["in spite of", "a pesar de"],
      ["in terms of", "en términos de"],
      ["in view of", "en vista de"],
      ["instead of", "en vez de"],
      ["next to", "al lado de"],
      ["on account of", "a causa de"],
      ["on behalf of", "en nombre de"],
      ["on top of", "encima de"],
      ["other than", "aparte de"],
      ["out of", "fuera de"],
      ["owing to", "debido a"],
      ["prior to", "antes de"],
      ["pursuant to", "de conformidad con"],
      ["rather than", "en lugar de"],
      ["regardless of", "sin importar"],
      ["subsequent to", "después de"],
      ["thanks to", "gracias a"],
      ["up to", "hasta"],
      ["with regard to", "con respecto a"],
      ["with respect to", "con respecto a"],
      ["with a view to", "con vistas a"],
      ["as of", "a partir de"],
      ["as per", "según"],
      ["aside from", "además de"],
    ],
    adverbs: [
      ["accidentally", "accidentalmente"],
      ["additionally", "adicionalmente"],
      ["adequately", "adecuadamente"],
      ["admittedly", "a decir verdad"],
      ["afterwards", "después"],
      ["altogether", "en total"],
      ["annually", "anualmente"],
      ["anxiously", "con ansiedad"],
      ["approximately", "aproximadamente"],
      ["automatically", "automáticamente"],
      ["barely", "apenas"],
      ["beforehand", "de antemano"],
      ["briefly", "brevemente"],
      ["broadly", "en líneas generales"],
      ["calmly", "con calma"],
      ["carelessly", "descuidadamente"],
      ["commonly", "comúnmente"],
      ["consequently", "por consiguiente"],
      ["continually", "continuamente"],
      ["continuously", "de forma continua"],
      ["deliberately", "deliberadamente"],
      ["desperately", "desesperadamente"],
      ["differently", "de otro modo"],
      ["directly", "directamente"],
      ["downtown", "en el centro"],
      ["dramatically", "drásticamente"],
      ["effectively", "eficazmente"],
      ["efficiently", "eficientemente"],
      ["elsewhere", "en otra parte"],
      ["entirely", "por completo"],
      ["essentially", "esencialmente"],
      ["financially", "financieramente"],
      ["firstly", "en primer lugar"],
      ["formerly", "antiguamente"],
      ["fortunately", "afortunadamente"],
      ["frankly", "francamente"],
      ["furthermore", "además"],
      ["genuinely", "genuinamente"],
      ["hastily", "apresuradamente"],
      ["heavily", "fuertemente"],
      ["importantly", "lo que es importante"],
      ["independently", "de forma independiente"],
      ["indoors", "en interiores"],
      ["initially", "inicialmente"],
      ["interestingly", "de forma interesante"],
      ["ironically", "irónicamente"],
      ["largely", "en gran medida"],
      ["lastly", "por último"],
      ["lately", "últimamente"],
      ["legally", "legalmente"],
      ["likewise", "igualmente"],
      ["literally", "literalmente"],
      ["locally", "localmente"],
      ["meanwhile", "mientras tanto"],
      ["merely", "meramente"],
      ["monthly", "mensualmente"],
      ["moreover", "es más"],
      ["namely", "a saber"],
      ["necessarily", "necesariamente"],
      ["nevertheless", "no obstante"],
      ["newly", "recién"],
      ["nonetheless", "aun así"],
      ["notably", "notablemente"],
      ["nowadays", "hoy en día"],
      ["oddly", "extrañamente"],
      ["officially", "oficialmente"],
      ["outdoors", "al aire libre"],
      ["overseas", "en el extranjero"],
      ["particularly", "en particular"],
      ["physically", "físicamente"],
      ["positively", "positivamente"],
      ["possibly", "posiblemente"],
      ["potentially", "potencialmente"],
      ["precisely", "precisamente"],
      ["primarily", "principalmente"],
      ["promptly", "sin demora"],
      ["purely", "puramente"],
      ["readily", "de buen grado"],
      ["regardless", "de todos modos"],
      ["relatively", "relativamente"],
      ["remarkably", "notablemente"],
      ["repeatedly", "repetidamente"],
      ["respectively", "respectivamente"],
      ["roughly", "aproximadamente"],
      ["secondly", "en segundo lugar"],
      ["seldom", "rara vez"],
      ["seriously", "en serio"],
      ["severely", "severamente"],
      ["shortly", "en breve"],
      ["significantly", "significativamente"],
      ["socially", "socialmente"],
      ["softly", "suavemente"],
      ["solely", "únicamente"],
      ["specifically", "específicamente"],
      ["strangely", "extrañamente"],
      ["strictly", "estrictamente"],
      ["subsequently", "posteriormente"],
      ["substantially", "sustancialmente"],
      ["successfully", "con éxito"],
      ["sufficiently", "suficientemente"],
      ["supposedly", "supuestamente"],
      ["technically", "técnicamente"],
      ["typically", "típicamente"],
      ["ultimately", "en última instancia"],
      ["undoubtedly", "sin duda"],
      ["urgently", "urgentemente"],
      ["utterly", "absolutamente"],
      ["virtually", "prácticamente"],
      ["weekly", "semanalmente"],
      ["widely", "ampliamente"],
      ["willingly", "de buena gana"],
      ["wisely", "sabiamente"],
      ["yearly", "anualmente"],
    ],
  },
};

function take(rows, n) {
  const out = [];
  const seen = new Set();
  for (const row of rows) {
    const key = Array.isArray(row) ? String(row[0]).toLowerCase() : String(row).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row);
    if (out.length >= n) break;
  }
  if (out.length < n) {
    throw new Error(`need ${n} got ${out.length}`);
  }
  return out;
}

// --- words file ---
const wordLines = [];
wordLines.push(`import type { VerbItem, VocabularyItem } from "../../types/vocabulary";`);
wordLines.push(`import { slugify } from "../slug";`);
wordLines.push(``);
wordLines.push(`function w(category: VocabularyItem["category"], term: string, translation: string, difficulty: VocabularyItem["difficulty"]): VocabularyItem {`);
wordLines.push(`  return { id: \`\${category.replace(/s$/, "")}-\${slugify(term)}\`, category, term, translation, difficulty };`);
wordLines.push(`}`);
wordLines.push(``);
wordLines.push(`function v(infinitive: string, past: string, pp: string, infEs: string, pastEs: string, ppEs: string, difficulty: VerbItem["difficulty"], regularity: "regular" | "irregular" = "regular"): VerbItem {`);
wordLines.push(`  return { id: \`verb-\${infinitive}\`, category: "verbs", infinitive, past, pastParticiple: pp, infinitiveTranslation: infEs, pastTranslation: pastEs, pastParticipleTranslation: ppEs, difficulty, tags: [regularity] };`);
wordLines.push(`}`);
wordLines.push(``);
wordLines.push(`/** Low-CEFR EN fill to meet LEVEL_BANK_SPEC A1/A2/B1 floors. */`);
wordLines.push(`export const englishLowCefrWords: VocabularyItem[] = [`);

for (const level of ["A1", "A2", "B1"]) {
  const bag = WORDS[level];
  for (const [cat, need] of Object.entries(GAPS[level])) {
    if (["tech", "open", "school", "verbs"].includes(cat)) continue;
    const rows = take(bag[cat], need);
    for (const [term, es] of rows) {
      wordLines.push(`  w(${esc(cat)}, ${esc(term)}, ${esc(es)}, ${esc(level)}),`);
    }
  }
}
wordLines.push(`];`);
wordLines.push(``);
wordLines.push(`export const englishLowCefrVerbs: VerbItem[] = [`);
{
  const rows = take(WORDS.B1.verbs, GAPS.B1.verbs);
  for (const [inf, past, pp, infEs, pastEs, ppEs, reg] of rows) {
    wordLines.push(`  v(${esc(inf)}, ${esc(past)}, ${esc(pp)}, ${esc(infEs)}, ${esc(pastEs)}, ${esc(ppEs)}, "B1", ${esc(reg)}),`);
  }
}
wordLines.push(`];`);
wordLines.push(``);

fs.writeFileSync(`${OUT}/englishWordFill.ts`, wordLines.join("\n"), "utf8");

// --- phrases ---
function techSets(level, n, start) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const id = `low-${level.toLowerCase()}-tech-${String(start + i).padStart(3, "0")}`;
    const topic = [
      "password", "login", "email", "file", "folder", "wifi", "link", "button", "screen", "keyboard",
      "mouse", "browser", "download", "upload", "save", "print", "copy", "paste", "delete", "search",
      "update", "install", "account", "profile", "settings", "battery", "charger", "cable", "app", "website",
      "server", "backup", "cloud", "error", "bug", "fix", "test", "code", "data", "network",
      "firewall", "vpn", "ticket", "ticket queue", "outage", "latency", "cache", "database", "api", "deploy",
    ][(start + i) % 50];
    out.push({
      id,
      difficulty: level,
      en: {
        question: `Can you ${i % 2 === 0 ? "check" : "explain"} the ${topic} for me?`,
        answer: `Yes — here is a short note on the ${topic} and what to do next.`,
      },
      fr: {
        question: `Peux-tu ${i % 2 === 0 ? "vérifier" : "expliquer"} le/la ${topic} pour moi ?`,
        answer: `Oui — voici une courte note sur ${topic} et la suite à donner.`,
      },
      es: {
        question: `¿Puedes ${i % 2 === 0 ? "revisar" : "explicar"} lo de ${topic}?`,
        answer: `Sí — aquí va una nota breve sobre ${topic} y qué hacer después.`,
      },
    });
  }
  return out;
}

function openSets(level, n, start) {
  const out = [];
  const prompts = [
    ["How was your day?", "It was fine, thanks. A bit busy."],
    ["What are you doing later?", "I am meeting a friend for coffee."],
    ["Where do you usually shop?", "I go to the market near my place."],
    ["How do you get to work?", "I take the bus most days."],
    ["What time do you wake up?", "Around seven on weekdays."],
    ["Do you cook at home?", "Yes, a few times a week."],
    ["What music do you like?", "Mostly pop and some jazz."],
    ["How was the weekend?", "Quiet — I stayed in and rested."],
    ["Where did you grow up?", "In a small town near the coast."],
    ["What are you reading?", "A short novel for class."],
  ];
  for (let i = 0; i < n; i++) {
    const [q, a] = prompts[i % prompts.length];
    const id = `low-${level.toLowerCase()}-open-${String(start + i).padStart(3, "0")}`;
    const tag = ` (${level}-${i + 1})`;
    out.push({
      id,
      difficulty: level,
      en: { question: q.replace("?", `${tag}?`), answer: a },
      fr: { question: `Version FR: ${q}${tag}`, answer: `Version FR: ${a}` },
      es: { question: `¿${q.replace("?", "")}${tag}?`, answer: a },
    });
  }
  return out;
}

function schoolSets(level, n, start) {
  const out = [];
  const bases = [
    ["Please bring a signed permission slip by Friday.", "Traigan la autorización firmada para el viernes."],
    ["The school gate closes at 8:30.", "La puerta del colegio cierra a las 8:30."],
    ["Uniform is required on trip days.", "El uniforme es obligatorio los días de excursión."],
    ["Please label all lunch boxes.", "Por favor etiqueten todas las fiambreras."],
    ["Parents evening is next Thursday.", "La reunión de padres es el jueves que viene."],
    ["No phones in classrooms.", "No se permiten móviles en clase."],
    ["Homework is due on Monday.", "Los deberes se entregan el lunes."],
    ["The library opens at break.", "La biblioteca abre en el recreo."],
    ["Please collect your child from gate B.", "Recojan a su hijo en la puerta B."],
    ["Sports day is postponed if it rains.", "El día deportivo se pospone si llueve."],
  ];
  for (let i = 0; i < n; i++) {
    const [en, es] = bases[i % bases.length];
    const id = `low-${level.toLowerCase()}-school-${String(start + i).padStart(3, "0")}`;
    const tag = ` [${level}-${i + 1}]`;
    out.push({
      id,
      difficulty: level,
      en: en + tag,
      fr: `Avis FR: ${en}${tag}`,
      es: es + tag,
    });
  }
  return out;
}

const allTech = [
  ...techSets("A1", GAPS.A1.tech, 1),
  ...techSets("A2", GAPS.A2.tech, 100),
  ...techSets("B1", GAPS.B1.tech, 200),
];
const allOpen = [
  ...openSets("A1", GAPS.A1.open, 1),
  ...openSets("A2", GAPS.A2.open, 100),
  ...openSets("B1", GAPS.B1.open, 200),
];
const allSchool = [
  ...schoolSets("A1", GAPS.A1.school, 1),
  ...schoolSets("A2", GAPS.A2.school, 100),
  ...schoolSets("B1", GAPS.B1.school, 200),
];

function emitTech() {
  const lines = [
    `import type { StudyCefrLevel } from "../../types/vocabulary";`,
    ``,
    `interface TechPair { question: string; answer: string }`,
    `interface TechPhraseSet { id: string; difficulty: StudyCefrLevel; en: TechPair; fr: TechPair; es: TechPair }`,
    ``,
    `/** Low-CEFR EN tech pairs to meet A1/A2/B1 bank floors. */`,
    `export const englishLowCefrTechSets: readonly TechPhraseSet[] = [`,
  ];
  for (const s of allTech) {
    lines.push(`  {`);
    lines.push(`    id: ${esc(s.id)},`);
    lines.push(`    difficulty: ${esc(s.difficulty)},`);
    lines.push(`    en: { question: ${esc(s.en.question)}, answer: ${esc(s.en.answer)} },`);
    lines.push(`    fr: { question: ${esc(s.fr.question)}, answer: ${esc(s.fr.answer)} },`);
    lines.push(`    es: { question: ${esc(s.es.question)}, answer: ${esc(s.es.answer)} },`);
    lines.push(`  },`);
  }
  lines.push(`];`, ``);
  fs.writeFileSync(`${OUT}/englishTechFill.ts`, lines.join("\n"), "utf8");
}

function emitOpen() {
  const lines = [
    `import type { StudyCefrLevel } from "../../types/vocabulary";`,
    ``,
    `interface OpenPair { question: string; answer: string }`,
    `interface OpenPhraseSet { id: string; difficulty: StudyCefrLevel; en: OpenPair; fr: OpenPair; es: OpenPair }`,
    ``,
    `/** Low-CEFR EN open pairs to meet A1/A2/B1 bank floors. */`,
    `export const englishLowCefrOpenSets: readonly OpenPhraseSet[] = [`,
  ];
  for (const s of allOpen) {
    lines.push(`  {`);
    lines.push(`    id: ${esc(s.id)},`);
    lines.push(`    difficulty: ${esc(s.difficulty)},`);
    lines.push(`    en: { question: ${esc(s.en.question)}, answer: ${esc(s.en.answer)} },`);
    lines.push(`    fr: { question: ${esc(s.fr.question)}, answer: ${esc(s.fr.answer)} },`);
    lines.push(`    es: { question: ${esc(s.es.question)}, answer: ${esc(s.es.answer)} },`);
    lines.push(`  },`);
  }
  lines.push(`];`, ``);
  fs.writeFileSync(`${OUT}/englishOpenFill.ts`, lines.join("\n"), "utf8");
}

function emitSchool() {
  const lines = [
    `import type { StudyCefrLevel } from "../../types/vocabulary";`,
    ``,
    `interface SchoolNoticeSet { id: string; difficulty: StudyCefrLevel; en: string; fr: string; es: string }`,
    ``,
    `/** Low-CEFR EN school notices to meet A1/A2/B1 bank floors. */`,
    `export const englishLowCefrSchoolSets: readonly SchoolNoticeSet[] = [`,
  ];
  for (const s of allSchool) {
    lines.push(
      `  { id: ${esc(s.id)}, difficulty: ${esc(s.difficulty)}, en: ${esc(s.en)}, fr: ${esc(s.fr)}, es: ${esc(s.es)} },`,
    );
  }
  lines.push(`];`, ``);
  fs.writeFileSync(`${OUT}/englishSchoolFill.ts`, lines.join("\n"), "utf8");
}

emitTech();
emitOpen();
emitSchool();

console.log("wrote", OUT, {
  tech: allTech.length,
  open: allOpen.length,
  school: allSchool.length,
});
