import type { StudyCefrLevel, VocabularyItem } from "../types/vocabulary";

export function polar(
  id: string,
  difficulty: StudyCefrLevel,
  question: string,
  positive: string,
  negative: string,
  esQuestion: string,
  esPositive: string,
  esNegative: string,
): VocabularyItem[] {
  const tags = [`set:${id}`, "skill:interaction"];
  return [
    {
      id: `ca-question-${id}`,
      category: "questions",
      term: question,
      translation: esQuestion,
      difficulty,
      tags: [...tags, "skill:listening"],
    },
    {
      id: `ca-positive-${id}`,
      category: "positiveAnswers",
      term: positive,
      translation: esPositive,
      difficulty,
      tags: [...tags, "skill:speaking"],
    },
    {
      id: `ca-negative-${id}`,
      category: "negativeAnswers",
      term: negative,
      translation: esNegative,
      difficulty,
      tags: [...tags, "skill:speaking"],
    },
  ];
}

export function open(
  id: string,
  difficulty: StudyCefrLevel,
  question: string,
  answer: string,
  esQuestion: string,
  esAnswer: string,
): VocabularyItem[] {
  const tags = [`set:${id}`, "kind:open", "skill:speaking"];
  return [
    {
      id: `ca-open-question-${id}`,
      category: "openQuestions",
      term: question,
      translation: esQuestion,
      difficulty,
      tags,
    },
    {
      id: `ca-open-answer-${id}`,
      category: "openAnswers",
      term: answer,
      translation: esAnswer,
      difficulty,
      tags,
    },
  ];
}

export function tech(
  id: string,
  difficulty: StudyCefrLevel,
  question: string,
  answer: string,
  esQuestion: string,
  esAnswer: string,
): VocabularyItem[] {
  const tags = [`set:${id}`, "skill:writing"];
  return [
    {
      id: `ca-tech-question-${id}`,
      category: "techQuestions",
      term: question,
      translation: esQuestion,
      difficulty,
      tags,
    },
    {
      id: `ca-tech-answer-${id}`,
      category: "techAnswers",
      term: answer,
      translation: esAnswer,
      difficulty,
      tags,
    },
  ];
}

export function notice(id: string, difficulty: StudyCefrLevel, term: string, translation: string): VocabularyItem {
  return {
    id: `ca-school-${id}`,
    category: "schoolNotices",
    term,
    translation,
    difficulty,
    tags: [`set:${id}`, "domain:school", "skill:reading"],
  };
}

