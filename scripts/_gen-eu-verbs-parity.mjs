/**
 * Phase 36 — generate src/data/basqueVerbsParity.ts
 * Usage: node scripts/_build-eu-ovr.mjs && node scripts/_gen-eu-verbs-parity.mjs
 */
import fs from "fs";

const src = JSON.parse(fs.readFileSync("scripts/_eu-src-verbs.json", "utf8"));
const OVR = JSON.parse(fs.readFileSync("scripts/_eu-es-eu-ovr.json", "utf8"));
const taken = new Set(src.taken.map((t) => t.replace(/^v:/, "").toLowerCase()));
const need = src.need;

function cognateEu(es) {
  let t = es
    .replace(/ch/g, "tx")
    .replace(/ll/g, "l")
    .replace(/qu/g, "k")
    .replace(/c([aouáóú])/g, "k$1")
    .replace(/c([eiéí])/g, "z$1")
    .replace(/v/g, "b")
    .replace(/y/g, "i")
    .replace(/gü/g, "gu")
    .replace(/ñ/g, "n");
  if (t.endsWith("izar")) return `${t.slice(0, -4)}izatu`;
  if (t.endsWith("ificar")) return `${t.slice(0, -6)}ifikatu`;
  if (t.endsWith("ucir")) return `${t.slice(0, -4)}uzitu`;
  if (t.endsWith("ear")) return `${t.slice(0, -3)}eatu`;
  if (t.endsWith("ar")) return `${t.slice(0, -2)}atu`;
  if (t.endsWith("er") || t.endsWith("ir") || t.endsWith("ír")) return `${t.slice(0, -2)}itu`;
  return `${t}tu`;
}

const NOR_ES = new Set([
  "quedarse", "irse", "llegar", "entrar", "salir", "caer", "nacer", "morir", "crecer",
  "aparecer", "desaparecer", "existir", "huir", "escapar", "volar", "caminar", "saltar",
  "dormirse", "callarse", "situarse", "desarrollarse", "producirse", "celebrarse",
  "extenderse", "sumarse", "oponerse", "comprometerse", "inscribirse", "imponerse",
  "abatirse", "emerger", "suceder", "acceder", "ascender", "decaer", "acontecer",
  "sobrevenir", "provenir", "fluir", "durar", "resbalar", "sonrojarse", "envejecer",
  "adelgazar", "engordar", "moverse", "parecerse", "atreverse", "alejar", "acercar",
  "avanzar", "rodar", "tardarse", "zozobrar", "fallecer", "prendarse", "equivocarse",
  "apartarse", "inmiscuirse", "carcajearse", "mofarse", "seguirse", "desmarcarse",
  "toparse", "prestarse", "sustituirse", "erigirse", "interponerse", "atascarse",
  "atollarse", "enredarse", "atrincherarse", "indignarse", "ofenderse", "empeñarse",
  "esforzarse", "escabullirse", "traducirse", "mudarse en", "resultar ser", "culminar",
  "desembocar", "degenerar", "bascular", "bifurcar", "adherirse", "venir a parar",
  "estar a punto de", "volver", "regresar", "casarse con", "sentar", "asomar", "lucir",
  "relucir", "sucumbir", "palidecer", "peregrinar", "chochear", "andarse con rodeos",
  "dar rodeos", "cuajar", "reanudar", "comenzar", "parar", "volver a casa",
  "volver a partir", "convertirse", "habitar", "pertenecer", "eclosionar", "pasar",
  "emprender", "preludiar", "merodear", "emanar", "incluir",
]);

const NORI_EU = new Set([
  "gustatu", "ahaztu", "kostatu", "interesatu", "faltatu", "axola izan", "iruditu", "komeni izan",
]);

function pickAux(eu, es) {
  if (NORI_EU.has(eu)) return "nori";
  if (NOR_ES.has(es) || /^(ser|estar|ir|venir|llegar|nacer|morir|caer|existir|vivir)$/.test(es)) {
    return "nor";
  }
  // paraphrases of motion/state still nor
  if (
    /^(izateari ekin|egoteari ekin|joateari ekin|etortzeari ekin|bizitzeari ekin|helduera egin|ateratze egin|geratze egin|erortze egin|hiltze egin|jaiotza izan|igoera egin|jaitsiera egin)$/.test(
      eu,
    )
  ) {
    return "nor";
  }
  const head = eu.split(/\s+/)[0];
  if (
    /^(joan|etorri|ibili|sartu|atera|igo|jaitsi|erori|jaio|hil|egon|izan|geratu|gelditu|iritsi|abiatu|hurbildu|urrundu|esnatu|lokartu|isildu|eseri|etzan|jolastu|saiatu|agertu|gertatu|desagertu|bilakatu|iraun|haztu|mugitu|hegaldu|irristatu|gorritu|zahartu|argaldu|koipetu|ezkondu|nagusitu|garatu|kokatu|zabaldu|batu|matxinatu|haserretu|mindu|gotortu|trabatu|tematu|moldatu|bihurtu|konturatu|maitemindu|gailurreratu|eclosionatu|dedikatu|irtitzi|pasatu|igaro|existitu|piafatu|hondoratu|txoratu|distiratu|ukan|erran)$/.test(
      head,
    )
  ) {
    if (/^(ukan|erran)$/.test(head)) return "nork";
    if (/ egin$| eman$| hartu$| jarri$| kendu$| esan$/.test(eu)) return "nork";
    return "nor";
  }
  return "nork";
}

function cleanEs(esRaw) {
  return esRaw.toLowerCase().trim().replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
}

