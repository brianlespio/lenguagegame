import type { StudyCefrLevel } from "../types/vocabulary";

interface OpenPair {
  question: string;
  answer: string;
}

interface OpenPhraseSet {
  id: string;
  difficulty: StudyCefrLevel;
  en: OpenPair;
  fr: OpenPair;
  es: OpenPair;
}

export const openC2ExtraSets: readonly OpenPhraseSet[] = [
  {
    id: "to-what-extent",
    difficulty: "C2",
    en: {
      question: "How much of that would you still stand by, now that we know more?",
      answer: "Only the part that was about that group. The rest I would treat as a guess, not as a fact.",
    },
    fr: {
      question: "Jusqu'où tiendriez-vous encore à ça, maintenant qu'on en sait plus ?",
      answer: "Seulement la part qui concernait ce groupe. Le reste, j'en ferais une hypothèse, pas un fait.",
    },
    es: {
      question: "¿Hasta qué punto se mantendría en eso, ahora que sabemos más?",
      answer: "Solo en la parte que iba de ese grupo. El resto lo trataría como una conjetura, no como un hecho.",
    },
  },
  {
    id: "how-reconcile",
    difficulty: "C2",
    en: {
      question: "How do you put those two claims together without emptying both?",
      answer: "I don't. One of them has to go. A nice sentence that keeps both is just a dodge.",
    },
    fr: {
      question: "Comment tenez-vous ces deux affirmations ensemble sans les vider toutes les deux ?",
      answer: "Je ne les tiens pas. Il faut en lâcher une. Une belle phrase qui les garde toutes les deux n'est qu'une esquive.",
    },
    es: {
      question: "¿Cómo junta esas dos afirmaciones sin vaciar las dos?",
      answer: "No las junto. Hay que soltar una. Una frase bonita que conserve las dos no es más que una evasiva.",
    },
  },
  {
    id: "what-caveats",
    difficulty: "C2",
    en: {
      question: "What would you insist on saying before that goes out as a fact?",
      answer: "It holds for this group, under these conditions. I would not let it travel as if it were always true.",
    },
    fr: {
      question: "Qu'est-ce que vous tiendriez à dire avant que ça parte comme un fait ?",
      answer: "Ça tient pour ce groupe, dans ces conditions. Je ne le laisserais pas circuler comme si c'était toujours vrai.",
    },
    es: {
      question: "¿Qué insistiría en decir antes de que eso salga como un hecho?",
      answer: "Se sostiene para este grupo, en estas condiciones. No lo dejaría circular como si fuera siempre verdad.",
    },
  },
  {
    id: "where-do-you-draw-the-line",
    difficulty: "C2",
    en: {
      question: "At what point does that stop being defensible, even on your own terms?",
      answer: "When the harm to people we can name is no longer a maybe. Short of that I can still argue it. Past that I cannot.",
    },
    fr: {
      question: "À partir de quand ça cesse d'être défendable, même selon vos propres critères ?",
      answer: "Quand le tort fait à des gens qu'on peut nommer n'est plus un peut-être. En deçà, je peux encore le soutenir. Au-delà, non.",
    },
    es: {
      question: "¿En qué punto deja de ser defendible, incluso en sus propios términos?",
      answer: "Cuando el daño a gente a la que podemos nombrar ya no es un quizás. Por debajo aún puedo sostenerlo. Más allá, no.",
    },
  },
  {
    id: "how-square-that",
    difficulty: "C2",
    en: {
      question: "How do you square that with what you said earlier?",
      answer: "I don't, not without a caveat. I overstated the first version. The later one is the one I would defend.",
    },
    fr: {
      question: "Comment faites-vous tenir ça avec ce que vous avez dit tout à l'heure ?",
      answer: "Je ne le fais pas, pas sans réserve. J'ai trop chargé la première version. C'est la seconde que je défendrais.",
    },
    es: {
      question: "¿Cómo casa eso con lo que dijo antes?",
      answer: "No casa, no sin un matiz. Cargué demasiado la primera versión. La que defendería es la de después.",
    },
  },
  {
    id: "what-would-you-concede",
    difficulty: "C2",
    en: {
      question: "What would you actually concede, without giving up the point?",
      answer: "The timing was clumsy and the tone was poorly judged. I would not concede that the claim itself fails.",
    },
    fr: {
      question: "Que concéderiez-vous vraiment, sans lâcher le fond ?",
      answer: "Le moment était mal choisi et le ton, mal pesé. Je ne concéderais pas que la thèse elle-même tombe.",
    },
    es: {
      question: "¿Qué concedería de verdad, sin soltar el fondo?",
      answer: "El momento fue torpe y el tono, mal medido. No concedería que falle la tesis misma.",
    },
  },
  {
    id: "on-what-grounds",
    difficulty: "C2",
    en: {
      question: "On what grounds are you rejecting that — the argument, not the person?",
      answer: "On the facts we have. Who said it does not matter. Those facts do not get you to that conclusion.",
    },
    fr: {
      question: "Sur quels motifs refusez-vous cela — l'argument, pas la personne ?",
      answer: "Sur les faits que nous avons. Qui l'a dit n'importe pas. Ces faits ne mènent pas à cette conclusion.",
    },
    es: {
      question: "¿Con qué fundamento lo rechaza: el argumento, no la persona?",
      answer: "Sobre los hechos que tenemos. Quién lo dijo no importa. Esos hechos no llevan a esa conclusión.",
    },
  },
  {
    id: "how-far-does-that-go",
    difficulty: "C2",
    en: {
      question: "How far does that argument actually go, if you refuse the next leap?",
      answer: "It covers this case, on these facts. It does not, on its own, cover the next case they want to tack on.",
    },
    fr: {
      question: "Jusqu'où va vraiment cet argument, si vous refusez le saut suivant ?",
      answer: "Il couvre ce cas, sur ces faits. À lui seul, il ne couvre pas le cas suivant qu'ils veulent y coller.",
    },
    es: {
      question: "¿Hasta dónde llega de verdad ese argumento, si rechaza el siguiente salto?",
      answer: "Cubre este caso, con estos hechos. Por sí solo no cubre el caso siguiente que quieren pegarle.",
    },
  },
];
