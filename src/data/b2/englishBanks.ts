import { expandLockedVerbs, expandLockedWords } from "../c2/expand";
import { parseVerbBlob, parseWordBlob } from "../c2/parse";
import type { VerbItem, VocabularyItem } from "../../types/vocabulary";

const B2_EN_NOUNS = parseWordBlob(`
stakeholder|parte interesada
shortfall|déficit
turnout|afluencia
uptake|adopción
fallback|plan de reserva
handover|traspaso
takeover|adquisición
walkout|abandono colectivo
lockout|cierre patronal
buyout|compra total
layoff|despido colectivo
cutback|recorte
clampdown|mano dura
crackdown|ofensiva represiva
write-off|baja contable
trade-off|contrapartida
standoff|pulso
showdown|cara a cara
climb-down|marcha atrás
briefing|informe de situación
ruling|fallo
inquiry|investigación oficial
hearing|vista
testimony|declaración testifical
whistle-blower|denunciante interno
embargo|embargo comercial
sanction|sanción
boycott|boicot
mandate|mandato
constituency|circunscripción
electorate|electorado
ballot|papeleta
recount|recuento
framework|marco
watchdog|organismo de control
think-tank|laboratorio de ideas
white paper|libro blanco
red tape|burocracia
outlook|perspectivas
incumbency|mandato en ejercicio
debrief|informe posterior
green paper|libro verde
U-turn|giro de 180 grados
workload|carga de trabajo
headcount|plantilla
payroll|nómina
severance|indemnización
overtime|horas extra
backlog|acumulación de pendientes
throughput|caudal de producción
buy-in|adhesión
sign-off|visto bueno
kick-off|arranque
follow-up|seguimiento
run-up|prolegómenos
run-off|segunda vuelta
spin-off|escisión
sell-off|liquidación masiva
write-down|minusvalía
mark-up|recargo
knock-on|efecto en cadena
fallout|secuelas políticas
leak|filtración
scoop|exclusiva
headline|titular
coverage|cobertura
editorial|artículo de fondo
op-ed|tribuna de opinión
poll|sondeo
pollster|encuestador
swing voter|votante indeciso
landslide|victoria aplastante
hung parliament|parlamento sin mayoría
caucus|asamblea de grupo
whip|disciplinante parlamentario
motion|moción
amendment|enmienda
clause|cláusula
draft|borrador
minutes|acta
remit|cometido
brief|encargo
tender|licitación
bid|oferta
quota|cupo
tariff|arancel
subsidy|subvención
bailout|rescate
slump|hundimiento
rally|rebote
yield|rentabilidad
spread|diferencial
stake|participación
shareholding|paquete accionarial
equity|patrimonio
liability|pasivo
arrears|atrasos
default|impago
winding-up|liquidación societaria
receivership|administración judicial
merger|fusión
due diligence|diligencia debida
revolving door|puerta giratoria
cronyism|amiguismo
graft|prevaricación
kickback|comisión ilegal
slush fund|fondo opaco
pork barrel|clientelismo presupuestario
gerrymander|amaño de distritos
dog-whistle|guiño cifrado
talking point|argumento de consigna
soundbite|frase hecha mediática
spin|sesgo propagandístico
presser|rueda de prensa
source|fuente
exclusive|exclusiva periodística
rebuttal|réplica
secondment|comisión de servicio
workstream|línea de trabajo
deliverable|entregable
milestone|hito
roadmap|hoja de ruta
timeline|calendario
deadline|plazo
timeframe|marco temporal
scope|alcance
scrutiny|escrutinio
probe|indagación
audit|auditoría
appraisal|evaluación
assessment|valoración
benchmark|referencia
baseline|línea de base
threshold|umbral
cap|tope
headroom|margen
wiggle room|margen de maniobra
breathing space|tregua
cooling-off|periodo de reflexión
impasse|punto muerto
logjam|atasco
choke point|punto de estrangulamiento
flashpoint|punto de ignición
tinderbox|polvorín
hotspot|foco de tensión
fault line|línea de falla
splinter group|grupo disidente
hardliner|intransigente
hawk|halcón
dove|partidario del diálogo
swing seat|escaño clave
marginal seat|escaño reñido
safe seat|escaño seguro
by-election|elección parcial
snap election|elección anticipada
caretaker government|gobierno interino
lame duck|mandato residual
tenure|titularidad
incumbent|titular
challenger|aspirante
front-runner|favorito
dark horse|caballo negro
also-ran|descartado
spoiler|candidato estropeador
kingmaker|hacedor de reyes
newsroom|redacción
byline|firma del texto
op-ed|tribuna de opinión
masthead|cabecera
paywall|muro de pago
long read|reportaje largo
dateline|lugar y fecha
press pack|dossier de prensa
photo call|sesión de fotos
doorstep|acoso a la puerta
soundbite|frase corta
talking point|argumentario
spin room|sala de relato
press gaggle|rueda improvisada
town hall|asamblea abierta
all-hands|reunión general
skip-level|reunión saltando mando
awayday|jornada fuera
brown-bag|sesión informal
timesheet|hoja de horas
notice period|preaviso
job share|puesto compartido
hot desk|puesto no fijo
open plan|planta abierta
maternity cover|cobertura de baja
secondment|comisión de servicio
furlough|excedencia temporal
headcount|plantilla
workload|carga de trabajo
backlog|acumulación de tareas
offsite|jornada externa
one-to-one|entrevista individual
probation review|revisión de prueba
exit interview|entrevista de salida
sick note|baja médica
overtime ban|veda de extras
shift pattern|turno rotatorio
pay slip|nómina
redundancy pot|fondo de despidos
`);
const B2_EN_ADJECTIVES = parseWordBlob(`
far-reaching|de largo alcance
wide-ranging|de amplio espectro
long-standing|de larga data
short-lived|efímero
last-ditch|de último recurso
knee-jerk|automático
high-profile|de gran visibilidad
low-key|discreto
hard-hitting|contundente
hard-won|ganado con esfuerzo
hard-nosed|poco sentimental
hard-pressed|acuciado
time-consuming|engorroso
labour-intensive|de mucha mano de obra
cash-strapped|sin liquidez
debt-ridden|ahogado en deudas
overstretched|sobredimensionado
underfunded|infradotado
understaffed|falto de personal
overworked|agobiado de trabajo
overqualified|sobrecualificado
underqualified|infracualificado
long-overdue|más que tardío
much-needed|muy necesario
well-founded|fundado
well-worn|trillado
well-meaning|bienintencionado
well-placed|bien situado
poorly-paid|mal pagado
poorly-run|mal gestionado
tightly-knit|muy unido
thinly-veiled|apenas disimulado
thinly-stretched|al límite
deeply-held|muy arraigado
widely-held|muy extendido
widely-shared|muy compartido
fiercely-contested|reñido
hotly-debated|muy debatido
bitterly-fought|encarnizado
closely-fought|muy reñido
closely-watched|muy vigilado
closely-guarded|celosamente guardado
sweeping|de calado
damning|demoledor
scathing|lacerante
blistering|abrasador
withering|fulminante
unfounded|infundado
unwarranted|injustificado
unjustified|sin justificación
unsubstantiated|sin respaldo
uncorroborated|sin corroborar
unverified|sin verificar
unconfirmed|sin confirmar
unaccountable|sin rendición de cuentas
unchecked|sin contrapeso
unchallenged|sin contestación
unquestioned|sin cuestionar
unforeseeable|imprevisible
unworkable|inviable
unviable|sin viabilidad
unsustainable|insostenible
untenable|indefendible
unenforceable|inejecutable
ungovernable|ingobernable
unmanageable|inmanejable
unprofitable|no rentable
uneconomic|antieconómico
uncompetitive|poco competitivo
unrepresentative|poco representativo
unelected|no electo
unmandated|sin mandato
off-the-record|extraoficial
on-the-record|para constancia
off-limits|vedado
off-balance|desestabilizado
off-message|fuera de discurso
on-message|ajustado al discurso
off-script|fuera de libreto
off-guard|desprevenido
off-putting|desalentador
groundbreaking|pionero
short-sighted|cortoplacista
long-term|a largo plazo
short-term|a corto plazo
medium-term|a medio plazo
full-scale|a gran escala
large-scale|de gran escala
small-scale|de pequeña escala
wide-open|en el aire
tight-lipped|hermético
open-ended|abierto
close-run|muy ajustado
close-knit|muy unido
single-handed|en solitario
even-tempered|ecuánime
quick-tempered|irascible
slow-moving|lento de avance
fast-growing|de rápido crecimiento
fast-paced|de ritmo alto
slow-burn|de efecto tardío
high-stakes|de alto riesgo
low-stakes|de bajo riesgo
high-risk|de alto riesgo
low-risk|de bajo riesgo
high-yield|de alta rentabilidad
low-yield|de baja rentabilidad
high-cost|de alto coste
low-cost|de bajo coste
high-level|de alto nivel
low-level|de bajo nivel
mid-level|de nivel medio
top-level|de máxima instancia
entry-level|de acceso
board-level|de consejo
cabinet-level|de gabinete
cross-party|transversal
cross-border|transfronterizo
cross-cutting|transversal
joined-up|coordinado
evidence-based|basado en pruebas
data-driven|guiado por datos
market-led|guiado por el mercado
state-led|dirigido por el Estado
state-backed|avalado por el Estado
state-owned|de titularidad pública
privately-owned|de titularidad privada
publicly-owned|de titularidad pública
foreign-owned|de capital extranjero
foreign-backed|respaldado desde fuera
home-grown|de cosecha propia
purpose-built|hecho a propósito
custom-built|hecho a medida
off-the-shelf|estándar
last-minute|de última hora
eleventh-hour|in extremis
all-out|a ultranza
all-party|de todos los partidos
all-time|histórico
record-breaking|de récord
record-high|máximo histórico
record-low|mínimo histórico
near-record|casi récord
above-average|por encima de la media
below-average|por debajo de la media
better-than-expected|mejor de lo previsto
worse-than-expected|peor de lo previsto
much-vaunted|muy pregonado
little-known|poco conocido
lesser-known|menos conocido
best-known|más conocido
best-placed|mejor situado
worst-hit|más afectado
hardest-hit|más golpeado
worst-affected|más perjudicado
least-affected|menos afectado
most-affected|más afectado
`);
const B2_EN_ADVERBS = parseWordBlob(`
increasingly|cada vez más
steadily|de forma sostenida
sharply|en picado
steeply|en pronunciada pendiente
modestly|con modestia
marginally|por un margen estrecho
fractionally|por una fracción
narrowly|por los pelos
comfortably|con holgura
handsomely|con creces
squarely|de lleno
firmly|con firmeza
robustly|con solidez
weakly|con flojedad
poorly|de forma deficiente
strongly|con fuerza
fiercely|con encarnizamiento
bitterly|con amargura
hotly|con ardor
closely|de cerca
tightly|con aprieto
loosely|con holgura
openly|abiertamente
privately|en privado
publicly|en público
unofficially|extraoficialmente
informally|de manera informal
provisionally|con carácter provisional
temporarily|con carácter temporal
permanently|con carácter permanente
indefinitely|por tiempo indefinido
retrospectively|con efecto retroactivo
concurrently|de forma concurrente
sequentially|en sucesión
incrementally|por incrementos
exponentially|de forma exponencial
disproportionately|de forma desproporcionada
overwhelmingly|de forma aplastante
decreasingly|cada vez menos
correspondingly|en correspondencia
reportedly|según se informa
allegedly|según se alega
purportedly|según se pretende
reputedly|según se reputa
controversially|de forma polémica
predictably|como era de esperar
unexpectedly|de forma inesperada
inevitably|de forma inevitable
understandably|como es comprensible
regrettably|de forma lamentable
rightly|con razón
wrongly|sin razón
justifiably|con justificación
unjustifiably|sin justificación
arguably|cabe argumentar que
conceivably|es concebible que
plausibly|de forma plausible
credibly|con credibilidad
implausibly|de forma inverosímil
improbably|de forma improbable
across-the-board|de forma generalizada
across the board|de forma generalizada
end to end|de cabo a cabo
end-to-end|de cabo a cabo
year on year|interanual
year-on-year|interanual
month on month|intermensual
month-on-month|intermensual
quarter on quarter|intertrimestral
quarter-on-quarter|intertrimestral
week on week|semana a semana
day by day|día a día
step by step|paso a paso
bit by bit|poco a poco
one by one|uno a uno
case by case|caso por caso
point by point|punto por punto
line by line|línea a línea
in real time|en tiempo real
in hindsight|a toro pasado
in retrospect|en retrospectiva
in prospect|en perspectiva
in practice|en la práctica
in theory|en teoría
in principle|en principio
in effect|en la práctica
in force|en vigor
in place|en vigor
in play|en liza
in limbo|en el limbo
in abeyance|en suspenso
in deadlock|en punto muerto
in reverse|a la inversa
in tandem|al unísono
in parallel|en paralelo
in isolation|de forma aislada
in concert|de consuno
in chorus|al unísono
in unison|al unísono
in lockstep|al unísono
in droves|en tropel
in bulk|a granel
in batches|por lotes
in stages|por etapas
in phases|por fases
in waves|por oleadas
in fits and starts|a trompicones
in dribs and drabs|a cuentagotas
in one go|de una vez
in one sitting|de una sentada
in one stroke|de un plumazo
over time|con el tiempo
over the piece|a lo largo del conjunto
over the long haul|a largo recorrido
over the short haul|a corto recorrido
at short notice|con poco preaviso
at long last|por fin
at face value|al pie de la letra
at a premium|a precio de oro
at a discount|con descuento
at cost|a coste
at source|en origen
at source level|en origen
at board level|a nivel de consejo
at street level|a pie de calle
at ground level|a ras de suelo
at cabinet level|a nivel de gabinete
at ministerial level|a nivel ministerial
at grassroots level|a pie de calle
from scratch|desde cero
from the ground up|desde los cimientos
from the top down|de arriba abajo
from the bottom up|de abajo arriba
from day one|desde el primer día
from the start|desde el arranque
right away|en el acto
straight away|en el acto
straight off|de entrada
straight out|sin rodeos
up front|por adelantado
upfront|por adelantado
out loud|en voz alta
out of hand|de sopetón
out of turn|fuera de turno
out of order|fuera de lugar
out of line|fuera de raya
out of step|desacompasado
out of kilter|desajustado
out of whack|descuadrado
out of joint|desencajado
out of pocket|con cargo propio
out of work|en el paro
out of office|fuera del cargo
out of favour|en desgracia
out of fashion|pasado de moda
out of date|desfasado
up to date|al día
up to speed|al corriente
up to scratch|a la altura
up to par|a la altura
below par|por debajo
above par|por encima
on track|en vía
off track|desviado
on course|en rumbo
off course|fuera de rumbo
on target|en el blanco
off target|fuera de blanco
on schedule|en plazo
behind schedule|con retraso
ahead of schedule|con adelanto
on time|a tiempo
behind time|con retraso
in time|a tiempo
just in time|justo a tiempo
not a moment too soon|ni un momento antes
none too soon|ni un momento antes
`);
const B2_EN_CONNECTORS = parseWordBlob(`
that aside|dejando eso a un lado
quite apart from that|aparte por completo de eso
leaving aside|dejando a un lado
setting that aside|apartando eso
putting that to one side|poniendo eso a un lado
on that note|en esa línea
on a related note|en una línea afín
on a separate note|en otro orden
on another note|en otro tenor
on a different note|en un tenor distinto
on a lighter note|en un tono más ligero
on a more serious note|en un tono más grave
turning to|pasando a
turning now to|pasando ahora a
moving on to|pasando a
coming back to|volviendo a
returning to|regresando a
circling back to|cerrando el círculo hacia
to pick up on|para retomar
to follow up on|para dar seguimiento a
to expand on|para ampliar
to dwell on|para detenerse en
to touch on|para rozar
to build on|para construir sobre
to go further|para ir más allá
going further|yendo más allá
taking this further|llevando esto más lejos
on this score|en este particular
on that score|en ese particular
on this front|en este frente
on that front|en ese frente
on this count|en este punto
on that count|en ese punto
on this reading|en esta lectura
on that reading|en esa lectura
on one reading|en una lectura
on another reading|en otra lectura
on a narrow reading|en una lectura estrecha
on a broad reading|en una lectura amplia
on a generous reading|en una lectura generosa
on a strict reading|en una lectura estricta
on a literal reading|en una lectura literal
on a close reading|en una lectura atenta
taken together|tomado en conjunto
taken separately|tomado por separado
taken as a whole|tomado como un todo
taken at face value|tomado al pie de la letra
taken in isolation|tomado de forma aislada
taken in context|tomado en contexto
viewed this way|visto así
viewed as a whole|visto como un todo
viewed in isolation|visto de forma aislada
viewed in context|visto en contexto
seen this way|visto de este modo
seen as a whole|visto en su conjunto
seen in isolation|visto de forma aislada
seen in context|visto en contexto
looked at this way|mirado así
looked at as a whole|mirado en su conjunto
from this angle|desde este ángulo
from that angle|desde ese ángulo
from this standpoint|desde este punto de vista
from that standpoint|desde ese punto de vista
from this vantage|desde esta atalaya
from that vantage|desde esa atalaya
from this perspective|desde esta perspectiva
from that perspective|desde esa perspectiva
from this viewpoint|desde este enfoque
from that viewpoint|desde ese enfoque
from either side|desde cualquiera de los dos lados
from both sides|desde ambos lados
from all sides|desde todos los lados
from the other side|desde el otro lado
pressed further|apretando más
pressed on this|apretando en esto
read this way|leído así
read that way|leído de ese modo
read narrowly|leído en sentido estrecho
read broadly|leído en sentido amplio
leaving that to one side|dejando eso a un lado
setting this aside|apartando esto
putting this aside|poniendo esto a un lado
putting this to one side|poniendo esto a un lado
shifting the focus|desplazando el foco
shifting ground|cambiando de terreno
changing tack|cambiando de rumbo
changing course|cambiando de curso
changing the subject|cambiando de tema
staying with this|siguiendo con esto
staying with that|siguiendo con eso
sticking with this|ateniéndose a esto
sticking with that|ateniéndose a eso
holding to this|manteniéndose en esto
holding to that|manteniéndose en eso
holding that thought|guardando ese pensamiento
parking that|aparcar eso
parking this|aparcar esto
parking that for now|aparcar eso por ahora
parking this for now|aparcar esto por ahora
bracketing that|poniendo eso entre paréntesis
bracketing this|poniendo esto entre paréntesis
for present purposes|a efectos presentes
for our purposes|a nuestros efectos
for these purposes|a estos efectos
for those purposes|a aquellos efectos
for argument's sake|a efectos de argumentación
for the sake of argument|a efectos de argumentación
for discussion's sake|a efectos de debate
for completeness|a efectos de exhaustividad
for the avoidance of doubt|para evitar dudas
for clarity|a efectos de claridad
for the sake of clarity|en aras de la claridad
for ease of reference|para facilitar la consulta
for ease of reading|para facilitar la lectura
for later reference|para consulta posterior
for now|por ahora
for the moment|por el momento
for the time being|de momento
in the short run|a corto plazo
in the long run|a largo plazo
in the medium term|a medio plazo
in the short term|a corto plazo
in the long term|a largo plazo
over the short term|en el corto plazo
over the long term|en el largo plazo
over the medium term|en el medio plazo
over time|con el tiempo
over the piece|a lo largo del conjunto
on closer inspection|tras un examen más atento
on closer reading|tras una lectura más atenta
on first inspection|a primera vista
on first reading|a primera lectura
on second thoughts|pensándolo mejor
on reflection|tras reflexionar
on further reflection|tras mayor reflexión
on balance of evidence|a la vista de las pruebas
all else equal|siendo lo demás igual
other things equal|siendo lo demás igual
that much granted|concedido eso
that much conceded|concedido eso
granting this|concediendo esto
granting that|concediendo eso
allowing for this|teniendo esto en cuenta
allowing for that|teniendo eso en cuenta
allowing for the fact that|teniendo en cuenta que
factoring this in|incorporando esto
factoring that in|incorporando eso
weighing this up|sopesando esto
weighing that up|sopesando eso
putting it together|juntándolo
putting it in context|poniéndolo en contexto
`);
const B2_EN_PRONOUNS = parseWordBlob(`
those concerned|los afectados
those involved|los implicados
those affected|los perjudicados
those in charge|los responsables
the one in question|el de que se trata
the ones in question|los de que se trata
anyone concerned|cualquiera afectado
anyone involved|cualquiera implicado
someone in charge|alguien al mando
something of the sort|algo por el estilo
anything of the kind|nada de ese jaez
the above|lo anterior
the following|lo siguiente
the foregoing|lo antedicho
such people|tales personas
such things|tales cosas
those present|los presentes
those absent|los ausentes
whoever is responsible|quien resulte responsable
whatever the outcome|sea cual sea el resultado
whichever option|cualquiera de las opciones
anyone of note|alguien de peso
none whatsoever|ninguno en absoluto
all concerned|todos los afectados
all involved|todos los implicados
all present|todos los presentes
one or more|uno o más
two or more|dos o más
few if any|pocos si es que alguno
little if any|poco si es que algo
next to nothing|casi nada
next to none|casi ninguno
hardly anyone|casi nadie
hardly anything|casi nada
scarcely anyone|apenas nadie
scarcely anything|apenas nada
barely anyone|apenas nadie
barely anything|apenas nada
practically nobody|prácticamente nadie
practically nothing|prácticamente nada
virtually nobody|virtualmente nadie
virtually nothing|virtualmente nada
almost anyone|casi cualquiera
almost anything|casi cualquier cosa
pretty much anyone|más o menos cualquiera
pretty much anything|más o menos cualquier cosa
the vast majority|la gran mayoría
the overwhelming majority|la mayoría aplastante
a handful of them|un puñado de ellos
a fraction of them|una fracción de ellos
a minority of them|una minoría de ellos
a majority of them|una mayoría de ellos
the bulk of them|el grueso de ellos
the rest of us|el resto de nosotros
the rest of you|el resto de ustedes
some of us|algunos de nosotros
none of us|ninguno de nosotros
all of us|todos nosotros
either of us|cualquiera de nosotros dos
neither of us|ninguno de nosotros dos
each of us|cada uno de nosotros
any of us|cualquiera de nosotros
few of us|pocos de nosotros
many of us|muchos de nosotros
most of us|la mayoría de nosotros
several of us|varios de nosotros
some of you|algunos de ustedes
all of you|todos ustedes
none of you|ninguno de ustedes
those of us|los de nosotros que
those of you|los de ustedes que
those among us|los de entre nosotros
those among you|los de entre ustedes
the likes of us|gente como nosotros
people like us|gente como nosotros
people like them|gente como ellos
the very people|precisamente esa gente
the very thing|precisamente eso
the same people|la misma gente
the same thing|lo mismo
that sort of thing|eso de ese tipo
this sort of thing|esto de este tipo
that kind of thing|eso de esa índole
this kind of thing|esto de esta índole
things of that kind|cosas de esa índole
things of this sort|cosas de este tipo
the whole lot|el lote entero
the whole thing|el asunto entero
the whole affair|todo el asunto
the matter at hand|el asunto de que se trata
the issue at hand|la cuestión de que se trata
the point at issue|el punto en liza
whatever it takes|lo que haga falta
anyone willing|cualquiera dispuesto
those willing|los dispuestos
those unwilling|los renuentes
those opposed|los contrarios
those in favour|los partidarios
those in favor|los partidarios
the latter of the two|el segundo de los dos
the former of the two|el primero de los dos
neither of the two|ninguno de los dos
either of the two|cualquiera de los dos
both of the two|ambos
one of the two|uno de los dos
the first of these|el primero de estos
the last of these|el último de estos
the next of these|el siguiente de estos
each of these|cada uno de estos
all of these|todos estos
some of these|algunos de estos
none of these|ninguno de estos
few of these|pocos de estos
many of these|muchos de estos
most of these|la mayoría de estos
several of these|varios de estos
any of these|cualquiera de estos
either of these|cualquiera de estos dos
neither of these|ninguno de estos dos
both of these|ambos estos
all of those|todos aquellos
some of those|algunos de aquellos
none of those|ninguno de aquellos
few of those|pocos de aquellos
many of those|muchos de aquellos
most of those|la mayoría de aquellos
several of those|varios de aquellos
any of those|cualquiera de aquellos
each of those|cada uno de aquellos
both of those|ambos aquellos
either of those|cualquiera de aquellos dos
neither of those|ninguno de aquellos dos
whoever among them|quien de entre ellos
whoever among us|quien de entre nosotros
anyone among them|cualquiera de entre ellos
someone among them|alguien de entre ellos
no one among them|nadie de entre ellos
the ones responsible|los responsables
the ones affected|los perjudicados
the ones involved|los implicados
the ones concerned|los afectados
the ones in charge|los que mandan
the ones present|los que están
the ones absent|los que faltan
the ones opposed|los que se oponen
the ones in favour|los que lo apoyan
those of note|los de peso
anyone in particular|alguien en concreto
someone in particular|alguien en concreto
no one in particular|nadie en concreto
`);
const B2_EN_PREPOSITIONS = parseWordBlob(`
according to|según
in terms of|en términos de
in light of|a la luz de
in view of|habida cuenta de
in the light of|a la luz de
rather than|en lugar de
as well as|así como
in charge of|al frente de
in control of|al mando de
in possession of|en posesión de
in receipt of|en recepción de
in need of|necesitado de
in search of|en busca de
in pursuit of|en persecución de
in response to|en respuesta a
in reaction to|en reacción a
in reply to|en contestación a
in answer to|en respuesta a
in opposition to|en oposición a
in protest at|en protesta por
in protest against|en protesta contra
in recognition of|en reconocimiento de
in appreciation of|en agradecimiento de
in acknowledgment of|en reconocimiento de
in celebration of|en celebración de
in commemoration of|en conmemoración de
in tribute to|en homenaje a
in deference to|en deferencia a
in obedience to|en obediencia a
in compliance with|en cumplimiento de
in conformity with|en conformidad con
consistent with|acorde con
incompatible with|incompatible con
at war with|en guerra con
at peace with|en paz con
at home with|a gusto con
at ease with|a sus anchas con
in conflict with|en conflicto con
in competition with|en competencia con
in collaboration with|en colaboración con
in partnership with|en sociedad con
in alliance with|en alianza con
in league with|en connivencia con
in tandem with|al unísono con
in parallel with|en paralelo con
in isolation from|al margen de
far from|lejos de
in favor of|a favor de
for the purpose of|con el fin de
for the benefit of|en beneficio de
against the backdrop of|contra el telón de
in the context of|en el contexto de
in the interest of|en interés de
in the interests of|en interés de
with the exception of|con la excepción de
with the aim of|con el objeto de
with the intention of|con la intención de
with the purpose of|con el propósito de
without regard to|sin atender a
without reference to|sin referencia a
without prejudice to|sin perjuicio de
subject to|sujeto a
based on|asentado en
founded on|fundado en
grounded in|asentado en
rooted in|enraizado en
steeped in|impregnado de
wrapped up in|envuelto en
caught up in|envuelto en
tied to|atado a
linked to|ligado a
linked with|ligado con
associated with|asociado a
coupled with|junto con
paired with|emparejado con
faced with|ante
confronted with|frente a
presented with|ante
provided with|dotado de
equipped with|equipado con
armed with|armado de
charged with|encargado de
tasked with|encomendado a
saddled with|cargado con
lumbered with|cargado con
stuck with|atado a
left with|dejado con
blessed with|dotado de
burdened with|gravado con
filled with|lleno de
packed with|repleto de
riddled with|sembrado de
dealing with|frente a
compared with|frente a
compared to|frente a
as opposed to|a diferencia de
proportionate to|proporcionado a
proportional to|proporcional a
equivalent to|equivalente a
tantamount to|equivalente a
conducive to|propicio a
prone to|propenso a
liable to|expuesto a
liable for|responsable de
responsible for|responsable de
accountable for|obligado a rendir cuentas de
answerable for|responsable de
eligible for|elegible para
suitable for|adecuado para
unfit for|incapaz para
ripe for|maduro para
destined for|destinado a
bound for|rumbo a
headed for|encaminado a
intended for|destinado a
meant for|pensado para
reserved for|reservado a
earmarked for|asignado a
set aside for|reservado para
in store for|aguardando a
in wait for|al acecho de
known for|conocido por
noted for|señalado por
renowned for|afamado por
notorious for|tristemente célebre por
blamed for|culpado de
praised for|elogiado por
criticised for|criticado por
compensated for|compensado por
reimbursed for|reembolsado por
at the request of|a petición de
at the invitation of|a invitación de
at the suggestion of|a sugerencia de
at the recommendation of|a recomendación de
on the advice of|por consejo de
on the recommendation of|por recomendación de
on the instruction of|por instrucción de
on the orders of|por órdenes de
under the orders of|bajo las órdenes de
under the direction of|bajo la dirección de
under the supervision of|bajo la supervisión de
under the management of|bajo la gestión de
under the control of|bajo el control de
under the authority of|bajo la autoridad de
under the leadership of|bajo el liderazgo de
under the chairmanship of|bajo la presidencia de
under the auspices of|bajo los auspicios de
under the patronage of|bajo el patrocinio de
under the protection of|bajo la protección de
under the umbrella of|bajo el paraguas de
under the banner of|bajo la bandera de
under the heading of|bajo el epígrafe de
under the title of|bajo el título de
under the name of|bajo el nombre de
in the name of|en nombre de
in the shape of|en forma de
in the form of|en forma de
in the mould of|al molde de
in the style of|al estilo de
in the manner of|al modo de
in the spirit of|en el espíritu de
in the tradition of|en la tradición de
in the footsteps of|tras los pasos de
in the shadow of|a la sombra de
`);
const B2_EN_VERBS = parseVerbBlob(`
undermine|undermined|undermined|minar|minó|minado|regular
outweigh|outweighed|outweighed|pesar más que|pesó más que|pesado más que|regular
oversee|oversaw|overseen|supervisar|supervisó|supervisado|irregular
undertake|undertook|undertaken|emprender|emprendió|emprendido|irregular
undergo|underwent|undergone|someterse a|se sometió a|sometido a|irregular
overrule|overruled|overruled|revocar|revocó|revocado|regular
override|overrode|overridden|imponerse a|se impuso a|impuesto a|irregular
overhaul|overhauled|overhauled|reformar a fondo|reformó a fondo|reformado a fondo|regular
overlook|overlooked|overlooked|pasar por alto|pasó por alto|pasado por alto|regular
overstate|overstated|overstated|exagerar|exageró|exagerado|regular
understate|understated|understated|quitar hierro a|quitó hierro a|quitado hierro a|regular
undercut|undercut|undercut|hacer la competencia a la baja|hizo la competencia a la baja|hecho la competencia a la baja|irregular
underscore|underscored|underscored|subrayar|subrayó|subrayado|regular
underpin|underpinned|underpinned|apuntalar|apuntaló|apuntalado|regular
upgrade|upgraded|upgraded|mejorar de categoría|mejoró de categoría|mejorado de categoría|regular
update|updated|updated|poner al día|puso al día|puesto al día|regular
unfold|unfolded|unfolded|desarrollarse|se desarrolló|desarrollado|regular
unravel|unraveled|unraveled|desentrañar|desentrañó|desentrañado|regular
unveil|unveiled|unveiled|desvelar|desveló|desvelado|regular
outpace|outpaced|outpaced|adelantar en ritmo|adelantó en ritmo|adelantado en ritmo|regular
outlast|outlasted|outlasted|durar más que|duró más que|durado más que|regular
outnumber|outnumbered|outnumbered|superar en número|superó en número|superado en número|regular
outperform|outperformed|outperformed|superar en rendimiento|superó en rendimiento|superado en rendimiento|regular
outstrip|outstripped|outstripped|dejar atrás|dejó atrás|dejado atrás|regular
outvote|outvoted|outvoted|vencer en la votación|venció en la votación|vencido en la votación|regular
reassess|reassessed|reassessed|reevaluar|reevaluó|reevaluado|regular
rethink|rethought|rethought|repensar|repensó|repensado|irregular
reframe|reframed|reframed|reformular el marco|reformuló el marco|reformulado el marco|regular
reshuffle|reshuffled|reshuffled|reordenar|reordenó|reordenado|regular
restructure|restructured|restructured|reestructurar|reestructuró|reestructurado|regular
realign|realigned|realigned|realinear|realineó|realineado|regular
reallocate|reallocated|reallocated|reasignar|reasignó|reasignado|regular
renegotiate|renegotiated|renegotiated|renegociar|renegoció|renegociado|regular
reimburse|reimbursed|reimbursed|reembolsar|reembolsó|reembolsado|regular
repeal|repealed|repealed|derogar|derogó|derogado|regular
revoke|revoked|revoked|revocar|revocó|revocado|regular
overturn|overturned|overturned|anular|anuló|anulado|regular
broker|brokered|brokered|mediar|medió|mediado|regular
spearhead|spearheaded|spearheaded|encabezar|encabezó|encabezado|regular
table|tabled|tabled|someter a debate|sometió a debate|sometido a debate|regular
shelve|shelved|shelved|aparcar|aparcó|aparcado|regular
phase out|phased out|phased out|retirar por fases|retiró por fases|retirado por fases|regular
phase in|phased in|phased in|introducir por fases|introdujo por fases|introducido por fases|regular
roll out|rolled out|rolled out|desplegar|desplegó|desplegado|regular
roll back|rolled back|rolled back|echar atrás|echó atrás|echado atrás|regular
scale back|scaled back|scaled back|reducir de escala|redujo de escala|reducido de escala|regular
scale up|scaled up|scaled up|ampliar de escala|amplió de escala|ampliado de escala|regular
step down|stepped down|stepped down|dimitir|dimitió|dimitido|regular
step up|stepped up|stepped up|intensificar|intensificó|intensificado|regular
step aside|stepped aside|stepped aside|apartarse|se apartó|apartado|regular
step in|stepped in|stepped in|intervenir|intervino|intervenido|regular
stand down|stood down|stood down|retirarse|se retiró|retirado|irregular
stand by|stood by|stood by|mantenerse firme|se mantuvo firme|mantenido firme|irregular
stand for|stood for|stood for|significar|significó|significado|irregular
back down|backed down|backed down|ceder|cedió|cedido|regular
back out|backed out|backed out|echarse atrás|se echó atrás|echado atrás|regular
back off|backed off|backed off|recular|reculó|reculado|regular
call off|called off|called off|suspender|suspendió|suspendido|regular
call out|called out|called out|señalar en público|señaló en público|señalado en público|regular
call in|called in|called in|llamar a consulta|llamó a consulta|llamado a consulta|regular
call for|called for|called for|reclamar|reclamó|reclamado|regular
crack down|cracked down|cracked down|apretar las tuercas|apretó las tuercas|apretado las tuercas|regular
clamp down|clamped down|clamped down|poner coto|puso coto|puesto coto|regular
write off|wrote off|written off|dar de baja|dio de baja|dado de baja|irregular
take over|took over|taken over|tomar el control|tomó el control|tomado el control|irregular
take on|took on|taken on|asumir|asumió|asumido|irregular
take up|took up|taken up|retomar|retomó|retomado|irregular
take apart|took apart|taken apart|desmontar|desmontó|desmontado|irregular
bring about|brought about|brought about|provocar|provocó|provocado|irregular
bring forward|brought forward|brought forward|adelantar|adelantó|adelantado|irregular
bring in|brought in|brought in|introducir|introdujo|introducido|irregular
bring out|brought out|brought out|sacar a la luz|sacó a la luz|sacado a la luz|irregular
put forward|put forward|put forward|plantear|planteó|planteado|irregular
put off|put off|put off|aplazar|aplazó|aplazado|irregular
put through|put through|put through|sacar adelante|sacó adelante|sacado adelante|irregular
put across|put across|put across|hacer entender|hizo entender|hecho entender|irregular
put aside|put aside|put aside|apartar|apartó|apartado|irregular
get across|got across|gotten across|hacer llegar|hizo llegar|hecho llegar|irregular
get away with|got away with|gotten away with|salirse con la suya|se salió con la suya|salido con la suya|irregular
get on with|got on with|gotten on with|seguir con|siguió con|seguido con|irregular
come under|came under|come under|verse sometido a|se vio sometido a|visto sometido a|irregular
come down to|came down to|come down to|reducirse a|se redujo a|reducido a|irregular
come up with|came up with|come up with|dar con|dio con|dado con|irregular
come out with|came out with|come out with|soltar|soltó|soltado|irregular
go along with|went along with|gone along with|secundar|secundó|secundado|irregular
go through with|went through with|gone through with|llevar a cabo|llevó a cabo|llevado a cabo|irregular
go back on|went back on|gone back on|desdecirse de|se desdijo de|desdicho de|irregular
hold off|held off|held off|contener|contuvo|contenido|irregular
hold out|held out|held out|resistir|resistió|resistido|irregular
hold back|held back|held back|contener|contuvo|contenido|irregular
hold on|held on|held on|aferrarse|se aferró|aferrado|irregular
turn down|turned down|turned down|rechazar|rechazó|rechazado|regular
turn out|turned out|turned out|resultar|resultó|resultado|regular
turn around|turned around|turned around|darle la vuelta|le dio la vuelta|dado la vuelta|regular
turn over|turned over|turned over|entregar|entregó|entregado|regular
turn up|turned up|turned up|comparecer|compareció|comparecido|regular
carry out|carried out|carried out|llevar a cabo|llevó a cabo|llevado a cabo|regular
carry on|carried on|carried on|seguir adelante|siguió adelante|seguido adelante|regular
follow through|followed through|followed through|llevar hasta el final|llevó hasta el final|llevado hasta el final|regular
follow up|followed up|followed up|dar seguimiento|dio seguimiento|dado seguimiento|regular
look into|looked into|looked into|indagar|indagó|indagado|regular
look over|looked over|looked over|repasar|repasó|repasado|regular
see through|saw through|seen through|calarlo|lo caló|calado|irregular
see to|saw to|seen to|ocuparse de|se ocupó de|ocupado de|irregular
see about|saw about|seen about|encargarse de|se encargó de|encargado de|irregular
set out|set out|set out|exponer|expuso|expuesto|irregular
set off|set off|set off|desencadenar|desencadenó|desencadenado|irregular
set aside|set aside|set aside|reservar|reservó|reservado|irregular
set about|set about|set about|ponerse a|se puso a|puesto a|irregular
set in|set in|set in|instalarse|se instaló|instalado|irregular
lay off|laid off|laid off|despedir|despidió|despedido|irregular
lay out|laid out|laid out|exponer|expuso|expuesto|irregular
lay down|laid down|laid down|sentar|sentó|sentado|irregular
wind up|wound up|wound up|acabar|acabó|acabado|irregular
wind down|wound down|wound down|ir relajándose|fue relajándose|ido relajándose|irregular
brief|briefed|briefed|poner al corriente|puso al corriente|puesto al corriente|regular
debrief|debriefed|debriefed|tomar declaración posterior|tomó declaración posterior|tomado declaración posterior|regular
leak|leaked|leaked|filtrar|filtró|filtrado|regular
spin|spun|spun|sesgar|sesgó|sesgado|irregular
flag|flagged|flagged|señalar|señaló|señalado|regular
green-light|green-lighted|green-lighted|dar luz verde|dio luz verde|dado luz verde|regular
rubber-stamp|rubber-stamped|rubber-stamped|avalar sin más|avaló sin más|avalado sin más|regular
fast-track|fast-tracked|fast-tracked|tramitar por vía rápida|tramitó por vía rápida|tramitado por vía rápida|regular
shortlist|shortlisted|shortlisted|preseleccionar|preseleccionó|preseleccionado|regular
tap|tapped|tapped|echar mano de|echó mano de|echado mano de|regular
second|seconded|seconded|ceder en comisión|cedió en comisión|cedido en comisión|regular
sound out|sounded out|sounded out|sondear|sondeó|sondeado|regular
flesh out|fleshed out|fleshed out|desarrollar|desarrolló|desarrollado|regular
iron out|ironed out|ironed out|allanar|allanó|allanado|regular
rule out|ruled out|ruled out|descartar|descartó|descartado|regular
single out|singled out|singled out|señalar|señaló|señalado|regular
spell out|spelled out|spelled out|dejar sentado|dejó sentado|dejado sentado|regular
map out|mapped out|mapped out|trazar|trazó|trazado|regular
play down|played down|played down|quitar importancia|quitó importancia|quitado importancia|regular
play up|played up|played up|hacer hincapié|hizo hincapié|hecho hincapié|regular
water down|watered down|watered down|diluir|diluyó|diluido|regular
ratchet up|ratcheted up|ratcheted up|subir de tono|subió de tono|subido de tono|regular
double down|doubled down|doubled down|redoblar la apuesta|redobló la apuesta|redoblado la apuesta|regular
walk back|walked back|walked back|desdecirse de|se desdijo de|desdicho de|regular
row back|rowed back|rowed back|dar marcha atrás|dio marcha atrás|dado marcha atrás|regular
push back|pushed back|pushed back|plantarse|se plantó|plantado|regular
push through|pushed through|pushed through|sacar adelante|sacó adelante|sacado adelante|regular
fall short|fell short|fallen short|quedarse corto|se quedó corto|quedado corto|irregular
fall behind|fell behind|fallen behind|quedarse atrás|se quedó atrás|quedado atrás|irregular
live up to|lived up to|lived up to|estar a la altura de|estuvo a la altura de|estado a la altura de|regular
measure up|measured up|measured up|dar la talla|dio la talla|dado la talla|regular
gauge|gauged|gauged|calibrar|calibró|calibrado|regular
lobby|lobbied|lobbied|presionar en los pasillos|presionó en los pasillos|presionado en los pasillos|regular
tone down|toned down|toned down|bajar el tono|bajó el tono|bajado el tono|regular
beef up|beefed up|beefed up|reforzar|reforzó|reforzado|regular
shore up|shored up|shored up|apuntalar|apuntaló|apuntalado|regular
paper over|papered over|papered over|tapar las grietas|tapó las grietas|tapado las grietas|regular
gloss over|glossed over|glossed over|pasar por alto|pasó por alto|pasado por alto|regular
talk down|talked down|talked down|menospreciar|menospreció|menospreciado|regular
talk up|talked up|talked up|ponderar|ponderó|ponderado|regular
clock off|clocked off|clocked off|fichar la salida|fichó la salida|fichado la salida|regular
phone in|phoned in|phoned in|hacer de trámite|hizo de trámite|hecho de trámite|regular
write in|wrote in|written in|escribir para opinar|escribió para opinar|escrito para opinar|irregular
`);

export function buildEnglishB2Words(takenIds: ReadonlySet<string>): VocabularyItem[] {
  return [
    ...expandLockedWords("en", "nouns", B2_EN_NOUNS, takenIds, "B2"),
    ...expandLockedWords("en", "adjectives", B2_EN_ADJECTIVES, takenIds, "B2"),
    ...expandLockedWords("en", "adverbs", B2_EN_ADVERBS, takenIds, "B2"),
    ...expandLockedWords("en", "connectors", B2_EN_CONNECTORS, takenIds, "B2"),
    ...expandLockedWords("en", "pronouns", B2_EN_PRONOUNS, takenIds, "B2"),
    ...expandLockedWords("en", "prepositions", B2_EN_PREPOSITIONS, takenIds, "B2"),
  ];
}

export function buildEnglishB2Verbs(takenIds: ReadonlySet<string>): VerbItem[] {
  return expandLockedVerbs("en", B2_EN_VERBS, takenIds, "B2");
}
