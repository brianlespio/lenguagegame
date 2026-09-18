import type {
  OpenPhraseCategory,
  PolarPhraseCategory,
  StudyCefrLevel,
  TechPhraseCategory,
  VocabularyItem,
} from "../types/vocabulary";
import { polarC1ExtraSets } from "./phraseSetsPolarC1";
import { polarC1MoreSets } from "./phraseSetsPolarC1More";
import { polarB2ExtraSets } from "./phraseSetsPolarB2";
import { polarB2MoreSets } from "./phraseSetsPolarB2More";
import { polarB1ExtraSets } from "./phraseSetsPolarB1";
import { polarA2ExtraSets } from "./phraseSetsPolarA2";
import { polarA1ExtraSets } from "./phraseSetsPolarA1";
import { polarC2ExtraSets } from "./phraseSetsPolarC2";
import { polarC2MoreSets } from "./phraseSetsPolarC2More";
import { techC2ExtraSets } from "./phraseSetsTechC2";
import { techC2MoreSets } from "./phraseSetsTechC2More";
import { techC1MoreSets } from "./phraseSetsTechC1More";
import { techB2MoreSets } from "./phraseSetsTechB2More";
import { openC2ExtraSets } from "./phraseSetsOpenC2";
import { openC2MoreSets } from "./phraseSetsOpenC2More";
import { openC1MoreSets } from "./phraseSetsOpenC1More";
import { openB2MoreSets } from "./phraseSetsOpenB2More";

interface PhraseTriple {
  question: string;
  positive: string;
  negative: string;
}

interface PhraseSet {
  id: string;
  difficulty: StudyCefrLevel;
  en: PhraseTriple;
  fr: PhraseTriple;
  es: PhraseTriple;
}

const ROLES: readonly { category: PolarPhraseCategory; field: keyof PhraseTriple; prefix: string }[] = [
  { category: "questions", field: "question", prefix: "question" },
  { category: "positiveAnswers", field: "positive", prefix: "positive" },
  { category: "negativeAnswers", field: "negative", prefix: "negative" },
];

