import type { StudyCefrLevel } from "../types/vocabulary";

interface TechPair {
  question: string;
  answer: string;
}

interface TechPhraseSet {
  id: string;
  difficulty: StudyCefrLevel;
  en: TechPair;
  fr: TechPair;
  es: TechPair;
}

export const techC2ExtraSets: readonly TechPhraseSet[] = [
  {
    id: "cap-theorem",
    difficulty: "C2",
    en: {
      question: "What has this postcard done that a letter would have been too proud to do?",
      answer: "It has said the weather and left the quarrel unnamed. Pride would have written a case; the card only proves you were still thinking of them.",
    },
    fr: {
      question: "Qu'a fait cette carte postale qu'une lettre aurait été trop fière pour faire ?",
      answer: "Elle a dit le temps et laissé la querelle sans nom. La fierté aurait écrit un dossier ; la carte prouve seulement que vous pensiez encore à eux.",
    },
    es: {
      question: "¿Qué ha hecho esta postal que una carta habría sido demasiado orgullosa para hacer?",
      answer: "Ha dicho el tiempo y ha dejado la pelea sin nombre. El orgullo habría escrito un caso; la postal solo prueba que aún pensaba en ellos.",
    },
  },
  {
    id: "eventual-consistency",
    difficulty: "C2",
    en: {
      question: "How do you ask for the money back without turning the note into a summons?",
      answer: "I would name the sum, the date, and the friendship, and stop before the threat. A reminder that already sounds like court will be answered in kind.",
    },
    fr: {
      question: "Comment réclamer l'argent sans transformer la note en assignation ?",
      answer: "Je nommerais la somme, la date et l'amitié, et je m'arrêterais avant la menace. Un rappel qui sonne déjà comme un tribunal sera payé de la même monnaie.",
    },
    es: {
      question: "¿Cómo se pide el dinero de vuelta sin convertir la nota en una citación?",
      answer: "Nombraría la suma, la fecha y la amistad, y me detendría antes de la amenaza. Un recordatorio que ya suena a juzgado se contestará en la misma moneda.",
    },
  },
  {
    id: "idempotency",
    difficulty: "C2",
    en: {
      question: "Where has this wedding speech started performing for the room instead of the pair?",
      answer: "It starts when the jokes turn to look at the tables. A speech that wants a laugh more than a witness has already left the couple behind.",
    },
    fr: {
      question: "Où ce discours de mariage a-t-il commencé à jouer pour la salle plutôt que pour le couple ?",
      answer: "Il commence lorsque les plaisanteries se tournent vers les tables. Un discours qui veut un rire plus qu'un témoin a déjà laissé les mariés derrière.",
    },
    es: {
      question: "¿Dónde este discurso de boda ha empezado a actuar para la sala en vez de para la pareja?",
      answer: "Empieza cuando los chistes se vuelven a mirar las mesas. Un discurso que quiere la risa más que un testigo ya ha dejado atrás a los novios.",
    },
  },
  {
    id: "two-phase-commit",
    difficulty: "C2",
    en: {
      question: "What should the first line of a late birthday letter refuse to do?",
      answer: "It should refuse to explain the delay at length. A long excuse makes the day smaller than the apology, and they will hear only the lateness.",
    },
    fr: {
      question: "Que la première ligne d'une lettre d'anniversaire en retard doit-elle refuser de faire ?",
      answer: "Elle doit refuser d'expliquer longuement le retard. Une longue excuse rend le jour plus petit que l'excuse, et l'on n'entendra que le retard.",
    },
    es: {
      question: "¿Qué debe negarse a hacer la primera línea de una carta de cumpleaños tardía?",
      answer: "Debe negarse a explicar el retraso por extenso. Una disculpa larga hace el día más chico que la disculpa, y solo se oirá la tardanza.",
    },
  },
  {
    id: "vector-clock",
    difficulty: "C2",
    en: {
      question: "How would you ask a neighbour to keep the piano down without writing a complaint?",
      answer: "I would name the hour I sleep and the pleasure I take in the playing, then stop. A catalogue of nights will sound like a file, and they will close the lid for spite.",
    },
    fr: {
      question: "Comment demander au voisin de baisser le piano sans écrire une plainte ?",
      answer: "Je nommerais l'heure où je dors et le plaisir que je prends à l'entendre, puis je m'arrêterais. Un catalogue de nuits sonnera comme un dossier, et ils fermeront le couvercle par dépit.",
    },
    es: {
      question: "¿Cómo pediría al vecino que baje el piano sin escribir una queja?",
      answer: "Nombraría la hora a la que duermo y el gusto que me da oírlo, y me detendría. Un catálogo de noches sonará a expediente, y cerrarán la tapa por despecho.",
    },
  },
  {
    id: "bloom-filter",
    difficulty: "C2",
    en: {
      question: "What has this travel diary lost by polishing every evening into a scene?",
      answer: "It has lost the day's crumbs: the wrong street, the cold coffee, the name half-heard. A page that already looks published will not remember how the city actually felt.",
    },
    fr: {
      question: "Qu'a perdu ce journal de voyage à polir chaque soir en scène ?",
      answer: "Il a perdu les miettes du jour : la mauvaise rue, le café froid, le nom à demi entendu. Une page qui a déjà l'air publiée ne se souviendra pas de ce que la ville a vraiment fait.",
    },
    es: {
      question: "¿Qué ha perdido este diario de viaje al pulir cada noche como una escena?",
      answer: "Ha perdido las migas del día: la calle equivocada, el café frío, el nombre a medias. Una página que ya parece publicada no recordará cómo se sintió de verdad la ciudad.",
    },
  },
  {
    id: "circuit-breaker",
    difficulty: "C2",
    en: {
      question: "How do you refuse a loan to a friend without writing a sermon?",
      answer: "I would say that I cannot, and that the friendship is not the sum. A lecture on their spending will be remembered longer than the no, and worse.",
    },
    fr: {
      question: "Comment refuser un prêt à un ami sans écrire un sermon ?",
      answer: "Je dirais que je ne peux pas, et que l'amitié n'est pas la somme. Un sermon sur leurs dépenses se souviendra plus longtemps que le non, et plus mal.",
    },
    es: {
      question: "¿Cómo se niega un préstamo a un amigo sin escribir un sermón?",
      answer: "Diría que no puedo, y que la amistad no es la suma. Un sermón sobre sus gastos se recordará más que el no, y peor.",
    },
  },
  {
    id: "cqrs",
    difficulty: "C2",
    en: {
      question: "Where has this house advertisement started lying with adjectives?",
      answer: "It starts when 'quiet' means a road you cannot see from the photos. A buyer who arrives for quiet and finds the lorries will not forgive the rest of the truth.",
    },
    fr: {
      question: "Où cette annonce de maison a-t-elle commencé à mentir par adjectifs ?",
      answer: "Elle commence lorsque « calme » veut dire une route invisible sur les photos. Un acheteur venu pour le calme qui trouve les camions ne pardonnera pas le reste de la vérité.",
    },
    es: {
      question: "¿Dónde este anuncio de casa ha empezado a mentir con adjetivos?",
      answer: "Empieza cuando «tranquilo» significa una carretera que las fotos no muestran. Un comprador que vino por la calma y halla los camiones no perdonará el resto de la verdad.",
    },
  },
  {
    id: "saga-pattern",
    difficulty: "C2",
    en: {
      question: "What should a note left on the kitchen table refuse to settle overnight?",
      answer: "It should refuse the whole argument. A sentence that tries the case at midnight will still be on the table at breakfast, colder and less fair.",
    },
    fr: {
      question: "Que doit refuser de régler pendant la nuit un mot laissé sur la table ?",
      answer: "Il doit refuser toute la dispute. Une phrase qui juge l'affaire à minuit sera encore là au petit déjeuner, plus froide et moins juste.",
    },
    es: {
      question: "¿Qué debe negarse a zanjarse por la noche un recado dejado en la mesa?",
      answer: "Debe negarse a toda la pelea. Una frase que juzga el caso a medianoche seguirá en la mesa al desayuno, más fría y menos justa.",
    },
  },
  {
    id: "backpressure",
    difficulty: "C2",
    en: {
      question: "How would you introduce two people in a letter without forcing a friendship on them?",
      answer: "I would name why each might care, and leave the meeting unscripted. A letter that already imagines them as allies will make both of them wary.",
    },
    fr: {
      question: "Comment présenter deux personnes dans une lettre sans leur imposer une amitié ?",
      answer: "Je dirais pourquoi chacune pourrait s'y intéresser, et je laisserais la rencontre sans scénario. Une lettre qui les imagine déjà alliées rendra les deux méfiantes.",
    },
    es: {
      question: "¿Cómo presentaría a dos personas en una carta sin imponerles una amistad?",
      answer: "Diría por qué a cada una podría importarle, y dejaría el encuentro sin guion. Una carta que ya los imagina aliados pondrá recelosos a los dos.",
    },
  },
  {
    id: "consensus-raft",
    difficulty: "C2",
    en: {
      question: "What has this museum label done that the painting did not ask for?",
      answer: "It has told us what to feel before we have looked. A label that spends the emotion leaves the canvas doing the furniture.",
    },
    fr: {
      question: "Qu'a fait ce cartel de musée que le tableau n'a pas demandé ?",
      answer: "Il nous a dit quoi ressentir avant que nous ayons regardé. Un cartel qui dépense l'émotion laisse la toile faire le meuble."
    },
    es: {
      question: "¿Qué ha hecho esta cartela de museo que el cuadro no pidió?",
      answer: "Nos ha dicho qué sentir antes de que hayamos mirado. Una cartela que gasta la emoción deja el lienzo haciendo de mueble.",
    },
  },
  {
    id: "quorum",
    difficulty: "C2",
    en: {
      question: "How do you end a long correspondence without slamming the drawer?",
      answer: "I would thank them for the years and leave one door unlatched. A last letter that itemises every slight is a lock, and they will hear it click.",
    },
    fr: {
      question: "Comment clore une longue correspondance sans claquer le tiroir ?",
      answer: "Je les remercierais des années et je laisserais une porte entrouverte. Une dernière lettre qui dresse le compte de chaque affront est un verrou, et l'on entendra le clic.",
    },
    es: {
      question: "¿Cómo se cierra una correspondencia larga sin dar un portazo al cajón?",
      answer: "Les daría las gracias por los años y dejaría una puerta sin cerrar del todo. Una última carta que enumera cada agravio es un cerrojo, y se oirá el clic.",
    },
  },
];
