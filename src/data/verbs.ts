import type { VerbItem } from "../types/vocabulary";
import { buildEnglishB2Verbs } from "./b2/englishBanks";
import { buildEnglishC1Verbs } from "./c1/englishBanks";
import { buildEnglishC2Verbs } from "./c2/englishBanks";
import { englishLowCefrVerbs } from "./lowCefr/englishWordFill";
import { extraEnglishVerbs } from "./englishVerbsMore";

function verb(
  infinitive: string,
  past: string,
  pastParticiple: string,
  infinitiveTranslation: string,
  pastTranslation: string,
  pastParticipleTranslation: string,
  regularity: "regular" | "irregular",
  extras: Partial<
    Pick<VerbItem, "example" | "exampleTranslation" | "pronunciation" | "difficulty">
  > = {},
): VerbItem {
  return {
    id: `verb-${infinitive}`,
    category: "verbs",
    infinitive,
    past,
    pastParticiple,
    infinitiveTranslation,
    pastTranslation,
    pastParticipleTranslation,
    difficulty: extras.difficulty ?? "A1",
    tags: [regularity],
    ...extras,
  };
}

const coreEnglishVerbs: VerbItem[] = [
  verb("have", "had", "had", "tener", "tuvo", "tenido", "irregular", {
    example: "I have a question.",
    exampleTranslation: "Tengo una pregunta.",
  }),
  verb("be", "was/were", "been", "ser/estar", "fue/estuvo", "sido/estado", "irregular"),
  verb("do", "did", "done", "hacer", "hizo", "hecho", "irregular"),
  verb("go", "went", "gone", "ir", "fue", "ido", "irregular", {
    example: "They go home at six.",
    exampleTranslation: "Ellos se van a casa a las seis.",
  }),
  verb("get", "got", "gotten", "conseguir", "consiguió", "conseguido", "irregular"),
  verb("make", "made", "made", "hacer", "hizo", "hecho", "irregular"),
  verb("know", "knew", "known", "saber", "supo", "sabido", "irregular"),
  verb("think", "thought", "thought", "pensar", "pensó", "pensado", "irregular"),
  verb("take", "took", "taken", "tomar", "tomó", "tomado", "irregular"),
  verb("see", "saw", "seen", "ver", "vio", "visto", "irregular"),
  verb("come", "came", "come", "venir", "vino", "venido", "irregular"),
  verb("want", "wanted", "wanted", "querer", "quiso", "querido", "regular"),
  verb("look", "looked", "looked", "mirar", "miró", "mirado", "regular"),
  verb("use", "used", "used", "usar", "usó", "usado", "regular"),
  verb("find", "found", "found", "encontrar", "encontró", "encontrado", "irregular"),
  verb("give", "gave", "given", "dar", "dio", "dado", "irregular"),
  verb("tell", "told", "told", "decir", "dijo", "dicho", "irregular"),
  verb("work", "worked", "worked", "trabajar", "trabajó", "trabajado", "regular", {
    example: "She works from home.",
    exampleTranslation: "Ella trabaja desde casa.",
  }),
  verb("call", "called", "called", "llamar", "llamó", "llamado", "regular"),
  verb("try", "tried", "tried", "intentar", "intentó", "intentado", "regular"),
  verb("ask", "asked", "asked", "preguntar", "preguntó", "preguntado", "regular"),
  verb("need", "needed", "needed", "necesitar", "necesitó", "necesitado", "regular"),
  verb("feel", "felt", "felt", "sentir", "sintió", "sentido", "irregular"),
  verb("become", "became", "become", "convertirse", "se convirtió", "convertido", "irregular"),
  verb("leave", "left", "left", "dejar", "dejó", "dejado", "irregular"),
  verb("put", "put", "put", "poner", "puso", "puesto", "irregular"),
  verb("keep", "kept", "kept", "mantener", "mantuvo", "mantenido", "irregular"),
  verb("let", "let", "let", "permitir", "permitió", "permitido", "irregular"),
  verb("begin", "began", "begun", "comenzar", "comenzó", "comenzado", "irregular"),
  verb("seem", "seemed", "seemed", "parecer", "pareció", "parecido", "regular"),
  verb("help", "helped", "helped", "ayudar", "ayudó", "ayudado", "regular"),
  verb("talk", "talked", "talked", "hablar", "habló", "hablado", "regular"),
  verb("turn", "turned", "turned", "girar", "giró", "girado", "regular"),
  verb("start", "started", "started", "empezar", "empezó", "empezado", "regular"),
  verb("show", "showed", "shown", "mostrar", "mostró", "mostrado", "irregular"),
  verb("hear", "heard", "heard", "oír", "oyó", "oído", "irregular"),
  verb("play", "played", "played", "jugar", "jugó", "jugado", "regular"),
  verb("run", "ran", "run", "correr", "corrió", "corrido", "irregular"),
  verb("move", "moved", "moved", "mover", "movió", "movido", "regular"),
  verb("live", "lived", "lived", "vivir", "vivió", "vivido", "regular"),
  verb("believe", "believed", "believed", "creer", "creyó", "creído", "regular"),
  verb("bring", "brought", "brought", "traer", "trajo", "traído", "irregular"),
  verb("happen", "happened", "happened", "suceder", "sucedió", "sucedido", "regular"),
  verb("write", "wrote", "written", "escribir", "escribió", "escrito", "irregular"),
  verb("provide", "provided", "provided", "proporcionar", "proporcionó", "proporcionado", "regular"),
  verb("sit", "sat", "sat", "sentarse", "se sentó", "sentado", "irregular"),
  verb("stand", "stood", "stood", "estar de pie", "estuvo de pie", "estado de pie", "irregular"),
  verb("lose", "lost", "lost", "perder", "perdió", "perdido", "irregular"),
  verb("pay", "paid", "paid", "pagar", "pagó", "pagado", "irregular"),
  verb("meet", "met", "met", "conocer", "conoció", "conocido", "irregular"),
  verb("eat", "ate", "eaten", "comer", "comió", "comido", "irregular"),
  verb("include", "included", "included", "incluir", "incluyó", "incluido", "regular"),
  verb("continue", "continued", "continued", "continuar", "continuó", "continuado", "regular"),
  verb("set", "set", "set", "establecer", "estableció", "establecido", "irregular"),
  verb("learn", "learned", "learned", "aprender", "aprendió", "aprendido", "regular"),
  verb("change", "changed", "changed", "cambiar", "cambió", "cambiado", "regular"),
  verb("lead", "led", "led", "liderar", "lideró", "liderado", "irregular"),
  verb("understand", "understood", "understood", "entender", "entendió", "entendido", "irregular"),
  verb("watch", "watched", "watched", "mirar", "miró", "mirado", "regular"),
  verb("follow", "followed", "followed", "seguir", "siguió", "seguido", "regular"),
  verb("stop", "stopped", "stopped", "parar", "paró", "parado", "regular"),
  verb("create", "created", "created", "crear", "creó", "creado", "regular"),
  verb("speak", "spoke", "spoken", "hablar", "habló", "hablado", "irregular"),
  verb("read", "read", "read", "leer", "leyó", "leído", "irregular"),
  verb("allow", "allowed", "allowed", "permitir", "permitió", "permitido", "regular"),
  verb("add", "added", "added", "añadir", "añadió", "añadido", "regular"),
  verb("spend", "spent", "spent", "gastar", "gastó", "gastado", "irregular"),
  verb("grow", "grew", "grown", "crecer", "creció", "crecido", "irregular"),
  verb("open", "opened", "opened", "abrir", "abrió", "abierto", "regular"),
  verb("walk", "walked", "walked", "caminar", "caminó", "caminado", "regular"),
  verb("win", "won", "won", "ganar", "ganó", "ganado", "irregular"),
  verb("offer", "offered", "offered", "ofrecer", "ofreció", "ofrecido", "regular"),
  verb("remember", "remembered", "remembered", "recordar", "recordó", "recordado", "regular"),
  verb("love", "loved", "loved", "amar", "amó", "amado", "regular"),
  verb("consider", "considered", "considered", "considerar", "consideró", "considerado", "regular"),
  verb("appear", "appeared", "appeared", "aparecer", "apareció", "aparecido", "regular"),
  verb("buy", "bought", "bought", "comprar", "compró", "comprado", "irregular"),
  verb("wait", "waited", "waited", "esperar", "esperó", "esperado", "regular"),
  verb("send", "sent", "sent", "enviar", "envió", "enviado", "irregular"),
  verb("build", "built", "built", "construir", "construyó", "construido", "irregular"),
];

const baseEnglishVerbs: VerbItem[] = [...coreEnglishVerbs, ...extraEnglishVerbs, ...englishLowCefrVerbs];

const englishC2Verbs = buildEnglishC2Verbs(new Set(baseEnglishVerbs.map((verb) => verb.id)));
const englishVerbTakenAfterC2 = new Set([...baseEnglishVerbs, ...englishC2Verbs].map((verb) => verb.id));
const englishC1Verbs = buildEnglishC1Verbs(englishVerbTakenAfterC2);
const englishVerbTakenAfterC1 = new Set([...englishVerbTakenAfterC2, ...englishC1Verbs.map((verb) => verb.id)]);

export const verbs: VerbItem[] = [
  ...baseEnglishVerbs,
  ...englishC2Verbs,
  ...englishC1Verbs,
  ...buildEnglishB2Verbs(englishVerbTakenAfterC1),
];