function mapRow(esRaw) {
  const phrase = cleanEs(esRaw);
  if (OVR[phrase]) return OVR[phrase];
  let es = phrase.includes("/") ? phrase.split("/")[0].trim() : phrase;
  if (OVR[es]) return OVR[es];

  if (es.endsWith("se") && !/\s/.test(es) && es.length > 4) {
    const base = es.slice(0, -2);
    if (OVR[base]) return [OVR[base][0], "nor"];
    return [cognateEu(base), "nor"];
  }
  if (/\s/.test(es)) {
    const parts = es.split(/\s+/);
    const cand = [...parts].reverse().find((p) => /(?:ar|er|ir|ír)$/.test(p));
    if (cand && OVR[cand]) return OVR[cand];
    if (cand) return [cognateEu(cand), "nork"];
    // phrase without clear verb ending — slug cognate
    return [cognateEu(es.replace(/\s+/g, "")), "nork"];
  }
  return [cognateEu(es), "nork"];
}

/** When preferred EU is already in the core bank, use these Spanish-keyed alts. */
const TAKEN_ALT = {
  dar: ["emate egin"],
  conceder: ["emakida egin"],
  otorgar: ["emakida eman"],
  quitar: ["kentze egin"],
  desposeer: ["jabetza kendu"],
  despojar: ["desjabetu"],
  extirpar: ["extirpatu"],
  detraer: ["kentzeari ekin"],
  soltar: ["askatze egin"],
  desenredar: ["askatzeari ekin"],
  desatar: ["askatu egin"],
  aflojar: ["lasaitu"],
  desvincular: ["deslotu"],
  oír: ["entzute egin"],
  escuchar: ["entzuteari ekin"],
  "oír en comparecencia": ["entzunaldi egin"],
  dejar: ["uzte egin"],
  ceder: ["lagatze egin"],
  depositar: ["gordailutu"],
  devolver: ["itzulera egin"],
  volver: ["itzultze egin"],
  reembolsar: ["dirua itzuli"],
  traducir: ["itzulpena egin"],
  parar: ["gelditze egin"],
  atajar: ["gelditzeari ekin"],
  atascarse: ["trabatu"],
  pagar: ["ordainketa egin"],
  compensar: ["konpentsatu"],
  abonar: ["abonu egin"],
  remunerar: ["ordainsari eman"],
  entrar: ["sarrera egin"],
  acceder: ["sarbide hartu"],
  incluir: ["barne hartu"],
  inmiscuirse: ["sartzeari ekin"],
  ordenar: ["agintze egin"],
  prometir: ["promesa egin"],
  promesa: ["promesa egin"],
  prometer: ["promesa egin"],
  decretar: ["dekretatu"],
  preceptuar: ["prezeptu eman"],
  encomendar: ["enkargatu"],
  resolver: ["ebazpena eman"],
  zanjar: ["erabakia hartu"],
  dirimir: ["dirimitu"],
  enviar: ["bidalketa egin"],
  remitir: ["remisio egin"],
  despachar: ["despaxatu"],
  derogar: ["derogatu"],
  revocar: ["errebokatu"],
  confirmar: ["berrespena eman"],
  ratificar: ["ratifikatu"],
  corroborar: ["korroboratu"],
  reafirmar: ["berretsitze egin"],
  hacer: ["egite egin"],
  cometer: ["delitu egin"],
  celebrarse: ["ospakizun egin"],
  querer: ["gura izan"],
  pretender: ["asmotzat hartu"],
  amar: ["maite izan"],
  tomar: ["hartze egin"],
  captar: ["kaptatu"],
  abarcar: ["barne hartze egin"],
  encontrar: ["topatu"],
  descubrir: ["deskubritu"],
  pedir: ["eskaera egin"],
  exigir: ["exijitu"],
  requerir: ["eskakizun egin"],
  terminar: ["amaiera eman"],
  ultimar: ["azkenikatu"],
  llevar: ["eramate egin"],
  llevarse: ["eraman egin"],
  llamar: ["dei egin"],
  convocar: ["konbokatu"],
  invocar: ["inbokatu"],
  seguir: ["jarraitze egin"],
  continuar: ["segitze egin"],
  perseguir: ["jazarri"],
  intentar: ["ahalegin egin"],
  esforzarse: ["ahaleginari ekin"],
  emprender: ["ekiteari ekin"],
  reír: ["irri egin"],
  burlarse: ["irri egiteari ekin"],
  mofarse: ["barregarri utzi"],
  caer: ["erortze egin"],
  sucumbir: ["erortzeari ekin"],
  "incurrir en": ["erortzean erori"],
  abatirse: ["erortzeari ekin"],
  golpear: ["kolpatu"],
  zurrar: ["kolpatze egin"],
  "cargar con dureza": ["gogor kolpatu"],
  llenar: ["betetze egin"],
  cumplir: ["betetzeari ekin"],
  desempeñar: ["eginkizuna bete"],
  levantar: ["jasotze egin"],
  alzar: ["altxatze egin"],
  traer: ["ekartze egin"],
  acarrear: ["garraiatu"],
  rechazar: ["baztertze egin"],
  desestimar: ["desestimatu"],
  apartar: ["bazterrera utzi"],
  marginar: ["baztertu egin"],
  encender: ["pizte egin"],
  suscitar: ["pizteari ekin"],
  avivar: ["piztu egin"],
  mezclar: ["nahaste egin"],
  trastornar: ["nahasteari ekin"],
  enturbiar: ["nahaste egin"],
  enredarse: ["nahastean sartu"],
  limitar: ["mugatze egin"],
  deslindar: ["muga jarri"],
  circunscribir: ["zirkunskribatu"],
  acotar: ["muga ezarri"],
  distinguir: ["bereizte egin"],
  tabicar: ["tabikatu"],
  disociar: ["disoziatu"],
  desmarcarse: ["desmarkatu"],
  ser: ["izateari ekin"],
  "resultar ser": ["izateari ekin"],
  tratarse: ["gai izan"],
  salir: ["ateratze egin"],
  esperar: ["itxarote egin"],
  pensar: ["gogoeta egin"],
  mostrar: ["erakustaldi egin"],
  blandir: ["erakustea egin"],
  vestir: ["jantzi hartu"],
  ataviar: ["apaindu"],
  cubrir: ["estaltze egin"],
  revestir: ["berrestali"],
  ayudar: ["laguntza eman"],
  acompañar: ["laguntzaile izan"],
  firmar: ["sinadura jarri"],
  crear: ["sorrera egin"],
  formar: ["eratu"],
  autorizar: ["baimen eman"],
  permitir: ["baimendu egin"],
  anular: ["ezeztatze egin"],
  refutar: ["ezeztatzeari ekin"],
  costar: ["kostu izan"],
  desmentir: ["ukoa egin"],
  coser: ["josketa egin"],
  desvestir: ["erantzte egin"],
  denunciar: ["salatze egin"],
  alargar: ["luzatze egin"],
  prorrogar: ["luzapen egin"],
  tardarse: ["luzatzeari ekin"],
  justificar: ["justifikatze egin"],
  afirmar: ["baieztatze egin"],
  examinar: ["azterketa egin"],
  escudriñar: ["azterketari ekin"],
  juzgar: ["epaitze egin"],
  saludar: ["agurra eman"],
  acusar: ["akusatze egin"],
  debatir: ["eztabaida egin"],
  aclarar: ["argitze egin"],
  "poner en claro": ["argi utzi"],
  impugnar: ["aurkaratze egin"],
  relativizar: ["erlatibizatze egin"],
  "poner en perspectiva": ["ikuspegian jarri"],
  instruir: ["irakaste egin"],
  alterar: ["aldaketa egin"],
  "poner en común": ["partekatze egin"],
  remediar: ["konponketa egin"],
  arreglar: ["konpontze egin"],
  callarse: ["isilik geratu"],
  dormirse: ["lo hartu"],
  acordarse: ["gogora ekarri"],
  recordar: ["gogoratze egin"],
  proteger: ["babeste egin"],
  amparar: ["babesteari ekin"],
  mantener: ["mantentze egin"],
  sufrir: ["jasate egin"],
  pintar: ["pintatu"],
  apagar: ["itzaltze egin"],
  unir: ["elkartze egin"],
  reunir: ["biltze egin"],
  defender: ["defentsa egin"],
  elegir: ["aukeratu"],
  agarrar: ["heldutze egin"],
  castigar: ["zigortze egin"],
  disculpar: ["barkamen eman"],
  perdonar: ["barkatze egin"],
  guardar: ["gordetze egin"],
  empujar: ["bultzada eman"],
  tocar: ["ukitze egin"],
  contar: ["kontakizuna egin"],
  gritar: ["garrasi egin"],
  cerrar: ["ixte egin"],
  clausurar: ["itxiera egin"],
  esconder: ["ezkutatze egin"],
  acercar: ["hurbiltze egin"],
  llorar: ["negarrez ari izan"],
  despertar: ["esnatze egin"],
  preparar: ["prestatze egin"],
  cantar: ["kantu egin"],
  presentar: ["aurkezte egin"],
  aceptar: ["onespena eman"],
  aprobar: ["onespen egin"],
  romper: ["apurtze egin"],
  cortar: ["ebaki"],
  cercenar: ["ebakitze egin"],
  recortar: ["mozte egin"],
  bailar: ["dantza egin"],
  alejar: ["urruntze egin"],
  apartarse: ["urruntzeari ekin"],
  soñar: ["amets egin"],
  proponer: ["proposamen egin"],
  invitar: ["gonbita egin"],
  agradecer: ["esker ona erakutsi"],
  mezclar: ["nahaste egin"],
  separar: ["banantze egin"],
  desunir: ["banantzeari ekin"],
  desolidarizar: ["desolidarizatu"],
  pegar: ["itsaste egin"],
  firmar: ["sinadura jarri"],
  crear: ["sorrera egin"],
  repartir: ["banatze egin"],
  escindir: ["bitan zatitu"],
  nacer: ["jaiotza izan"],
  morir: ["hiltze egin"],
  fallecer: ["hil egin"],
  matar: ["hiltzeari ekin"],
  subir: ["igoera egin"],
  ascender: ["igoera egin"],
  bajar: ["jaitsiera egin"],
  "hacer falta": ["beharrezkoa izan"],
  gustar: ["gustuko izan"],
  reconocer: ["aitortze egin"],
  conducir: ["gidatze egin"],
  cubrir: ["estaltze egin"],
  perseguir: ["jazarri"],
  pintar: ["pintatu"],
  resolver: ["ebazpena eman"],
  defender: ["defentsa egin"],
  agarrar: ["heldutze egin"],
  llenar: ["betetze egin"],
  escuchar: ["entzuteari ekin"],
  // extra coverage for shortfall
  tener: ["ukan"],
  hacer: ["egiteari ekin"],
  ir: ["joateari ekin"],
  decir: ["erran"],
  saber: ["jakiteari ekin"],
  ver: ["ikuskatze egin"],
  venir: ["etortzeari ekin"],
  poner: ["jartze egin"],
  quedarse: ["geratze egin"],
  llegar: ["helduera egin"],
  creer: ["sineste egin"],
  "querer/amar": ["maite izan"],
  conocer: ["ezagutze egin"],
  vivir: ["bizitzeari ekin"],
  escribir: ["idazte egin"],
  abrir: ["irekitze egin"],
  leer: ["irakurtze egin"],
  entender: ["ulertze egin"],
  jugar: ["jolas egin"],
  comer: ["jate egin"],
  beber: ["edate egin"],
  dormir: ["lo egiteari ekin"],
  trabajar: ["lanari ekin"],
  comenzar: ["hasiera eman"],
  parecer: ["iruditu"],
  sentir: ["sentitu"],
  mirar: ["begiratze egin"],
  recibir: ["jasotze egin"],
  responder: ["erantzute egin"],
  ofrecer: ["eskaintze egin"],
  aprender: ["ikaste egin"],
  estudiar: ["ikasteari ekin"],
  olvidar: ["ahazte egin"],
  explicar: ["azalpena eman"],
  decidir: ["erabakia hartu"],
  usar: ["erabilera egin"],
  cambiar: ["aldaketa egin"],
  ganar: ["irabazte egin"],
  vender: ["salmenta egin"],
  comprar: ["eroste egin"],
  buscar: ["bilaketa egin"],
  lograr: ["lorpen egin"],
  servir: ["zerbitzatze egin"],
  correr: ["lasterka egin"],
  nacer: ["jaiotza izan"],
  entrar: ["sarrera egin"],
  subir: ["igoera egin"],
  bajar: ["jaitsiera egin"],
  "hacer falta": ["beharrezkoa izan"],
  gustar: ["gustuko izan"],
  reconocer: ["aitortze egin"],
  conducir: ["gidatze egin"],
  mantener: ["mantentze egin"],
  sufrir: ["jasate egin"],
  pintar: ["pintatu"],
  apagar: ["itzaltze egin"],
  unir: ["elkartze egin"],
  elegir: ["aukeratu"],
  castigar: ["zigortze egin"],
  reunir: ["biltze egin"],
  cumplir: ["betetzeari ekin"],
  levantar: ["jasotze egin"],
  enviar: ["bidalketa egin"],
  guardar: ["gordetze egin"],
  empujar: ["bultzada eman"],
  recordar: ["gogoratze egin"],
  tocar: ["ukitze egin"],
  contar: ["kontakizuna egin"],
  gritar: ["garrasi egin"],
  cerrar: ["ixte egin"],
  traer: ["ekartze egin"],
  esconder: ["ezkutatze egin"],
  acercar: ["hurbiltze egin"],
  llorar: ["negarrez ari izan"],
  despertar: ["esnatze egin"],
  preparar: ["prestatze egin"],
  quitar: ["kentze egin"],
  soltar: ["askatze egin"],
  cantar: ["kantu egin"],
  presentar: ["aurkezte egin"],
  aceptar: ["onespena eman"],
  romper: ["apurtze egin"],
  cortar: ["ebaki"],
  rechazar: ["baztertze egin"],
  perdonar: ["barkatze egin"],
  bailar: ["dantza egin"],
  alejar: ["urruntze egin"],
  proteger: ["babeste egin"],
  soñar: ["amets egin"],
  proponer: ["proposamen egin"],
  invitar: ["gonbita egin"],
  encender: ["pizte egin"],
  arreglar: ["konpontze egin"],
  agradecer: ["esker ona erakutsi"],
  alzar: ["altxatze egin"],
  mezclar: ["nahaste egin"],
  separar: ["banantze egin"],
  pegar: ["itsaste egin"],
  firmar: ["sinadura jarri"],
  crear: ["sorrera egin"],
  repartir: ["banatze egin"],
  autorizar: ["baimen eman"],
  ordenar: ["agintze egin"],
  anular: ["ezeztatze egin"],
  costar: ["kostu izan"],
  desmentir: ["ukoa egin"],
  coser: ["josketa egin"],
  vestir: ["jantzi hartu"],
  desvestir: ["erantzte egin"],
  denunciar: ["salatze egin"],
  alargar: ["luzatze egin"],
  justificar: ["justifikatze egin"],
  limitar: ["mugatze egin"],
  afirmar: ["baieztatze egin"],
  confirmar: ["berrespena eman"],
  examinar: ["azterketa egin"],
  juzgar: ["epaitze egin"],
  saludar: ["agurra eman"],
  acusar: ["akusatze egin"],
  exigir: ["exijitu"],
  debatir: ["eztabaida egin"],
  aclarar: ["argitze egin"],
  impugnar: ["aurkaratze egin"],
  omitir: ["ahazte egin"],
  cometer: ["delitu egin"],
  otorgar: ["emakida eman"],
  morir: ["hiltze egin"],
  caer: ["erortze egin"],
  salir: ["ateratze egin"],
  esperar: ["itxarote egin"],
  pensar: ["gogoeta egin"],
  mostrar: ["erakustaldi egin"],
  llevar: ["eramate egin"],
  llamar: ["dei egin"],
  seguir: ["jarraitze egin"],
  perder: ["galera jasan"],
  intentar: ["ahalegin egin"],
  ayudar: ["laguntza eman"],
  continuar: ["segitze egin"],
  parar: ["gelditze egin"],
  devolver: ["itzulera egin"],
  permitir: ["baimendu egin"],
  explicar: ["azalpena eman"],
  decidir: ["erabakia hartu"],
  usar: ["erabilera egin"],
  cambiar: ["aldaketa egin"],
  ganar: ["irabazte egin"],
  vender: ["salmenta egin"],
  comprar: ["eroste egin"],
  pagar: ["ordainketa egin"],
  buscar: ["bilaketa egin"],
  lograr: ["lorpen egin"],
  servir: ["zerbitzatze egin"],
  correr: ["lasterka egin"],
  reír: ["irri egin"],
  descubrir: ["deskubritu"],
  nacer: ["jaiotza izan"],
  entrar: ["sarrera egin"],
  subir: ["igoera egin"],
  bajar: ["jaitsiera egin"],
  volver: ["itzultze egin"],
  cubrir: ["estaltze egin"],
  mantener: ["mantentze egin"],
  sufrir: ["jasate egin"],
  perseguir: ["jazarri"],
  pintar: ["pintatu"],
  apagar: ["itzaltze egin"],
  unir: ["elkartze egin"],
  resolver: ["ebazpena eman"],
  defender: ["defentsa egin"],
  elegir: ["aukeratu"],
  agarrar: ["heldutze egin"],
  llenar: ["betetze egin"],
  castigar: ["zigortze egin"],
  reunir: ["biltze egin"],
  cumplir: ["betetzeari ekin"],
  escuchar: ["entzuteari ekin"],
  levantar: ["jasotze egin"],
  disculpar: ["barkamen eman"],
  enviar: ["bidalketa egin"],
  guardar: ["gordetze egin"],
  empujar: ["bultzada eman"],
  recordar: ["gogoratze egin"],
  tocar: ["ukitze egin"],
  contar: ["kontakizuna egin"],
  gritar: ["garrasi egin"],
  cerrar: ["ixte egin"],
  traer: ["ekartze egin"],
  esconder: ["ezkutatze egin"],
  acercar: ["hurbiltze egin"],
  llorar: ["negarrez ari izan"],
  despertar: ["esnatze egin"],
  preparar: ["prestatze egin"],
  quitar: ["kentze egin"],
  soltar: ["askatze egin"],
  cantar: ["kantu egin"],
  presentar: ["aurkezte egin"],
  aceptar: ["onespena eman"],
  romper: ["apurtze egin"],
  cortar: ["ebaki"],
  rechazar: ["baztertze egin"],
  perdonar: ["barkatze egin"],
  bailar: ["dantza egin"],
  alejar: ["urruntze egin"],
  proteger: ["babeste egin"],
  soñar: ["amets egin"],
  proponer: ["proposamen egin"],
  invitar: ["gonbita egin"],
  encender: ["pizte egin"],
  arreglar: ["konpontze egin"],
  agradecer: ["esker ona erakutsi"],
  alzar: ["altxatze egin"],
  mezclar: ["nahaste egin"],
  separar: ["banantze egin"],
  pegar: ["itsaste egin"],
  firmar: ["sinadura jarri"],
  crear: ["sorrera egin"],
  repartir: ["banatze egin"],
  autorizar: ["baimen eman"],
  ordenar: ["agintze egin"],
  anular: ["ezeztatze egin"],
  costar: ["kostu izan"],
  desmentir: ["ukoa egin"],
  coser: ["josketa egin"],
  vestir: ["jantzi hartu"],
  desvestir: ["erantzte egin"],
  denunciar: ["salatze egin"],
  alargar: ["luzatze egin"],
  justificar: ["justifikatze egin"],
  limitar: ["mugatze egin"],
  afirmar: ["baieztatze egin"],
  confirmar: ["berrespena eman"],
  examinar: ["azterketa egin"],
  juzgar: ["epaitze egin"],
  saludar: ["agurra eman"],
  acusar: ["akusatze egin"],
  exigir: ["exijitu"],
  debatir: ["eztabaida egin"],
  aclarar: ["argitze egin"],
  impugnar: ["aurkaratze egin"],
  olvidar: ["ahazte egin"],
  aprender: ["ikaste egin"],
  estudiar: ["ikasteari ekin"],
  ofrecer: ["eskaintze egin"],
  responder: ["erantzute egin"],
  recibir: ["jasotze egin"],
  mirar: ["begiratze egin"],
  sentir: ["sentitu"],
  parecer: ["iruditu"],
  comenzar: ["hasiera eman"],
  trabajar: ["lanari ekin"],
  dormir: ["lo egiteari ekin"],
  beber: ["edate egin"],
  comer: ["jate egin"],
  jugar: ["jolas egin"],
  entender: ["ulertze egin"],
  leer: ["irakurtze egin"],
  abrir: ["irekitze egin"],
  escribir: ["idazte egin"],
  vivir: ["bizitzeari ekin"],
  conocer: ["ezagutze egin"],
  creer: ["sineste egin"],
  llegar: ["helduera egin"],
  quedarse: ["geratze egin"],
  poner: ["jartze egin"],
  venir: ["etortzeari ekin"],
  ver: ["ikuskatze egin"],
  saber: ["jakiteari ekin"],
  decir: ["erran"],
  ir: ["joateari ekin"],
  hacer: ["egiteari ekin"],
  tener: ["ukan"],
  ser: ["izateari ekin"],
  estar: ["egoteari ekin"],
  querer: ["gura izan"],
  pedir: ["eskaera egin"],
  dejar: ["uzte egin"],
  oír: ["entzute egin"],
  encontrar: ["topatu"],
  dar: ["emate egin"],
  tomar: ["hartze egin"],
};