export const phraseSetsBase: readonly PhraseSet[] = [
  // A1 — 24
  {
    id: "like-coffee",
    difficulty: "A1",
    en: { question: "Do you like coffee?", positive: "Yes, I do.", negative: "No, I don't." },
    fr: { question: "Tu aimes le café ?", positive: "Oui, j'aime ça.", negative: "Non, je n'aime pas ça." },
    es: { question: "¿Te gusta el café?", positive: "Sí, me gusta.", negative: "No, no me gusta." },
  },
  {
    id: "want-water",
    difficulty: "A1",
    en: { question: "Do you want some water?", positive: "Yes, please.", negative: "No, thank you." },
    fr: { question: "Tu veux de l'eau ?", positive: "Oui, s'il te plaît.", negative: "Non, merci." },
    es: { question: "¿Quieres agua?", positive: "Sí, por favor.", negative: "No, gracias." },
  },
  {
    id: "hungry",
    difficulty: "A1",
    en: { question: "Are you hungry?", positive: "Yes, I am.", negative: "No, I'm not." },
    fr: { question: "Tu as faim ?", positive: "Oui, j'ai faim.", negative: "Non, je n'ai pas faim." },
    es: { question: "¿Tienes hambre?", positive: "Sí, tengo hambre.", negative: "No, no tengo hambre." },
  },
  {
    id: "thirsty",
    difficulty: "A1",
    en: { question: "Are you thirsty?", positive: "Yes, I am.", negative: "No, I'm not." },
    fr: { question: "Tu as soif ?", positive: "Oui, j'ai soif.", negative: "Non, je n'ai pas soif." },
    es: { question: "¿Tienes sed?", positive: "Sí, tengo sed.", negative: "No, no tengo sed." },
  },
  {
    id: "tired",
    difficulty: "A1",
    en: { question: "Are you tired?", positive: "Yes, I am.", negative: "No, I'm not." },
    fr: { question: "Tu es fatigué ?", positive: "Oui, je suis fatigué.", negative: "Non, je ne suis pas fatigué." },
    es: { question: "¿Estás cansado?", positive: "Sí, estoy cansado.", negative: "No, no estoy cansado." },
  },
  {
    id: "from-spain",
    difficulty: "A1",
    en: { question: "Are you from Spain?", positive: "Yes, I am.", negative: "No, I'm not." },
    fr: { question: "Tu viens d'Espagne ?", positive: "Oui, je viens d'Espagne.", negative: "Non, je ne viens pas d'Espagne." },
    es: { question: "¿Eres de España?", positive: "Sí, soy de España.", negative: "No, no soy de España." },
  },
  {
    id: "live-here",
    difficulty: "A1",
    en: { question: "Do you live here?", positive: "Yes, I do.", negative: "No, I don't." },
    fr: { question: "Tu habites ici ?", positive: "Oui, j'habite ici.", negative: "Non, je n'habite pas ici." },
    es: { question: "¿Vives aquí?", positive: "Sí, vivo aquí.", negative: "No, no vivo aquí." },
  },
  {
    id: "speak-english",
    difficulty: "A1",
    en: { question: "Do you speak English?", positive: "Yes, I do.", negative: "No, I don't." },
    fr: { question: "Tu parles anglais ?", positive: "Oui, je parle anglais.", negative: "Non, je ne parle pas anglais." },
    es: { question: "¿Hablas inglés?", positive: "Sí, hablo inglés.", negative: "No, no hablo inglés." },
  },
  {
    id: "have-time",
    difficulty: "A1",
    en: { question: "Do you have time?", positive: "Yes, I do.", negative: "No, I don't." },
    fr: { question: "Tu as le temps ?", positive: "Oui, j'ai le temps.", negative: "Non, je n'ai pas le temps." },
    es: { question: "¿Tienes tiempo?", positive: "Sí, tengo tiempo.", negative: "No, no tengo tiempo." },
  },
  {
    id: "student",
    difficulty: "A1",
    en: { question: "Are you a student?", positive: "Yes, I am.", negative: "No, I'm not." },
    fr: { question: "Tu es étudiant ?", positive: "Oui, je suis étudiant.", negative: "Non, je ne suis pas étudiant." },
    es: { question: "¿Eres estudiante?", positive: "Sí, soy estudiante.", negative: "No, no soy estudiante." },
  },
  {
    id: "ready",
    difficulty: "A1",
    en: { question: "Are you ready?", positive: "Yes, I am.", negative: "No, not yet." },
    fr: { question: "Tu es prêt ?", positive: "Oui, je suis prêt.", negative: "Non, pas encore." },
    es: { question: "¿Estás listo?", positive: "Sí, estoy listo.", negative: "No, todavía no." },
  },
  {
    id: "understand",
    difficulty: "A1",
    en: { question: "Do you understand?", positive: "Yes, I do.", negative: "No, I don't." },
    fr: { question: "Tu comprends ?", positive: "Oui, je comprends.", negative: "Non, je ne comprends pas." },
    es: { question: "¿Entiendes?", positive: "Sí, entiendo.", negative: "No, no entiendo." },
  },
  {
    id: "know-him",
    difficulty: "A1",
    en: { question: "Do you know him?", positive: "Yes, I do.", negative: "No, I don't." },
    fr: { question: "Tu le connais ?", positive: "Oui, je le connais.", negative: "Non, je ne le connais pas." },
    es: { question: "¿Lo conoces?", positive: "Sí, lo conozco.", negative: "No, no lo conozco." },
  },
  {
    id: "like-music",
    difficulty: "A1",
    en: { question: "Do you like music?", positive: "Yes, I do.", negative: "No, I don't." },
    fr: { question: "Tu aimes la musique ?", positive: "Oui, j'aime la musique.", negative: "Non, je n'aime pas la musique." },
    es: { question: "¿Te gusta la música?", positive: "Sí, me gusta.", negative: "No, no me gusta." },
  },
  {
    id: "have-brother",
    difficulty: "A1",
    en: { question: "Do you have a brother?", positive: "Yes, I do.", negative: "No, I don't." },
    fr: { question: "Tu as un frère ?", positive: "Oui, j'ai un frère.", negative: "Non, je n'ai pas de frère." },
    es: { question: "¿Tienes un hermano?", positive: "Sí, tengo un hermano.", negative: "No, no tengo hermano." },
  },
  {
    id: "work-here",
    difficulty: "A1",
    en: { question: "Do you work here?", positive: "Yes, I do.", negative: "No, I don't." },
    fr: { question: "Tu travailles ici ?", positive: "Oui, je travaille ici.", negative: "Non, je ne travaille pas ici." },
    es: { question: "¿Trabajas aquí?", positive: "Sí, trabajo aquí.", negative: "No, no trabajo aquí." },
  },
  {
    id: "ok",
    difficulty: "A1",
    en: { question: "Are you OK?", positive: "Yes, I'm fine.", negative: "No, I'm not OK." },
    fr: { question: "Ça va ?", positive: "Oui, ça va.", negative: "Non, ça ne va pas." },
    es: { question: "¿Estás bien?", positive: "Sí, estoy bien.", negative: "No, no estoy bien." },
  },
  {
    id: "cold",
    difficulty: "A1",
    en: { question: "Are you cold?", positive: "Yes, I am.", negative: "No, I'm not." },
    fr: { question: "Tu as froid ?", positive: "Oui, j'ai froid.", negative: "Non, je n'ai pas froid." },
    es: { question: "¿Tienes frío?", positive: "Sí, tengo frío.", negative: "No, no tengo frío." },
  },
  {
    id: "free-now",
    difficulty: "A1",
    en: { question: "Are you free now?", positive: "Yes, I am.", negative: "No, I'm busy." },
    fr: { question: "Tu es libre maintenant ?", positive: "Oui, je suis libre.", negative: "Non, je suis occupé." },
    es: { question: "¿Estás libre ahora?", positive: "Sí, estoy libre.", negative: "No, estoy ocupado." },
  },
  {
    id: "can-help",
    difficulty: "A1",
    en: { question: "Can you help me?", positive: "Yes, I can.", negative: "No, I can't." },
    fr: { question: "Tu peux m'aider ?", positive: "Oui, je peux.", negative: "Non, je ne peux pas." },
    es: { question: "¿Puedes ayudarme?", positive: "Sí, puedo.", negative: "No, no puedo." },
  },
  {
    id: "need-this",
    difficulty: "A1",
    en: { question: "Do you need this?", positive: "Yes, I do.", negative: "No, I don't." },
    fr: { question: "Tu as besoin de ça ?", positive: "Oui, j'en ai besoin.", negative: "Non, je n'en ai pas besoin." },
    es: { question: "¿Necesitas esto?", positive: "Sí, lo necesito.", negative: "No, no lo necesito." },
  },
  {
    id: "see-it",
    difficulty: "A1",
    en: { question: "Can you see it?", positive: "Yes, I can.", negative: "No, I can't." },
    fr: { question: "Tu le vois ?", positive: "Oui, je le vois.", negative: "Non, je ne le vois pas." },
    es: { question: "¿Lo ves?", positive: "Sí, lo veo.", negative: "No, no lo veo." },
  },
  {
    id: "first-time",
    difficulty: "A1",
    en: { question: "Is this your first time?", positive: "Yes, it is.", negative: "No, it isn't." },
    fr: { question: "C'est ta première fois ?", positive: "Oui, c'est la première fois.", negative: "Non, je suis déjà venu." },
    es: { question: "¿Es tu primera vez?", positive: "Sí, es la primera vez.", negative: "No, ya he venido." },
  },
  {
    id: "coming",
    difficulty: "A1",
    en: { question: "Are you coming?", positive: "Yes, I am.", negative: "No, I'm not." },
    fr: { question: "Tu viens ?", positive: "Oui, je viens.", negative: "Non, je ne viens pas." },
    es: { question: "¿Vienes?", positive: "Sí, voy.", negative: "No, no voy." },
  },
  // A2 — 18
  {
    id: "got-ticket",
    difficulty: "A2",
    en: { question: "Have you got a ticket?", positive: "Yes, I have.", negative: "No, I haven't." },
    fr: { question: "Tu as un billet ?", positive: "Oui, j'ai un billet.", negative: "Non, je n'ai pas de billet." },
    es: { question: "¿Tienes un billete?", positive: "Sí, tengo un billete.", negative: "No, no tengo billete." },
  },
  {
    id: "pay-card",
    difficulty: "A2",
    en: { question: "Can I pay by card?", positive: "Yes, of course.", negative: "No, cash only." },
    fr: { question: "Je peux payer par carte ?", positive: "Oui, bien sûr.", negative: "Non, seulement en espèces." },
    es: { question: "¿Puedo pagar con tarjeta?", positive: "Sí, por supuesto.", negative: "No, solo en efectivo." },
  },
  {
    id: "far",
    difficulty: "A2",
    en: { question: "Is it far?", positive: "Yes, it is.", negative: "No, it's close." },
    fr: { question: "C'est loin ?", positive: "Oui, c'est loin.", negative: "Non, c'est tout près." },
    es: { question: "¿Queda lejos?", positive: "Sí, queda lejos.", negative: "No, está cerquita." },
  },
  {
    id: "open-now",
    difficulty: "A2",
    en: { question: "Is it open?", positive: "Yes, it is.", negative: "No, it's closed." },
    fr: { question: "C'est ouvert ?", positive: "Oui, c'est ouvert.", negative: "Non, c'est fermé." },
    es: { question: "¿Está abierto?", positive: "Sí, está abierto.", negative: "No, está cerrado." },
  },
  {
    id: "take-away",
    difficulty: "A2",
    en: { question: "Is this to take away?", positive: "Yes, to take away.", negative: "No, to eat in." },
    fr: { question: "C'est à emporter ?", positive: "Oui, à emporter.", negative: "Non, sur place." },
    es: { question: "¿Es para llevar?", positive: "Sí, para llevar.", negative: "No, para tomar aquí." },
  },
  {
    id: "feel-well",
    difficulty: "A2",
    en: { question: "Do you feel well?", positive: "Yes, I feel fine.", negative: "No, I don't feel well." },
    fr: { question: "Tu te sens bien ?", positive: "Oui, je me sens bien.", negative: "Non, je ne me sens pas bien." },
    es: { question: "¿Te encuentras bien?", positive: "Sí, me encuentro bien.", negative: "No, no me encuentro bien." },
  },
  {
    id: "missed-bus",
    difficulty: "A2",
    en: { question: "Did you miss the bus?", positive: "Yes, I did.", negative: "No, I didn't." },
    fr: { question: "Tu as raté le bus ?", positive: "Oui, je l'ai raté.", negative: "Non, je l'ai eu." },
    es: { question: "¿Perdiste el autobús?", positive: "Sí, lo perdí.", negative: "No, lo alcancé." },
  },
  {
    id: "finish-work",
    difficulty: "A2",
    en: { question: "Did you finish work?", positive: "Yes, I did.", negative: "No, not yet." },
    fr: { question: "Tu as fini le travail ?", positive: "Oui, j'ai fini.", negative: "Non, pas encore." },
    es: { question: "¿Terminaste el trabajo?", positive: "Sí, terminé.", negative: "No, todavía no." },
  },
  {
    id: "party",
    difficulty: "A2",
    en: { question: "Are you coming to the party?", positive: "Yes, I am.", negative: "No, I can't." },
    fr: { question: "Tu viens à la fête ?", positive: "Oui, j'y vais.", negative: "Non, je ne peux pas." },
    es: { question: "¿Vienes a la fiesta?", positive: "Sí, voy.", negative: "No, no puedo." },
  },
  {
    id: "need-taxi",
    difficulty: "A2",
    en: { question: "Do you need a taxi?", positive: "Yes, please.", negative: "No, thank you." },
    fr: { question: "Vous avez besoin d'un taxi ?", positive: "Oui, s'il vous plaît.", negative: "Non, merci." },
    es: { question: "¿Necesita un taxi?", positive: "Sí, por favor.", negative: "No, gracias." },
  },
  {
    id: "speak-slowly",
    difficulty: "A2",
    en: { question: "Can you speak more slowly?", positive: "Yes, of course.", negative: "Sorry, I can't." },
    fr: { question: "Vous pouvez parler plus lentement ?", positive: "Oui, bien sûr.", negative: "Désolé, je ne peux pas." },
    es: { question: "¿Puede hablar más despacio?", positive: "Sí, por supuesto.", negative: "Lo siento, no puedo." },
  },
  {
    id: "repeat",
    difficulty: "A2",
    en: { question: "Can you repeat that?", positive: "Yes, of course.", negative: "Sorry, I have to go." },
    fr: { question: "Vous pouvez répéter ?", positive: "Oui, bien sûr.", negative: "Désolé, je dois y aller." },
    es: { question: "¿Puede repetirlo?", positive: "Sí, por supuesto.", negative: "Lo siento, tengo que irme." },
  },
  {
    id: "sit-here",
    difficulty: "A2",
    en: { question: "Can I sit here?", positive: "Yes, of course.", negative: "No, it's taken." },
    fr: { question: "Je peux m'asseoir ici ?", positive: "Oui, bien sûr.", negative: "Non, c'est pris." },
    es: { question: "¿Me puedo sentar aquí?", positive: "Sí, por supuesto.", negative: "No, está ocupado." },
  },
  {
    id: "wait-moment",
    difficulty: "A2",
    en: { question: "Can you wait a moment?", positive: "Yes, I can.", negative: "No, I'm in a hurry." },
    fr: { question: "Vous pouvez attendre un moment ?", positive: "Oui, je peux.", negative: "Non, je suis pressé." },
    es: { question: "¿Puede esperar un momento?", positive: "Sí, puedo.", negative: "No, tengo prisa." },
  },
  {
    id: "going-out",
    difficulty: "A2",
    en: { question: "Are you going out tonight?", positive: "Yes, I am.", negative: "No, I'm staying in." },
    fr: { question: "Tu sors ce soir ?", positive: "Oui, je sors.", negative: "Non, je reste à la maison." },
    es: { question: "¿Sales esta noche?", positive: "Sí, salgo.", negative: "No, me quedo en casa." },
  },
  {
    id: "like-come",
    difficulty: "A2",
    en: { question: "Would you like to come?", positive: "Yes, I'd love to.", negative: "No, thank you." },
    fr: { question: "Tu voudrais venir ?", positive: "Oui, avec plaisir.", negative: "Non, merci." },
    es: { question: "¿Te gustaría venir?", positive: "Sí, me encantaría.", negative: "No, gracias." },
  },
  {
    id: "help-bag",
    difficulty: "A2",
    en: { question: "Can I help you with your bag?", positive: "Yes, please.", negative: "No, I'm fine, thanks." },
    fr: { question: "Je peux vous aider avec le sac ?", positive: "Oui, s'il vous plaît.", negative: "Non, ça va, merci." },
    es: { question: "¿Le ayudo con la bolsa?", positive: "Sí, por favor.", negative: "No, estoy bien, gracias." },
  },
  {
    id: "been-here",
    difficulty: "A2",
    en: { question: "Have you been here before?", positive: "Yes, I have.", negative: "No, never." },
    fr: { question: "Tu es déjà venu ici ?", positive: "Oui, une fois.", negative: "Non, jamais." },
    es: { question: "¿Has estado aquí antes?", positive: "Sí, una vez.", negative: "No, nunca." },
  },
  // B1 — 14
  {
    id: "ever-london",
    difficulty: "B1",
    en: { question: "Have you ever been to London?", positive: "Yes, I have.", negative: "No, I haven't." },
    fr: { question: "Tu es déjà allé à Londres ?", positive: "Oui, j'y suis allé.", negative: "Non, jamais." },
    es: { question: "¿Has estado alguna vez en Londres?", positive: "Sí, he estado.", negative: "No, nunca." },
  },
  {
    id: "mind-window",
    difficulty: "B1",
    en: { question: "Would you mind if I opened the window?", positive: "Not at all.", negative: "I'd rather you didn't." },
    fr: { question: "Ça te dérange si j'ouvre la fenêtre ?", positive: "Non, pas du tout.", negative: "Je préférerais que non." },
    es: { question: "¿Te importa si abro la ventana?", positive: "No, en absoluto.", negative: "Preferiría que no." },
  },
  {
    id: "rather-stay",
    difficulty: "B1",
    en: { question: "Would you rather stay in?", positive: "Yes, I'd rather stay.", negative: "No, I'd rather go out." },
    fr: { question: "Tu préférerais rester ?", positive: "Oui, je préfère rester.", negative: "Non, je préfère sortir." },
    es: { question: "¿Preferirías quedarte?", positive: "Sí, prefiero quedarme.", negative: "No, prefiero salir." },
  },
  {
    id: "used-to-live",
    difficulty: "B1",
    en: { question: "Did you use to live here?", positive: "Yes, I did.", negative: "No, I never did." },
    fr: { question: "Tu habitais ici avant ?", positive: "Oui, j'habitais ici.", negative: "Non, jamais." },
    es: { question: "¿Vivías aquí antes?", positive: "Sí, vivía aquí.", negative: "No, nunca." },
  },
  {
    id: "think-so",
    difficulty: "B1",
    en: { question: "Do you think so?", positive: "Yes, I think so.", negative: "No, I don't think so." },
    fr: { question: "Tu le penses ?", positive: "Oui, je le pense.", negative: "Non, je ne pense pas." },
    es: { question: "¿Lo crees?", positive: "Sí, eso creo.", negative: "No, no lo creo." },
  },
  {
    id: "agree",
    difficulty: "B1",
    en: { question: "Do you agree?", positive: "Yes, I agree.", negative: "No, I don't agree." },
    fr: { question: "Tu es d'accord ?", positive: "Oui, je suis d'accord.", negative: "Non, je ne suis pas d'accord." },
    es: { question: "¿Estás de acuerdo?", positive: "Sí, estoy de acuerdo.", negative: "No, no estoy de acuerdo." },
  },
  {
    id: "sure",
    difficulty: "B1",
    en: { question: "Are you sure?", positive: "Yes, I'm sure.", negative: "No, not really." },
    fr: { question: "Tu es sûr ?", positive: "Oui, j'en suis sûr.", negative: "Non, pas vraiment." },
    es: { question: "¿Estás seguro?", positive: "Sí, estoy seguro.", negative: "No, no del todo." },
  },
  {
    id: "available-tomorrow",
    difficulty: "B1",
    en: { question: "Will you be available tomorrow?", positive: "Yes, I will.", negative: "No, I won't." },
    fr: { question: "Tu seras disponible demain ?", positive: "Oui, je suis libre.", negative: "Non, je ne peux pas." },
    es: { question: "¿Estarás disponible mañana?", positive: "Sí, estaré libre.", negative: "No, no puedo." },
  },
  {
    id: "join-us",
    difficulty: "B1",
    en: { question: "Would you like to join us?", positive: "Yes, I'd love to.", negative: "No, thank you." },
    fr: { question: "Tu voudrais te joindre à nous ?", positive: "Oui, avec plaisir.", negative: "Non, merci." },
    es: { question: "¿Te gustaría unirte?", positive: "Sí, me encantaría.", negative: "No, gracias." },
  },
  {
    id: "keep-secret",
    difficulty: "B1",
    en: { question: "Can you keep a secret?", positive: "Yes, of course.", negative: "No, not really." },
    fr: { question: "Tu peux garder un secret ?", positive: "Oui, bien sûr.", negative: "Non, pas vraiment." },
    es: { question: "¿Puedes guardar un secreto?", positive: "Sí, por supuesto.", negative: "No, la verdad es que no." },
  },
  {
    id: "already-eaten",
    difficulty: "B1",
    en: { question: "Have you already eaten?", positive: "Yes, I have.", negative: "No, not yet." },
    fr: { question: "Tu as déjà mangé ?", positive: "Oui, j'ai déjà mangé.", negative: "Non, pas encore." },
    es: { question: "¿Ya has comido?", positive: "Sí, ya he comido.", negative: "No, todavía no." },
  },
  {
    id: "need-anything",
    difficulty: "B1",
    en: { question: "Do you need anything else?", positive: "Yes, please.", negative: "No, that's all, thanks." },
    fr: { question: "Vous avez besoin d'autre chose ?", positive: "Oui, s'il vous plaît.", negative: "Non, c'est tout, merci." },
    es: { question: "¿Necesita algo más?", positive: "Sí, por favor.", negative: "No, eso es todo, gracias." },
  },
  {
    id: "coming-back",
    difficulty: "B1",
    en: { question: "Are you coming back later?", positive: "Yes, I am.", negative: "No, not tonight." },
    fr: { question: "Tu reviens plus tard ?", positive: "Oui, je reviens.", negative: "Non, pas ce soir." },
    es: { question: "¿Vuelves más tarde?", positive: "Sí, vuelvo.", negative: "No, esta noche no." },
  },
  {
    id: "tell-truth",
    difficulty: "B1",
    en: { question: "Are you telling the truth?", positive: "Yes, I am.", negative: "No, I was joking." },
    fr: { question: "Tu dis la vérité ?", positive: "Oui, je dis la vérité.", negative: "Non, je plaisantais." },
    es: { question: "¿Dices la verdad?", positive: "Sí, digo la verdad.", negative: "No, estaba bromeando." },
  },
  // B2 — 9
  {
    id: "mind-waiting",
    difficulty: "B2",
    en: { question: "Would you mind waiting here?", positive: "Not at all.", negative: "I'd rather not." },
    fr: { question: "Ça vous dérangerait d'attendre ici ?", positive: "Non, pas du tout.", negative: "Je préférerais que non." },
    es: { question: "¿Le importaría esperar aquí?", positive: "No, en absoluto.", negative: "Preferiría que no." },
  },
  {
    id: "happen-time",
    difficulty: "B2",
    en: { question: "Do you happen to know the time?", positive: "Yes, it's three o'clock.", negative: "No, sorry." },
    fr: { question: "Vous n'auriez pas l'heure, par hasard ?", positive: "Si, il est trois heures.", negative: "Non, désolé." },
    es: { question: "¿No tendrá hora, por casualidad?", positive: "Sí, son las tres.", negative: "No, lo siento." },
  },
  {
    id: "do-favour",
    difficulty: "B2",
    en: { question: "Could you do me a favour?", positive: "Yes, of course.", negative: "Sorry, I can't right now." },
    fr: { question: "Vous pourriez me rendre service ?", positive: "Oui, bien sûr.", negative: "Désolé, je ne peux pas maintenant." },
    es: { question: "¿Podría hacerme un favor?", positive: "Sí, por supuesto.", negative: "Lo siento, ahora no puedo." },
  },
  {
    id: "any-chance-help",
    difficulty: "B2",
    en: { question: "Is there any chance you could help?", positive: "Yes, I can try.", negative: "No, I'm tied up." },
    fr: { question: "Vous pourriez m'aider, par hasard ?", positive: "Oui, je peux essayer.", negative: "Non, je suis occupé." },
    es: { question: "¿Hay alguna posibilidad de que me ayude?", positive: "Sí, puedo intentarlo.", negative: "No, estoy liado." },
  },
  {
    id: "worth-it",
    difficulty: "B2",
    en: { question: "Do you think it's worth it?", positive: "Yes, I think so.", negative: "No, I don't think so." },
    fr: { question: "Tu trouves que ça en vaut la peine ?", positive: "Oui, je pense que oui.", negative: "Non, je ne crois pas." },
    es: { question: "¿Crees que merece la pena?", positive: "Sí, creo que sí.", negative: "No, no lo creo." },
  },
  {
    id: "get-used",
    difficulty: "B2",
    en: { question: "Have you got used to it?", positive: "Yes, I have now.", negative: "No, not yet." },
    fr: { question: "Tu t'y es habitué ?", positive: "Oui, maintenant oui.", negative: "Non, pas encore." },
    es: { question: "¿Te has acostumbrado?", positive: "Sí, ahora sí.", negative: "No, todavía no." },
  },
  {
    id: "by-chance-name",
    difficulty: "B2",
    en: { question: "Are you Mr Pérez, by any chance?", positive: "Yes, that's me.", negative: "No, you've got the wrong person." },
    fr: { question: "Vous n'êtes pas M. Pérez, par hasard ?", positive: "Si, c'est moi.", negative: "Non, vous vous trompez." },
    es: { question: "¿No será usted el señor Pérez?", positive: "Sí, soy yo.", negative: "No, se equivoca." },
  },
  {
    id: "should-leave",
    difficulty: "B2",
    en: { question: "Should we leave now?", positive: "Yes, it's time.", negative: "No, we've still got time." },
    fr: { question: "On devrait partir maintenant ?", positive: "Oui, il est temps.", negative: "Non, on a encore le temps." },
    es: { question: "¿Deberíamos irnos ya?", positive: "Sí, es hora.", negative: "No, aún tenemos tiempo." },
  },
  {
    id: "could-spare",
    difficulty: "B2",
    en: { question: "Could you spare a minute?", positive: "Yes, I've got a moment.", negative: "No, I'm in a rush." },
    fr: { question: "Vous auriez une minute ?", positive: "Oui, j'ai un instant.", negative: "Non, je suis pressé." },
    es: { question: "¿Tiene un minuto?", positive: "Sí, tengo un momento.", negative: "No, voy con prisa." },
  },
  // C1 — 5
  {
    id: "far-fetched",
    difficulty: "C1",
    en: { question: "Isn't that a bit far-fetched?", positive: "Yes, the inference is rather stretched.", negative: "No, the reading is still defensible." },
    fr: { question: "Ce n'est pas un peu tiré par les cheveux ?", positive: "Si, l'inférence est un peu forcée.", negative: "Non, la lecture reste défendable." },
    es: { question: "¿No es un poco traído por los pelos?", positive: "Sí, la inferencia está bastante estirada.", negative: "No, la lectura sigue siendo defendible." },
  },
  {
    id: "take-issue",
    difficulty: "C1",
    en: { question: "Do you take issue with that?", positive: "Yes, I take issue with the conclusion.", negative: "No, I have no objection on that point." },
    fr: { question: "Vous y voyez une objection ?", positive: "Oui, je conteste la conclusion.", negative: "Non, aucune objection sur ce point." },
    es: { question: "¿Pone usted objeciones a eso?", positive: "Sí, discuto la conclusión.", negative: "No, ninguna objeción en ese punto." },
  },
  {
    id: "remotely-interested",
    difficulty: "C1",
    en: { question: "Are you remotely interested?", positive: "Yes, mildly, if the rest holds up.", negative: "No, not in the slightest." },
    fr: { question: "Ça t'intéresse un tant soit peu ?", positive: "Oui, un peu, si le reste tient.", negative: "Non, pas le moins du monde." },
    es: { question: "¿Te interesa lo más mínimo?", positive: "Sí, algo, si el resto se sostiene.", negative: "No, ni lo más mínimo." },
  },
  {
    id: "right-thinking",
    difficulty: "C1",
    en: { question: "Am I right in thinking you disagree?", positive: "Yes, you are right: I do not share that view.", negative: "No, I actually agree with the substance of it." },
    fr: {
      question: "Ai-je raison de penser que vous n'êtes pas d'accord ?",
      positive: "Oui, vous avez raison: je ne partage pas cette lecture.",
      negative: "Non, en fait je suis d'accord sur le fond.",
    },
    es: {
      question: "¿Acierto si digo que no está de acuerdo?",
      positive: "Sí, acierta: no comparto esa lectura.",
      negative: "No, en realidad coincido en el fondo.",
    },
  },
    {
      id: "care-to-comment",
      difficulty: "C1",
      en: { question: "Would you care to comment?", positive: "Yes, I would like to put a point on the record.", negative: "No, I would rather not comment at this stage." },
      fr: {
        question: "Souhaitez-vous faire un commentaire ?",
        positive: "Oui, je souhaiterais faire porter un point au procès-verbal.",
        negative: "Non, je préfère ne pas commenter à ce stade.",
      },
      es: {
        question: "¿Desea hacer algún comentario?",
        positive: "Sí, querría dejar un punto en acta.",
        negative: "No, preferiría no comentar en esta fase.",
      },
    },
    // A1 — +10 (34)
    {
      id: "like-tea",
      difficulty: "A1",
      en: { question: "Do you like tea?", positive: "Yes, I do.", negative: "No, I don't." },
      fr: { question: "Tu aimes le thé ?", positive: "Oui, j'aime le thé.", negative: "Non, je n'aime pas le thé." },
      es: { question: "¿Te gusta el té?", positive: "Sí, me gusta.", negative: "No, no me gusta." },
    },
    {
      id: "have-car",
      difficulty: "A1",
      en: { question: "Do you have a car?", positive: "Yes, I do.", negative: "No, I don't." },
      fr: { question: "Tu as une voiture ?", positive: "Oui, j'ai une voiture.", negative: "Non, je n'ai pas de voiture." },
      es: { question: "¿Tienes coche?", positive: "Sí, tengo coche.", negative: "No, no tengo coche." },
    },
    {
      id: "married",
      difficulty: "A1",
      en: { question: "Are you married?", positive: "Yes, I am.", negative: "No, I'm not." },
      fr: { question: "Tu es marié ?", positive: "Oui, je suis marié.", negative: "Non, je ne suis pas marié." },
      es: { question: "¿Estás casado?", positive: "Sí, estoy casado.", negative: "No, no estoy casado." },
    },
    {
      id: "hot",
      difficulty: "A1",
      en: { question: "Are you hot?", positive: "Yes, I am.", negative: "No, I'm not." },
      fr: { question: "Tu as chaud ?", positive: "Oui, j'ai chaud.", negative: "Non, je n'ai pas chaud." },
      es: { question: "¿Tienes calor?", positive: "Sí, tengo calor.", negative: "No, no tengo calor." },
    },
    {
      id: "have-phone",
      difficulty: "A1",
      en: { question: "Do you have a phone?", positive: "Yes, I do.", negative: "No, I don't." },
      fr: { question: "Tu as un téléphone ?", positive: "Oui, j'ai un téléphone.", negative: "Non, je n'ai pas de téléphone." },
      es: { question: "¿Tienes teléfono?", positive: "Sí, tengo teléfono.", negative: "No, no tengo teléfono." },
    },
    {
      id: "this-yours",
      difficulty: "A1",
      en: { question: "Is this yours?", positive: "Yes, it is.", negative: "No, it isn't." },
      fr: { question: "C'est à toi ?", positive: "Oui, c'est à moi.", negative: "Non, ce n'est pas à moi." },
      es: { question: "¿Esto es tuyo?", positive: "Sí, es mío.", negative: "No, no es mío." },
    },
    {
      id: "live-near",
      difficulty: "A1",
      en: { question: "Do you live near here?", positive: "Yes, I do.", negative: "No, I live far away." },
      fr: { question: "Tu habites près d'ici ?", positive: "Oui, j'habite près d'ici.", negative: "Non, j'habite loin." },
      es: { question: "¿Vives cerca de aquí?", positive: "Sí, vivo cerca.", negative: "No, vivo lejos." },
    },
    {
      id: "have-children",
      difficulty: "A1",
      en: { question: "Do you have children?", positive: "Yes, I do.", negative: "No, I don't." },
      fr: { question: "Tu as des enfants ?", positive: "Oui, j'ai des enfants.", negative: "Non, je n'ai pas d'enfants." },
      es: { question: "¿Tienes hijos?", positive: "Sí, tengo hijos.", negative: "No, no tengo hijos." },
    },
    {
      id: "busy",
      difficulty: "A1",
      en: { question: "Are you busy?", positive: "Yes, I am.", negative: "No, I'm free." },
      fr: { question: "Tu es occupé ?", positive: "Oui, je suis occupé.", negative: "Non, je suis libre." },
      es: { question: "¿Estás ocupado?", positive: "Sí, estoy ocupado.", negative: "No, estoy libre." },
    },
    {
      id: "want-tea",
      difficulty: "A1",
      en: { question: "Do you want some tea?", positive: "Yes, please.", negative: "No, thank you." },
      fr: { question: "Tu veux du thé ?", positive: "Oui, s'il te plaît.", negative: "Non, merci." },
      es: { question: "¿Quieres té?", positive: "Sí, por favor.", negative: "No, gracias." },
    },
    // A2 — +8 (26)
    {
      id: "like-spicy",
      difficulty: "A2",
      en: { question: "Do you like spicy food?", positive: "Yes, I do.", negative: "No, I don't." },
      fr: { question: "Tu aimes les plats épicés ?", positive: "Oui, j'aime ça.", negative: "Non, je n'aime pas ça." },
      es: { question: "¿Te gusta la comida picante?", positive: "Sí, me gusta.", negative: "No, no me gusta." },
    },
    {
      id: "booked-table",
      difficulty: "A2",
      en: { question: "Have you booked a table?", positive: "Yes, I have.", negative: "No, I haven't." },
      fr: { question: "Vous avez réservé une table ?", positive: "Oui, j'ai réservé.", negative: "Non, je n'ai pas réservé." },
      es: { question: "¿Ha reservado mesa?", positive: "Sí, he reservado.", negative: "No, no he reservado." },
    },
    {
      id: "lost",
      difficulty: "A2",
      en: { question: "Are you lost?", positive: "Yes, I think so.", negative: "No, I know the way." },
      fr: { question: "Vous êtes perdu ?", positive: "Oui, je crois.", negative: "Non, je connais le chemin." },
      es: { question: "¿Está perdido?", positive: "Sí, creo que sí.", negative: "No, conozco el camino." },
    },
    {
      id: "need-receipt",
      difficulty: "A2",
      en: { question: "Do you need a receipt?", positive: "Yes, please.", negative: "No, thank you." },
      fr: { question: "Vous avez besoin d'un reçu ?", positive: "Oui, s'il vous plaît.", negative: "Non, merci." },
      es: { question: "¿Necesita un recibo?", positive: "Sí, por favor.", negative: "No, gracias." },
    },
    {
      id: "call-back",
      difficulty: "A2",
      en: { question: "Can I call you back?", positive: "Yes, of course.", negative: "No, I'd rather wait." },
      fr: { question: "Je peux vous rappeler ?", positive: "Oui, bien sûr.", negative: "Non, je préfère attendre." },
      es: { question: "¿Puedo devolverle la llamada?", positive: "Sí, por supuesto.", negative: "No, prefiero esperar." },
    },
    {
      id: "raining",
      difficulty: "A2",
      en: { question: "Is it raining?", positive: "Yes, it is.", negative: "No, it isn't." },
      fr: { question: "Il pleut ?", positive: "Oui, il pleut.", negative: "Non, il ne pleut pas." },
      es: { question: "¿Está lloviendo?", positive: "Sí, está lloviendo.", negative: "No, no está lloviendo." },
    },
    {
      id: "take-photo",
      difficulty: "A2",
      en: { question: "Can I take a photo?", positive: "Yes, of course.", negative: "No, I'd rather you didn't." },
      fr: { question: "Je peux prendre une photo ?", positive: "Oui, bien sûr.", negative: "Non, je préférerais que non." },
      es: { question: "¿Puedo hacer una foto?", positive: "Sí, por supuesto.", negative: "No, preferiría que no." },
    },
    {
      id: "allergic",
      difficulty: "A2",
      en: { question: "Are you allergic to anything?", positive: "Yes, I am.", negative: "No, I'm not." },
      fr: { question: "Vous êtes allergique à quelque chose ?", positive: "Oui, je suis allergique.", negative: "Non, je ne suis pas allergique." },
      es: { question: "¿Es alérgico a algo?", positive: "Sí, soy alérgico.", negative: "No, no soy alérgico." },
    },
    // B1 — +6 (20)
    {
      id: "mind-sharing",
      difficulty: "B1",
      en: { question: "Would you mind sharing?", positive: "Not at all.", negative: "I'd rather not." },
      fr: { question: "Ça te dérange de partager ?", positive: "Non, pas du tout.", negative: "Je préférerais que non." },
      es: { question: "¿Te importa compartir?", positive: "No, en absoluto.", negative: "Preferiría que no." },
    },
    {
      id: "heard-news",
      difficulty: "B1",
      en: { question: "Have you heard the news?", positive: "Yes, I have.", negative: "No, I haven't." },
      fr: { question: "Tu as appris la nouvelle ?", positive: "Oui, je suis au courant.", negative: "Non, je ne suis pas au courant." },
      es: { question: "¿Te has enterado de la noticia?", positive: "Sí, me he enterado.", negative: "No, no me he enterado." },
    },
    {
      id: "coming-dinner",
      difficulty: "B1",
      en: { question: "Are you coming to dinner?", positive: "Yes, I'll be there.", negative: "No, I can't tonight." },
      fr: { question: "Tu viens dîner ?", positive: "Oui, je serai là.", negative: "Non, je ne peux pas ce soir." },
      es: { question: "¿Vienes a cenar?", positive: "Sí, allí estaré.", negative: "No, esta noche no puedo." },
    },
    {
      id: "need-hand",
      difficulty: "B1",
      en: { question: "Do you need a hand?", positive: "Yes, please.", negative: "No, I'm fine, thanks." },
      fr: { question: "Tu as besoin d'un coup de main ?", positive: "Oui, s'il te plaît.", negative: "Non, ça va, merci." },
      es: { question: "¿Necesitas una mano?", positive: "Sí, por favor.", negative: "No, estoy bien, gracias." },
    },
    {
      id: "still-there",
      difficulty: "B1",
      en: { question: "Will you still be there?", positive: "Yes, I will.", negative: "No, I'll have left." },
      fr: { question: "Tu seras encore là ?", positive: "Oui, je serai encore là.", negative: "Non, je serai déjà parti." },
      es: { question: "¿Seguirás allí?", positive: "Sí, seguiré allí.", negative: "No, ya me habré ido." },
    },
    {
      id: "tried-this",
      difficulty: "B1",
      en: { question: "Have you tried this before?", positive: "Yes, I have.", negative: "No, never." },
      fr: { question: "Tu as déjà essayé ça ?", positive: "Oui, j'ai déjà essayé.", negative: "Non, jamais." },
      es: { question: "¿Has probado esto antes?", positive: "Sí, ya lo he probado.", negative: "No, nunca." },
    },
    // B2 — +4 (13)
    {
      id: "put-off",
      difficulty: "B2",
      en: { question: "Would you mind putting it off?", positive: "Not at all.", negative: "I'd rather do it now." },
      fr: { question: "Ça vous dérangerait de reporter ?", positive: "Non, pas du tout.", negative: "Je préférerais le faire maintenant." },
      es: { question: "¿Le importaría aplazarlo?", positive: "No, en absoluto.", negative: "Preferiría hacerlo ahora." },
    },
    {
      id: "in-a-position",
      difficulty: "B2",
      en: { question: "Are you in a position to help?", positive: "Yes, I think I am.", negative: "No, I'm afraid not." },
      fr: { question: "Vous êtes en mesure d'aider ?", positive: "Oui, je pense que oui.", negative: "Non, je crains que non." },
      es: { question: "¿Está en condiciones de ayudar?", positive: "Sí, creo que sí.", negative: "No, me temo que no." },
    },
    {
      id: "go-ahead",
      difficulty: "B2",
      en: { question: "Shall I go ahead?", positive: "Yes, please do.", negative: "No, wait a moment." },
      fr: { question: "Je continue ?", positive: "Oui, allez-y.", negative: "Non, attendez un moment." },
      es: { question: "¿Sigo adelante?", positive: "Sí, adelante.", negative: "No, espere un momento." },
    },
    {
      id: "under-weather",
      difficulty: "B2",
      en: { question: "Are you feeling under the weather?", positive: "Yes, a bit.", negative: "No, I'm fine." },
      fr: { question: "Vous ne vous sentez pas bien ?", positive: "Si, un peu.", negative: "Non, ça va." },
      es: { question: "¿Se encuentra un poco mal?", positive: "Sí, un poco.", negative: "No, estoy bien." },
    },
    // C1 — +2 (7)
    {
      id: "leave-it-there",
      difficulty: "C1",
    en: { question: "Shall we leave it at that?", positive: "Yes, that's as far as we can usefully go today.", negative: "No, a material point is still outstanding." },
    fr: { question: "On en reste là ?", positive: "Oui, on ne peut pas aller plus loin utilement aujourd'hui.", negative: "Non, un point de fond reste ouvert." },
    es: { question: "¿Lo dejamos aquí?", positive: "Sí, es hasta donde cabe llegar hoy con provecho.", negative: "No, sigue abierto un punto de fondo." },
    },
    {
      id: "reading-too-much",
      difficulty: "C1",
    en: { question: "Aren't you reading too much into it?", positive: "Yes, I may be loading it with more than the text will bear.", negative: "No, that implication is fairly there." },
    fr: { question: "Tu n'interprètes pas un peu trop ?", positive: "Si, je lui fais peut-être dire plus que le texte ne porte.", negative: "Non, cette implication y est bel et bien." },
    es: { question: "¿No le estás dando demasiadas vueltas?", positive: "Sí, quizá le cargo más de lo que el texto aguanta.", negative: "No, esa implicación está con fundamento." },
    },
];

