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
      question: "To what extent would you still stand by that, given the later evidence?",
      answer: "Only insofar as the original claim was scoped to that sample. Beyond it I would recast it as a hypothesis, not a finding.",
    },
    fr: {
      question: "Dans quelle mesure y tiendriez-vous encore, compte tenu des éléments plus tardifs ?",
      answer: "Seulement dans la mesure où la thèse d'origine était bornée à cet échantillon. Au-delà, j'en ferais une hypothèse, pas un constat.",
    },
    es: {
      question: "¿Hasta qué punto se mantendría en eso, a la vista de las pruebas posteriores?",
      answer: "Solo en la medida en que la tesis original estaba acotada a esa muestra. Más allá lo reformularía como hipótesis, no como hallazgo.",
    },
  },
  {
    id: "how-reconcile",
    difficulty: "C2",
    en: {
      question: "How do you propose to reconcile those two positions without emptying either of them?",
      answer: "I don't. One of the premises has to go; a verbal compromise that keeps both is just an equivocation.",
    },
    fr: {
      question: "Comment proposez-vous de concilier ces deux positions sans les vider l'une et l'autre ?",
      answer: "Je ne le propose pas. Il faut lâcher une des prémisses ; un compromis verbal qui les garde toutes les deux n'est qu'une équivoque.",
    },
    es: {
      question: "¿Cómo propone conciliar esas dos posturas sin vaciar ninguna?",
      answer: "No lo propongo. Hay que soltar una de las premisas; un arreglo verbal que conserve las dos no es más que un equívoco.",
    },
  },
  {
    id: "what-caveats",
    difficulty: "C2",
    en: {
      question: "What caveats would you insist on before that claim could be published?",
      answer: "It holds under these identification assumptions and this sample. I would not let it travel as an unconditional result.",
    },
    fr: {
      question: "Quelles réserves exigeriez-vous avant que cette affirmation puisse être publiée ?",
      answer: "Elle tient sous ces hypothèses d'identification et cet échantillon. Je ne la laisserais pas circuler comme un résultat inconditionnel.",
    },
    es: {
      question: "¿Qué reservas exigiría antes de que esa afirmación pudiera publicarse?",
      answer: "Se sostiene bajo estos supuestos de identificación y esta muestra. No la dejaría circular como un resultado incondicional.",
    },
  },
  {
    id: "where-do-you-draw-the-line",
    difficulty: "C2",
    en: {
      question: "At what point does that position cease to be defensible, even on your own terms?",
      answer: "Where the harm to identifiable third parties is no longer speculative. Short of that I can still argue it; past that I cannot.",
    },
    fr: {
      question: "À partir de quand cette position cesse-t-elle d'être défendable, même selon vos propres critères ?",
      answer: "Là où le tort fait à des tiers identifiables n'est plus conjectural. En deçà, je peux encore la soutenir ; au-delà, non.",
    },
    es: {
      question: "¿En qué punto deja de ser defendible esa postura, incluso en sus propios términos?",
      answer: "Donde el daño a terceros identificables ya no es conjetural. Por debajo aún puedo sostenerla; más allá, no.",
    },
  },
  {
    id: "how-square-that",
    difficulty: "C2",
    en: {
      question: "How do you square that with the position you took on the record earlier?",
      answer: "I don't, not without qualification. I overstated the first version; the later one is the one I would defend.",
    },
    fr: {
      question: "Comment articulez-vous cela avec la position que vous aviez prise tout à l'heure, pour le procès-verbal ?",
      answer: "Je ne l'articule pas, pas sans réserve. J'ai trop chargé la première version ; c'est la seconde que je défendrais.",
    },
    es: {
      question: "¿Cómo casa eso con la postura que quedó en acta antes?",
      answer: "No casa, no sin matiz. Cargué demasiado la primera versión; la que defendería es la posterior.",
    },
  },
  {
    id: "what-would-you-concede",
    difficulty: "C2",
    en: {
      question: "What, if anything, would you concede without abandoning the substance of the case?",
      answer: "The timing was inept and the tone was poorly judged. I would not concede that the underlying claim fails.",
    },
    fr: {
      question: "Que concéderiez-vous, le cas échéant, sans abandonner le fond de l'affaire ?",
      answer: "Le moment était mal choisi et le ton mal pesé. Je ne concéderais pas que la thèse de fond tombe.",
    },
    es: {
      question: "¿Qué concedería, si acaso, sin abandonar el fondo del asunto?",
      answer: "El momento fue inhábil y el tono, mal medido. No concedería que falle la pretensión de fondo.",
    },
  },
  {
    id: "on-what-grounds",
    difficulty: "C2",
    en: {
      question: "On what grounds are you rejecting that, as a matter of argument rather than of person?",
      answer: "On the evidential record. The speaker is irrelevant; the inference from those facts to that conclusion does not go through.",
    },
    fr: {
      question: "Sur quels motifs refusez-vous cela, au titre de l'argument et non de la personne ?",
      answer: "Sur le dossier des faits. L'auteur est indifférent ; l'inférence de ces faits à cette conclusion ne passe pas.",
    },
    es: {
      question: "¿Con qué fundamento lo rechaza, como argumento y no como persona?",
      answer: "Sobre el expediente de los hechos. El autor es irrelevante; la inferencia de esos hechos a esa conclusión no pasa.",
    },
  },
  {
    id: "how-far-does-that-go",
    difficulty: "C2",
    en: {
      question: "How far does that argument actually licence, once you refuse the next inference?",
      answer: "It covers this case on these facts. It does not, without a further showing, licence the neighbouring case they want to annex.",
    },
    fr: {
      question: "Jusqu'où cet argument autorise-t-il réellement, une fois refusée l'inférence suivante ?",
      answer: "Il couvre ce cas, sur ces faits. Il n'autorise pas, sans démonstration supplémentaire, le cas voisin qu'on veut y annexer.",
    },
    es: {
      question: "¿Hasta dónde autoriza de verdad ese argumento, una vez rechazada la inferencia siguiente?",
      answer: "Cubre este caso, con estos hechos. No autoriza, sin una demostración más, el caso vecino que quieren anexionarle.",
    },
  },
];