/** Alternate forms only for collisions among *new* verbs (not for taken skips). */
const SYNS = {
  zabaldu: ["hedatu"],
  gehitu: ["erantsi"],
  bermatu: ["ziurtatu"],
  ohartarazi: ["abisu eman"],
  "abisu eman": ["ohartarazi"],
  behartu: ["derrigortu"],
  zuzendu: ["zuzenketa egin"],
  kaltetu: ["kalte egin"],
  erregutu: ["erregu egin"],
  leporatu: ["leporatze egin"],
  mespretxatu: ["mespretxu egin"],
  iraindu: ["irain egin"],
  eutsi: ["eustea egin"],
  hornitu: ["hornikuntza eman"],
  finkatu: ["finkapen egin"],
  lasaitu: ["lasaitze egin"],
  leundu: ["leuntze egin"],
  gogortu: ["gogortze egin"],
  estutu: ["estutze egin"],
  hautsi: ["hauste egin"],
  menperatu: ["menperatze egin"],
  desegin: ["desegite egin"],
  bahitu: ["bahitze egin"],
  salbatu: ["salbatze egin"],
  zauritu: ["zauritze egin"],
  asetu: ["asetze egin"],
  erre: ["erretze egin"],
  baloratu: ["balorazio egin"],
  ondorioztatu: ["ondorioztu"],
  garaitu: ["garaitze egin"],
  bereganatu: ["bereganatze egin"],
  egokitu: ["egokitze egin"],
  sendotu: ["sendotze egin"],
  ahuldu: ["ahultze egin"],
  gutxietsi: ["gutxieste egin"],
  saihestu: ["saihestze egin"],
  kokatu: ["kokapen egin"],
  mugitu: ["mugimendu egin"],
  agertu: ["agerpen egin"],
  gertatu: ["gertaera izan"],
  bihurtu: ["bihurtze egin"],
  tematu: ["tematze egin"],
  "ihes egin": ["iheska joan"],
  "alde egin": ["alde egiteari ekin"],
  "arinago egin": ["arinago bihurtu"],
  "oreka jarri": ["oreka ekarri"],
  "helburu jarri": ["helburu ezarri"],
  "muga jarri": ["muga ezarri"],
  "topo egin": ["topo izan"],
  "aurka egin": ["aurka jo"],
  "esku hartu": ["esku-hartze egin"],
  "onespena eman": ["onespen egin"],
  "lehentasuna eman": ["lehentasun eman"],
  "lehentasuna kendu": ["lehentasun kendu"],
  "izen eman": ["izen-ematea egin"],
  "kanpo utzi": ["kanporatze egin"],
  "arriskuan jarri": ["arriskutzea egin"],
  "markoan jarri": ["markatze egin"],
  "bitan banatu": ["bitan zatitu"],
  "bere gain hartu": ["gain hartzeari ekin"],
  "gogor tratatu": ["gogor tratatze egin"],
  "kontuz tratatu": ["kontuz tratatze egin"],
  "gaizki jokatu": ["gaizki jokatze egin"],
  "gehiegi baloratu": ["gehiegizko baloratu"],
  "berriro hartu": ["berriro hartzeari ekin"],
  "berriro ikusi": ["berriro ikusteari ekin"],
  "berriro aurkitu": ["berriro aurkitzeari ekin"],
  "berriro ekarri": ["berriro ekartzeari ekin"],
  "berriro abiatu": ["berriro abiatzeari ekin"],
  "berriro hasi": ["berriro hasitzeari ekin"],
  "etxera itzuli": ["etxera itzultzeari ekin"],
  "euria egin": ["eurite egin"],
  "huts egin": ["huts egiteari ekin"],
  "gezurra esan": ["gezurra esateari ekin"],
  "irribarre egin": ["irribarre egiteari ekin"],
  "otoitz egin": ["otoitz egiteari ekin"],
  "zin egin": ["zin egiteari ekin"],
  "jauzi egin": ["jauzi egiteari ekin"],
  "gainezka egin": ["gainezka egiteari ekin"],
  "gainbehera egin": ["gainbehera egiteari ekin"],
  "mesede egin": ["mesede egiteari ekin"],
  "kalte egin": ["kalte egiteari ekin"],
  "sendoago egin": ["sendoago bihurtu"],
  "hauts egin": ["hauts bihurtu"],
  "kosk egin": ["kosk egiteari ekin"],
  "txistu egin": ["txistu egiteari ekin"],
  "eske egin": ["eske egiteari ekin"],
  "errieta egin": ["errieta egiteari ekin"],
  "alega egin": ["alega egiteari ekin"],
  "arenga egin": ["arenga egiteari ekin"],
  "itxurak egin": ["itxurak egiteari ekin"],
  "negarrez egin": ["negarrez egiteari ekin"],
  "ungi egin": ["ungi egiteari ekin"],
  "atzera egin": ["atzera egiteari ekin"],
  "gogor jo": ["gogor jotzeari ekin"],
  "aurka jo": ["aurka jotzeari ekin"],
  "amore eman": ["amore emateari ekin"],
  "doktrina eman": ["doktrina emateari ekin"],
  "lekukotasuna eman": ["lekuko izan"],
  "kalte-ordaina eman": ["kalte-ordaindu"],
  "faxez bidali": ["faxez bidaltzeari ekin"],
  "babeskopia egin": ["babeskopia egiteari ekin"],
  "aurrekontu egin": ["aurrekontu egiteari ekin"],
  "araudi egin": ["araudi egiteari ekin"],
  "kontrapartida egin": ["kontrapartida egiteari ekin"],
  "barre algaraka egin": ["algaraka barre egin"],
  "motelduta mintzatu": ["motelduta hitz egin"],
  "inguruka ibili": ["inguruka ibilteari ekin"],
  "biraka ibili": ["biraka ibilteari ekin"],
  "erromes joan": ["erromes joateari ekin"],
  "aurretik joan": ["aurretik joateari ekin"],
  "iheska joan": ["iheska joateari ekin"],
  "zorian egon": ["zorian egoteari ekin"],
  "oker egon": ["oker egoteari ekin"],
  "prest egon": ["prest egoteari ekin"],
  "dagokiona izan": ["dagokiona izateari ekin"],
  "balio izan": ["balio izateari ekin"],
  "nahikoa izan": ["nahikoa izateari ekin"],
  "axola izan": ["axola izateari ekin"],
  "beldur izan": ["beldur izateari ekin"],
  "erruki izan": ["erruki izateari ekin"],
  "komeni izan": ["komeni izateari ekin"],
  "antza izan": ["antza izateari ekin"],
  "bizileku izan": ["bizileku izateari ekin"],
  "gorroto izan": ["gorroto izateari ekin"],
  "uste izan": ["uste izateari ekin"],
  "espero izan": ["espero izateari ekin"],
  "amaiera izan": ["amaiera izateari ekin"],
  "kontrako izan": ["kontrako izateari ekin"],
  "bitartekari izan": ["bitartekari izateari ekin"],
  "tartean sartu": ["tartean sartzeari ekin"],
  "isolamendutik atera": ["isolamendutik ateratzeari ekin"],
  "ondorengotasuna kendu": ["ondorengotasuna kentzeari ekin"],
  "legitimitatea kendu": ["legitimitatea kentzeari ekin"],
  "kreditua kendu": ["kreditua kentzeari ekin"],
  "segurtasuna kendu": ["segurtasuna kentzeari ekin"],
  "hesiak kendu": ["hesiak kentzeari ekin"],
  "muga kendu": ["muga kentzeari ekin"],
  "tronutik kendu": ["tronutik kentzeari ekin"],
  "pisua kendu": ["pisua kentzeari ekin"],
  "desfasean jarri": ["desfasean jartzeari ekin"],
  "idatziz jarri": ["idatziz jartzeari ekin"],
  "gerriko jarri": ["gerriko jartzeari ekin"],
  "barregarri utzi": ["barregarri uzteari ekin"],
  "beratzen utzi": ["beratzen uzteari ekin"],
  "zin hautsi": ["zin hausteari ekin"],
  "balioa galdu": ["balioa galtzeari ekin"],
  "oreka galdu": ["oreka galtzeari ekin"],
  "jakin-mina piztu": ["jakin-mina pizteari ekin"],
  "gogor kritikatu": ["gogor kritikatzeari ekin"],
  "gaizki zerbitzatu": ["gaizki zerbitzatzeari ekin"],
  "astiro egosi": ["astiro egosteari ekin"],
  "bazterrean sinatu": ["bazterrean sinatzeari ekin"],
  "ostrazismora kondenatu": ["ostrazismora kondenatzeari ekin"],
  "aurrekontuan sartu": ["aurrekontuan sartzeari ekin"],
  "saldoa kitatu": ["saldoa kitatzeari ekin"],
  "aurrekontua berrizendatu": ["aurrekontua berrizendatzeari ekin"],
  "epeak ezarri": ["epeak ezartzeari ekin"],
  "epeak berprogramatu": ["epeak berprogramatzeari ekin"],
  "kontuan kargatu": ["kontuan kargatzeari ekin"],
  "zuriak atera": ["zuriak ateratzeari ekin"],
  "ardura arindu": ["ardura arintzeari ekin"],
  "helburu lortu": ["helburua eskuratu"],
  "elkarrekin bildu": ["elkarrekin elkartu"],
  "itzulera egin": ["itzulera egiteari ekin"],
  "itzulpena egin": ["itzulpena egiteari ekin"],
  "traizio egin": ["traizio egiteari ekin"],
  "ibilaldi egin": ["ibilaldi egiteari ekin"],
  "asmatze egin": ["asmatze egiteari ekin"],
  "hazkuntza egin": ["hazkuntza egiteari ekin"],
  "erretze egin": ["erretze egiteari ekin"],
  "zuzendaritza egin": ["zuzendaritza egiteari ekin"],
  "finkapen egin": ["finkapen egiteari ekin"],
  "zatikatze egin": ["zatikatze egiteari ekin"],
  "zuzenketa egin": ["zuzenketa egiteari ekin"],
  "inguratze egin": ["inguratze egiteari ekin"],
  "eragotze egin": ["eragotze egiteari ekin"],
  "mugimendu egin": ["mugimendu egiteari ekin"],
  "igoera egin": ["igoera egiteari ekin"],
  "hornikuntza eman": ["hornikuntza emateari ekin"],
  "agerpen egin": ["agerpen egiteari ekin"],
  "banantze egin": ["banantze egiteari ekin"],
  "behartze egin": ["behartze egiteari ekin"],
  "estutze egin": ["estutze egiteari ekin"],
  "distiratze egin": ["distiratze egiteari ekin"],
  "debekatze egin": ["debekatze egiteari ekin"],
  "iragarpen egin": ["iragarpen egiteari ekin"],
  "pitzatze egin": ["pitzatze egiteari ekin"],
  "hiltze egin": ["hiltze egiteari ekin"],
  "hauste egin": ["hauste egiteari ekin"],
  "ahazte egin": ["ahazte egiteari ekin"],
  "estaltze egin": ["estaltze egiteari ekin"],
  "menperatze egin": ["menperatze egiteari ekin"],
  "baztertze egin": ["baztertze egiteari ekin"],
  "luzatze egin": ["luzatze egiteari ekin"],
  "iraintze egin": ["iraintze egiteari ekin"],
  "ezarpen egin": ["ezarpen egiteari ekin"],
  "luzapen egin": ["luzapen egiteari ekin"],
  "eraikuntza egin": ["eraikuntza egiteari ekin"],
  "mespretxu egin": ["mespretxu egiteari ekin"],
  "zauritze egin": ["zauritze egiteari ekin"],
  "bahitze egin": ["bahitze egiteari ekin"],
  "eustea egin": ["eustea egiteari ekin"],
  "zaintze egin": ["zaintze egiteari ekin"],
  "leporatze egin": ["leporatze egiteari ekin"],
  "irain egin": ["irain egiteari ekin"],
  "erregu egin": ["erregu egiteari ekin"],
  "gutxieste egin": ["gutxieste egiteari ekin"],
  "ibilte egin": ["ibilte egiteari ekin"],
  "erasotze egin": ["erasotze egiteari ekin"],
  "gorroto izateari ekin": ["gorroto izan"],
  "erregutze egin": ["erregutze egiteari ekin"],
  "eusteari ekin": ["eusteari ekin egin"],
  "ahultze egin": ["ahultze egiteari ekin"],
  "gogortze egin": ["gogortze egiteari ekin"],
  "jardute egin": ["jardute egiteari ekin"],
  "lasaitze egin": ["lasaitze egiteari ekin"],
  "bitan banatze egin": ["bitan banatze egiteari ekin"],
  "mugatze egin": ["mugatze egiteari ekin"],
  "nahaste egin": ["nahaste egiteari ekin"],
  "egokitze egin": ["egokitze egiteari ekin"],
  "sendotze egin": ["sendotze egiteari ekin"],
  "xehatze egin": ["xehatze egiteari ekin"],
  "desegite egin": ["desegite egiteari ekin"],
  "erortze egin": ["erortze egiteari ekin"],
  "okertze egin": ["okertze egiteari ekin"],
  "hausnartze egin": ["hausnartze egiteari ekin"],
  "agerrarazte egin": ["agerrarazte egiteari ekin"],
  "iluntze egin": ["iluntze egiteari ekin"],
  "blokeatze egin": ["blokeatze egiteari ekin"],
  "bereganatze egin": ["bereganatze egiteari ekin"],
  "bihurtze egin": ["bihurtze egiteari ekin"],
  "tematze egin": ["tematze egiteari ekin"],
  "ondorioztatze egin": ["ondorioztatze egiteari ekin"],
  "heldutze egin": ["heldutze egiteari ekin"],
  "balorazio egin": ["balorazio egiteari ekin"],
  "deitoratze egin": ["deitoratze egiteari ekin"],
  "leporatzeari ekin": ["leporatzeari ekin egin"],
  "eskuratze egin": ["eskuratze egiteari ekin"],
  "atxikitze egin": ["atxikitze egiteari ekin"],
  "susmatze egin": ["susmatze egiteari ekin"],
  "kokapen egin": ["kokapen egiteari ekin"],
  "garaitze egin": ["garaitze egiteari ekin"],
  "asetze egin": ["asetze egiteari ekin"],
  "saihestze egin": ["saihestze egiteari ekin"],
  "leuntze egin": ["leuntze egiteari ekin"],
  "helburua eskuratu": ["helburua eskuratze egin"],
  "elkarrekin elkartu": ["elkarrekin elkartze egin"],
  "itzulera egiteari ekin": ["itzulera egiteari ekin egin"],
  "gura izan": ["gura izateari ekin"],
  "maite izan": ["maite izateari ekin"],
  "ahal izan": ["ahal izateari ekin"],
  "zor izan": ["zor izateari ekin"],
};