export const catalanPhrases: VocabularyItem[] = [
  ...polar("cafe", "A1", "Vols un cafè?", "Sí, si us plau.", "No, gràcies.", "¿Quieres un café?", "Sí, por favor.", "No, gracias."),
  ...polar("aigua", "A1", "Vols aigua?", "Sí, una mica.", "Ara no, gràcies.", "¿Quieres agua?", "Sí, un poco.", "Ahora no, gracias."),
  ...polar("gana", "A1", "Tens gana?", "Sí, un tros de pa em va bé.", "Encara no.", "¿Tienes hambre?", "Sí, un trozo de pan me va bien.", "Todavía no."),
  ...polar("set", "A1", "Tens set?", "Sí, em moro de set.", "No, acabo de beure.", "¿Tienes sed?", "Sí, me muero de sed.", "No, acabo de beber."),
  ...polar("cansat", "A1", "Estàs cansat?", "Sí, m'arrossego.", "No, encara tinc corda.", "¿Estás cansado?", "Sí, me arrastro.", "No, todavía tengo cuerda."),
  ...polar("entendre", "A1", "Ho entens?", "Sí, ara ho veig.", "No, torna-ho a dir a poc a poc.", "¿Lo entiendes?", "Sí, ahora lo veo.", "No, dilo otra vez despacio."),
  ...polar("ajudar", "A1", "Em pots ajudar?", "Sí, espera un moment.", "Ara no puc, disculpa.", "¿Me puedes ayudar?", "Sí, espera un momento.", "Ahora no puedo, perdona."),
  ...polar("venir", "A1", "Vens amb nosaltres?", "Sí, ja agafo l'abric.", "Avui no puc.", "¿Vienes con nosotros?", "Sí, ya cojo el abrigo.", "Hoy no puedo."),
  ...polar("hora", "A2", "Tens hora, ara?", "Sí, les tres i cinc.", "No porto rellotge.", "¿Tienes hora, ahora?", "Sí, las tres y cinco.", "No llevo reloj."),
  ...polar("lloc", "A2", "Queda lloc?", "Sí, aquí al fons.", "Està ple de gom a gom.", "¿Queda sitio?", "Sí, aquí al fondo.", "Está de bote en bote."),
  ...polar("tard", "A2", "Arribo tard?", "Una mica, però no passa res.", "No, just a temps.", "¿Llego tarde?", "Un poco, pero no pasa nada.", "No, justo a tiempo."),
  ...polar("fred", "A2", "Tens fred?", "Sí, tanca un moment la finestra.", "No, estic bé així.", "¿Tienes frío?", "Sí, cierra un momento la ventana.", "No, estoy bien así."),
  ...polar("dret", "B1", "T'he tallat?", "Sí, acaba la frase.", "No, ja havia acabat.", "¿Te he cortado?", "Sí, termina la frase.", "No, ya había acabado."),
  ...polar("broma", "B1", "Ho deies de broma?", "Sí, no t'ho prenguis al peu de la lletra.", "No, ho deia de debò.", "¿Lo decías en broma?", "Sí, no te lo tomes al pie de la letra.", "No, lo decía en serio."),
  ...polar("clar", "B1", "M'he explicat?", "Sí, ara el punt es veu.", "Encara se m'escapa el final.", "¿Me he explicado?", "Sí, ahora se ve el punto.", "Aún se me escapa el final."),
  ...polar("cap", "B2", "Hem perdut el fil?", "Sí, ens n'hem anat del tema.", "No, encara anem al gra.", "¿Hemos perdido el hilo?", "Sí, nos hemos ido del tema.", "No, aún vamos al grano."),
  ...polar("volta", "B2", "Li dones massa voltes?", "Sí, el carrego més del que aguanta.", "No, aquesta lectura hi és.", "¿Le das demasiadas vueltas?", "Sí, le cargo más de lo que aguanta.", "No, esa lectura está ahí."),
  ...polar("cara", "C1", "Ho dius per quedar bé?", "Sí, protegeixo la cara més que el fons.", "No, encara defenso el fons.", "¿Lo dices para quedar bien?", "Sí, protejo la cara más que el fondo.", "No, aún defiendo el fondo."),
  ...polar("esma", "C1", "T'ha deixat sense esma?", "Sí, se m'ha apagat el cop.", "No, encara tinc pols.", "¿Te ha dejado sin ánimo?", "Sí, se me ha apagado el golpe.", "No, todavía tengo pulso."),
  ...polar("atzucac", "C2", "Som en un atzucac?", "Sí, cada sortida ens torna al mateix punt.", "No, encara hi ha un pas que no hem provat.", "¿Estamos en un callejón sin salida?", "Sí, cada salida nos devuelve al mismo punto.", "No, aún hay un paso que no hemos probado."),

  ...open("nom", "A1", "Com et dius?", "Em dic Marta.", "¿Cómo te llamas?", "Me llamo Marta."),
  ...open("viu", "A1", "On vius?", "Visc a prop de l'estació.", "¿Dónde vives?", "Vivo cerca de la estación."),
  ...open("feina", "A2", "A què et dediques?", "Faig classes al matí i escric a la tarda.", "¿A qué te dedicas?", "Doy clase por la mañana y escribo por la tarde."),
  ...open("cap-de-setmana", "A2", "Què faràs el cap de setmana?", "Si no plou, baixaré a la platja.", "¿Qué harás el fin de semana?", "Si no llueve, bajaré a la playa."),
  ...open("opinio", "B1", "Què en penses, d'això?", "Em sembla bé, però jo ho diria més curt.", "¿Qué opinas de esto?", "Me parece bien, pero yo lo diría más corto."),
  ...open("disculpa", "B1", "Com ho diries sense fer-te el valent?", "Diria que m'he equivocat i ja està.", "¿Cómo lo dirías sin darte tono?", "Diría que me he equivocado y ya está."),
  ...open("fil", "B2", "Com tornem al fil?", "Deixem el tomb i tornem a la pregunta d'abans.", "¿Cómo volvemos al hilo?", "Dejamos el rodeo y volvemos a la pregunta de antes."),
  ...open("suau", "C1", "Com ho diries un pèl més suau?", "Trauria l'última punxa i deixaria el que hem vist de debò.", "¿Cómo lo dirías un poco más suave?", "Quitaría el último pinchazo y dejaría lo que vimos de verdad."),
  ...open("atzucac-obert", "C2", "Què fas quan el debat és un atzucac?", "Senyalo el punt mort i demano un pas petit, no un discurs nou.", "¿Qué haces cuando el debate es un callejón sin salida?", "Señalo el punto muerto y pido un paso pequeño, no un discurso nuevo."),

  ...tech("correu", "A2", "Com tanques un correu curt?", "Amb el que demanes, una data i prou. Sense paràgraf de disculpes.", "¿Cómo cierras un correo corto?", "Con lo que pides, una fecha y nada más. Sin párrafo de disculpas."),
  ...tech("reunio", "B1", "Què ha de dir l'acta d'una reunió?", "Qui va dir què i què queda pendent. No un resum d'humor de sala.", "¿Qué debe decir el acta de una reunión?", "Quién dijo qué y qué queda pendiente. No un resumen del humor de la sala."),
  ...tech("avís", "B2", "Com avises d'un retard sense fer-te la víctima?", "Dius el motiu, la nova hora i que la feina no canvia. El silenci fins que et reclamin és pitjor.", "¿Cómo avisas de un retraso sin hacerte la víctima?", "Dices el motivo, la nueva hora y que el trabajo no cambia. El silencio hasta que te reclamen es peor."),
  ...tech("to", "C1", "Com puges una queixa sense acusar?", "Descrius el que està aturat, des de quan i què has provat, i demanes una decisió. Deixes fora les culpes.", "¿Cómo subes una queja sin acusar?", "Describes lo que está parado, desde cuándo y qué has probado, y pides una decisión. Dejas fuera las culpas."),

  notice("tancat", "A1", "El centre romandrà tancat demà per festa local.", "El centro permanecerá cerrado mañana por fiesta local."),
  notice("cua", "A2", "Si hi ha cua, entreu per la porta del pati.", "Si hay cola, entrad por la puerta del patio."),
  notice("sortida", "B1", "La sortida d'aquest vespre es fa pel carrer de darrere; el pati principal resta tancat.", "La salida de esta tarde se hace por la calle de atrás; el patio principal permanece cerrado."),
  notice("matricula", "B2", "El termini de matrícula acaba divendres a les dotze; les sol·licituds tardanes no es faran servir per ordenar la llista.", "El plazo de matrícula acaba el viernes a las doce; las solicitudes tardías no se usarán para ordenar la lista."),
  notice("so", "C1", "L'assaig de so d'aquest vespre no dona dret a reservar seient; les butaques es tornaran a obrir demà al matí.", "El ensayo de sonido de esta tarde no da derecho a reservar asiento; las butacas se volverán a abrir mañana por la mañana."),
];
