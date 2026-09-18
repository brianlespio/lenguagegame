import type { SchoolPhraseCategory, StudyCefrLevel, VocabularyItem } from "../types/vocabulary";
import { schoolB2MoreSets } from "./phraseSetsSchoolB2More";
import { schoolC1MoreSets } from "./phraseSetsSchoolC1More";
import { schoolC2MoreSets } from "./phraseSetsSchoolC2More";

interface SchoolNoticeSet {
  id: string;
  difficulty: StudyCefrLevel;
  en: string;
  fr: string;
  es: string;
}

export const schoolNoticeSets: readonly SchoolNoticeSet[] = [
  // A1 — 12
  {
    id: "parent-meeting-tuesday",
    difficulty: "A1",
    en: "The parent-teacher meeting is on Tuesday.",
    fr: "La réunion parents-professeurs a lieu mardi.",
    es: "La reunión de padres es el martes.",
  },
  {
    id: "be-punctual",
    difficulty: "A1",
    en: "Please be on time.",
    fr: "Nous vous demandons d'être ponctuels.",
    es: "Les pedimos que sean puntuales.",
  },
  {
    id: "no-class-tomorrow",
    difficulty: "A1",
    en: "Please remember there is no school tomorrow.",
    fr: "Nous vous rappelons qu'il n'y aura pas de cours demain.",
    es: "Recuerden que mañana no hay clase.",
  },
  {
    id: "holidays-fifteen-days",
    difficulty: "A1",
    en: "The school holidays start in fifteen days.",
    fr: "Les vacances scolaires commencent dans quinze jours.",
    es: "Las vacaciones empiezan en quince días.",
  },
  {
    id: "trip-next-week",
    difficulty: "A1",
    en: "Please remember the school trip is next week.",
    fr: "Nous vous rappelons que la sortie scolaire a lieu la semaine prochaine.",
    es: "Recuerden que la semana que viene hay una excursión.",
  },
  {
    id: "dont-forget-homework",
    difficulty: "A1",
    en: "Don't forget the homework for tomorrow.",
    fr: "N'oubliez pas les devoirs pour demain.",
    es: "No olviden los deberes para mañana.",
  },
  {
    id: "closed-friday",
    difficulty: "A1",
    en: "The school will be closed on Friday.",
    fr: "L'établissement sera fermé vendredi.",
    es: "El centro permanecerá cerrado el viernes.",
  },
  {
    id: "starts-eight-thirty",
    difficulty: "A1",
    en: "Lessons start at half past eight.",
    fr: "Les cours commencent à 8 h 30.",
    es: "Las clases empiezan a las 8:30.",
  },
  {
    id: "sign-the-note",
    difficulty: "A1",
    en: "Please sign the note in the home-school book.",
    fr: "Merci de signer le mot dans le carnet.",
    es: "Firmen la nota en la agenda.",
  },
  {
    id: "bring-snack",
    difficulty: "A1",
    en: "Please remember to send a snack.",
    fr: "Pensez à envoyer un goûter.",
    es: "Recuerden mandar una merienda.",
  },
  {
    id: "pe-kit-tomorrow",
    difficulty: "A1",
    en: "Tomorrow, don't forget the PE kit.",
    fr: "Demain, n'oubliez pas la tenue de sport.",
    es: "Mañana no olviden la ropa de educación física.",
  },
  {
    id: "week-recap",
    difficulty: "A1",
    en: "Here is a short summary of the week.",
    fr: "Voici un petit résumé de la semaine.",
    es: "Aquí va un breve resumen de la semana.",
  },
  // A2 — 16
  {
    id: "check-homework",
    difficulty: "A2",
    en: "Please check that the homework is done.",
    fr: "Merci de vérifier que les devoirs sont faits.",
    es: "Revisen que los deberes estén hechos.",
  },
  {
    id: "help-at-home",
    difficulty: "A2",
    en: "It is important that your child gets help at home.",
    fr: "Il est important que votre enfant soit accompagné à la maison.",
    es: "Es importante que su hijo tenga ayuda en casa.",
  },
  {
    id: "justify-absence",
    difficulty: "A2",
    en: "Every absence must be explained in writing.",
    fr: "Toute absence doit être justifiée par écrit.",
    es: "Toda falta debe justificarse por escrito.",
  },
  {
    id: "please-avoid-lateness",
    difficulty: "A2",
    en: "Please make sure your child arrives on time in the morning.",
    fr: "Merci de veiller à la ponctualité le matin.",
    es: "Procuren que llegue puntual por la mañana.",
  },
  {
    id: "canteen-tomorrow",
    difficulty: "A2",
    en: "Your child is having school lunch tomorrow.",
    fr: "Votre enfant mange à la cantine demain.",
    es: "Su hijo come en el comedor mañana.",
  },
  {
    id: "bring-supplies",
    difficulty: "A2",
    en: "Please check that school supplies are complete.",
    fr: "Merci de vérifier les fournitures scolaires.",
    es: "Revisen que traiga el material escolar.",
  },
  {
    id: "timetable-changed",
    difficulty: "A2",
    en: "The timetable is different this week.",
    fr: "L'emploi du temps est modifié cette semaine.",
    es: "El horario cambia esta semana.",
  },
  {
    id: "return-permission",
    difficulty: "A2",
    en: "Please return the signed permission slip.",
    fr: "Merci de ramener l'autorisation parentale signée.",
    es: "Devuelvan la autorización firmada.",
  },
  {
    id: "class-photo-friday",
    difficulty: "A2",
    en: "The class photo will be taken on Friday.",
    fr: "La photo de classe aura lieu vendredi.",
    es: "La foto de clase será el viernes.",
  },
  {
    id: "after-school",
    difficulty: "A2",
    en: "After-school care is open until 6 p.m.",
    fr: "L'accueil périscolaire est ouvert jusqu'à 18 h.",
    es: "El extraescolar está abierto hasta las 18:00.",
  },
  {
    id: "wednesday-early",
    difficulty: "A2",
    en: "On Wednesday, lessons finish at half past eleven.",
    fr: "Mercredi, les cours se terminent à 11 h 30.",
    es: "El miércoles las clases terminan a las 11:30.",
  },
  {
    id: "home-reading",
    difficulty: "A2",
    en: "Please have your child read a little each evening.",
    fr: "Merci de faire lire votre enfant un peu chaque soir.",
    es: "Procuren que lea un rato cada noche.",
  },
  {
    id: "no-phones",
    difficulty: "A2",
    en: "Mobile phones are not allowed in class.",
    fr: "Les téléphones portables sont interdits en classe.",
    es: "Los móviles están prohibidos en clase.",
  },
  {
    id: "name-on-things",
    difficulty: "A2",
    en: "Please put your child's name on their belongings.",
    fr: "Merci de marquer les affaires au nom de l'enfant.",
    es: "Marquen las cosas con el nombre del niño.",
  },
  {
    id: "report-next-week",
    difficulty: "A2",
    en: "Report cards will be given out next week.",
    fr: "Les bulletins seront remis la semaine prochaine.",
    es: "Los boletines se entregarán la semana que viene.",
  },
  {
    id: "remind-water",
    difficulty: "A2",
    en: "Please send a water bottle, especially if it is hot.",
    fr: "Pensez à une bouteille d'eau, surtout s'il fait chaud.",
    es: "Manden una botella de agua, sobre todo si hace calor.",
  },
  // B1 — 12
  {
    id: "appointments-parents",
    difficulty: "B1",
    en: "Parent-teacher appointments are by sign-up only.",
    fr: "Les rendez-vous parents-professeurs se prennent sur inscription.",
    es: "Las tutorías se piden con inscripción previa.",
  },
  {
    id: "class-council",
    difficulty: "B1",
    en: "The class review meeting is on Thursday afternoon.",
    fr: "Le conseil de classe a lieu jeudi après-midi.",
    es: "La junta de evaluación es el jueves por la tarde.",
  },
  {
    id: "medical-certificate",
    difficulty: "B1",
    en: "A doctor's note is required after three days away.",
    fr: "Un certificat médical est exigé après trois jours d'absence.",
    es: "Hace falta un justificante médico después de tres días de falta.",
  },
  {
    id: "bus-change",
    difficulty: "B1",
    en: "The school bus will leave at 4:15 p.m. as an exception.",
    fr: "Le ramassage scolaire partira exceptionnellement à 16 h 15.",
    es: "El autobús escolar saldrá, de forma excepcional, a las 16:15.",
  },
  {
    id: "strike-day",
    difficulty: "B1",
    en: "Because of industrial action, supervision will be limited tomorrow.",
    fr: "En raison d'un mouvement social, l'accueil est réduit demain.",
    es: "Por un paro, mañana el centro tendrá un servicio reducido.",
  },
  {
    id: "heat-protocol",
    difficulty: "B1",
    en: "In extreme heat, break times will be in the shade.",
    fr: "En cas de forte chaleur, les récréations auront lieu à l'ombre.",
    es: "Si hace mucho calor, el recreo será a la sombra.",
  },
  {
    id: "head-lice",
    difficulty: "B1",
    en: "Head lice have been reported in the class. Please check your child's hair.",
    fr: "Des poux ont été signalés dans la classe. Merci de vérifier les cheveux.",
    es: "Hay avisos de piojos en la clase. Revisen el pelo.",
  },
  {
    id: "missing-materials",
    difficulty: "B1",
    en: "Your child did not have the right equipment today.",
    fr: "Votre enfant n'avait pas son matériel aujourd'hui.",
    es: "Hoy su hijo no trajo el material.",
  },
  {
    id: "work-not-done",
    difficulty: "B1",
    en: "The assigned work was not handed in.",
    fr: "Le travail demandé n'a pas été rendu.",
    es: "No se ha entregado el trabajo pedido.",
  },
  {
    id: "holiday-work",
    difficulty: "B1",
    en: "There is holiday homework. Please make sure it gets done.",
    fr: "Un travail est demandé pour les vacances. Merci de le faire faire.",
    es: "Hay deberes para las vacaciones. Procuren que los haga.",
  },
  {
    id: "open-house",
    difficulty: "B1",
    en: "There is an open morning on Saturday.",
    fr: "Une porte ouverte est organisée samedi matin.",
    es: "El sábado por la mañana hay jornada de puertas abiertas.",
  },
  {
    id: "sign-liaison",
    difficulty: "B1",
    en: "Please check and sign the home-school book every evening.",
    fr: "Merci de consulter et de signer le carnet de liaison chaque soir.",
    es: "Revisen y firmen la agenda cada noche.",
  },
  // B2 — 4
  {
    id: "insurance-certificate",
    difficulty: "B2",
    en: "Proof of personal accident insurance must be provided before the trip can be confirmed.",
    fr: "Une attestation d'assurance extrascolaire doit être fournie avant confirmation de la sortie.",
    es: "Hay que entregar un seguro escolar antes de confirmar la excursión.",
  },
  {
    id: "progress-review",
    difficulty: "B2",
    en: "We would like to meet you to review your child's progress and agree the next steps.",
    fr: "Nous souhaitons vous rencontrer pour faire le point sur les progrès et convenir de la suite.",
    es: "Queremos verles para revisar los avances y acordar los siguientes pasos.",
  },
  {
    id: "polite-messages",
    difficulty: "B2",
    en: "Please write to the school courteously and outside teaching hours.",
    fr: "Merci d'adresser vos messages à l'école de manière courtoise et hors des heures de cours.",
    es: "Escriban al centro con respeto y fuera del horario lectivo.",
  },
  {
    id: "collect-report",
    difficulty: "B2",
    en: "Report cards are to be collected from the form tutor, not sent home with pupils.",
    fr: "Les bulletins sont à retirer auprès du professeur principal, et non remis aux élèves.",
    es: "Los boletines se recogen con el tutor, no se envían a casa con el alumnado.",
  },
  // C1 — 4
  {
    id: "written-consent",
    difficulty: "C1",
    en: "No school trip may proceed unless written parental consent has been received and placed on file.",
    fr: "Aucune sortie scolaire ne peut avoir lieu tant que l'autorisation parentale écrite n'a pas été reçue et versée au dossier.",
    es: "No puede realizarse ninguna excursión hasta que conste en el expediente la autorización parental por escrito.",
  },
  {
    id: "extra-support",
    difficulty: "C1",
    en: "Additional learning support is being offered; a meeting can be arranged to agree the measures with you.",
    fr: "Un accompagnement pédagogique complémentaire est proposé ; un rendez-vous peut être fixé pour en convenir avec vous.",
    es: "Se ofrece un refuerzo pedagógico adicional; se puede concertar una reunión para acordar las medidas.",
  },
  {
    id: "individualized-plan",
    difficulty: "C1",
    en: "A personal support plan can be drawn up and reviewed with you if the difficulties persist.",
    fr: "Un plan d'accompagnement personnalisé peut être établi et réexaminé avec vous si les difficultés persistent.",
    es: "Se puede elaborar un plan de apoyo individualizado y revisarlo con ustedes si las dificultades persisten.",
  },
  {
    id: "unsupervised-exit",
    difficulty: "C1",
    en: "Pupils for whom written permission is on file may leave the premises unaccompanied at the end of the day.",
    fr: "Les élèves pour lesquels une autorisation écrite figure au dossier peuvent quitter l'établissement seuls à la fin des cours.",
    es: "El alumnado con autorización escrita en el expediente puede salir solo del centro al terminar las clases.",
  },
  // C2 — 8
  {
    id: "discipline-board",
    difficulty: "C2",
    en: "Your child is summoned to appear before the disciplinary board; a reasoned decision will follow and may be appealed within the statutory time limit.",
    fr: "Votre enfant est convoqué devant le conseil de discipline ; une décision motivée interviendra et pourra être contestée dans le délai légal.",
    es: "Su hijo queda citado ante el consejo de disciplina; recaerá resolución motivada, recurrible en el plazo legal.",
  },
  {
    id: "gdpr-photos",
    difficulty: "C2",
    en: "Images of pupils will be processed only on the legal basis of your explicit, withdrawable consent; they will not be published without that basis.",
    fr: "Les images d'élèves ne seront traitées que sur le fondement de votre consentement explicite et révocable ; elles ne seront pas diffusées sans cette base légale.",
    es: "Las imágenes del alumnado se tratarán solo sobre la base de su consentimiento explícito y revocable; no se difundirán sin esa base jurídica.",
  },
  {
    id: "exam-accommodations",
    difficulty: "C2",
    en: "Exam accommodations (extra time, a separate room, or an assistant) may be requested for your child on documented medical or educational grounds.",
    fr: "Un aménagement d'épreuves (tiers temps, salle séparée ou assistant) peut être demandé pour votre enfant sur justificatif médical ou pédagogique.",
    es: "Se puede solicitar una adaptación de examen (tiempo extra, aula aparte o asistente) para su hijo con justificante médico o pedagógico.",
  },
  {
    id: "compulsory-schooling",
    difficulty: "C2",
    en: "Compulsory schooling remains a parental legal duty until the age of sixteen; unjustified absence may be referred to the education authority.",
    fr: "L'obligation scolaire demeure une obligation légale des responsables jusqu'à seize ans ; les absences injustifiées peuvent être signalées à l'autorité académique.",
    es: "La escolarización obligatoria sigue siendo un deber legal de los responsables hasta los dieciséis años; las faltas injustificadas pueden comunicarse a la autoridad educativa.",
  },
  {
    id: "governing-board-decision",
    difficulty: "C2",
    en: "The governing board has adopted this decision in a recorded deliberation; it is binding on the school unless set aside on review.",
    fr: "Le conseil d'administration a arrêté cette décision par délibération ; elle s'impose à l'établissement sauf annulation en recours.",
    es: "El consejo escolar ha adoptado esta decisión en deliberación; vincula al centro salvo que se anule en recurso.",
  },
  {
    id: "school-medical-exam",
    difficulty: "C2",
    en: "A school medical examination is compulsory; the findings remain confidential and are disclosed to the family only as required by law.",
    fr: "Une visite de médecine scolaire est obligatoire ; les constatations restent confidentielles et ne sont communiquées à la famille que dans les cas prévus par la loi.",
    es: "La revisión de medicina escolar es obligatoria; las conclusiones son confidenciales y solo se comunican a la familia en los casos previstos por ley.",
  },
  {
    id: "strike-minimum-service",
    difficulty: "C2",
    en: "If staff exercise the right to strike, a statutory minimum reception service will still be provided for the pupils who cannot be kept at home.",
    fr: "Si le personnel exerce son droit de grève, un service d'accueil minimum légal sera néanmoins assuré pour les élèves qui ne peuvent rester à domicile.",
    es: "Si el personal ejerce el derecho de huelga, se garantizará aun así el servicio mínimo legal de acogida para el alumnado que no pueda permanecer en casa.",
  },
  {
    id: "academic-inspection",
    difficulty: "C2",
    en: "The education inspectorate will conduct an evaluation of the school next week; staff and families may be asked to produce the documents it requires.",
    fr: "L'inspection académique procédera la semaine prochaine à une évaluation de l'établissement ; les personnels et les familles pourront être invités à produire les pièces demandées.",
    es: "La inspección educativa evaluará el centro la semana que viene; al personal y a las familias se les podrá pedir la documentación que requiera.",
  },
  ...schoolC2MoreSets,
  ...schoolC1MoreSets,
  ...schoolB2MoreSets,
];

export const SCHOOL_NOTICE_COUNT = schoolNoticeSets.length;

const SCHOOL_ROLE: { category: SchoolPhraseCategory; prefix: string } = {
  category: "schoolNotices",
  prefix: "school",
};

export function expandSchoolNoticeSets(language: "en" | "fr"): VocabularyItem[] {
  const prefix = language === "fr" ? "fr-" : "";
  return schoolNoticeSets.map((set) => ({
    id: `${prefix}${SCHOOL_ROLE.prefix}-${set.id}`,
    category: SCHOOL_ROLE.category,
    term: set[language],
    translation: set.es,
    difficulty: set.difficulty,
    tags: [`set:${set.id}`, "domain:school", "skill:reading"],
  }));
}
