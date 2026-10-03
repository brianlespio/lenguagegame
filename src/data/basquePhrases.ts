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
      id: `eu-question-${id}`,
      category: "questions",
      term: question,
      translation: esQuestion,
      difficulty,
      tags: [...tags, "skill:listening"],
    },
    {
      id: `eu-positive-${id}`,
      category: "positiveAnswers",
      term: positive,
      translation: esPositive,
      difficulty,
      tags: [...tags, "skill:speaking"],
    },
    {
      id: `eu-negative-${id}`,
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
      id: `eu-open-question-${id}`,
      category: "openQuestions",
      term: question,
      translation: esQuestion,
      difficulty,
      tags,
    },
    {
      id: `eu-open-answer-${id}`,
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
      id: `eu-tech-question-${id}`,
      category: "techQuestions",
      term: question,
      translation: esQuestion,
      difficulty,
      tags,
    },
    {
      id: `eu-tech-answer-${id}`,
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
    id: `eu-school-${id}`,
    category: "schoolNotices",
    term,
    translation,
    difficulty,
    tags: [`set:${id}`, "domain:school", "skill:reading"],
  };
}

export const basquePhrases: VocabularyItem[] = [
  ...polar("kafe", "A1", "Kaferik nahi duzu?", "Bai, mesedez.", "Ez, eskerrik asko.", "¿Quieres un café?", "Sí, por favor.", "No, gracias."),
  ...polar("ur", "A1", "Urik nahi duzu?", "Bai, pixka bat.", "Orain ez, eskerrik asko.", "¿Quieres agua?", "Sí, un poco.", "Ahora no, gracias."),
  ...polar("gose", "A1", "Gose zara?", "Bai, ogi pixka bat ondo etorriko litzaidake.", "Oraindik ez.", "¿Tienes hambre?", "Sí, un trozo de pan me vendría bien.", "Todavía no."),
  ...polar("egarri", "A1", "Egarri zara?", "Bai, egarri naiz.", "Ez, oraintxe edan dut.", "¿Tienes sed?", "Sí, tengo sed.", "No, acabo de beber."),
  ...polar("neke", "A1", "Nekatuta zaude?", "Bai, nekaturik nago.", "Ez, oraindik indar pixka bat dut.", "¿Estás cansado?", "Sí, estoy agotado.", "No, todavía me queda algo de fuerza."),
  ...polar("ulertu", "A1", "Ulertzen duzu?", "Bai, orain ikusten dut.", "Ez, esan berriz, poliki.", "¿Lo entiendes?", "Sí, ahora lo veo.", "No, dilo otra vez, despacio."),
  ...polar("lagundu", "A1", "Lagun nazakezu?", "Bai, itxaron une batez.", "Orain ezin dut, barkatu.", "¿Me puedes ayudar?", "Sí, espera un momento.", "Ahora no puedo, perdona."),
  ...polar("etorri", "A1", "Gurekin zatoz?", "Bai, berokia hartzen dut.", "Gaur ezin dut.", "¿Vienes con nosotros?", "Sí, cojo el abrigo.", "Hoy no puedo."),
  ...polar("ordu", "A2", "Badakizu zer ordu den?", "Bai, hirurak eta bost.", "Ez dut erlojurik.", "¿Sabes qué hora es?", "Sí, las tres y cinco.", "No llevo reloj."),
  ...polar("leku", "A2", "Lekurik badago?", "Bai, hemen atzean.", "Beteta dago.", "¿Queda sitio?", "Sí, aquí detrás.", "Está lleno."),
  ...polar("berandu", "A2", "Berandu nator?", "Pixka bat, baina ez da ezer.", "Ez, garaiz zatoz.", "¿Llego tarde?", "Un poco, pero no pasa nada.", "No, llegas a tiempo."),
  ...polar("hotz", "A2", "Hotzik baduzu?", "Bai, itxi leihoa une batez.", "Ez, honela ondo nago.", "¿Tienes frío?", "Sí, cierra la ventana un momento.", "No, así estoy bien."),
  ...polar("moztu", "B1", "Hitza moztu dizut?", "Bai, amaitu esaldia.", "Ez, amaituta nuen.", "¿Te he cortado la palabra?", "Sí, termina la frase.", "No, ya había terminado."),
  ...polar("txantxa", "B1", "Txantxetan esan duzu?", "Bai, ez ezazu hitzez hitz hartu.", "Ez, serio esan dut.", "¿Lo has dicho en broma?", "Sí, no te lo tomes al pie de la letra.", "No, lo he dicho en serio."),
  ...polar("azaldu", "B1", "Ongi azaldu naiz?", "Bai, orain puntuak ikusten dira.", "Amaiera ihes egiten dit oraindik.", "¿Me he explicado bien?", "Sí, ahora se ven los puntos.", "El final todavía se me escapa."),
  ...polar("hari", "B2", "Haria galdu dugu?", "Bai, gaiaz kanpo gaude.", "Ez, oraindik harira goaz.", "¿Hemos perdido el hilo?", "Sí, estamos fuera del tema.", "No, aún vamos al grano."),
  ...polar("buelta", "B2", "Gehiegi biraka ari zara?", "Bai, jasan dezakeena baino gehiago kargatzen diot.", "Ez, irakurketa hori hor dago.", "¿Le das demasiadas vueltas?", "Sí, le cargo más de lo que puede sostener.", "No, esa lectura está ahí."),
  ...polar("itxura", "C1", "Ondo geratzeko esaten duzu?", "Bai, itxura babesten dut funtsa baino gehiago.", "Ez, oraindik funtsa defendatzen dut.", "¿Lo dices para quedar bien?", "Sí, protejo la apariencia más que el fondo.", "No, todavía defiendo el fondo."),
  ...polar("eskubide", "C1", "Eskubide hori ukaezina da?", "Bai, aldeek ezin dute albo batera utzi.", "Ez, itun arrunta da eta aldeek beste zerbait hitzartu dezakete.", "¿Ese derecho es irrenunciable?", "Sí, las partes no pueden dejarlo de lado.", "No, es un tratado ordinario y las partes pueden pactar otra cosa."),
  ...polar("salbuespen", "C2", "Salbuespenak araua bere horretan uzten du?", "Bai, arauak bere horretan jarraitzen du.", "Ez, salbuespenak araua hustu egiten du.", "¿La excepción deja la norma en pie?", "Sí, la norma sigue en pie.", "No, la excepción vacía la norma."),
  ...polar("aurrekari", "C2", "Aurrekari hau loteslea da guretzat?", "Bai, epai-doktrina horri jarraitu behar diogu.", "Ez, beste auzitegi baten ebazpena da.", "¿Este precedente nos vincula?", "Sí, tenemos que seguir esa doctrina jurisprudencial.", "No, es una resolución de otro tribunal."),
  ...polar("froga", "B2", "Froga nahikoa da?", "Bai, gertaera horrekin eusten da.", "Ez, beste datu bat behar da.", "¿La prueba es suficiente?", "Sí, se sostiene con ese hecho.", "No, hace falta otro dato."),
  ...polar("epe", "B1", "Epea nahikoa da?", "Bai, astebete geratzen da.", "Ez, bihar amaitzen da.", "¿El plazo es suficiente?", "Sí, queda una semana.", "No, termina mañana."),
  ...polar("baietza", "A2", "Ados zaude?", "Bai, horrela utziko dugu.", "Ez, beste modu bat nahi dut.", "¿Estás de acuerdo?", "Sí, lo dejamos así.", "No, quiero otra forma."),
  ...polar("ate", "A1", "Atea itxita dago?", "Bai, giltza barruan dago.", "Ez, zabalik dago.", "¿La puerta está cerrada?", "Sí, la llave está dentro.", "No, está abierta."),
  ...polar("euri", "A1", "Euria ari du?", "Bai, hartu aterkia.", "Ez, eguzkia dago.", "¿Está lloviendo?", "Sí, coge el paraguas.", "No, hace sol."),
  ...polar("izen", "A2", "Zure izena da?", "Bai, horixe da.", "Ez, beste bat da.", "¿Es tu nombre?", "Sí, ese es.", "No, es otro."),
  ...polar("prezio", "B1", "Prezioa ona da?", "Bai, merke dago.", "Ez, garestiegia da.", "¿El precio es bueno?", "Sí, está barato.", "No, es demasiado caro."),

  ...open("moduz", "A1", "Zer moduz zaude?", "Ondo, eskerrik asko. Eta zu?", "¿Qué tal estás?", "Bien, gracias. ¿Y tú?"),
  ...open("bizi", "A1", "Non bizi zara?", "Hemen bizi naiz, hirian.", "¿Dónde vives?", "Vivo aquí, en la ciudad."),
  ...open("lanera", "A2", "Nola joaten zara lanera?", "Oinez, hogei minutuan.", "¿Cómo vas al trabajo?", "Andando, en veinte minutos."),
  ...open("zabiltza", "A2", "Zertan zabiltza?", "Txosten bat idazten.", "¿En qué andas?", "Escribiendo un informe."),
  ...open("berandu-zergatik", "A2", "Zergatik etorri zara berandu?", "Trena atzeratu egin da.", "¿Por qué has llegado tarde?", "El tren se ha retrasado."),
  ...open("erabaki", "B1", "Nola ikusten duzu erabakia?", "Arrazoizkoa da, baina epea estua da.", "¿Cómo ves la decisión?", "Es razonable, pero el plazo es justo."),
  ...open("testu", "B1", "Zer aldatuko zenuke testuan?", "Azken paragrafoa: ondorioa lauso geratzen da.", "¿Qué cambiarías del texto?", "El último párrafo: la conclusión queda difusa."),
  ...open("iritzi", "B1", "Zein da zure iritzia?", "Alde nago, frogak nahikoak direlako.", "¿Cuál es tu opinión?", "Estoy a favor, porque las pruebas bastan."),
  ...open("horrekin", "B2", "Zer esan nahi duzu horrekin?", "Epea ez dela nahikoa.", "¿Qué quieres decir con eso?", "Que el plazo no es suficiente."),
  ...open("justifikatu", "B2", "Nola justifikatzen duzu aukera?", "Datuekin, ez asmoarekin.", "¿Cómo justificas la opción?", "Con los datos, no con la intención."),
  ...open("ebazpen", "C1", "Zer falta da ebazpen honetan?", "Auziaren funtsari buruzko arrazoibidea.", "¿Qué falta en esta resolución?", "El razonamiento sobre el fondo del asunto."),
  ...open("arrisku", "C1", "Non dago arriskua?", "Salbuespena arau bihurtzean.", "¿Dónde está el riesgo?", "En que la excepción se vuelva norma."),
  ...open("bihar", "B1", "Zer egingo zenuke bihar?", "Lehenik froga berriro kalkulatu.", "¿Qué harías mañana?", "Primero volver a calcular la prueba."),
  ...open("nori", "C1", "Nori dagokio erabakia?", "Eskumena duen organoari.", "¿A quién corresponde la decisión?", "Al órgano que tiene la competencia."),
  ...open("nahikoa", "C2", "Zergatik ez da nahikoa?", "Aurrekaria ez delako gure auzitegiarena.", "¿Por qué no basta?", "Porque el precedente no es de nuestro tribunal."),
  ...open("labur", "C2", "Nola laburbilduko zenuke?", "Eskubidea hor dago, eta muga proportzionala izan behar da.", "¿Cómo lo resumirías?", "El derecho está ahí, y el límite tiene que ser proporcional."),

  ...tech("fitxategi", "A2", "Zer da fitxategi hau?", "Datuen taula bat da: zutabe batean izena eta bestean adina.", "¿Qué es este archivo?", "Es una tabla de datos: en una columna el nombre y en la otra la edad."),
  ...tech("gorde", "A2", "Nola gordetzen duzu aldaketa?", "Gorde botoia sakatu eta izen berria eman.", "¿Cómo guardas el cambio?", "Pulsa el botón Guardar y pon un nombre nuevo."),
  ...tech("egiaztatu", "B1", "Zer egiaztatu behar da kalkulua bidali aurretik?", "Unitateak, eta emaitza bera beste bide batetik.", "¿Qué hay que comprobar antes de enviar el cálculo?", "Las unidades, y el mismo resultado por otro camino."),
  ...tech("errore", "B1", "Zer esan nahi du errore honek?", "Sarrera hutsik dagoela eta ezin dela zatitu.", "¿Qué significa este error?", "Que la entrada está vacía y que no se puede dividir."),
  ...tech("azaldu", "B1", "Nola azaltzen duzu emaitza?", "Lehenik datua, gero eragiketa, azkenik zenbakia.", "¿Cómo explicas el resultado?", "Primero el dato, luego la operación, al final el número."),
  ...tech("kopia", "B2", "Non gordetzen da kopiaren izena?", "Fitxategiaren izenburuan, ez karpetaren izenean.", "¿Dónde se guarda el nombre de la copia?", "En el título del archivo, no en el nombre de la carpeta."),
  ...tech("zero", "B2", "Zer gertatzen da zatitzailea zero bada?", "Eragiketak ez du emaitzarik ematen.", "¿Qué pasa si el divisor es cero?", "La operación no da resultado."),
  ...tech("zutabe", "B2", "Nola bereizten dituzu bi zutabeak?", "Batek nor den esaten du, besteak zenbat urte dituen.", "¿Cómo distingues las dos columnas?", "Una dice quién es, la otra cuántos años tiene."),
  ...tech("goiburu", "C1", "Zer idatzi behar da goiburuan?", "Data, egilea eta zer kalkulatzen den.", "¿Qué hay que escribir en la cabecera?", "La fecha, el autor y qué se calcula."),
  ...tech("oker", "C1", "Nola jakin dezaket emaitza okerra dela?", "Beste prozedura batek beste zenbaki bat ematen badu.", "¿Cómo sé que el resultado es erróneo?", "Si otro procedimiento da otro número."),
  ...tech("bikoiztu", "C1", "Zer egin bikoiztutako izen batekin?", "Bigarrena ez da beste pertsona bat: izen bera da.", "¿Qué hacer con un nombre duplicado?", "El segundo no es otra persona: es el mismo nombre."),
  ...tech("errenkada", "C2", "Nola kontatzen dituzu errenkadak?", "Baldintza betetzen dutenak bakarrik, ez taula osoa.", "¿Cómo cuentas las filas?", "Solo las que cumplen la condición, no toda la tabla."),

  notice("bihar", "A1", "Bihar ez da klaserik izango.", "Mañana no hay clase."),
  notice("liburutegi", "A1", "Liburutegia bederatzietan irekiko da.", "La biblioteca abrirá a las nueve."),
  notice("azterketa", "A2", "Azterketa ostegunean da, hamaretan.", "El examen es el jueves, a las diez."),
  notice("koaderno", "A1", "Ekarri koadernoa eta arkatza.", "Traed el cuaderno y el lápiz."),
  notice("jantoki", "A2", "Jantokia 13:30ean itxiko da.", "El comedor cierra a las 13:30."),
  notice("guraso", "A2", "Gurasoen bilera astelehenean da.", "La reunión de padres es el lunes."),
  notice("patio", "A2", "Patioan ez da baloirik sartuko.", "En el patio no se entra con balón."),
  notice("etxeko", "A2", "Etxeko lana ostiralerako da.", "Los deberes son para el viernes."),
  notice("ate", "B1", "Ate nagusia zortzietan ixten da.", "La puerta principal cierra a las ocho."),
  notice("mediku", "B1", "Medikuaren bisita 2. gelan izango da.", "La visita del médico será en el aula 2."),
  notice("ekain", "B1", "Ekainaren 3an ez da jantokirik egongo.", "El 3 de junio no habrá comedor."),
  notice("liburu", "B1", "Ikasleek liburua etxean utzi behar dute.", "Los alumnos tienen que dejar el libro en casa."),
  notice("pasillo", "B2", "Korrika egitea pasilloan debekatuta dago.", "Correr por el pasillo está prohibido."),
  notice("garaiz", "B1", "Bilerara garaiz etorri.", "Venid a la reunión a tiempo."),
  notice("euria", "B2", "Euria egiten badu, kirola aretoan izango da.", "Si llueve, el deporte será en el pabellón."),
  notice("mugikor", "B2", "Azterketan ezin da mugikorrik erabili.", "En el examen no se puede usar el móvil."),
];