export const phraseSets: readonly PhraseSet[] = [
  ...phraseSetsBase,
  ...polarC1ExtraSets,
  ...polarC1MoreSets,
  ...polarB2ExtraSets,
  ...polarB2MoreSets,
  ...polarB1ExtraSets,
  ...polarA2ExtraSets,
  ...polarA1ExtraSets,
  ...polarC2ExtraSets,
  ...polarC2MoreSets,
];

export const PHRASE_SET_COUNT = phraseSets.length;

export function expandPhraseSets(language: "en" | "fr"): VocabularyItem[] {
  const prefix = language === "fr" ? "fr-" : "";
  return phraseSets.flatMap((set) =>
    ROLES.map(({ category, field, prefix: role }) => ({
      id: `${prefix}${role}-${set.id}`,
      category,
      term: set[language][field],
      translation: set.es[field],
      difficulty: set.difficulty,
      tags: [
        `set:${set.id}`,
        "skill:interaction",
        category === "questions" ? "skill:listening" : "skill:speaking",
      ],
    })),
  );
}

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

const TECH_ROLES: readonly { category: TechPhraseCategory; field: keyof TechPair; prefix: string }[] = [
  { category: "techQuestions", field: "question", prefix: "tech-question" },
  { category: "techAnswers", field: "answer", prefix: "tech-answer" },
];

