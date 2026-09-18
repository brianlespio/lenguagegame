import { expandLockedVerbs, expandLockedWords } from "../c2/expand";
import { parseVerbBlob, parseWordBlob } from "../c2/parse";
import type { VerbItem, VocabularyItem } from "../../types/vocabulary";

const B2_FR_NOUNS = parseWordBlob(`
enjeu|lo que está en juego
constat|comprobación
démarche|planteamiento
dispositif|mecanismo
écart|desfase
bilan|balance
aboutissement|desenlace
constatation|constatación
précarité|precariedad
inégalité|desigualdad
citoyenneté|ciudadanía
laïcité|laicidad
mixité|mixtura social
logement|vivienda
locataire|inquilino
loyer|alquiler
hébergement|alojamiento
foyer|hogar
squat|vivienda okupa
chômage|desempleo
embauche|contratación
licenciement|despido
grève|huelga
syndicat|sindicato
cotisation|cuota
retraite|jubilación
horaire|horario
surcharge|sobrecarga
stage|prácticas
stagiaire|becario en prácticas
filière|itinerario formativo
cursus|plan de estudios
épreuve|prueba de examen
barème|baremo
rattrapage|recuperación
redoublement|repetición de curso
notation|calificación
scrutin|comicio
urne|urna electoral
électeur|votante
abstention|abstención
mandat|mandato
élu|electo
collectivité|ente local
décret|decreto
témoignage|testimonio
reportage|reportaje
éditorial|artículo de fondo
dossier|expediente
enquête|indagación
chronique|columna
rubrique|sección
harcèlement|acoso
intimidation|amedrentamiento
représailles|represalias
boycott|boicot
pétition|pliego de firmas
empreinte|huella
réchauffement|calentamiento
déchet|residuo
recyclage|reciclaje
gisement|yacimiento
sobriété|contención
verdissement|ecologización
plus-value|plusvalía
manque à gagner|lucro cesante
redevance|canon
prélèvement|detracción
mutuelle|mutualidad
soignant|sanitario
prise en charge|asunción de costes
pénurie|escasez
approvisionnement|abastecimiento
rationnement|racionamiento
entrepôt|almacén
aménagement|ordenación
urbanisme|urbanismo
étalement|expansión urbana
densification|compactación urbana
friche|erial
voirie|vialidad
desserte|servicio de transporte
clivage|brecha
fossé|foso
fracture|fractura
parité|paridad
quota|cupo
plafond de verre|techo de cristal
intérim|interinidad
avenant|anexo contractual
clause|cláusula
échéance|vencimiento
prorogation|prórroga
report|aplazamiento
ajournement|dilación
concertation|concertación
audition|comparecencia
conciliation|avenencia
levier|palanca
seuil|umbral
plancher|suelo mínimo
garde-fou|salvaguarda
feuille de route|hoja de ruta
échéancier|calendario de plazos
curseur|cursor
passoire thermique|colador energético
précarité énergétique|pobreza energética
fracture numérique|brecha digital
ascenseur social|ascensor social
mérite|merecimiento
temps partiel|jornada parcial
arrêt maladie|baja médica
chiffre d'affaires|cifra de negocio
nappe phréatique|capa freática
congé parental|permiso parental
convention collective|convenio colectivo
harcèlement moral|acoso laboral
harcèlement scolaire|acoso escolar
charge de travail|carga de trabajo
marché du travail|mercado laboral
offre d'emploi|oferta de empleo
demandeur d'emploi|demandante de empleo
allocation|prestación
reste à charge|parte a cargo del asegurado
ticket modérateur|ticket moderador
collectivité territoriale|ente territorial
conseil municipal|pleno municipal
hémicycle|hemiciclo
tribune|tribuna
motion|moción
amendement|enmienda
quorum|cuórum
vote à main levée|votación a mano alzada
bulletin secret|papeleta secreta
revendication|reivindicación
revendication salariale|reivindicación salarial
revendication sociale|reivindicación social
cahier de doléances|cuaderno de quejas
mot d'ordre|consigna
cortège|cortejo
manifestation|manifestación
rassemblement|concentración
occupation|ocupación
blocages|cortes
piquet|piquete
négociatrice|negociadora
médiateur|mediador
instance|instancia
recours|recurso
saisine|planteamiento ante un órgano
avis conforme|dictamen vinculante
avis simple|dictamen no vinculante
mise au point|aclaración
mise en cause|imputación
mise à pied|suspensión de empleo
mise à jour|puesta al día
mise en œuvre|puesta en práctica
mise en place|puesta en marcha
tour de table|ronda de intervenciones
tour de scrutin|vuelta electoral
second tour|segunda vuelta
premier tour|primera vuelta
blancs et nuls|votos en blanco y nulos
taux de participation|tasa de participación
taux de chômage|tasa de desempleo
taux d'emploi|tasa de ocupación
pouvoir d'achat|poder adquisitivo
panier moyen|cesta media
reste à vivre|renta disponible residual
reste à payer|pendiente de pago
délai de carence|plazo de carencia
délai de prescription|plazo de prescripción
délai de réflexion|plazo de desistimiento
droit de retrait|derecho de retirada
droit d'alerte|derecho de alerta
lanceur d'alerte|alertador
ayants droit|beneficiarios
ayant cause|causahabiente
`);
const B2_FR_ADJECTIVES = parseWordBlob(`
précaire|precario
inégalitaire|desigualitario
solidaire|solidario
laïc|laico
préoccupant|inquietante
alarmant|alarmante
inquiétant|inquietante
rassurant|tranquilizador
prometteur|prometedor
décevant|decepcionante
contraignant|gravoso
ciblé|focalizado
discutable|cuestionable
contestable|impugnable
vraisemblable|verosímil
invraisemblable|inverosímil
équivoque|equívoco
ambigu|ambiguo
contradictoire|contradictorio
flagrant|flagrante
criant|escandaloso
notoire|notorio
manifeste|manifiesto
latent|latente
sous-jacent|subyacente
inhérent|inherente
déterminant|determinante
décisif|decisorio
primordial|primordial
secondaire|secundario
accessoire|accesorio
subsidiaire|subsidiario
annexe|anejo
connexe|conexo
concomitant|concomitante
simultané|simultáneo
successif|sucesivo
ultérieur|ulterior
antérieur|anterior
préalable|previo
préliminaire|preliminar
transitoire|transitorio
pérenne|perenne
durable|duradero
éphémère|efímero
fugace|fugaz
saisissant|sobrecogedor
percutant|contundente
éloquent|elocuente
convaincant|convincente
persuasif|persuasivo
spécieux|especioso
rigoureux|riguroso
souple|flexible
équitable|equitativo
inéquitable|inequitativo
légitime|legítimo
illégitime|ilegítimo
fondé|fundado
infondé|infundado
justifié|justificado
injustifié|injustificado
opposable|oponible
propice|propicio
inopportun|inoportuno
intempestif|intempestivo
opportun|oportuno
judicieux|atinado
malavisé|desacertado
inconsidéré|irreflexivo
concerté|concertado
improvisé|improvisado
irréfléchi|irreflexivo
mûri|madurado
précipité|precipitado
hâtif|apresurado
tardif|tardío
précoce|precoz
obsolète|obsoleto
périmé|caducado
caduc|caduco
désuet|en desuso
novateur|innovador
avant-gardiste|vanguardista
rétrograde|retrógrado
passéiste|pasadista
progressiste|progresista
conservateur|conservador
réformateur|reformador
revendicatif|reivindicativo
contestataire|contestatario
militant|militante
engagé|comprometido
désengagé|desentendido
partial|parcial
impartial|imparcial
biaisé|sesgado
orienté|sesgado
tendancieux|tendencioso
partisan|partidista
civique|cívico
confessionnel|confesional
communautaire|comunitario
identitaire|identitario
xénophobe|xenófobo
tolérant|tolerante
intolérant|intolerante
accueillant|acogedor
hostile|hostil
bienveillant|benévolo
malveillant|malévolo
attentionné|solícito
détaché|despegado
impliqué|implicado
concerné|afectado
vulnérable|vulnerable
fragilisé|quebrantado
précarisé|precarizado
démuni|desvalido
défavorisé|desfavorecido
privilégié|privilegiado
aisé|acomodado
fortuné|adinerado
nécessiteux|necesitado
indigent|indigente
chronique|crónico
aigu|agudo
bénin|benigno
anodin|anodino
négligeable|desdeñable
substantiel|sustancial
notable|señalado
sensible|sensible
considérable|considerable
appréciable|apreciable
dérisoire|irrisorio
minime|mínimo
récurrent|reiterado
ponctuel|puntual
réglementé|reglamentado
encadré|acotado
restreint|cercenado
approfondi|ahondado
élargi|ampliado
défavorable|desfavorable
favorable|favorable
congru|congruente
incongru|incongruente
saisissable|embargable
insaisissable|inembargable
opposable à|oponible a
exécutable|ejecutable
prescriptible|prescriptible
imprescriptible|imprescriptible
cessible|cesible
incessible|incesible
révocable|revocable
irrévocable|irrevocable
résiliable|resoluble
irréfragable|irrefragable
probant|probatorio
concluant|concluyente
dirimant|dirimente
`);
const B2_FR_ADVERBS = parseWordBlob(`
considérablement|considerablemente
sensiblement|sensiblemente
notablement|señaladamente
remarquablement|notablemente
singulièrement|singularmente
foncièrement|de raíz
radicalement|de raíz
résolument|resueltamente
délibérément|adrede
sciemment|a sabiendas
ostensiblement|ostensiblemente
visiblement|visiblemente
manifestement|manifiestamente
indéniablement|innegablemente
incontestablement|incontestablemente
indubitablement|indudablemente
vraisemblablement|verosímilmente
éventuellement|llegado el caso
inévitablement|inevitablemente
immanquablement|sin falta
inéluctablement|ineluctablemente
assurément|sin duda
bellement|hermosamente
fermement|con firmeza
souplement|con soltura
habilement|con destreza
maladroitement|torpemente
prestement|con presteza
lestement|con desenvoltura
vivement|vivamente
sèchement|secamente
froidement|con frialdad
chaudement|calurosamente
amèrement|con amargura
durement|con dureza
lourdement|pesadamente
lourdement encore|aún con pesadez
à l'improviste|de improviso
inopinément|inopinadamente
soudainement|de sopetón
incidemment|de pasada
chemin faisant|sobre la marcha
au passage|de paso
en passant|de pasada
au demeurant|por lo demás
au reste|por lo demás
du reste|por lo demás
somme toute|en suma
tout compte fait|a fin de cuentas
grosso modo|a grandes rasgos
en gros|en conjunto
dans l'ensemble|en conjunto
globalement|en conjunto
sommairement|sumariamente
brièvement|por lo breve
succinctement|con concisión
en un mot|en una palabra
en deux mots|en dos palabras
pour ainsi dire|por así decir
en quelque sorte|en cierto modo
d'une certaine façon|de cierta forma
d'une certaine manière|de cierta manera
en un sens|en cierto sentido
à vrai dire|a decir verdad
à dire vrai|a decir verdad
pour tout dire|para decirlo todo
justement|justamente
effectivement|en efecto
peu ou prou|poco más o menos
tant bien que mal|como buenamente
bon gré mal gré|por las buenas o por las malas
de bon cœur|de buen grado
de mauvais cœur|de mala gana
de mauvaise grâce|de mala gana
sur le tard|a deshora
sur le coup|en el acto
sur-le-champ|al punto
sans délai|sin dilación
sans tarder|sin tardanza
sans relâche|sin tregua
sans discontinuer|sin parar
sans relâchement|sin aflojar
à tour de rôle|por turnos
à l'unisson|al unísono
de conserve|de consuno
de concert|de consuno
de conserve encore|aún de consuno
en chœur|a coro
en rangs serrés|en filas prietas
en ordre dispersé|en orden disperso
en dilettante|de diletante
en amateur|de aficionado
en professionnel|de profesional
au jour le jour|al día
au fil des jours|al hilo de los días
au fil du temps|al hilo del tiempo
au fil des ans|al hilo de los años
au fur et à mesure|a medida que
au compte-gouttes|con cuentagotas
goutte à goutte|gota a gota
de proche en proche|de cerca en cerca
tout de go|sin preámbulos
tout uniment|sin rebozo
tout bonnement|sin más
tout simplement|sin más
tout juste|por los pelos
tout au plus|como mucho
tout au moins|cuando menos
à tout le moins|cuando menos
à tout prendre|en conjunto
à tout coup|a cada lance
à tout propos|a cada paso
à tout moment|a cada instante
à tout instant|a cada instante
à tout bout de champ|a cada dos por tres
à tout va|a todo trapo
à tout rompre|a todo romper
à tout casser|a más no poder
à tout prix|a toda costa
à tout hasard|por si acaso
à tout événement|en todo evento
abondamment|con abundancia
copieusement|copiosamente
grassement|generosamente
chichement|con cicatería
parcimonieusement|con parsimonia
mesurément|con mesura
démesurément|desmesuradamente
outre mesure|en demasía
par-dessus le marché|por añadidura
par ricochet|de rechazo
par contrecoup|de contragolpe
noblement|con nobleza
dignement|con dignidad
humblement|con humildad
modestement|con modestia
discrètement|con discreción
ouvertement|abiertamente
publiquement|en público
officieusement|oficiosamente
tacitement|tácitamente
implicitement|implícitamente
explicitement|explícitamente
nommément|nombradamente
mot pour mot|palabra por palabra
mot à mot|palabra a palabra
à la lettre|al pie de la letra
au pied de la lettre|al pie de la letra
en détail|al pormenor
en long et en large|a lo largo y a lo ancho
de long en large|de largo a ancho
de fond en comble|de arriba abajo
de part en part|de parte a parte
de bout en bout|de cabo a cabo
d'un bout à l'autre|de un cabo al otro
jusqu'au bout|hasta el cabo
à outrance|a ultranza
à l'excès|en exceso
à l'extrême|al extremo
sans mesure|sin mesura
avec mesure|con mesura
`);
const B2_FR_CONNECTORS = parseWordBlob(`
d'une part|por una parte
d'autre part|por otra parte
d'un côté|de un lado
de l'autre|del otro
en premier lieu|en primer lugar
en second lieu|en segundo lugar
en troisième lieu|en tercer lugar
pour commencer|para empezar
pour finir|para terminar
pour résumer|para resumir
pour synthétiser|para sintetizar
en guise de conclusion|a modo de cierre
cela dit|dicho esto
ceci dit|dicho esto
cela étant|siendo ello así
ceci étant|siendo esto así
cela étant dit|dicho lo cual
ceci étant dit|dicho esto
en tout cas|en todo caso
de toute manière|de todos modos
inversement|a la inversa
réciproquement|recíprocamente
à cet égard|a este respecto
à ce propos|a este propósito
à ce sujet|sobre este particular
sur ce point|sobre este punto
sur ce|en esto
là-dessus|sobre ello
par la suite|con posterioridad
par la même occasion|de paso
dans le même temps|al mismo tiempo
dans le même ordre d'idées|en el mismo orden de ideas
dans cette optique|en esta óptica
dans cette perspective|en esta perspectiva
de ce point de vue|desde este punto de vista
sous cet angle|bajo este ángulo
à ce titre|a ese título
à ce compte|a ese tenor
à ce stade|en esta fase
à ce jour|a día de hoy
à l'heure actuelle|a hora de ahora
pour l'heure|por ahora
pour le moment|de momento
pour l'instant|por el instante
en l'occurrence|en el caso
le cas échéant|en su caso
à défaut|en su defecto
dans ces conditions|en tales condiciones
dans ces circonstances|en tales circunstancias
à ce compte-là|a ese tenor
en ce sens|en ese sentido
en ce sens que|en el sentido de que
à savoir|a saber
ce qui signifie que|lo que significa que
ce qui revient à dire que|lo que equivale a decir que
il s'ensuit que|de ello se sigue que
il en résulte que|de ello resulta que
il en découle que|de ello se desprende que
d'où il suit que|de donde se sigue que
d'où il résulte que|de donde resulta que
partant|por consiguiente
partant de là|partiendo de ahí
de là|de ahí
de là que|de ahí que
tant et si bien que|hasta el punto de que
au point que|hasta el punto de que
à tel point que|a tal punto que
tellement que|tanto que
assez pour que|lo bastante para que
trop pour que|demasiado para que
loin de là|ni mucho menos
bien au contraire|muy al contrario
tout au contraire|todo lo contrario
tant s'en faut|ni con mucho
que ce soit|ya sea
soit... soit|ya... ya
ou bien|o bien
ou alors|o si no
excepté si|excepto si
hormis si|salvo si
à condition de|a condición de
alors même|aun entonces
effectivement|en efecto
justement|justamente
à vrai dire|a decir verdad
à dire vrai|a decir verdad
pour tout dire|para decirlo todo
pour ainsi dire|por así decir
en quelque sorte|en cierto modo
d'une certaine façon|de cierta forma
d'une certaine manière|de cierta manera
en un sens|en cierto sentido
en un mot|en una palabra
en deux mots|en dos palabras
grosso modo|a grandes rasgos
en gros|en conjunto
dans l'ensemble|en conjunto
globalement|en conjunto
sommairement|sumariamente
brièvement|por lo breve
succinctement|con concisión
somme toute|en suma
tout compte fait|a fin de cuentas
au total|en total
au demeurant|por lo demás
au reste|por lo demás
du reste|por lo demás
au surplus|además
cela posé|sentado esto
ceci posé|sentado esto
posé que|sentado que
à supposer que|supuesto que
à admettre que|admitido que
à considérer que|considerado que
à supposer même que|aun supuesto que
dans cette hypothèse|en esa hipótesis
dans l'hypothèse où|en la hipótesis de que
quitte à ce|aunque ello implique
il n'en reste pas moins|no por ello deja de
mais aussi|sino también
mais également|sino igualmente
mais surtout|sino sobre todo
soit dit en passant|dicho sea de paso
soit dit entre nous|dicho sea entre nosotros
à ce que je sache|que yo sepa
à ce que l'on dit|según se dice
à ce qu'il paraît|al parecer
à ce qu'il semble|según parece
pour autant que je sache|en lo que yo sepa
pour autant que l'on sache|en lo que se sepa
dans la mesure où l'on|en la medida en que uno
dans la mesure du possible|en la medida de lo posible
autant que possible|en lo posible
autant que faire se peut|en cuanto cabe
pour peu que l'on|con poco que uno
si tant est|si es que
n'était|a no ser
loin s'en faut|ni mucho menos
quitte à le dire|aunque haya que decirlo
quitte à déplaire|aunque disguste
faute de mieux encore|a falta de algo mejor
faute de preuves|a falta de pruebas
en dépit même de cela|pese incluso a eso
en dépit du bon sens|contra el sentido común
au demeurant toutefois|con todo empero
au demeurant pourtant|con todo sin embargo
non sans mal toutefois|no sin esfuerzo empero
non sans peine pourtant|no sin pena sin embargo
ce n'est pas tout|no es eso todo
ce n'est pas rien|no es poca cosa
autant en emporte|así se lo lleva
autant dire alors|tanto da decir entonces
`);
const B2_FR_PRONOUNS = parseWordBlob(`
celui qui|el que
celle qui|la que
ceux qui|los que
celles qui|las que
celui que|el que
celle que|la que
ceux que|los que
celles que|las que
celui dont|aquel de quien
celle dont|aquella de quien
ceux dont|aquellos de quienes
celles dont|aquellas de quienes
celui à qui|aquel a quien
celui pour qui|aquel para quien
celui avec qui|aquel con quien
celui chez qui|aquel en casa de quien
celui contre qui|aquel contra quien
celui sans qui|aquel sin quien
celui en qui|aquel en quien
celui sur qui|aquel sobre quien
celui par qui|aquel por quien
celui vers qui|aquel hacia quien
celui derrière qui|aquel detrás de quien
celui devant qui|aquel delante de quien
celui après qui|aquel después de quien
celui avant qui|aquel antes de quien
celui parmi qui|aquel entre quien
celui entre qui|aquel entre quien
celui selon qui|aquel según quien
celui malgré qui|aquel a pesar de quien
celui sauf qui|aquel salvo quien
celui hors qui|aquel fuera de quien
celle à qui|aquella a quien
celle pour qui|aquella para quien
celle avec qui|aquella con quien
celle chez qui|aquella en casa de quien
celle contre qui|aquella contra quien
celle sans qui|aquella sin quien
celle en qui|aquella en quien
celle sur qui|aquella sobre quien
celle par qui|aquella por quien
celle vers qui|aquella hacia quien
celle derrière qui|aquella detrás de quien
celle devant qui|aquella delante de quien
celle après qui|aquella después de quien
celle avant qui|aquella antes de quien
celle parmi qui|aquella entre quien
celle entre qui|aquella entre quien
celle selon qui|aquella según quien
celle malgré qui|aquella a pesar de quien
celle sauf qui|aquella salvo quien
celle hors qui|aquella fuera de quien
ceux à qui|aquellos a quien
ceux pour qui|aquellos para quien
ceux avec qui|aquellos con quien
ceux chez qui|aquellos en casa de quien
ceux contre qui|aquellos contra quien
ceux sans qui|aquellos sin quien
ceux en qui|aquellos en quien
ceux sur qui|aquellos sobre quien
ceux par qui|aquellos por quien
ceux vers qui|aquellos hacia quien
ceux derrière qui|aquellos detrás de quien
ceux devant qui|aquellos delante de quien
ceux après qui|aquellos después de quien
ceux avant qui|aquellos antes de quien
ceux parmi qui|aquellos entre quien
ceux entre qui|aquellos entre quien
ceux selon qui|aquellos según quien
ceux malgré qui|aquellos a pesar de quien
ceux sauf qui|aquellos salvo quien
ceux hors qui|aquellos fuera de quien
celles à qui|aquellas a quien
celles pour qui|aquellas para quien
celles avec qui|aquellas con quien
celles chez qui|aquellas en casa de quien
celles contre qui|aquellas contra quien
celles sans qui|aquellas sin quien
celles en qui|aquellas en quien
celles sur qui|aquellas sobre quien
celles par qui|aquellas por quien
celles vers qui|aquellas hacia quien
celles derrière qui|aquellas detrás de quien
celles devant qui|aquellas delante de quien
celles après qui|aquellas después de quien
celles avant qui|aquellas antes de quien
celles parmi qui|aquellas entre quien
celles entre qui|aquellas entre quien
celles selon qui|aquellas según quien
celles malgré qui|aquellas a pesar de quien
celles sauf qui|aquellas salvo quien
celles hors qui|aquellas fuera de quien
ce dernier|este último
cette dernière|esta última
ces derniers|estos últimos
ces dernières|estas últimas
le suivant|el siguiente
la suivante|la siguiente
les suivants|los siguientes
les suivantes|las siguientes
le précédent|el anterior
la précédente|la anterior
les précédents|los anteriores
les précédentes|las anteriores
chacun d'eux|cada uno de ellos
chacune d'elles|cada una de ellas
chacun de nous|cada uno de nosotros
chacune de vous|cada una de ustedes
chacun des deux|cada uno de los dos
chacune des deux|cada una de las dos
quelqu'une|alguna
quelques-uns|algunos
quelques-unes|algunas
quelque chose|algo
quelque chose d'autre|algo más
quelque chose de tel|algo semejante
n'importe quel|cualquier
n'importe quelle|cualquier
n'importe quels|cualesquiera
n'importe quelles|cualesquiera
personne d'autre|nadie más
rien d'autre|nada más
rien de tel|nada semejante
rien de tel que|nada comparable a
tout le monde|todo el mundo
tout un chacun|todo quisque
tous ceux|todos aquellos
toutes celles|todas aquellas
tous ceux qui|todos los que
toutes celles qui|todas las que
tous ceux que|todos los que
toutes celles que|todas las que
plus d'un|más de uno
plus d'une|más de una
d'autres|otros
certains|ciertos
certaines|ciertas
un autre|otro
une autre|otra
l'un d'eux|uno de ellos
l'une d'elles|una de ellas
l'un de nous|uno de nosotros
l'une de vous|una de ustedes
moi qui|yo que
toi qui|tú que
lui qui|él que
elle qui|ella que
nous qui|nosotros que
vous qui|ustedes que
eux qui|ellos que
elles qui|ellas que
moi que|yo a quien
toi que|tú a quien
lui que|él a quien
elle que|ella a quien
tout ce qui|todo lo que
tout ce que|todo lo que
tout ce dont|todo de lo que
ceux d'entre eux|los de entre ellos
celles d'entre elles|las de entre ellas
quelques-uns d'entre eux|algunos de entre ellos
quelques-unes d'entre elles|algunas de entre ellas
nuls et non avenus|nulos y sin efecto
le premier|el primero
la première|la primera
les premiers|los primeros
nul d'entre nous|ninguno de entre nosotros
nul d'entre vous|ninguno de entre ustedes
nul d'entre eux|ninguno de entre ellos
chacun d'entre nous|cada uno de entre nosotros
chacun d'entre vous|cada uno de entre ustedes
chacune d'entre elles|cada una de entre ellas
le moindre d'entre eux|el menor de entre ellos
la moindre d'entre elles|la menor de entre ellas
qui que ce fût|quienquiera que fuese
quoi que ce fût|cualquier cosa que fuese
où que ce fût|dondequiera que fuese
quand que ce fût|cuandoquiera que fuese
tel d'entre eux|tal de entre ellos
telle d'entre elles|tal de entre ellas
aucun de ceux-là|ninguno de aquellos
aucune de celles-là|ninguna de aquellas
plus d'un d'entre eux|más de uno de entre ellos
plus d'une d'entre elles|más de una de entre ellas
le seul d'entre nous|el único de entre nosotros
la seule d'entre vous|la única de entre ustedes
les premières|las primeras
le second|el segundo
la seconde|la segunda
le troisième|el tercero
la troisième|la tercera
celui d'après|el de después
celle d'après|la de después
celui d'avant|el de antes
celle d'avant|la de antes
`);
const B2_FR_PREPOSITIONS = parseWordBlob(`
au sujet de|acerca de
en plus de|además de
à la suite de|a raíz de
jusqu'au|hasta el
jusqu'aux|hasta los
face à|frente a
à la fin de|al final de
au début de|al comienzo de
à l'entrée de|a la entrada de
à la sortie de|a la salida de
au pied de|al pie de
au sommet de|en la cumbre de
au cœur de|en el corazón de
à la tête de|al frente de
à la base de|en la base de
à l'origine de|en el origen de
à la source de|en la fuente de
au centre de|en el centro de
à l'écart de|al margen de
à distance de|a distancia de
à deux pas de|a dos pasos de
à deux doigts de|a dos dedos de
à la veille de|en vísperas de
au lendemain de|al día siguiente de
à l'approche de|a la aproximación de
à l'aube de|al alba de
au crépuscule de|al crepúsculo de
à la tombée de|al caer de
au lever de|al alzarse de
au coucher de|al ponerse de
en haut de|en lo alto de
en bas de|al pie de
en bordure de|en el borde de
en lisière de|en el lindero de
en marge de|al margen de
en retrait de|en repliegue de
en direction de|en dirección a
en provenance de|procedente de
à destination de|con destino a
en quête de|en busca de
à la recherche de|en busca de
à la poursuite de|en persecución de
à l'écoute de|a la escucha de
à la portée de|al alcance de
à portée de|a alcance de
à la merci de|a merced de
à la disposition de|a disposición de
à la charge de|a cargo de
à la solde de|a sueldo de
au service de|al servicio de
à la demande de|a petición de
à la requête de|a instancia de
sur ordre de|por orden de
sur demande de|a solicitud de
sur avis de|a dictamen de
sur proposition de|a propuesta de
sur recommandation de|por recomendación de
sur invitation de|a invitación de
sur initiative de|por iniciativa de
sur décision de|por decisión de
sur instruction de|por instrucción de
à l'initiative de|a iniciativa de
pour le compte de|por cuenta de
du côté de|del lado de
du haut de|desde lo alto de
du fond de|desde el fondo de
de l'autre côté de|al otro lado de
de part et d'autre de|a uno y otro lado de
de la part de|de parte de
à la place de|en lugar de
en remplacement de|en sustitución de
en échange de|a cambio de
en retour de|en retorno de
en compensation de|en compensación de
en contrepartie de|en contrapartida de
par-delà|más allá de
par-delà de|más allá de
au-delà|más allá
en deçà|de este lado
à contre-sens|al revés
à deux lieues de|a dos leguas de
à un jet de pierre de|a un tiro de piedra de
à portée de voix de|a voz de
à portée de main de|a mano de
à portée de vue de|a vista de
à hauteur de|a la altura de
à la hauteur de|a la altura de
au niveau même de|al nivel mismo de
au ras de|a ras de
au plus près|lo más cerca
au plus juste|en lo más justo
au plus vite|lo más pronto
au plus tôt|lo más temprano
au plus tard|lo más tarde
au plus bas|en lo más bajo
au plus haut|en lo más alto
au plus fort|en lo más recio
à l'orée de|en el umbral de
à l'orée du|en el umbral del
au seuil de|en el umbral de
au seuil même de|en el umbral mismo de
à deux encablures de|a dos cables de
à un jet de|a un tiro de
à un pas de|a un paso de
à deux doigts même de|a dos dedos mismos de
en amont|aguas arriba
en aval|aguas abajo
en amont même de|aguas arriba mismas de
en aval même de|aguas abajo mismas de
à la faveur de|al amparo de
à la faveur même de|al amparo mismo de
sous le regard même de|bajo la mirada misma de
sous les yeux mêmes de|ante los mismos ojos de
à l'abri du|al abrigo del
à l'abri des|al abrigo de los
au détriment même de|en perjuicio mismo de
au profit même de|en provecho mismo de
au service même de|al servicio mismo de
à la charge même de|a cargo mismo de
à la demande même de|a petición misma de
sur ordre même de|por orden misma de
pour le compte même de|por cuenta misma de
du côté même de|del lado mismo de
de la part même de|de parte misma de
en échange même de|a cambio mismo de
en contrepartie même de|en contrapartida misma de
à destination même de|con destino mismo a
en provenance même de|procedente mismo de
en direction même de|en dirección misma a
à la poursuite même de|en persecución misma de
à la recherche même de|en busca misma de
en quête même de|en busca misma de
à l'écoute même de|a la escucha misma de
à la merci même de|a merced misma de
à la disposition même de|a disposición misma de
à la solde même de|a sueldo mismo de
à la requête même de|a instancia misma de
sur proposition même de|a propuesta misma de
sur recommandation même de|por recomendación misma de
à l'initiative même de|a iniciativa misma de
à la place même de|en lugar mismo de
en remplacement même de|en sustitución misma de
en compensation même de|en compensación misma de
au pied même de|al pie mismo de
au sommet même de|en la cumbre misma de
au cœur même de|en el corazón mismo de
à la tête même de|al frente mismo de
à la base même de|en la base misma de
à l'origine même de|en el origen mismo de
à la source même de|en la fuente misma de
au centre même de|en el centro mismo de
à l'écart même de|al margen mismo de
à la veille même de|en vísperas mismas de
au lendemain même de|al día siguiente mismo de
à l'approche même de|a la aproximación misma de
à l'aube même de|al alba misma de
en lisière même de|en el lindero mismo de
en marge même de|al margen mismo de
en bordure même de|en el borde mismo de
en retrait même de|en repliegue mismo de
à deux pas même de|a dos pasos mismos de
face même à|frente mismo a
au sujet même de|acerca mismo de
en plus même de|además mismo de
à la suite même de|a raíz misma de
jusqu'au seuil de|hasta el umbral de
jusqu'au bout de|hasta el cabo de
jusqu'au fond de|hasta el fondo de
jusqu'au terme de|hasta el término de
de part de|de parte de
du côté même|del lado mismo
à hauteur même de|a la altura misma de
à portée même de|a alcance mismo de
à la portée même de|al alcance mismo de
hors d'atteinte même de|fuera del alcance mismo de
à rebours même de|a contrapelo mismo de
au mépris même de|al desprecio mismo de
en deçà même de|más acá mismo de
par-delà même|más allá mismo
à l'insu même de|a espaldas mismas de
au vu même de|a la vista misma de
au su même de|con conocimiento mismo de
à l'abri même de|al abrigo mismo de
à l'écart même de|al margen mismo de
au large même de|a resguardo mismo de
`);
const B2_FR_VERBS = parseVerbBlob(`
constater|a constaté|constaté|constatar|constató|constatado|auxiliary-avoir
souligner|a souligné|souligné|subrayar|subrayó|subrayado|auxiliary-avoir
justifier|a justifié|justifié|justificar|justificó|justificado|auxiliary-avoir
nuancer|a nuancé|nuancé|matizar|matizó|matizado|auxiliary-avoir
relativiser|a relativisé|relativisé|relativizar|relativizó|relativizado|auxiliary-avoir
approfondir|a approfondi|approfondi|ahondar|ahondó|ahondado|auxiliary-avoir
élargir|a élargi|élargi|ensanchar|ensanchó|ensanchado|auxiliary-avoir
limiter|a limité|limité|limitar|limitó|limitado|auxiliary-avoir
encadrer|a encadré|encadré|acotar|acotó|acotado|auxiliary-avoir
réglementer|a réglementé|réglementé|reglamentar|reglamentó|reglamentado|auxiliary-avoir
contester|a contesté|contesté|impugnar|impugnó|impugnado|auxiliary-avoir
revendiquer|a revendiqué|revendiqué|reivindicar|reivindicó|reivindicado|auxiliary-avoir
dénoncer|a dénoncé|dénoncé|denunciar|denunció|denunciado|auxiliary-avoir
militer|a milité|milité|militar|militó|militado|auxiliary-avoir
négocier|a négocié|négocié|negociar|negoció|negociado|auxiliary-avoir
concilier|a concilié|concilié|conciliar|concilió|conciliado|auxiliary-avoir
débattre|a débattu|débattu|debatir|debatió|debatido|auxiliary-avoir
affirmer|a affirmé|affirmé|afirmar|afirmó|afirmado|auxiliary-avoir
prétendre|a prétendu|prétendu|pretender|pretendió|pretendido|auxiliary-avoir
soutenir|a soutenu|soutenu|sostener|sostuvo|sostenido|auxiliary-avoir
confirmer|a confirmé|confirmé|confirmar|confirmó|confirmado|auxiliary-avoir
déduire|a déduit|déduit|deducir|dedujo|deducido|auxiliary-avoir
présumer|a présumé|présumé|presumir|presumió|presumido|auxiliary-avoir
aborder|a abordé|abordé|abordar|abordó|abordado|auxiliary-avoir
examiner|a examiné|examiné|examinar|examinó|examinado|auxiliary-avoir
évaluer|a évalué|évalué|evaluar|evaluó|evaluado|auxiliary-avoir
estimer|a estimé|estimé|estimar|estimó|estimado|auxiliary-avoir
juger|a jugé|jugé|juzgar|juzgó|juzgado|auxiliary-avoir
apprécier|a apprécié|apprécié|apreciar|apreció|apreciado|auxiliary-avoir
regretter|a regretté|regretté|lamentar|lamentó|lamentado|auxiliary-avoir
saluer|a salué|salué|saludar|saludó|saludado|auxiliary-avoir
féliciter|a félicité|félicité|felicitar|felicitó|felicitado|auxiliary-avoir
reprocher|a reproché|reproché|reprochar|reprochó|reprochado|auxiliary-avoir
accuser|a accusé|accusé|acusar|acusó|acusado|auxiliary-avoir
réclamer|a réclamé|réclamé|reclamar|reclamó|reclamado|auxiliary-avoir
exiger|a exigé|exigé|exigir|exigió|exigido|auxiliary-avoir
imposer|a imposé|imposé|imponer|impuso|impuesto|auxiliary-avoir
infliger|a infligé|infligé|infligir|infligió|infligido|auxiliary-avoir
accorder|a accordé|accordé|conceder|concedió|concedido|auxiliary-avoir
attribuer|a attribué|attribué|atribuir|atribuyó|atribuido|auxiliary-avoir
allouer|a alloué|alloué|asignar|asignó|asignado|auxiliary-avoir
destiner|a destiné|destiné|destinar|destinó|destinado|auxiliary-avoir
affecter|a affecté|affecté|afectar|afectó|afectado|auxiliary-avoir
renforcer|a renforcé|renforcé|reforzar|reforzó|reforzado|auxiliary-avoir
affaiblir|a affaibli|affaibli|debilitar|debilitó|debilitado|auxiliary-avoir
atténuer|a atténué|atténué|atenuar|atenuó|atenuado|auxiliary-avoir
aggraver|a aggravé|aggravé|agravar|agravó|agravado|auxiliary-avoir
accentuer|a accentué|accentué|acentuar|acentuó|acentuado|auxiliary-avoir
exacerber|a exacerbé|exacerbé|exacerbar|exacerbó|exacerbado|auxiliary-avoir
attiser|a attisé|attisé|avivar|avivó|avivado|auxiliary-avoir
compenser|a compensé|compensé|compensar|compensó|compensado|auxiliary-avoir
pallier|a pallié|pallié|paliar|palió|paliado|auxiliary-avoir
remédier|a remédié|remédié|remediar|remedió|remediado|auxiliary-avoir
contourner|a contourné|contourné|sortear|sorteó|sorteado|auxiliary-avoir
outrepasser|a outrepassé|outrepassé|desbordar|desbordó|desbordado|auxiliary-avoir
acquérir|a acquis|acquis|adquirir|adquirió|adquirido|auxiliary-avoir
requérir|a requis|requis|requerir|requirió|requerido|auxiliary-avoir
asseoir|a assis|assis|asentar|asentó|asentado|auxiliary-avoir
exclure|a exclu|exclu|excluir|excluyó|excluido|auxiliary-avoir
inclure|a inclus|inclus|incluir|incluyó|incluido|auxiliary-avoir
apparaître|est apparu|apparu|aparecer|apareció|aparecido|auxiliary-etre
s'avérer|s'est avéré|avéré|resultar ser|resultó ser|resultado ser|auxiliary-etre
s'imposer|s'est imposé|imposé|imponerse|se impuso|impuesto|auxiliary-etre
s'inscrire|s'est inscrit|inscrit|inscribirse|se inscribió|inscrito|auxiliary-etre
s'engager|s'est engagé|engagé|comprometerse|se comprometió|comprometido|auxiliary-etre
s'opposer|s'est opposé|opposé|oponerse|se opuso|opuesto|auxiliary-etre
se démarquer|s'est démarqué|démarqué|desmarcarse|se desmarcó|desmarcado|auxiliary-etre
se heurter|s'est heurté|heurté|toparse|se topó|topado|auxiliary-etre
se prêter|s'est prêté|prêté|prestarse|se prestó|prestado|auxiliary-etre
se substituer|s'est substitué|substitué|sustituirse|se sustituyó|sustituido|auxiliary-etre
s'ajouter|s'est ajouté|ajouté|sumarse|se sumó|sumado|auxiliary-etre
se répandre|s'est répandu|répandu|extenderse|se extendió|extendido|auxiliary-etre
se situer|s'est situé|situé|situarse|se situó|situado|auxiliary-etre
se dérouler|s'est déroulé|déroulé|desarrollarse|se desarrolló|desarrollado|auxiliary-etre
se produire|s'est produit|produit|producirse|se produjo|producido|auxiliary-etre
se tenir|s'est tenu|tenu|celebrarse|se celebró|celebrado|auxiliary-etre
s'enfuir|s'est enfui|enfui|huir|huyó|huido|auxiliary-etre
se souvenir|s'est souvenu|souvenu|acordarse|se acordó|acordado|auxiliary-etre
se taire|s'est tu|tu|callarse|se calló|callado|auxiliary-etre
s'endormir|s'est endormi|endormi|dormirse|se durmió|dormido|auxiliary-etre
s'agir|s'est agi|agi|tratarse|se trató|tratado|auxiliary-etre
se méfier|s'est méfié|méfié|desconfiar|desconfió|desconfiado|auxiliary-etre
se douter|s'est douté|douté|sospechar|sospechó|sospechado|auxiliary-etre
s'attendre|s'est attendu|attendu|esperarse|se esperó|esperado|auxiliary-etre
postuler|a postulé|postulé|postular|postuló|postulado|auxiliary-avoir
alléguer|a allégué|allégué|alegar|alegó|alegado|auxiliary-avoir
invoquer|a invoqué|invoqué|invocar|invocó|invocado|auxiliary-avoir
récuser|a récusé|récusé|recusar|recusó|recusado|auxiliary-avoir
trancher|a tranché|tranché|resolver de tajo|resolvió de tajo|resuelto de tajo|auxiliary-avoir
arbitrer|a arbitré|arbitré|arbitrar|arbitró|arbitrado|auxiliary-avoir
concerter|a concerté|concerté|concertar|concertó|concertado|auxiliary-avoir
consulter|a consulté|consulté|consultar|consultó|consultado|auxiliary-avoir
auditionner|a auditionné|auditionné|oír en comparecencia|oyó en comparecencia|oído en comparecencia|auxiliary-avoir
instruire|a instruit|instruit|instruir|instruyó|instruido|auxiliary-avoir
statuer|a statué|statué|resolver|resolvió|resuelto|auxiliary-avoir
délibérer|a délibéré|délibéré|deliberar|deliberó|deliberado|auxiliary-avoir
amender|a amendé|amendé|enmendar|enmendó|enmendado|auxiliary-avoir
abroger|a abrogé|abrogé|derogar|derogó|derogado|auxiliary-avoir
ratifier|a ratifié|ratifié|ratificar|ratificó|ratificado|auxiliary-avoir
transposer|a transposé|transposé|transponer|transpuso|transpuesto|auxiliary-avoir
homologuer|a homologué|homologué|homologar|homologó|homologado|auxiliary-avoir
agréer|a agréé|agréé|dar el visto bueno|dio el visto bueno|dado el visto bueno|auxiliary-avoir
habiliter|a habilité|habilité|habilitar|habilitó|habilitado|auxiliary-avoir
destituer|a destitué|destitué|destituir|destituyó|destituido|auxiliary-avoir
muter|a muté|muté|trasladar|trasladó|trasladado|auxiliary-avoir
détacher|a détaché|détaché|adscribir|adscribió|adscrito|auxiliary-avoir
reclasser|a reclassé|reclassé|reubicar|reubicó|reubicado|auxiliary-avoir
licencier|a licencié|licencié|despedir|despidió|despedido|auxiliary-avoir
embaucher|a embauché|embauché|contratar|contrató|contratado|auxiliary-avoir
débaucher|a débauché|débauché|fichar de otra empresa|fichó de otra empresa|fichado de otra empresa|auxiliary-avoir
rémunérer|a rémunéré|rémunéré|remunerar|remuneró|remunerado|auxiliary-avoir
indemniser|a indemnisé|indemnisé|indemnizar|indemnizó|indemnizado|auxiliary-avoir
cotiser|a cotisé|cotisé|cotizar|cotizó|cotizado|auxiliary-avoir
percevoir|a perçu|perçu|percibir|percibió|percibido|auxiliary-avoir
prélever|a prélevé|prélevé|detraer|detrajo|detraído|auxiliary-avoir
imputer|a imputé|imputé|imputar|imputó|imputado|auxiliary-avoir
budgétiser|a budgétisé|budgétisé|presupuestar|presupuestó|presupuestado|auxiliary-avoir
ventiler|a ventilé|ventilé|desglosar|desglosó|desglosado|auxiliary-avoir
plafonner|a plafonné|plafonné|topar|topó|topado|auxiliary-avoir
tarifer|a tarifé|tarifé|tarifar|tarifó|tarifado|auxiliary-avoir
facturer|a facturé|facturé|facturar|facturó|facturado|auxiliary-avoir
encaisser|a encaissé|encaissé|cobrar|cobró|cobrado|auxiliary-avoir
débiter|a débité|débité|cargar en cuenta|cargó en cuenta|cargado en cuenta|auxiliary-avoir
créditer|a crédité|crédité|abonar en cuenta|abonó en cuenta|abonado en cuenta|auxiliary-avoir
rembourser|a remboursé|remboursé|reembolsar|reembolsó|reembolsado|auxiliary-avoir
escompter|a escompté|escompté|descontar|descontó|descontado|auxiliary-avoir
provisionner|a provisionné|provisionné|provisionar|provisionó|provisionado|auxiliary-avoir
amortir|a amorti|amorti|amortizar|amortizó|amortizado|auxiliary-avoir
consolider|a consolidé|consolidé|consolidar|consolidó|consolidado|auxiliary-avoir
assainir|a assaini|assaini|sanear|saneó|saneado|auxiliary-avoir
redresser|a redressé|redressé|enderezar|enderezó|enderezado|auxiliary-avoir
relancer|a relancé|relancé|relanzar|relanzó|relanzado|auxiliary-avoir
revitaliser|a revitalisé|revitalisé|revitalizar|revitalizó|revitalizado|auxiliary-avoir
pérenniser|a pérennisé|pérennisé|hacer perdurable|hizo perdurable|hecho perdurable|auxiliary-avoir
fragiliser|a fragilisé|fragilisé|quebrantar|quebrantó|quebrantado|auxiliary-avoir
précariser|a précarisé|précarisé|precarizar|precarizó|precarizado|auxiliary-avoir
paupériser|a paupérisé|paupérisé|empobrecer|empobreció|empobrecido|auxiliary-avoir
marginaliser|a marginalisé|marginalisé|marginar|marginó|marginado|auxiliary-avoir
stigmatiser|a stigmatisé|stigmatisé|estigmatizar|estigmatizó|estigmatizado|auxiliary-avoir
discriminer|a discriminé|discriminé|discriminar|discriminó|discriminado|auxiliary-avoir
favoriser|a favorisé|favorisé|favorecer|favoreció|favorecido|auxiliary-avoir
privilégier|a privilégié|privilégié|privilegiar|privilegió|privilegiado|auxiliary-avoir
défavoriser|a défavorisé|défavorisé|perjudicar|perjudicó|perjudicado|auxiliary-avoir
amoindrir|a amoindri|amoindri|menguar|menguó|menguado|auxiliary-avoir
miner|a miné|miné|minar|minó|minado|auxiliary-avoir
entamer|a entamé|entamé|iniciar|inició|iniciado|auxiliary-avoir
écorner|a écorné|écorné|mellar|melló|mellado|auxiliary-avoir
obérer|a obéré|obéré|gravar|gravó|gravado|auxiliary-avoir
grever|a grevé|grevé|gravar|gravó|gravado|auxiliary-avoir
contrecarrer|a contrecarré|contrecarré|contrarrestar|contrarrestó|contrarrestado|auxiliary-avoir
neutraliser|a neutralisé|neutralisé|neutralizar|neutralizó|neutralizado|auxiliary-avoir
désamorcer|a désamorcé|désamorcé|desactivar|desactivó|desactivado|auxiliary-avoir
altérer|a altéré|altéré|alterar|alteró|alterado|auxiliary-avoir
détériorer|a détérioré|détérioré|deteriorar|deterioró|deteriorado|auxiliary-avoir
dégrader|a dégradé|dégradé|degradar|degradó|degradado|auxiliary-avoir
recadrer|a recadré|recadré|reencuadrar|reencuadró|reencuadrado|auxiliary-avoir
recentrer|a recentré|recentré|recentrar|recentró|recentrado|auxiliary-avoir
rééquilibrer|a rééquilibré|rééquilibré|reequilibrar|reequilibró|reequilibrado|auxiliary-avoir
réordonner|a réordonné|réordonné|reordenar|reordenó|reordenado|auxiliary-avoir
rééchelonner|a rééchelonné|rééchelonné|reprogramar plazos|reprogramó plazos|reprogramado plazos|auxiliary-avoir
réaffecter|a réaffecté|réaffecté|reasignar|reasignó|reasignado|auxiliary-avoir
redéployer|a redéployé|redéployé|redesplegar|redesplegó|redesplegado|auxiliary-avoir
mutualiser|a mutualisé|mutualisé|poner en común|puso en común|puesto en común|auxiliary-avoir
ventiler|a ventilé|ventilé|desglosar|desglosó|desglosado|auxiliary-avoir
arbitrer|a arbitré|arbitré|arbitrar|arbitró|arbitrado|auxiliary-avoir
trancher|a tranché|tranché|zanjar|zanjó|zanjado|auxiliary-avoir
clore|a clos|clos|cerrar el debate|cerró el debate|cerrado el debate|auxiliary-avoir
`);

export function buildFrenchB2Words(takenIds: ReadonlySet<string>): VocabularyItem[] {
  return [
    ...expandLockedWords("fr", "nouns", B2_FR_NOUNS, takenIds, "B2"),
    ...expandLockedWords("fr", "adjectives", B2_FR_ADJECTIVES, takenIds, "B2"),
    ...expandLockedWords("fr", "adverbs", B2_FR_ADVERBS, takenIds, "B2"),
    ...expandLockedWords("fr", "connectors", B2_FR_CONNECTORS, takenIds, "B2"),
    ...expandLockedWords("fr", "pronouns", B2_FR_PRONOUNS, takenIds, "B2"),
    ...expandLockedWords("fr", "prepositions", B2_FR_PREPOSITIONS, takenIds, "B2"),
  ];
}

export function buildFrenchB2Verbs(takenIds: ReadonlySet<string>): VerbItem[] {
  return expandLockedVerbs("fr", B2_FR_VERBS, takenIds, "B2");
}