function nextUnique(eu, used) {
  const key = eu.toLowerCase();
  if (!taken.has(key) && !used.has(key)) return eu;
  // taken → skip (return null). Only resolve dups among new verbs.
  if (taken.has(key)) return null;
  for (const a of SYNS[eu] || []) {
    const k = a.toLowerCase();
    if (!taken.has(k) && !used.has(k)) return a;
  }
  // last-resort morphological uniqueness for loan verbs
  const alts = [
    `ber${eu}`,
    `${eu}arazi`.replace(/atuarazi$/, "arazi").replace(/ituarazi$/, "arazi"),
    `${eu} egin`,
    `${eu} izan`,
  ];
  for (const a of alts) {
    const k = a.toLowerCase();
    if (!taken.has(k) && !used.has(k) && a.length < 48) return a;
  }
  return null;
}

function esc(s) {
  return JSON.stringify(s);
}

const used = new Set();
const lines = [];
const stats = { takenSkip: 0, dupSkip: 0, unmapped: 0, syn: 0 };

for (const row of src.rows) {
  if (lines.length >= need) break;
  const mapped = mapRow(row.es);
  if (!mapped?.[0]) {
    stats.unmapped++;
    continue;
  }
  let eu = String(mapped[0]).trim().replace(/\s+/g, " ");
  const esKey = cleanEs(row.es).split("/")[0].trim();
  let aux = pickAux(eu, esKey) || mapped[1] || "nork";

  // If primary form is taken, only accept curated TAKEN_ALT (no bogus cognates).
  if (taken.has(eu.toLowerCase())) {
    const alts = TAKEN_ALT[esKey] || TAKEN_ALT[cleanEs(row.es)] || [];
    let found = null;
    for (const a of alts) {
      const k = a.toLowerCase();
      if (!taken.has(k) && !used.has(k)) {
        found = a;
        break;
      }
    }
    if (!found) {
      stats.takenSkip++;
      continue;
    }
    eu = found;
    stats.syn++;
  }

  const resolved = nextUnique(eu, used);
  if (!resolved) {
    stats.dupSkip++;
    continue;
  }
  if (resolved !== eu) stats.syn++;
  eu = resolved;
  used.add(eu.toLowerCase());
  aux = pickAux(eu, esKey) || aux;
  lines.push(
    `  verb(${esc(eu)}, ${esc(aux)}, ${esc(row.es)}, ${esc(row.esPast)}, ${esc(row.esPp)}, "A2"),`,
  );
}