export const techPhraseSetsBase: readonly TechPhraseSet[] = [
  {
    id: "git",
    difficulty: "A2",
    en: {
      question: "What is Git?",
      answer: "Git is a version control system. We use it to track changes and work on the same codebase.",
    },
    fr: {
      question: "Qu'est-ce que Git ?",
      answer: "Git est un système de gestion de versions. On s'en sert pour suivre les changements et travailler sur le même code.",
    },
    es: {
      question: "¿Qué es Git?",
      answer: "Git es un sistema de control de versiones. Lo usamos para seguir los cambios y trabajar sobre el mismo código.",
    },
  },
  {
    id: "pull-request",
    difficulty: "B1",
    en: {
      question: "What is a pull request?",
      answer: "A pull request is a proposal to merge my branch into the main branch after review.",
    },
    fr: {
      question: "Qu'est-ce qu'une pull request ?",
      answer: "Une pull request, c'est une proposition de fusionner ma branche dans la branche principale après relecture.",
    },
    es: {
      question: "¿Qué es un pull request?",
      answer: "Un pull request es una propuesta para fusionar mi rama en la rama principal después de la revisión.",
    },
  },
  {
    id: "api",
    difficulty: "B1",
    en: {
      question: "What is an API?",
      answer: "An API lets two systems talk to each other. The frontend calls it to get or send data.",
    },
    fr: {
      question: "Qu'est-ce qu'une API ?",
      answer: "Une API permet à deux systèmes de communiquer. Le frontend l'appelle pour récupérer ou envoyer des données.",
    },
    es: {
      question: "¿Qué es una API?",
      answer: "Una API permite que dos sistemas se comuniquen. El frontend la llama para obtener o enviar datos.",
    },
  },
  {
    id: "frontend-backend",
    difficulty: "B1",
    en: {
      question: "What's the difference between frontend and backend?",
      answer: "Frontend is what the user sees. Backend is the server, the database, and the business logic.",
    },
    fr: {
      question: "Quelle est la différence entre le frontend et le backend ?",
      answer: "Le frontend, c'est ce que l'utilisateur voit. Le backend, c'est le serveur, la base de données et la logique métier.",
    },
    es: {
      question: "¿Cuál es la diferencia entre frontend y backend?",
      answer: "El frontend es lo que ve el usuario. El backend es el servidor, la base de datos y la lógica de negocio.",
    },
  },
  {
    id: "debugging",
    difficulty: "B1",
    en: {
      question: "How do you debug a problem?",
      answer: "I reproduce it, check the logs, isolate the cause, then fix it and test again.",
    },
    fr: {
      question: "Comment déboguez-vous un problème ?",
      answer: "Je reproduis le problème, je consulte les logs, j'isole la cause, puis je corrige et je reteste.",
    },
    es: {
      question: "¿Cómo depuras un problema?",
      answer: "Lo reproduzco, miro los logs, aíslo la causa, lo corrijo y vuelvo a probar.",
    },
  },
  {
    id: "code-review",
    difficulty: "B2",
    en: {
      question: "What is a code review?",
      answer: "It's when a teammate reads my changes before they are merged, to catch bugs and keep the code consistent.",
    },
    fr: {
      question: "Qu'est-ce qu'une revue de code ?",
      answer: "C'est quand un collègue lit mes changements avant qu'ils soient fusionnés, pour détecter des bugs et garder le code cohérent.",
    },
    es: {
      question: "¿Qué es una revisión de código?",
      answer: "Es cuando un compañero lee mis cambios antes de fusionarlos, para detectar errores y mantener el código coherente.",
    },
  },
  {
    id: "sql",
    difficulty: "B1",
    en: {
      question: "What is SQL?",
      answer: "SQL is the language we use to query and update data in a relational database.",
    },
    fr: {
      question: "Qu'est-ce que SQL ?",
      answer: "SQL est le langage que l'on utilise pour interroger et mettre à jour les données dans une base relationnelle.",
    },
    es: {
      question: "¿Qué es SQL?",
      answer: "SQL es el lenguaje que usamos para consultar y actualizar datos en una base relacional.",
    },
  },
  {
    id: "deploy",
    difficulty: "B1",
    en: {
      question: "What does deploy mean?",
      answer: "Deploying means shipping a new version of the app to a server so users can use it.",
    },
    fr: {
      question: "Que signifie déployer ?",
      answer: "Déployer, c'est mettre une nouvelle version de l'application sur un serveur pour que les utilisateurs puissent s'en servir.",
    },
    es: {
      question: "¿Qué significa desplegar?",
      answer: "Desplegar es publicar una versión nueva de la aplicación en un servidor para que los usuarios la usen.",
    },
  },
  {
    id: "rest",
    difficulty: "B2",
    en: {
      question: "What is REST?",
      answer: "REST is a style for designing APIs around resources, using HTTP methods like GET, POST, PUT, and DELETE.",
    },
    fr: {
      question: "Qu'est-ce que REST ?",
      answer: "REST est un style de conception d'API autour de ressources, avec des méthodes HTTP comme GET, POST, PUT et DELETE.",
    },
    es: {
      question: "¿Qué es REST?",
      answer: "REST es un estilo para diseñar APIs alrededor de recursos, con métodos HTTP como GET, POST, PUT y DELETE.",
    },
  },
  {
    id: "bug-vs-feature",
    difficulty: "A2",
    en: {
      question: "What's the difference between a bug and a feature?",
      answer: "A bug is something that doesn't work as intended. A feature is new behaviour we planned to add.",
    },
    fr: {
      question: "Quelle est la différence entre un bug et une fonctionnalité ?",
      answer: "Un bug, c'est quelque chose qui ne fonctionne pas comme prévu. Une fonctionnalité, c'est un comportement nouveau que l'on a prévu d'ajouter.",
    },
    es: {
      question: "¿Cuál es la diferencia entre un bug y una funcionalidad?",
      answer: "Un bug es algo que no funciona como se esperaba. Una funcionalidad es un comportamiento nuevo que planeamos añadir.",
    },
  },
  {
    id: "standup",
    difficulty: "A2",
    en: {
      question: "What is a stand-up?",
      answer: "A short daily meeting where the team shares what they did, what they will do, and any blockers.",
    },
    fr: {
      question: "Qu'est-ce qu'un stand-up ?",
      answer: "C'est une courte réunion quotidienne où l'équipe dit ce qu'elle a fait, ce qu'elle va faire, et s'il y a des blocages.",
    },
    es: {
      question: "¿Qué es un stand-up?",
      answer: "Es una reunión diaria breve donde el equipo comparte qué hizo, qué va a hacer y si hay bloqueos.",
    },
  },
  {
    id: "docker",
    difficulty: "B2",
    en: {
      question: "What is Docker?",
      answer: "Docker packages an app with its dependencies so it runs the same way on every machine.",
    },
    fr: {
      question: "Qu'est-ce que Docker ?",
      answer: "Docker empaquette une application avec ses dépendances pour qu'elle fonctionne de la même façon sur chaque machine.",
    },
    es: {
      question: "¿Qué es Docker?",
      answer: "Docker empaqueta una aplicación con sus dependencias para que funcione igual en cada máquina.",
    },
  },
  {
    id: "html",
    difficulty: "A2",
    en: {
      question: "What is HTML?",
      answer: "HTML is the markup language that gives a web page its structure: headings, paragraphs, links, and forms.",
    },
    fr: {
      question: "Qu'est-ce que HTML ?",
      answer: "HTML est le langage de balisage qui donne sa structure à une page : titres, paragraphes, liens et formulaires.",
    },
    es: {
      question: "¿Qué es HTML?",
      answer: "HTML es el lenguaje de marcado que da estructura a una página: títulos, párrafos, enlaces y formularios.",
    },
  },
  {
    id: "css",
    difficulty: "A2",
    en: {
      question: "What is CSS?",
      answer: "CSS is the language we use to style the page: layout, colours, spacing, and fonts.",
    },
    fr: {
      question: "Qu'est-ce que CSS ?",
      answer: "CSS est le langage que l'on utilise pour styliser la page : mise en page, couleurs, espacements et polices.",
    },
    es: {
      question: "¿Qué es CSS?",
      answer: "CSS es el lenguaje que usamos para dar estilo a la página: diseño, colores, espacios y tipografías.",
    },
  },
  {
    id: "javascript",
    difficulty: "A2",
    en: {
      question: "What is JavaScript?",
      answer: "JavaScript makes the page interactive. It runs in the browser and talks to APIs when we need data.",
    },
    fr: {
      question: "Qu'est-ce que JavaScript ?",
      answer: "JavaScript rend la page interactive. Il s'exécute dans le navigateur et appelle des API quand on a besoin de données.",
    },
    es: {
      question: "¿Qué es JavaScript?",
      answer: "JavaScript hace la página interactiva. Se ejecuta en el navegador y habla con APIs cuando necesitamos datos.",
    },
  },
  {
    id: "commit",
    difficulty: "A2",
    en: {
      question: "What is a commit?",
      answer: "A commit is a saved snapshot of my changes, with a message that explains what I did.",
    },
    fr: {
      question: "Qu'est-ce qu'un commit ?",
      answer: "Un commit, c'est un instantané de mes changements, avec un message qui explique ce que j'ai fait.",
    },
    es: {
      question: "¿Qué es un commit?",
      answer: "Un commit es una instantánea guardada de mis cambios, con un mensaje que explica qué hice.",
    },
  },
  {
    id: "branch",
    difficulty: "A2",
    en: {
      question: "What is a branch?",
      answer: "A branch is a separate line of work, so I can build a feature without changing the main code.",
    },
    fr: {
      question: "Qu'est-ce qu'une branche ?",
      answer: "Une branche, c'est une ligne de travail séparée, pour développer une fonctionnalité sans toucher au code principal.",
    },
    es: {
      question: "¿Qué es una rama?",
      answer: "Una rama es una línea de trabajo aparte, para construir una funcionalidad sin cambiar el código principal.",
    },
  },
  {
    id: "ticket",
    difficulty: "A2",
    en: {
      question: "What is a ticket?",
      answer: "A ticket is a tracked piece of work — a bug, a task, or a feature — that the team can assign and follow.",
    },
    fr: {
      question: "Qu'est-ce qu'un ticket ?",
      answer: "Un ticket, c'est une tâche suivie — un bug, une tâche ou une fonctionnalité — que l'équipe peut assigner et suivre.",
    },
    es: {
      question: "¿Qué es un ticket?",
      answer: "Un ticket es un trabajo registrado — un bug, una tarea o una funcionalidad — que el equipo puede asignar y seguir.",
    },
  },
  {
    id: "localhost",
    difficulty: "A2",
    en: {
      question: "What is localhost?",
      answer: "Localhost is my own machine. The app runs there while I develop, before we deploy it.",
    },
    fr: {
      question: "Qu'est-ce que localhost ?",
      answer: "Localhost, c'est ma propre machine. L'application y tourne pendant que je développe, avant qu'on la déploie.",
    },
    es: {
      question: "¿Qué es localhost?",
      answer: "Localhost es mi propia máquina. Ahí corre la aplicación mientras desarrollo, antes de desplegarla.",
    },
  },
  {
    id: "json",
    difficulty: "B1",
    en: {
      question: "What is JSON?",
      answer: "JSON is a simple text format for sending data, often between the frontend and an API.",
    },
    fr: {
      question: "Qu'est-ce que JSON ?",
      answer: "JSON est un format texte simple pour envoyer des données, souvent entre le frontend et une API.",
    },
    es: {
      question: "¿Qué es JSON?",
      answer: "JSON es un formato de texto simple para enviar datos, a menudo entre el frontend y una API.",
    },
  },
  {
    id: "http",
    difficulty: "B1",
    en: {
      question: "What is HTTP?",
      answer: "HTTP is the protocol the browser uses to talk to a server, to request pages and send data.",
    },
    fr: {
      question: "Qu'est-ce que HTTP ?",
      answer: "HTTP est le protocole que le navigateur utilise pour parler au serveur, demander des pages et envoyer des données.",
    },
    es: {
      question: "¿Qué es HTTP?",
      answer: "HTTP es el protocolo que usa el navegador para hablar con el servidor, pedir páginas y enviar datos.",
    },
  },
  {
    id: "typescript",
    difficulty: "B1",
    en: {
      question: "What is TypeScript?",
      answer: "TypeScript is JavaScript with types. It helps catch errors before the code runs.",
    },
    fr: {
      question: "Qu'est-ce que TypeScript ?",
      answer: "TypeScript, c'est JavaScript avec des types. Ça aide à détecter des erreurs avant que le code s'exécute.",
    },
    es: {
      question: "¿Qué es TypeScript?",
      answer: "TypeScript es JavaScript con tipos. Ayuda a detectar errores antes de que el código se ejecute.",
    },
  },
  {
    id: "npm",
    difficulty: "B1",
    en: {
      question: "What is npm?",
      answer: "npm is the package manager for JavaScript. We use it to install the libraries the project needs.",
    },
    fr: {
      question: "Qu'est-ce que npm ?",
      answer: "npm est le gestionnaire de paquets pour JavaScript. On s'en sert pour installer les bibliothèques dont le projet a besoin.",
    },
    es: {
      question: "¿Qué es npm?",
      answer: "npm es el gestor de paquetes de JavaScript. Lo usamos para instalar las librerías que el proyecto necesita.",
    },
  },
  {
    id: "unit-test",
    difficulty: "B1",
    en: {
      question: "What is a unit test?",
      answer: "A unit test checks a small piece of code on its own, so we know it still works after we change it.",
    },
    fr: {
      question: "Qu'est-ce qu'un test unitaire ?",
      answer: "Un test unitaire vérifie un petit morceau de code tout seul, pour savoir s'il fonctionne encore après un changement.",
    },
    es: {
      question: "¿Qué es un test unitario?",
      answer: "Un test unitario comprueba una pieza pequeña de código por separado, para saber que sigue funcionando después de un cambio.",
    },
  },
  {
    id: "sprint",
    difficulty: "B1",
    en: {
      question: "What is a sprint?",
      answer: "A sprint is a short work cycle, usually one or two weeks, with a clear set of tasks to finish.",
    },
    fr: {
      question: "Qu'est-ce qu'un sprint ?",
      answer: "Un sprint, c'est un cycle de travail court, en général une ou deux semaines, avec un ensemble clair de tâches à terminer.",
    },
    es: {
      question: "¿Qué es un sprint?",
      answer: "Un sprint es un ciclo de trabajo corto, normalmente una o dos semanas, con un conjunto claro de tareas a terminar.",
    },
  },
  {
    id: "blocker",
    difficulty: "B1",
    en: {
      question: "What is a blocker?",
      answer: "A blocker is anything that stops me from making progress, so I raise it in the stand-up.",
    },
    fr: {
      question: "Qu'est-ce qu'un blocker ?",
      answer: "Un blocker, c'est tout ce qui m'empêche d'avancer, donc je le signale pendant le stand-up.",
    },
    es: {
      question: "¿Qué es un blocker?",
      answer: "Un blocker es cualquier cosa que me impide avanzar, así que lo comento en el stand-up.",
    },
  },
  {
    id: "merge-conflict",
    difficulty: "B2",
    en: {
      question: "How do you resolve a merge conflict?",
      answer: "I open the file, compare both changes, keep the correct code, then commit the result.",
    },
    fr: {
      question: "Comment résolvez-vous un conflit de fusion ?",
      answer: "J'ouvre le fichier, je compare les deux versions, je garde le bon code, puis je fais un commit du résultat.",
    },
    es: {
      question: "¿Cómo resuelves un conflicto de fusión?",
      answer: "Abro el archivo, comparo ambos cambios, dejo el código correcto y hago commit del resultado.",
    },
  },
  {
    id: "fetch-vs-pull",
    difficulty: "B2",
    en: {
      question: "What's the difference between git fetch and git pull?",
      answer: "git fetch downloads remote changes without merging. git pull fetches and then merges into my current branch.",
    },
    fr: {
      question: "Quelle est la différence entre git fetch et git pull ?",
      answer: "git fetch télécharge les changements distants sans fusionner. git pull fait le fetch, puis fusionne dans ma branche actuelle.",
    },
    es: {
      question: "¿Cuál es la diferencia entre git fetch y git pull?",
      answer: "git fetch descarga los cambios remotos sin fusionar. git pull hace el fetch y luego fusiona en mi rama actual.",
    },
  },
  {
    id: "ci-cd",
    difficulty: "B2",
    en: {
      question: "What is CI/CD?",
      answer: "CI/CD automates the build, test, and deploy steps so every change can be checked and shipped reliably.",
    },
    fr: {
      question: "Qu'est-ce que CI/CD ?",
      answer: "CI/CD automatise le build, les tests et le déploiement, pour que chaque changement soit vérifié et livré de façon fiable.",
    },
    es: {
      question: "¿Qué es CI/CD?",
      answer: "CI/CD automatiza el build, los tests y el despliegue, para que cada cambio se compruebe y se publique de forma fiable.",
    },
  },
  {
    id: "auth-vs-authz",
    difficulty: "C1",
    en: {
      question: "What's the difference between authentication and authorization?",
      answer: "Authentication is proving who you are. Authorization is what you're allowed to do.",
    },
    fr: {
      question: "Quelle est la différence entre authentification et autorisation ?",
      answer: "L'authentification, c'est prouver qui vous êtes. L'autorisation, c'est ce que vous avez le droit de faire.",
    },
    es: {
      question: "¿Cuál es la diferencia entre autenticación y autorización?",
      answer: "La autenticación es demostrar quién eres. La autorización es lo que tienes permitido hacer.",
    },
  },
  {
    id: "backlog",
    difficulty: "A2",
    en: {
      question: "What is a backlog?",
      answer: "A backlog is the ordered list of work the team still has to do: bugs, tasks, and features.",
    },
    fr: {
      question: "Qu'est-ce qu'un backlog ?",
      answer: "Un backlog, c'est la liste ordonnée du travail qu'il reste à faire : bugs, tâches et fonctionnalités.",
    },
    es: {
      question: "¿Qué es un backlog?",
      answer: "Un backlog es la lista ordenada del trabajo que el equipo aún tiene que hacer: bugs, tareas y funcionalidades.",
    },
  },
  {
    id: "ide",
    difficulty: "A2",
    en: {
      question: "What is an IDE?",
      answer: "An IDE is the app I write code in, with an editor, a terminal, and a debugger in one place.",
    },
    fr: {
      question: "Qu'est-ce qu'un IDE ?",
      answer: "Un IDE, c'est l'application dans laquelle j'écris le code, avec un éditeur, un terminal et un débogueur au même endroit.",
    },
    es: {
      question: "¿Qué es un IDE?",
      answer: "Un IDE es la aplicación en la que escribo código, con editor, terminal y depurador en un solo sitio.",
    },
  },
  {
    id: "terminal",
    difficulty: "A2",
    en: {
      question: "What is the terminal?",
      answer: "The terminal is a text window where I run commands, like git, npm, or scripts.",
    },
    fr: {
      question: "Qu'est-ce que le terminal ?",
      answer: "Le terminal est une fenêtre texte où je lance des commandes, comme git, npm ou des scripts.",
    },
    es: {
      question: "¿Qué es la terminal?",
      answer: "La terminal es una ventana de texto donde ejecuto comandos, como git, npm o scripts.",
    },
  },
  {
    id: "logs",
    difficulty: "A2",
    en: {
      question: "What are logs?",
      answer: "Logs are messages the app writes while it runs. I read them to see errors and what happened.",
    },
    fr: {
      question: "Qu'est-ce que les logs ?",
      answer: "Les logs, ce sont les messages que l'application écrit pendant qu'elle tourne. Je les lis pour voir les erreurs et ce qui s'est passé.",
    },
    es: {
      question: "¿Qué son los logs?",
      answer: "Los logs son mensajes que escribe la aplicación mientras corre. Los leo para ver errores y qué pasó.",
    },
  },
  {
    id: "agile",
    difficulty: "B1",
    en: {
      question: "What is Agile?",
      answer: "Agile is a way of working in short cycles, with frequent feedback, instead of delivering everything at the end.",
    },
    fr: {
      question: "Qu'est-ce qu'Agile ?",
      answer: "Agile, c'est une façon de travailler en cycles courts, avec des retours fréquents, au lieu de tout livrer à la fin.",
    },
    es: {
      question: "¿Qué es Agile?",
      answer: "Agile es una forma de trabajar en ciclos cortos, con feedback frecuente, en lugar de entregar todo al final.",
    },
  },
  {
    id: "scrum",
    difficulty: "B1",
    en: {
      question: "What is Scrum?",
      answer: "Scrum is an Agile framework with sprints, a backlog, stand-ups, and a review at the end of each sprint.",
    },
    fr: {
      question: "Qu'est-ce que Scrum ?",
      answer: "Scrum est un cadre Agile avec des sprints, un backlog, des stand-ups et une revue à la fin de chaque sprint.",
    },
    es: {
      question: "¿Qué es Scrum?",
      answer: "Scrum es un marco Agile con sprints, backlog, stand-ups y una revisión al final de cada sprint.",
    },
  },
  {
    id: "env-var",
    difficulty: "B1",
    en: {
      question: "What is an environment variable?",
      answer: "It's a setting outside the code, like an API key or a database URL, so we don't hard-code secrets.",
    },
    fr: {
      question: "Qu'est-ce qu'une variable d'environnement ?",
      answer: "C'est un paramètre hors du code, comme une clé d'API ou l'URL d'une base, pour ne pas écrire les secrets en dur.",
    },
    es: {
      question: "¿Qué es una variable de entorno?",
      answer: "Es un ajuste fuera del código, como una clave de API o la URL de una base, para no dejar secretos escritos en el código.",
    },
  },
  {
    id: "staging-prod",
    difficulty: "B1",
    en: {
      question: "What's the difference between staging and production?",
      answer: "Staging is a copy of production for final tests. Production is the live system that users actually use.",
    },
    fr: {
      question: "Quelle est la différence entre staging et production ?",
      answer: "Le staging est une copie de la production pour les tests finaux. La production, c'est le système réel que les utilisateurs utilisent.",
    },
    es: {
      question: "¿Cuál es la diferencia entre staging y producción?",
      answer: "Staging es una copia de producción para las pruebas finales. Producción es el sistema real que usan los usuarios.",
    },
  },
  {
    id: "rollback",
    difficulty: "B1",
    en: {
      question: "What does rollback mean?",
      answer: "A rollback is going back to the previous working version after a bad deploy.",
    },
    fr: {
      question: "Que signifie rollback ?",
      answer: "Un rollback, c'est revenir à la version précédente qui fonctionnait après un mauvais déploiement.",
    },
    es: {
      question: "¿Qué significa rollback?",
      answer: "Un rollback es volver a la versión anterior que funcionaba después de un mal despliegue.",
    },
  },
  {
    id: "hotfix",
    difficulty: "B1",
    en: {
      question: "What is a hotfix?",
      answer: "A hotfix is an urgent fix we ship fast, usually for a serious bug in production.",
    },
    fr: {
      question: "Qu'est-ce qu'un hotfix ?",
      answer: "Un hotfix, c'est un correctif urgent que l'on livre vite, en général pour un bug grave en production.",
    },
    es: {
      question: "¿Qué es un hotfix?",
      answer: "Un hotfix es una corrección urgente que publicamos rápido, normalmente por un bug grave en producción.",
    },
  },
  {
    id: "pair-programming",
    difficulty: "B1",
    en: {
      question: "What is pair programming?",
      answer: "Two people work on the same code at once: one types, the other reviews and thinks aloud.",
    },
    fr: {
      question: "Qu'est-ce que le pair programming ?",
      answer: "Deux personnes travaillent sur le même code en même temps : l'une tape, l'autre relit et réfléchit à voix haute.",
    },
    es: {
      question: "¿Qué es el pair programming?",
      answer: "Dos personas trabajan en el mismo código a la vez: una escribe y la otra revisa y piensa en voz alta.",
    },
  },
  {
    id: "refactoring",
    difficulty: "B1",
    en: {
      question: "What does refactor mean?",
      answer: "Refactoring is improving the code without changing what it does, so it's easier to read and change later.",
    },
    fr: {
      question: "Que signifie refactoriser ?",
      answer: "Refactoriser, c'est améliorer le code sans changer ce qu'il fait, pour qu'il soit plus lisible et plus facile à modifier ensuite.",
    },
    es: {
      question: "¿Qué significa refactorizar?",
      answer: "Refactorizar es mejorar el código sin cambiar lo que hace, para que sea más fácil de leer y de cambiar después.",
    },
  },
  {
    id: "cache",
    difficulty: "B1",
    en: {
      question: "What is a cache?",
      answer: "A cache stores data we already fetched, so the next request is faster and we hit the server less.",
    },
    fr: {
      question: "Qu'est-ce qu'un cache ?",
      answer: "Un cache stocke des données déjà récupérées, pour que la prochaine requête soit plus rapide et qu'on sollicite moins le serveur.",
    },
    es: {
      question: "¿Qué es una caché?",
      answer: "Una caché guarda datos que ya pedimos, para que la siguiente petición sea más rápida y golpeemos menos el servidor.",
    },
  },
  {
    id: "library-vs-framework",
    difficulty: "B1",
    en: {
      question: "What's the difference between a library and a framework?",
      answer: "A library is a tool I call from my code. A framework calls my code and sets the structure of the app.",
    },
    fr: {
      question: "Quelle est la différence entre une bibliothèque et un framework ?",
      answer: "Une bibliothèque, c'est un outil que j'appelle depuis mon code. Un framework appelle mon code et impose la structure de l'application.",
    },
    es: {
      question: "¿Cuál es la diferencia entre una librería y un framework?",
      answer: "Una librería es una herramienta que llamo desde mi código. Un framework llama a mi código y marca la estructura de la aplicación.",
    },
  },
  {
    id: "status-404",
    difficulty: "B1",
    en: {
      question: "What does a 404 mean?",
      answer: "A 404 means the server couldn't find the resource. The URL is wrong, or the page no longer exists.",
    },
    fr: {
      question: "Que signifie une 404 ?",
      answer: "Une 404, ça veut dire que le serveur n'a pas trouvé la ressource. L'URL est fausse, ou la page n'existe plus.",
    },
    es: {
      question: "¿Qué significa un 404?",
      answer: "Un 404 significa que el servidor no encontró el recurso. La URL está mal o la página ya no existe.",
    },
  },
  {
    id: "merge-vs-rebase",
    difficulty: "C1",
    en: {
      question: "What's the difference between merge and rebase?",
      answer: "Merge joins two branches and keeps the history. Rebase replays my commits on top of another branch for a linear history.",
    },
    fr: {
      question: "Quelle est la différence entre merge et rebase ?",
      answer: "Merge fusionne deux branches et garde l'historique. Rebase rejoue mes commits par-dessus une autre branche pour un historique linéaire.",
    },
    es: {
      question: "¿Cuál es la diferencia entre merge y rebase?",
      answer: "Merge une dos ramas y conserva el historial. Rebase vuelve a aplicar mis commits encima de otra rama para un historial lineal.",
    },
  },
  {
    id: "technical-debt",
    difficulty: "C1",
    en: {
      question: "What is technical debt, as opposed to a mere bug?",
      answer: "It is a design shortcut that still works, but whose interest is paid in slower change later. A bug is incorrect behaviour now; debt is a future cost we accepted.",
    },
    fr: {
      question: "Qu'est-ce que la dette technique, par opposition à un simple bug ?",
      answer: "C'est un raccourci de conception qui marche encore, mais dont les intérêts se paient en changements plus lents plus tard. Un bug est un comportement faux aujourd'hui ; la dette est un coût futur accepté.",
    },
    es: {
      question: "¿Qué es la deuda técnica, frente a un simple bug?",
      answer: "Es un atajo de diseño que aún funciona, pero cuyos intereses se pagan en cambios más lentos después. Un bug es comportamiento incorrecto ahora; la deuda es un coste futuro que aceptamos.",
    },
  },
  {
    id: "dry",
    difficulty: "B2",
    en: {
      question: "What does DRY mean?",
      answer: "DRY means Don't Repeat Yourself: we extract shared logic instead of copying the same code.",
    },
    fr: {
      question: "Que signifie DRY ?",
      answer: "DRY veut dire Don't Repeat Yourself : on extrait la logique partagée au lieu de copier le même code.",
    },
    es: {
      question: "¿Qué significa DRY?",
      answer: "DRY significa Don't Repeat Yourself: extraemos la lógica compartida en lugar de copiar el mismo código.",
    },
  },
  {
    id: "production-bug",
    difficulty: "B2",
    en: {
      question: "How do you handle a bug in production?",
      answer: "I confirm the impact, roll back or ship a hotfix if needed, then find the cause and add a test so it doesn't come back.",
    },
    fr: {
      question: "Comment gérez-vous un bug en production ?",
      answer: "Je confirme l'impact, je fais un rollback ou un hotfix si besoin, puis je trouve la cause et j'ajoute un test pour que ça ne revienne pas.",
    },
    es: {
      question: "¿Cómo gestionas un bug en producción?",
      answer: "Confirmo el impacto, hago rollback o un hotfix si hace falta, luego busco la causa y añado un test para que no vuelva.",
    },
  },
  {
    id: "class-vs-object",
    difficulty: "B2",
    en: {
      question: "What's the difference between a class and an object?",
      answer: "A class is the blueprint. An object is a concrete instance created from that class.",
    },
    fr: {
      question: "Quelle est la différence entre une classe et un objet ?",
      answer: "Une classe, c'est le plan. Un objet, c'est une instance concrète créée à partir de cette classe.",
    },
    es: {
      question: "¿Cuál es la diferencia entre una clase y un objeto?",
      answer: "Una clase es el plano. Un objeto es una instancia concreta creada a partir de esa clase.",
    },
  },
  {
    id: "repo",
    difficulty: "A2",
    en: {
      question: "What is a repository?",
      answer: "A repository, or repo, is where the project's code and its Git history live.",
    },
    fr: {
      question: "Qu'est-ce qu'un dépôt ?",
      answer: "Un dépôt, ou repo, c'est l'endroit où vivent le code du projet et son historique Git.",
    },
    es: {
      question: "¿Qué es un repositorio?",
      answer: "Un repositorio, o repo, es donde viven el código del proyecto y su historial de Git.",
    },
  },
  {
    id: "browser",
    difficulty: "A2",
    en: {
      question: "What is a browser?",
      answer: "A browser is the app that loads web pages, like Chrome, Firefox, or Edge.",
    },
    fr: {
      question: "Qu'est-ce qu'un navigateur ?",
      answer: "Un navigateur, c'est l'application qui charge les pages web, comme Chrome, Firefox ou Edge.",
    },
    es: {
      question: "¿Qué es un navegador?",
      answer: "Un navegador es la aplicación que carga las páginas web, como Chrome, Firefox o Edge.",
    },
  },
  {
    id: "database",
    difficulty: "A2",
    en: {
      question: "What is a database?",
      answer: "A database stores data in a structured way so the app can read and update it later.",
    },
    fr: {
      question: "Qu'est-ce qu'une base de données ?",
      answer: "Une base de données stocke les données de façon structurée, pour que l'application puisse les lire et les mettre à jour.",
    },
    es: {
      question: "¿Qué es una base de datos?",
      answer: "Una base de datos guarda información de forma estructurada para que la aplicación pueda leerla y actualizarla.",
    },
  },
  {
    id: "cloud",
    difficulty: "B1",
    en: {
      question: "What is the cloud?",
      answer: "The cloud is servers we rent from a provider, so we don't host the app on our own machines.",
    },
    fr: {
      question: "Qu'est-ce que le cloud ?",
      answer: "Le cloud, ce sont des serveurs que l'on loue chez un fournisseur, pour ne pas héberger l'application sur nos propres machines.",
    },
    es: {
      question: "¿Qué es la nube?",
      answer: "La nube son servidores que alquilamos a un proveedor, para no alojar la aplicación en nuestras propias máquinas.",
    },
  },
  {
    id: "endpoint",
    difficulty: "B1",
    en: {
      question: "What is an endpoint?",
      answer: "An endpoint is a specific URL on an API, like GET /users, that does one job.",
    },
    fr: {
      question: "Qu'est-ce qu'un endpoint ?",
      answer: "Un endpoint, c'est une URL précise d'une API, comme GET /users, qui fait une chose.",
    },
    es: {
      question: "¿Qué es un endpoint?",
      answer: "Un endpoint es una URL concreta de una API, como GET /users, que hace una sola cosa.",
    },
  },
  {
    id: "https",
    difficulty: "B1",
    en: {
      question: "What is HTTPS?",
      answer: "HTTPS is HTTP with encryption. It protects data in transit between the browser and the server.",
    },
    fr: {
      question: "Qu'est-ce que HTTPS ?",
      answer: "HTTPS, c'est HTTP avec chiffrement. Ça protège les données en transit entre le navigateur et le serveur.",
    },
    es: {
      question: "¿Qué es HTTPS?",
      answer: "HTTPS es HTTP con cifrado. Protege los datos en tránsito entre el navegador y el servidor.",
    },
  },
  {
    id: "cookie",
    difficulty: "B1",
    en: {
      question: "What is a cookie?",
      answer: "A cookie is a small piece of data the server stores in the browser, often to keep a user signed in.",
    },
    fr: {
      question: "Qu'est-ce qu'un cookie ?",
      answer: "Un cookie, c'est une petite donnée que le serveur stocke dans le navigateur, souvent pour garder l'utilisateur connecté.",
    },
    es: {
      question: "¿Qué es una cookie?",
      answer: "Una cookie es un dato pequeño que el servidor guarda en el navegador, a menudo para mantener al usuario conectado.",
    },
  },
  {
    id: "query",
    difficulty: "B1",
    en: {
      question: "What is a query?",
      answer: "A query is a request for data, for example an SQL statement or a search in the database.",
    },
    fr: {
      question: "Qu'est-ce qu'une requête ?",
      answer: "Une requête, c'est une demande de données, par exemple une instruction SQL ou une recherche dans la base.",
    },
    es: {
      question: "¿Qué es una query?",
      answer: "Una query es una petición de datos, por ejemplo una instrucción SQL o una búsqueda en la base.",
    },
  },
  {
    id: "mock",
    difficulty: "B1",
    en: {
      question: "What is a mock?",
      answer: "A mock is a fake stand-in for a real service in tests, so we can check our code without calling the real API.",
    },
    fr: {
      question: "Qu'est-ce qu'un mock ?",
      answer: "Un mock, c'est un substitut factice d'un vrai service dans les tests, pour vérifier notre code sans appeler la vraie API.",
    },
    es: {
      question: "¿Qué es un mock?",
      answer: "Un mock es un sustituto falso de un servicio real en los tests, para probar nuestro código sin llamar a la API de verdad.",
    },
  },
  {
    id: "timeout",
    difficulty: "B1",
    en: {
      question: "What is a timeout?",
      answer: "A timeout is the maximum time we wait for a response before we stop and treat the request as failed.",
    },
    fr: {
      question: "Qu'est-ce qu'un timeout ?",
      answer: "Un timeout, c'est le temps maximum d'attente d'une réponse avant d'arrêter et de considérer la requête comme échouée.",
    },
    es: {
      question: "¿Qué es un timeout?",
      answer: "Un timeout es el tiempo máximo que esperamos una respuesta antes de cortar y dar la petición por fallida.",
    },
  },
  {
    id: "jwt",
    difficulty: "C1",
    en: {
      question: "What is a JWT, and what must you verify before trusting it?",
      answer: "A JWT is a signed token issued after login. You verify the signature, the expiry, and the claims before treating it as proof of identity.",
    },
    fr: {
      question: "Qu'est-ce qu'un JWT, et que devez-vous vérifier avant de lui faire confiance ?",
      answer: "Un JWT est un jeton signé délivré après la connexion. Il faut vérifier la signature, l'expiration et les claims avant d'en faire une preuve d'identité.",
    },
    es: {
      question: "¿Qué es un JWT y qué hay que verificar antes de fiarse de él?",
      answer: "Un JWT es un token firmado que se emite tras el login. Hay que verificar la firma, la caducidad y las claims antes de tomarlo como prueba de identidad.",
    },
  },
  {
    id: "cors",
    difficulty: "C1",
    en: {
      question: "What is CORS, and why does a preflight happen?",
      answer: "CORS is a browser rule that blocks cross-origin calls unless the server opts in. A preflight OPTIONS request checks the method and headers before the real call is sent.",
    },
    fr: {
      question: "Qu'est-ce que CORS, et pourquoi y a-t-il un preflight ?",
      answer: "CORS est une règle du navigateur qui bloque les appels cross-origin sauf opt-in du serveur. Un preflight OPTIONS vérifie la méthode et les en-têtes avant l'appel réel.",
    },
    es: {
      question: "¿Qué es CORS y por qué hay un preflight?",
      answer: "CORS es una regla del navegador que bloquea las llamadas cross-origin salvo que el servidor se adhiera. Un preflight OPTIONS comprueba el método y las cabeceras antes de la llamada real.",
    },
  },
  {
    id: "microservice",
    difficulty: "C1",
    en: {
      question: "What trade-off does a microservice architecture actually buy?",
      answer: "Independent deploy and scale per service, at the cost of network failure modes and operational complexity you did not have in a modular monolith.",
    },
    fr: {
      question: "Quel compromis une architecture microservices achète-t-elle vraiment ?",
      answer: "Un déploiement et une montée en charge indépendants par service, au prix de pannes réseau et d'une complexité opérationnelle absente d'un monolithe modulaire.",
    },
    es: {
      question: "¿Qué compromiso compra de verdad una arquitectura de microservicios?",
      answer: "Despliegue y escala independientes por servicio, a costa de fallos de red y una complejidad operativa que un monolito modular no tenía.",
    },
  },
  {
    id: "null-vs-undefined",
    difficulty: "C1",
    en: {
      question: "What's the difference between null and undefined in JavaScript?",
      answer: "Undefined means the value was never set. Null is an intentional empty value we assigned.",
    },
    fr: {
      question: "Quelle est la différence entre null et undefined en JavaScript ?",
      answer: "Undefined, ça veut dire que la valeur n'a jamais été définie. Null, c'est une valeur vide que l'on a mise exprès.",
    },
    es: {
      question: "¿Cuál es la diferencia entre null y undefined en JavaScript?",
      answer: "Undefined significa que el valor nunca se asignó. Null es un valor vacío que pusimos a propósito.",
    },
  },
  {
    id: "sql-injection",
    difficulty: "C1",
    en: {
      question: "What is SQL injection, and how do you prevent it?",
      answer: "It's when untrusted input is mixed into an SQL string. We prevent it with parameterized queries, never by concatenating user input.",
    },
    fr: {
      question: "Qu'est-ce que l'injection SQL, et comment l'évitez-vous ?",
      answer: "C'est quand une entrée non fiable est mélangée à une chaîne SQL. On l'évite avec des requêtes paramétrées, jamais en concaténant la saisie utilisateur.",
    },
    es: {
      question: "¿Qué es la inyección SQL y cómo la evitas?",
      answer: "Es cuando una entrada no fiable se mezcla en una cadena SQL. Se evita con consultas parametrizadas, nunca concatenando lo que escribe el usuario.",
    },
  },
];

export const techPhraseSets: readonly TechPhraseSet[] = [
  ...techPhraseSetsBase,
  ...techC2ExtraSets,
  ...techC2MoreSets,
  ...techC1MoreSets,
  ...techB2MoreSets,
];

export const TECH_PHRASE_SET_COUNT = techPhraseSets.length;

export function expandTechPhraseSets(language: "en" | "fr"): VocabularyItem[] {
  const prefix = language === "fr" ? "fr-" : "";
  return techPhraseSets.flatMap((set) =>
    TECH_ROLES.map(({ category, field, prefix: role }) => ({
      id: `${prefix}${role}-${set.id}`,
      category,
      term: set[language][field],
      translation: set.es[field],
      difficulty: set.difficulty,
      tags: [`set:${set.id}`, "domain:tech", "skill:writing"],
    })),
  );
}

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

const OPEN_ROLES: readonly { category: OpenPhraseCategory; field: keyof OpenPair; prefix: string }[] = [
  { category: "openQuestions", field: "question", prefix: "open-question" },
  { category: "openAnswers", field: "answer", prefix: "open-answer" },
];

export const openPhraseSetsBase: readonly OpenPhraseSet[] = [
  {
    id: "your-name",
    difficulty: "A1",
    en: { question: "What's your name?", answer: "My name's Ana." },
    fr: { question: "Comment tu t'appelles ?", answer: "Je m'appelle Ana." },
    es: { question: "¿Cómo te llamas?", answer: "Me llamo Ana." },
  },
  {
    id: "where-from",
    difficulty: "A1",
    en: { question: "Where are you from?", answer: "I'm from Spain." },
    fr: { question: "Tu viens d'où ?", answer: "Je viens d'Espagne." },
    es: { question: "¿De dónde eres?", answer: "Soy de España." },
  },
  {
    id: "how-old",
    difficulty: "A1",
    en: { question: "How old are you?", answer: "I'm twenty-five." },
    fr: { question: "Tu as quel âge ?", answer: "J'ai vingt-cinq ans." },
    es: { question: "¿Cuántos años tienes?", answer: "Tengo veinticinco." },
  },
  {
    id: "where-live",
    difficulty: "A1",
    en: { question: "Where do you live?", answer: "I live in Madrid." },
    fr: { question: "Tu habites où ?", answer: "J'habite à Madrid." },
    es: { question: "¿Dónde vives?", answer: "Vivo en Madrid." },
  },
  {
    id: "what-do",
    difficulty: "A1",
    en: { question: "What do you do?", answer: "I work in IT." },
    fr: { question: "Tu fais quoi dans la vie ?", answer: "Je travaille dans l'informatique." },
    es: { question: "¿A qué te dedicas?", answer: "Trabajo en informática." },
  },
  {
    id: "how-are-you",
    difficulty: "A1",
    en: { question: "How are you?", answer: "I'm fine, thanks. And you?" },
    fr: { question: "Ça va ?", answer: "Ça va bien, merci. Et toi ?" },
    es: { question: "¿Cómo estás?", answer: "Bien, gracias. ¿Y tú?" },
  },
  {
    id: "what-time",
    difficulty: "A1",
    en: { question: "What time is it?", answer: "It's three o'clock." },
    fr: { question: "Quelle heure est-il ?", answer: "Il est trois heures." },
    es: { question: "¿Qué hora es?", answer: "Son las tres." },
  },
  {
    id: "what-job",
    difficulty: "A1",
    en: { question: "What's your job?", answer: "I'm a developer." },
    fr: { question: "Tu fais quel métier ?", answer: "Je suis développeur." },
    es: { question: "¿Cuál es tu trabajo?", answer: "Soy desarrollador." },
  },
  {
    id: "who-is-that",
    difficulty: "A1",
    en: { question: "Who is that?", answer: "That's my colleague." },
    fr: { question: "C'est qui ?", answer: "C'est mon collègue." },
    es: { question: "¿Quién es?", answer: "Es mi compañero." },
  },
  {
    id: "how-much",
    difficulty: "A1",
    en: { question: "How much is this?", answer: "It's ten euros." },
    fr: { question: "C'est combien ?", answer: "Ça fait dix euros." },
    es: { question: "¿Cuánto cuesta esto?", answer: "Son diez euros." },
  },
  {
    id: "what-doing",
    difficulty: "A2",
    en: { question: "What are you doing?", answer: "I'm checking my emails." },
    fr: { question: "Tu fais quoi ?", answer: "Je regarde mes mails." },
    es: { question: "¿Qué estás haciendo?", answer: "Estoy mirando el correo." },
  },
  {
    id: "why-late",
    difficulty: "A2",
    en: { question: "Why are you late?", answer: "The train was delayed." },
    fr: { question: "Pourquoi tu es en retard ?", answer: "Le train avait du retard." },
    es: { question: "¿Por qué llegas tarde?", answer: "El tren iba con retraso." },
  },
  {
    id: "how-get-work",
    difficulty: "A2",
    en: { question: "How do you get to work?", answer: "I take the metro." },
    fr: { question: "Tu vas au travail comment ?", answer: "Je prends le métro." },
    es: { question: "¿Cómo vas al trabajo?", answer: "Cojo el metro." },
  },
  {
    id: "how-long-here",
    difficulty: "A2",
    en: { question: "How long have you lived here?", answer: "For three years." },
    fr: { question: "Tu habites ici depuis combien de temps ?", answer: "Depuis trois ans." },
    es: { question: "¿Cuánto tiempo llevas viviendo aquí?", answer: "Tres años." },
  },
  {
    id: "what-yesterday",
    difficulty: "A2",
    en: { question: "What did you do yesterday?", answer: "I stayed at home." },
    fr: { question: "Tu as fait quoi hier ?", answer: "Je suis resté à la maison." },
    es: { question: "¿Qué hiciste ayer?", answer: "Me quedé en casa." },
  },
  {
    id: "weather-like",
    difficulty: "A2",
    en: { question: "What's the weather like?", answer: "It's raining." },
    fr: { question: "Il fait quel temps ?", answer: "Il pleut." },
    es: { question: "¿Qué tiempo hace?", answer: "Está lloviendo." },
  },
  {
    id: "how-weekend",
    difficulty: "A2",
    en: { question: "How was your weekend?", answer: "It was great, thanks." },
    fr: { question: "C'était comment ton week-end ?", answer: "Très bien, merci." },
    es: { question: "¿Qué tal el fin de semana?", answer: "Muy bien, gracias." },
  },
  {
    id: "where-station",
    difficulty: "A2",
    en: { question: "Where's the station?", answer: "It's straight ahead, then left." },
    fr: { question: "Où est la gare ?", answer: "Tout droit, puis à gauche." },
    es: { question: "¿Dónde está la estación?", answer: "Todo recto y luego a la izquierda." },
  },
  {
    id: "what-brings",
    difficulty: "B1",
    en: { question: "What brings you here?", answer: "I'm here for a conference." },
    fr: { question: "Qu'est-ce qui vous amène ?", answer: "Je suis ici pour une conférence." },
    es: { question: "¿Qué te trae por aquí?", answer: "Vengo a una conferencia." },
  },
  {
    id: "spend-evenings",
    difficulty: "B1",
    en: { question: "How do you usually spend your evenings?", answer: "I usually cook and watch a series." },
    fr: { question: "Tu passes tes soirées comment, d'habitude ?", answer: "D'habitude je cuisine et je regarde une série." },
    es: { question: "¿Cómo sueles pasar las tardes?", answer: "Suelo cocinar y ver una serie." },
  },
  {
    id: "how-to-centre",
    difficulty: "B1",
    en: { question: "Could you tell me how to get to the centre?", answer: "Go straight on and take the second left." },
    fr: { question: "Vous pouvez me dire comment aller au centre ?", answer: "Allez tout droit et prenez la deuxième à gauche." },
    es: { question: "¿Me puede decir cómo ir al centro?", answer: "Siga todo recto y tome la segunda a la izquierda." },
  },
  {
    id: "looking-for",
    difficulty: "B1",
    en: { question: "What are you looking for?", answer: "I'm looking for a quiet café." },
    fr: { question: "Que cherchez-vous ?", answer: "Je cherche un café calme." },
    es: { question: "¿Qué busca?", answer: "Busco un café tranquilo." },
  },
  {
    id: "been-up-to",
    difficulty: "B1",
    en: { question: "What have you been up to?", answer: "I've been busy with a new project." },
    fr: { question: "Tu as fait quoi ces derniers temps ?", answer: "J'ai été pris par un nouveau projet." },
    es: { question: "¿Qué has andado haciendo?", answer: "He estado liado con un proyecto nuevo." },
  },
  {
    id: "what-recommend",
    difficulty: "B1",
    en: { question: "What would you recommend?", answer: "I'd go to the place around the corner." },
    fr: { question: "Vous recommanderiez quoi ?", answer: "J'irais à l'endroit au coin de la rue." },
    es: { question: "¿Qué me recomienda?", answer: "Yo iría al sitio de la esquina." },
  },
  {
    id: "what-can-get",
    difficulty: "A1",
    en: { question: "What can I get you?", answer: "I'll have a sparkling water, please." },
    fr: { question: "Qu'est-ce que je vous sers ?", answer: "Je vais prendre une eau gazeuse, s'il vous plaît." },
    es: { question: "¿Qué le pongo?", answer: "Un agua con gas, por favor." },
  },
  {
    id: "table-for",
    difficulty: "A1",
    en: { question: "Table for how many?", answer: "For two, please." },
    fr: { question: "C'est pour combien ?", answer: "Pour deux, s'il vous plaît." },
    es: { question: "¿Mesa para cuántos?", answer: "Para dos, por favor." },
  },
  {
    id: "phone-number",
    difficulty: "A1",
    en: { question: "What's your phone number?", answer: "It's six seven eight, four five one two." },
    fr: { question: "C'est quoi ton numéro ?", answer: "C'est le six sept huit, quatre cinq un deux." },
    es: { question: "¿Cuál es tu número?", answer: "El seis siete ocho, cuatro cinco uno dos." },
  },
  {
    id: "when-meet",
    difficulty: "A1",
    en: { question: "When shall we meet?", answer: "How about tomorrow at six?" },
    fr: { question: "On se voit quand ?", answer: "Demain à six heures, ça te va ?" },
    es: { question: "¿Cuándo nos vemos?", answer: "¿Mañana a las seis te va bien?" },
  },
  {
    id: "where-meet",
    difficulty: "A1",
    en: { question: "Where shall we meet?", answer: "Let's meet in front of the café." },
    fr: { question: "On se retrouve où ?", answer: "Devant le café." },
    es: { question: "¿Dónde quedamos?", answer: "Delante del café." },
  },
  {
    id: "whose-this",
    difficulty: "A1",
    en: { question: "Whose is this?", answer: "It's mine." },
    fr: { question: "C'est à qui, ça ?", answer: "C'est à moi." },
    es: { question: "¿De quién es esto?", answer: "Es mío." },
  },
  {
    id: "how-spell",
    difficulty: "A1",
    en: { question: "How do you spell that?", answer: "A-N-A." },
    fr: { question: "Ça s'écrit comment ?", answer: "A-N-A." },
    es: { question: "¿Cómo se escribe?", answer: "A-N-A." },
  },
  {
    id: "when-free",
    difficulty: "A1",
    en: { question: "When are you free?", answer: "I'm free on Thursday evening." },
    fr: { question: "T'es libre quand ?", answer: "Je suis libre jeudi soir." },
    es: { question: "¿Cuándo estás libre?", answer: "El jueves por la tarde." },
  },
  {
    id: "what-think",
    difficulty: "A2",
    en: { question: "What do you think?", answer: "I think it's a good idea." },
    fr: { question: "T'en penses quoi ?", answer: "Je trouve que c'est une bonne idée." },
    es: { question: "¿Tú qué opinas?", answer: "Me parece una buena idea." },
  },
  {
    id: "plans-tonight",
    difficulty: "A2",
    en: { question: "What are you doing tonight?", answer: "I'm staying in." },
    fr: { question: "Tu fais quoi ce soir ?", answer: "Je reste à la maison." },
    es: { question: "¿Qué haces esta noche?", answer: "Me quedo en casa." },
  },
  {
    id: "what-mean",
    difficulty: "A2",
    en: { question: "What does that mean?", answer: "It means 'see you later'." },
    fr: { question: "Ça veut dire quoi ?", answer: "Ça veut dire « à plus tard »." },
    es: { question: "¿Qué significa eso?", answer: "Significa 'hasta luego'." },
  },
  {
    id: "leave-message",
    difficulty: "A2",
    en: { question: "Would you like to leave a message?", answer: "Yes, could you tell her I'll call later?" },
    fr: { question: "Vous voulez laisser un message ?", answer: "Oui, vous pouvez lui dire que je rappellerai plus tard ?" },
    es: { question: "¿Quiere dejar un recado?", answer: "Sí, ¿le puede decir que llamaré más tarde?" },
  },
  {
    id: "what-film",
    difficulty: "A2",
    en: { question: "What film shall we watch?", answer: "Let's watch a comedy." },
    fr: { question: "On regarde quoi ?", answer: "Une comédie, si tu veux." },
    es: { question: "¿Qué película vemos?", answer: "Una comedia, si te parece." },
  },
  {
    id: "next-holiday",
    difficulty: "A2",
    en: { question: "Where are you going on holiday?", answer: "We're going to the coast." },
    fr: { question: "Tu pars où en vacances ?", answer: "On va à la mer." },
    es: { question: "¿Adónde te vas de vacaciones?", answer: "Nos vamos a la costa." },
  },
  {
    id: "whats-wrong",
    difficulty: "A2",
    en: { question: "What's wrong?", answer: "I've got a bit of a headache." },
    fr: { question: "Qu'est-ce qu'il y a ?", answer: "J'ai un peu mal à la tête." },
    es: { question: "¿Qué te pasa?", answer: "Me duele un poco la cabeza." },
  },
  {
    id: "how-pay",
    difficulty: "A2",
    en: { question: "How would you like to pay?", answer: "By card, please." },
    fr: { question: "Vous réglez comment ?", answer: "Par carte, s'il vous plaît." },
    es: { question: "¿Cómo va a pagar?", answer: "Con tarjeta, por favor." },
  },
  {
    id: "how-know",
    difficulty: "B2",
    en: { question: "How do you know each other?", answer: "We used to work together, though we don't see much of each other now." },
    fr: { question: "Comment vous vous connaissez ?", answer: "On a travaillé ensemble, même si on se voit peu maintenant." },
    es: { question: "¿Cómo os conocéis?", answer: "Trabajamos juntos, aunque ahora nos vemos poco." },
  },
  {
    id: "feel-about",
    difficulty: "B2",
    en: { question: "How do you feel about that?", answer: "I'm still of two minds; I can see the case either way." },
    fr: { question: "Qu'est-ce que tu en dis ?", answer: "Je suis encore partagé ; je vois les deux côtés." },
    es: { question: "¿Qué te parece eso?", answer: "Aún estoy indeciso; veo las dos caras." },
  },
  {
    id: "catch-up",
    difficulty: "B2",
    en: { question: "When can we catch up?", answer: "How about a coffee next week, if you can spare three-quarters of an hour?" },
    fr: { question: "On peut se voir un de ces jours ?", answer: "Un café la semaine prochaine, si tu peux libérer trois quarts d'heure ?" },
    es: { question: "¿Cuándo podemos vernos un rato?", answer: "¿Un café la semana que viene, si puedes sacar tres cuartos de hora?" },
  },
  {
    id: "long-known",
    difficulty: "B1",
    en: { question: "How long have you known each other?", answer: "Since school." },
    fr: { question: "Vous vous connaissez depuis longtemps ?", answer: "Depuis l'école." },
    es: { question: "¿Cuánto tiempo os conocéis?", answer: "Desde el colegio." },
  },
  {
    id: "who-invited",
    difficulty: "B1",
    en: { question: "Who invited you?", answer: "A friend from work." },
    fr: { question: "C'est qui qui t'a invité ?", answer: "Un copain du boulot." },
    es: { question: "¿Quién te invitó?", answer: "Un amigo del trabajo." },
  },
  {
    id: "why-leave-early",
    difficulty: "B1",
    en: { question: "Why did you leave so early?", answer: "I had to get up early today." },
    fr: { question: "Pourquoi t'es parti si tôt ?", answer: "Je devais me lever tôt aujourd'hui." },
    es: { question: "¿Por qué te fuiste tan pronto?", answer: "Tenía que madrugar hoy." },
  },
  {
    id: "what-made-change",
    difficulty: "B2",
    en: { question: "What made you change your mind?", answer: "I slept on it, and the first version no longer held." },
    fr: { question: "Qu'est-ce qui t'a fait changer d'avis ?", answer: "J'ai dormi là-dessus, et la première version ne tenait plus." },
    es: { question: "¿Qué te hizo cambiar de opinión?", answer: "Lo dejé para pensarlo, y la primera versión ya no se sostenía." },
  },
  {
    id: "how-work-going",
    difficulty: "B1",
    en: { question: "How's it going at work?", answer: "It's busy, but I'm enjoying it." },
    fr: { question: "Ça se passe comment au boulot ?", answer: "C'est chargé, mais ça me plaît." },
    es: { question: "¿Qué tal el trabajo?", answer: "Hay mucho, pero me está gustando." },
  },
];

export const openPhraseSets: readonly OpenPhraseSet[] = [
  ...openPhraseSetsBase,
  ...openC2ExtraSets,
  ...openC2MoreSets,
  ...openC1MoreSets,
  ...openB2MoreSets,
];

export const OPEN_PHRASE_SET_COUNT = openPhraseSets.length;

export function expandOpenPhraseSets(language: "en" | "fr"): VocabularyItem[] {
  const prefix = language === "fr" ? "fr-" : "";
  return openPhraseSets.flatMap((set) =>
    OPEN_ROLES.map(({ category, field, prefix: role }) => ({
      id: `${prefix}${role}-${set.id}`,
      category,
      term: set[language][field],
      translation: set.es[field],
      difficulty: set.difficulty,
      tags: [`set:${set.id}`, "kind:open", "skill:speaking"],
    })),
  );
}

export { SCHOOL_NOTICE_COUNT, expandSchoolNoticeSets, schoolNoticeSets } from "./phraseSetsSchool";