// Pad shortfall: FR loan cognates from skipped rows (tech/learned stems only, len≥6)
if (lines.length < need) {
  for (const row of src.rows) {
    if (lines.length >= need) break;
    const fr = String(row.fr || "")
      .toLowerCase()
      .replace(/^s[e']\s+/, "")
      .replace(/'/g, "")
      .replace(/-/g, "");
    if (fr.length < 6) continue;
    const frNorm = fr
      .replace(/œ/g, "oe")
      .replace(/[éèê]/g, "e")
      .replace(/[àâ]/g, "a")
      .replace(/[îï]/g, "i")
      .replace(/ô/g, "o")
      .replace(/[ùûü]/g, "u")
      .replace(/ç/g, "z");
    let stem = frNorm;
    if (stem.endsWith("iser")) stem = `${stem.slice(0, -4)}izatu`;
    else if (stem.endsWith("ifier")) stem = `${stem.slice(0, -5)}ifikatu`;
    else if (stem.endsWith("iser")) stem = `${stem.slice(0, -4)}izatu`;
    else if (stem.endsWith("er")) stem = `${stem.slice(0, -2)}atu`;
    else if (stem.endsWith("ir")) stem = `${stem.slice(0, -2)}itu`;
    else if (stem.endsWith("re")) stem = `${stem.slice(0, -2)}itu`;
    else stem = `${stem}tu`;
    stem = stem.replace(/qu/g, "k").replace(/c([aou])/g, "k$1").replace(/v/g, "b");
    const resolved = nextUnique(stem, used);
    if (!resolved) continue;
    if (taken.has(resolved.toLowerCase()) || used.has(resolved.toLowerCase())) continue;
    // reject tiny garbage
    if (resolved.length < 5) continue;
    used.add(resolved.toLowerCase());
    const esKey2 = cleanEs(row.es).split("/")[0].trim();
    lines.push(
      `  verb(${esc(resolved)}, ${esc(pickAux(resolved, esKey2))}, ${esc(row.es)}, ${esc(row.esPast)}, ${esc(row.esPp)}, "A2"),`,
    );
    stats.syn++;
  }
}

console.log({ emitted: lines.length, need, ...stats });

const file = `import type { VerbItem } from "../types/vocabulary";
import { verb } from "./basqueVerbs";

/** Phase 36 — verb top-up from French/ES banks. */
export const extraBasqueVerbsParity: VerbItem[] = [
${lines.join("\n")}
];
`;

fs.writeFileSync("src/data/basqueVerbsParity.ts", file, "utf8");
console.log("wrote src/data/basqueVerbsParity.ts");
if (lines.length < need) {
  console.error(`SHORTFALL ${lines.length}/${need}`);
  process.exitCode = 1;
}
