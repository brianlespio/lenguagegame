import { expandLockedVerbs, expandLockedWords } from "../c2/expand";
import { parseVerbBlob, parseWordBlob } from "../c2/parse";
import type { VerbItem, VocabularyItem } from "../../types/vocabulary";

const C1_EN_NOUNS = parseWordBlob(`
shortfall|déficit
uptake|adopción
buy-in|adhesión
trade-off|contrapartida
knock-on|efecto en cadena
spillover|efecto contagio
blowback|contragolpe político
pushback|rechazo frontal
walkout|abandono de sala
lockout|cierre patronal
stand-off|impasse tenso
climbdown|marcha atrás
about-turn|giro de ciento ochenta
write-off|castigo contable
write-down|saneamiento
sell-off|desinversión masiva
takeover|opa
spin-off|escisión
carve-out|segregación
headcount|plantilla
headroom|margen de maniobra
war chest|caja de guerra
slush fund|fondo opaco
sinecure|sinecura
incumbency|titularidad del cargo
remit|competencia
caseload|carga de expedientes
backlog|acumulación de pendientes
throughput|ritmo de tramitación
turnaround|saneamiento exprés
lead time|plazo de entrega
slippage|deslizamiento de plazos
overrun|desvío de coste
overspend|gasto de más
underspend|gasto de menos
mismatch|desajuste
misalignment|desalineación
disconnect|desconexión
fault line|línea de falla
flashpoint|punto de eclosión
tinderbox|polvorín
powder keg|barril de pólvora
tripwire|disparador automático
tipping point|punto de no retorno
juncture|coyuntura
crossroads|encrucijada
impasse|punto muerto
logjam|atasco de trámites
choke point|cuello de botella
stranglehold|ahogo
leverage|apalancamiento
sway|ascendiente
heft|envergadura
firepower|musculatura financiera
footprint|huella operativa
bandwidth|capacidad de atención
uproar|alboroto
hue and cry|clamor público
secondment|comisión de servicios
furlough|excedencia forzosa
garden leave|permiso de exclusión retribuido
notice period|preaviso
cooling-off|plazo de desistimiento
standstill|tregua contractual
surcharge|recargo
clawback|reintegro
haircut|quita
bailout|rescate
bail-in|recapitalización interna
fire sale|liquidación a pérdidas
going concern|empresa en funcionamiento
goodwill|fondo de comercio
whistleblower|denunciante interno
leak|filtración
briefing|sesión informativa
backgrounder|nota de contexto
doorstep|declaración a la puerta
soundbite|frase hecha mediática
talking point|argumento de campaña
holding line|consigna de espera
watchdog|organismo de vigilancia
ombudsman|defensor del pueblo
quango|ente semipúblico
think tank|laboratorio de ideas
task force|grupo de choque
working party|grupo de trabajo
steering group|comité rector
standing committee|comisión permanente
select committee|comisión de investigación
inquiry|comisión de pesquisa
inquest|pesquisa judicial
hearing|vista
sitting|sesión plenaria
adjournment|aplazamiento de sesión
deferral|diferimiento
stay|suspensión cautelar
injunction|interdicto
restraining order|orden de alejamiento
gagging order|orden de silencio
super-injunction|superinterdicto
discovery|exhibición de pruebas
shortlist|terna
longlist|lista amplia
run-off|segunda vuelta
recount|recuento
hung parliament|parlamento sin mayoría
hung jury|jurado en desacuerdo
landslide|paliza electoral
wipeout|barrida
swing|vuelco electoral
turnout|participación electoral
spoilt ballot|voto nulo
postal vote|voto por correo
proxy vote|voto por poder
three-line whip|mandato de voto estricto
free vote|voto en conciencia
pairing|emparejamiento de ausencias
by-election|elección parcial
snap election|elección adelantada
caretaker government|gobierno en funciones
no-confidence|moción de censura
censure motion|moción de reprobación
white paper|libro blanco
green paper|libro verde
command paper|documento gubernamental
statutory instrument|reglamento con rango legal
sunset clause|cláusula de caducidad
grandfathering|derechos adquiridos
wrecking amendment|enmienda de torpedeo
reasoned amendment|enmienda de totalidad
caveat|salvedad
proviso|condición resolutoria
rider|cláusula adicional
small print|letra pequeña
get-out|cláusula de escape
break clause|cláusula de resolución anticipada
lock-in|período de permanencia
lock-up|período de indisponibilidad
non-compete|pacto de no competencia
sign-off|visto bueno
go-ahead|luz verde
scorecard|cuadro de mando
headline figure|cifra de portada
headline rate|tasa de portada
underlying rate|tasa subyacente
controlling stake|participación de control
blocking stake|participación de bloqueo
golden share|acción de oro
poison pill|píldora venenosa
white knight|caballero blanco
dawn raid|asalto al alba
concert party|pacto de sindicación
receivership|administración concursal
winding-up|liquidación societaria
stewardship|tutela gestora
chairmanship|presidencia
speakership|presidencia de la cámara
rapporteurship|ponentía
workload|carga de trabajo
pipeline|cartera de proyectos
runway|colchón de caja
burn rate|ritmo de quema
revolving door|puerta giratoria
glass ceiling|techo de cristal
old-boy network|camarilla de enchufes
golden handshake|indemnización de oro
golden parachute|paracaídas dorado
sweetheart deal|trato de favor
pork barrel|clientelismo presupuestario
cap|tope
floor|suelo de precios
ceiling|techo de precios
collar|banda de precios
bracket|tramo
tier|escalón
rung|peldaño
windfall tax|gravamen extraordinario
deep background|fuente sin atribución
line to take|consigna
gag|mordaza
disclosure duty|deber de revelación
public interest|interés público
money bill|proyecto de ley de crédito
enabling act|ley de habilitación
framework law|ley marco
hardship clause|cláusula de onerosidad
gagging clause|cláusula de silencio
bottom line|resultado neto
top line|cifra de negocio
holdings|participaciones
stakeholding|tenencia de participación
tutelage|tutela
wardship|guarda
trusteeship|fideicomiso
black knight|caballero negro
cooling-off period|plazo de reflexión
notice to quit|requerimiento de desahucio
show of hands|votación a mano alzada
roll-call|votación nominal
voice vote|votación por asentimiento
casting vote|voto de calidad
proxy battle|pugna de poderes
rights issue|ampliación de capital
scrip issue|ampliación liberada
share buyback|recompra de acciones
dividend strip|desgaje del dividendo
Chinese wall|muralla china
ring-fence|cortafuegos patrimonial
safe harbour|puerto seguro
safe seat|feudo electoral
marginal seat|escaño bisagra
bellwether seat|escaño termómetro
rotten borough|burgo podrido
pocket borough|burgo de bolsillo
gerrymander|amaño de distritos
dog-whistle|guiño cifrado
dead cat|cortina de humo
kite-flying|globo sonda
trial balloon|globo de ensayo
straw poll|sondeo informal
exit poll|sondeo a pie de urna
opinion former|forjador de criterio
gatekeeper|portero de acceso
rainmaker|captador de grandes cuentas
rainy-day fund|colchón anticíclico
sinking fund|fondo de amortización
escrow|depósito en garantía
earnest money|señal
retainer|provisión de fondos
success fee|honorario de éxito
contingency fee|cuota litis
brief|encargo profesional
docket|lista de causas
case file|pieza de autos
paper trail|rastro documental
audit trail|pista de auditoría
smoking gun|prueba reina
red flag|señal de alarma
yellow card|amonestación
red card|expulsión
own goal|autogol político
banana skin|resbalón
banana peel|cáscara de plátano
hot potato|patata caliente
poisoned chalice|cáliz envenenado
hospital pass|balón envenenado
poisoned well|pozo envenenado
fig leaf|hoja de parra
smokescreen|cortina de humo
window dressing|maquillaje de cifras
creative accounting|contabilidad creativa
off-books|fuera de libros
shadow banking|banca en la sombra
shadow cabinet|gabinete en la sombra
kitchen cabinet|camarilla de cocina
war room|cuartel de campaña
situation room|sala de crisis
press pack|jauría de prensa
lobby fodder|carne de cañón parlamentaria
cannon fodder|carne de cañón
rank and file|base militante
grass roots|bases
astroturf|movilización de cartón
astroturfing|movilización fingida
sock puppet|títere de identidad falsa
front organisation|organización pantalla
cut-out|intermediario opaco
go-between|intermediario
middleman|intermediario mercantil
gatekeeping|control de acceso
capture|captura del regulador
regulatory capture|captura regulatoria
mission creep|desvío de mandato
scope creep|ensanchamiento del encargo
feature creep|hinchazón de funciones
function creep|deslizamiento de uso
mandate|encargo
terms of reference|mandato de la investigación
terms of trade|relación real de intercambio
terms of engagement|condiciones de encargo
rules of engagement|reglas de enfrentamiento
ground rules|reglas de juego
house rules|reglamento interno
standing orders|reglamento de sesiones
order paper|orden del día
order of business|orden de trabajos
business of the house|asuntos de la cámara
points of order|cuestiones de orden
point of order|cuestión de orden
point of privilege|cuestión de fuero
contempt|desacato
privilege motion|moción de fuero
early-day motion|moción de día próximo
ten-minute rule|trámite de diez minutos
private member's bill|proyecto de diputado
hybrid bill|proyecto mixto
money resolution|autorización de crédito
ways and means|hacienda y gravámenes
supply day|día de créditos
estimates day|día de presupuestos
queen's speech|discurso de la corona
king's speech|discurso de la corona
gracious speech|discurso de la corona
prorogation|cierre de legislatura
dissolution|disolución de la cámara
writ of election|convocatoria electoral
returning officer|junta electoral
presiding officer|presidente de mesa
teller|escrutador
whip's office|oficina de disciplina
usual channels|canales habituales
behind the chair|en los pasillos
smoke-filled room|despacho cerrado
backroom deal|apaño de pasillo
side deal|acuerdo colateral
side letter|carta colateral
memorandum of understanding|acta de entendimiento
heads of terms|principios de acuerdo
term sheet|hoja de condiciones
letter of intent|carta de intenciones
comfort letter|carta de confort
side agreement|pacto accesorio
lock-out agreement|pacto de exclusividad
exclusivity|exclusividad
earn-out|pago diferido por resultados
claw-in|retención de bonus
malus|ajuste negativo
deferred bonus|bonus diferido
golden hello|prima de fichaje
handcuff clause|cláusula de permanencia
garden-leave clause|cláusula de exclusión
severance|finiquito
redundancy|despido por amortización
layoff|expediente de empleo
furlough scheme|erte
work-to-rule|huelga de celo
go-slow|huelga de ritmo
wildcat strike|huelga salvaje
sympathy strike|huelga de solidaridad
secondary action|acción de apoyo
picketing|piquete
flying picket|piquete volante
closed shop|sindicato obligatorio
check-off|descuento sindical
recognition|reconocimiento sindical
bargaining unit|unidad de negociación
pay round|ronda salarial
pay freeze|congelación salarial
pay cap|tope salarial
pay drag|arrastre fiscal
fiscal drag|progresividad en frío
bracket creep|deslizamiento de tramos
tax take|recaudación
tax gap|brecha fiscal
tax wedge|cuña fiscal
tax shelter|refugio fiscal
tax haven|paraíso fiscal
brass plate|despacho pantalla
letterbox company|sociedad buzón
shell company|sociedad pantalla
front company|empresa tapadera
nominee shareholder|accionista fiduciario
beneficial owner|titular real
ultimate owner|último titular
person of significant control|persona con control significativo
politically exposed person|persona políticamente expuesta
source of wealth|origen del patrimonio
source of funds|origen de los fondos
know-your-customer|diligencia de cliente
enhanced due diligence|diligencia reforzada
red-flag report|informe de alerta
suspicious activity report|comunicación de operación sospechosa
tipping-off|aviso al investigado
safe-harbour letter|carta de puerto seguro
no-action letter|carta de no actuación
comfort opinion|dictamen de confort
legal opinion|dictamen jurídico
counsel's opinion|parecer del letrado
leading counsel|letrado director
junior counsel|letrado adjunto
silk|letrado de prestigio
stuff gown|toga menor
bench|estrado
bar|colegio de abogados
inns of court|colegios de letrados
chambers|despacho de letrados
clerk of chambers|secretario de despacho
brief fee|honorario de encargo
refresher|honorario de continuación
wasted costs|costas innecesarias
security for costs|caución de costas
without-prejudice save|reserva de costas
Calderbank offer|oferta reservada de costas
Part 36 offer|oferta procesal de transacción
Tomlin order|auto de transacción
consent order|auto de conformidad
unless order|apercibimiento de archivo
unless notice|requerimiento bajo apercibimiento
unless direction|providencia bajo apercibimiento
`);
const C1_EN_ADJECTIVES = parseWordBlob(`
far-reaching|de largo alcance
wide-ranging|de amplio espectro
sweeping|de brocha gorda
blanket|generalizado
across-the-board|lineal
unqualified|sin matices
unreserved|sin reservas
unequivocal|sin ambages
unambiguous|sin doblez
clear-cut|nítido
cut-and-dried|zanjado
open-and-shut|de cajón
watertight|inatacable
airtight|hermético
bulletproof|a prueba de balas
fireproof|a prueba de fuego
copper-bottomed|de solvencia plena
gilt-edged|de primera firma
blue-chip|de primer orden
top-flight|de primera fila
high-calibre|de alto calibre
heavyweight|de peso pesado
lightweight|de poco peso
middleweight|de peso medio
featherweight|de peso pluma
paper-thin|de papel
skin-deep|de puerta para afuera
deep-rooted|de raíz honda
long-standing|de larga data
long-running|de largo recorrido
short-lived|de vida corta
short-term|de corto plazo
medium-term|de medio plazo
long-term|de largo plazo
near-term|de plazo inmediato
full-blown|en toda regla
full-scale|a gran escala
full-throated|a voz en cuello
full-blooded|sin tapujos
half-hearted|a medias
wholehearted|de corazón entero
single-minded|de una pieza
narrow-minded|de miras estrechas
broad-minded|de miras anchas
open-minded|receptivo
closed-minded|cerrado de mollera
even-tempered|de temple parejo
quick-tempered|de mecha corta
short-tempered|de genio vivo
hot-tempered|de sangre caliente
cool-headed|de cabeza fría
hard-nosed|de uña dura
hard-edged|de filo duro
soft-spoken|de voz baja
plain-spoken|de palabra llana
outspoken|de palabra suelta
soft-pedalled|atenuado
hard-hitting|de golpe seco
hard-won|ganado con uñas
hard-earned|ganado con sudor
well-earned|bien merecido
well-founded|fundado
ill-founded|infundado
well-grounded|asentado
ill-grounded|mal asentado
well-worn|trillado
time-worn|de tanto uso
time-honoured|consagrado por el uso
battle-hardened|curtido en lid
battle-scarred|marcado por la lid
war-weary|hastiado de lid
travel-weary|molido de viaje
world-weary|hastiado del mundo
careworn|ajado de cuitas
woebegone|compungido
downbeat|apagado
upbeat|animoso
offbeat|desconcertante
off-key|desafinado
off-colour|de mal gusto
off-limits|vedado
off-piste|fuera de pista
off-script|fuera de guion
off-message|fuera de consigna
on-message|fiel a la consigna
on-brief|ajustado al encargo
off-brief|fuera del encargo
on-side|alineado
off-side|desalineado
onside|del lado propio
offside|en fuera de juego
in-house|interno
out-of-house|externo
in-built|incorporado
built-in|integrado
bolt-on|añadido
add-on|accesorio
stand-alone|autónomo
self-standing|con entidad propia
self-contained|cerrado en sí
self-serving|interesado
self-dealing|de trato consigo mismo
self-regarding|ombliguista
other-regarding|ajeno al propio provecho
public-spirited|de espíritu cívico
civic-minded|de talante cívico
party-political|de partido
cross-party|transversal
all-party|de todos los grupos
non-partisan|sin color
bipartisan|de ambos lados
unilateral|de una sola parte
bilateral|de dos partes
multilateral|de varias partes
plurilateral|de varias plazas
sector-wide|de todo el ramo
industry-wide|de todo el sector
firm-wide|de toda la firma
group-wide|de todo el grupo
service-wide|de todo el servicio
economy-wide|de toda la economía
system-wide|de todo el sistema
market-wide|de todo el mercado
cabinet-wide|de todo el gabinete
campus-wide|de todo el recinto
force-wide|de toda la fuerza
fleet-wide|de toda la flota
network-wide|de toda la red
board-level|de consejo
C-suite|de alta dirección
front-line|de primera línea
back-office|de retaguardia
middle-office|de control interno
front-office|de cara al cliente
client-facing|de trato con el cliente
customer-facing|de ventanilla
outward-facing|de cara afuera
inward-facing|de cara adentro
backward-looking|vuelto al pasado
forward-looking|vuelto al porvenir
inward-looking|ensimismado
outward-looking|abierto al exterior
short-sighted|corto de miras
far-sighted|de larga vista
clear-sighted|de vista clara
dim-sighted|de vista corta
near-sighted|miope de plazo
long-sighted|previsor
clear-eyed|sin vendas
starry-eyed|iluso
wide-eyed|pasmado
bleary-eyed|ojeroso
hollow-eyed|de ojos hundidos
tight-lipped|de labios sellados
loose-lipped|de lengua suelta
thin-lipped|de labio prieto
thin-skinned|de cutis fino
thick-skinned|de cutis grueso
thick-headed|duro de mollera
hot-headed|de cabeza caliente
empty-headed|hueco de mollera
wrong-headed|descaminado
pig-headed|testarudo
bull-headed|de testa de toro
hard-headed|de cabeza dura
soft-headed|blandengue
light-headed|aturdido
clear-headed|despejado
muddle-headed|revuelto de ideas
woolly-headed|de mollera lanuda
woolly|vago de contornos
fuzzy|borroso
blurry|desdibujado
opaque|opaco de sentido
cloudy|nublado de sentido
foggy|brumoso
hazy|neblinoso
misty|velado
smoky|ahumado
sooty|tiznado
grimy|mugriento
dingy|sórdido
seamy|sórdido de envés
squalid|sórdido
mean|mezquino
niggardly|cicatero
cheeseparing|de tacañería
penny-pinching|de céntimo
close-fisted|de puño cerrado
open-handed|de mano larga
tight-fisted|de puño prieto
free-handed|de mano suelta
light-handed|de mano ligera
sure-footed|de pie seguro
flat-footed|de pie plano
light-footed|de pie ligero
lead-footed|de pie de plomo
fleet-footed|de pie veloz
slow-footed|de pie tardo
cold-eyed|de ojo frío
hard-eyed|de ojo duro
beady-eyed|de ojo avizor
sharp-eyed|de ojo fino
keen-eyed|de ojo agudo
eagle-eyed|de ojo de lince
lynx-eyed|de vista de lince
hawk-eyed|de ojo de azor
mole-eyed|de ojo de topo
owlish|de aire de búho
foxy|zorruno
wolfish|lobuno
sheepish|avergonzado
mulish|de mula
asinine|de asno
bovine|de buey
feline|de trato gatuno
vulpine|zorruno
leonine|de aire de león
bearish|bajista
bullish|alcista
skittish|arisco de mercado
choppy|picado
choppy-market|de mercado picado
range-bound|acotado en banda
overbought|sobrecomprado
oversold|sobrevendido
overheated|recalentado
overstretched|estirado de más
overlevered|sobreapalancado
underlevered|subapalancado
undercapitalised|subcapitalizado
overcapitalised|sobrecapitalizado
cash-rich|holgado de caja
cash-poor|corto de caja
cash-strapped|ahogado de caja
credit-starved|privado de crédito
creditworthy|de solvencia acreditada
uncreditworthy|de solvencia dudosa
investment-grade|de grado de inversión
junk-rated|de bono basura
fallen-angel|ángel caído
distressed|en apuros
non-performing|moroso
performing|al corriente
sub-prime|de alto riesgo
prime|de primer riesgo
unsecured|sin garantía
secured|con garantía
senior|preferente
junior|subordinado
subordinated|subordinado
pari-passu|a la par
unsecured-creditor|qui<fim-middle>rografario
preferential|privilegiado
contingent|eventual
crystallised|cristalizado
unquantified|sin cuantificar
unbudgeted|fuera de presupuesto
off-balance-sheet|fuera de balance
on-balance-sheet|en balance
mark-to-market|a valor de mercado
mark-to-model|a valor de modelo
held-to-maturity|a vencimiento
available-for-sale|disponible para la venta
going-concern|en funcionamiento
gone-concern|en liquidación
solvent|solvente
insolvent|quebrado
cash-flow-positive|con caja positiva
cash-flow-negative|con caja negativa
loss-making|deficitario
loss-making-unit|unidad deficitaria
profit-making|con beneficios
break-even|en umbral de rentabilidad
above-budget|por encima de presupuesto
below-budget|por debajo de presupuesto
on-budget|ajustado a presupuesto
over-quota|por encima de cupo
under-quota|por debajo de cupo
quota-bound|atado a cupo
cap-bound|atado a tope
floor-bound|atado a suelo
`);
const C1_EN_ADVERBS = parseWordBlob(`
starkly|de modo tajante
sharply|en picado
steeply|en pendiente viva
flatly|de plano
roundly|sin ambages
soundly|de modo cabal
squarely|de lleno
narrowly|por los pelos
thinly|con escaso fundamento
thickly|a capas
densely|a densas
sparsely|con parquedad
unevenly|de forma desigual
evenly|por igual
chiefly|sobre todo
purportedly|según se pretende
allegedly|según se alega
reportedly|según se informa
reputedly|según fama
putatively|según se tiene por
tacitly|de modo tácito
impliedly|de modo implícito
inferentially|por inferencia
conversely|a la inversa
inversely|en razón inversa
proportionately|en proporción
disproportionately|fuera de proporción
year-on-year|interanual
month-on-month|intermensual
quarter-on-quarter|intertrimestral
week-on-week|intersemanal
like-for-like|en términos comparables
across the board|de forma lineal
industry-wide|en todo el sector
firm-wide|en toda la firma
group-wide|en todo el grupo
system-wide|en todo el sistema
market-wide|en todo el mercado
economy-wide|en toda la economía
service-wide|en todo el servicio
cabinet-wide|en todo el gabinete
force-wide|en toda la fuerza
fleet-wide|en toda la flota
network-wide|en toda la red
campus-wide|en todo el recinto
sector-wide|en todo el ramo
on the record|para que conste
off camera|fuera de cámara
on camera|ante la cámara
off air|fuera de antena
on air|en antena
off the books|fuera de libros
on the books|en libros
under the table|bajo cuerda
above board|a la luz
under the counter|bajo el mostrador
over the counter|sin receta
off the cuff|de improviso
off the peg|de confección
off the shelf|de catálogo
off the grid|fuera de red
in real time|al hilo
in slow motion|a cámara lenta
in lockstep|al unísono
out of step|desacompasado
in sync|en compás
out of sync|descompasado
in phase|en fase
out of phase|desfasado
in chorus|a coro
in unison|al unísono
with one voice|a una voz
with one accord|de común acuerdo
as one|como un solo hombre
as a body|en cuerpo
as a bloc|en bloque
to a man|hasta el último
to a woman|hasta la última
to the last|hasta el último trance
to the letter|al pie de la letra
to the day|al día
to the hour|a la hora
to the minute|al minuto
to the second|al segundo
on the dot|en punto
on the nail|al contado
on the button|en el clavo
on the nose|en el clavo
bang on|justo en el clavo
spot on|clavado
dead on|en el blanco
dead right|de lleno en lo cierto
dead wrong|de lleno en lo falso
dead ahead|de frente
dead set|empeñado
hands down|sin despeinarse
handsomely|holgadamente
comfortably|con holgura
with ease|sin despeinarse
with flying colours|con nota
by a whisker|por un pelo
by a hair|por un pelo
by a nose|por una nariz
by a mile|por un palmo largo
by a long chalk|de largo
by a long shot|de lejos
by a long way|de largo
by some distance|con distancia
by some margin|con margen
by a wide margin|con holgura
by a narrow margin|por un margen estrecho
by the slimmest of margins|por el margen más flaco
only just|por los pelos
just shy|por debajo
just short|escaso
just under|ligeramente por debajo
just over|ligeramente por encima
just north|ligeramente al alza
just south|ligeramente a la baja
due north|rumbo norte
due south|rumbo sur
due east|rumbo este
due west|rumbo oeste
front and centre|en primer plano
centre stage|en el centro del tablado
off-stage|entre bastidores
backstage|tras el telón
off-piste|fuera de pista
off-script|fuera de guion
off-message|fuera de consigna
on-message|a la consigna
on-brief|al encargo
off-brief|fuera del encargo
seasonally|en términos desestacionalizados
headline|en cifra de portada
underlying|en tasa subyacente
core|en tasa nuclear
nominally|en términos corrientes
in real terms|en términos reales
in cash terms|en términos de caja
in volume terms|en términos de volumen
in value terms|en términos de valor
in unit terms|en unidades
on a like-for-like basis|en base comparable
on an annualised basis|en tasa anualizada
on a seasonally adjusted basis|en serie desestacionalizada
on a rolling basis|en media móvil
on a trailing basis|en los últimos doce meses
on a run-rate basis|en ritmo anualizado
on a pro-rata basis|a prorrata
on a time-weighted basis|ponderado por tiempo
on a money-weighted basis|ponderado por caja
ex dividend|sin dividendo
cum dividend|con dividendo
ex rights|sin derechos
cum rights|con derechos
ex coupon|sin cupón
cum coupon|con cupón
at par|a la par
above par|sobre la par
below par|bajo la par
at a premium|con prima
at a discount|con descuento
in the money|dentro de dinero
out of the money|fuera de dinero
at the money|en el dinero
deep in the money|muy dentro de dinero
deep out of the money|muy fuera de dinero
mark to market|a valor de mercado
mark to model|a valor de modelo
held to maturity|a vencimiento
on sight|a la vista
at sight|a la vista
after sight|a plazo vista
on demand|a la vista
at call|a la vista
on tick|al instante
in arrears|a mes vencido
in advance|por adelantado
up front|por adelantado
upfront|a cuenta
in specie|en especie
in cash|en metálico
in settlement|en finiquito
without prejudice|sin perjuicio
with prejudice|con efecto de cosa juzgada
subject to contract|salvo contrato
subject to survey|salvo inspección
subject to finance|salvo financiación
subject always|siempre sujeto
strictly without prejudice|en estricta reserva de derechos
for the avoidance of doubt|a mayor abundamiento
for completeness|por exhaustividad
on deep background|sin atribución
on background|como contexto
not for attribution|sin atribución
not for quotation|sin cita
embargoed|bajo embargo informativo
unembargoed|sin embargo informativo
under embargo|bajo embargo
off diary|fuera de agenda
on diary|en agenda
lobby terms|en términos de pasillo
gallery terms|en términos de tribuna
in camera|a puerta cerrada
in open court|en audiencia pública
in chambers|en despacho
ex parte|a instancia de una parte
inter partes|entre partes
sua sponte|de oficio
proprio motu|de propio impulso
nemo iudex|nadie juez de su causa
sub silentio|en silencio
obiter|de pasada
per incuriam|por descuido
per curiam|por el tribunal
en banc|en pleno
de novo|de nuevo
nunc pro tunc|con efecto retroactivo
ab initio|desde el origen
ex tunc|desde entonces
ex nunc|desde ahora
ad hoc|para el caso
ad litem|para el pleito
pro tem|con carácter interino
pro tempore|con carácter interino
sine die|sin fecha
sine qua non|sin lo cual no
pari passu|a la par
pro rata|a prorrata
pro tanto|en esa medida
in limine|de entrada
in pectore|en el pecho
sotto voce|en voz baja
viva voce|de viva voz
verbatim|palabra por palabra
literatim|letra por letra
seriatim|uno por uno
passim|aquí y allá
ibidem|en el mismo lugar
op cit|en la obra citada
loc cit|en el lugar citado
cf|cfr.
q.v.|véase
viz.|a saber
scilicet|a saber
id est|esto es
exempli gratia|por ejemplo
et al|y otros
et seq|y siguientes
ff|y siguientes
`);
const C1_EN_CONNECTORS = parseWordBlob(`
against this backdrop|contra este telón
viewed in this light|visto a esta luz
seen in this light|mirado a esta luz
from this vantage|desde este otero
from that standpoint|desde ese sitial
on that footing|sobre ese pie
on this reading|en esta lectura
on that reading|en esa lectura
under that interpretation|bajo esa lectura
by that measure|con ese rasero
by that standard|con ese listón
on those terms|en esos términos
in those terms|en esos términos
put in those terms|dicho en esos términos
so framed|así planteado
so understood|así entendido
so construed|así interpretado
read thus|leído así
taken thus|tomado así
taken together|tomado en conjunto
taken as a whole|tomado en bloque
taken in isolation|tomado aisladamente
viewed as a whole|visto en bloque
looked at another way|mirado de otro modo
seen from that angle|visto desde ese ángulo
on a related note|en nota afín
on a separate note|en nota aparte
on a different note|en otro tenor
turning now to|pasando ahora a
leaving aside|dejando a un lado
setting aside|poniendo a un lado
quite apart from that|aparte del todo de eso
to compound matters|para colmo
adding to this|sumado a esto
added to this|añadido a esto
allied to this|aliado a esto
coupled with this|unido a esto
in tandem with this|a la par de esto
in parallel with this|en paralelo a esto
alongside this|junto a esto
this aside|esto aparte
that aside|eso aparte
that notwithstanding|ello no obstante
these caveats aside|estas salvedades aparte
subject to that|sujeto a ello
without prejudice to that|sin perjuicio de ello
the upshot being|siendo el desenlace
the implication being|siendo la implicación
the inference being|siendo la inferencia
the corollary being|siendo el corolario
the result being|siendo el resultado
the effect being|siendo el efecto
from which it may be inferred|de lo que cabe inferir
it may be inferred that|cabe inferir que
it may be concluded that|cabe concluir que
it may be deduced that|cabe deducir que
it may be gathered that|cabe colegir que
one is led to conclude|uno se ve llevado a concluir
the record shows that|consta que
the figures indicate that|las cifras indican que
the data point to|los datos apuntan a
on the available evidence|a la vista de lo acreditado
on present showing|al estado actual
as matters stand|al estado de las cosas
as things stand|tal como están las cosas
as the law stands|tal como está el derecho
as the record stands|tal como consta
at this juncture|en esta coyuntura
at that juncture|en aquella coyuntura
at this stage of the argument|en este tramo del argumento
for present purposes|a los efectos presentes
for these purposes|a estos efectos
for the sake of the argument|a efectos de argumentar
assuming for the moment|suponiendo por un instante
taking that as given|dando eso por sentado
taking that as read|dando eso por sabido
that being granted|concedido ello
that being assumed|supuesto ello
on that assumption|bajo ese supuesto
on those assumptions|bajo esos supuestos
proceeding on that basis|partiendo de esa base
proceeding from that|partiendo de ello
from there it follows|de ahí se sigue
a further question arises|surge otra cuestión
this raises the question|esto plantea la cuestión
this invites the question|esto invita a preguntar
this prompts the question|esto mueve a preguntar
this leaves open the question|esto deja abierta la cuestión
this remains to be seen|esto queda por ver
whether that is so|si ello es así
if that is right|si ello es cierto
if that analysis is sound|si ese análisis es sólido
if the premise holds|si la premisa se sostiene
the contention being|siendo la tesis
the claim being|siendo la pretensión
the objection being|siendo la objeción
the difficulty being|siendo la dificultad
where this leaves us|donde esto nos deja
what this means is|lo que esto significa es
what that entails is|lo que ello entraña es
what follows from this|lo que de esto se sigue
in practical terms|en términos prácticos
in operational terms|en términos operativos
in policy terms|en términos de política
in legal terms|en términos jurídicos
in economic terms|en términos económicos
in political terms|en términos políticos
in historical terms|en términos históricos
in statistical terms|en términos estadísticos
in quantitative terms|en términos cuantitativos
in qualitative terms|en términos cualitativos
in relative terms|en términos relativos
in absolute terms|en términos absolutos
in net terms|en términos netos
in gross terms|en términos brutos
in real terms|en términos reales
in nominal terms|en términos nominales
other things equal|siendo lo demás igual
all else equal|siendo lo demás igual
holding other factors constant|manteniendo lo demás constante
controlling for that|controlando por ello
allowing for that|haciendo merced a ello
after allowing for|tras hacer merced a
net of that|neto de ello
gross of that|bruto de ello
set against that|puesto frente a ello
weighed against that|pesado frente a ello
balanced against that|equilibrado frente a ello
offset against that|compensado frente a ello
on the understanding that|en el entendimiento de que
on the footing that|sobre el pie de que
on the premise that|sobre la premisa de que
on the supposition that|bajo la suposición de que
on the hypothesis that|bajo la hipótesis de que
under the heading of|bajo el epígrafe de
under the rubric of|bajo la rúbrica de
under the banner of|bajo la enseña de
purportedly because|según se pretende porque
allegedly because|según se alega porque
reportedly because|según se informa porque
by some accounts|según algunas versiones
by other accounts|según otras versiones
on one telling|según un relato
on another telling|según otro relato
on a rival reading|en lectura rival
on a competing view|en tesis rival
on a dissenting view|en voto particular
on the prevailing view|en la tesis dominante
on the received view|en la tesis recibida
on the orthodox view|en la tesis ortodoxa
against received wisdom|contra el saber recibido
against the received view|contra la tesis recibida
pace that view|con respeto a esa tesis
contra that view|frente a esa tesis
as matters now stand|al estado actual de las cosas
as the figures now stand|al estado actual de las cifras
on current form|a la forma actual
on present form|a la forma presente
on that showing|a esa muestra
on this showing|a esta muestra
so far as appears|por lo que aparece
so far as can be seen|por lo que se alcanza a ver
so far as known|por lo que se sabe
so far as material|en lo que es de cargo
so far as relevant|en lo que es pertinente
so far as concerns|en lo que atañe
insofar as material|en cuanto es de cargo
insofar as relevant|en cuanto es pertinente
to the extent material|en la medida de cargo
to the extent relevant|en la medida pertinente
to the extent known|en la medida conocida
to that limited extent|en esa medida limitada
only to that extent|solo en esa medida
if and to the extent that|si y en la medida en que
if and insofar as|si y en cuanto
save insofar as|salvo en cuanto
except insofar as|excepto en cuanto
unless and until|salvo y hasta que
if and when|si y cuando
when and if|cuando y si
as and when|según y cuando
as and if|según y si
now and if|ahora y si
then and only then|entonces y solo entonces
if then|si entonces
only then|solo entonces
not until then|no hasta entonces
not before then|no antes de entonces
not a moment before|ni un instante antes
not a moment later|ni un instante después
no sooner than|no antes de
no later than|no más tarde de
at the latest|a más tardar
at the earliest|como muy pronto
not later than|no más tarde de
not earlier than|no antes de
from and after|desde y a partir de
from and including|desde e inclusive
to but excluding|hasta pero exclusive
up to but excluding|hasta exclusive
through and including|hasta e inclusive
with effect from|con efectos desde
with immediate effect|con efectos inmediatos
with retrospective effect|con efectos retroactivos
with prospective effect|con efectos hacia adelante
without retrospective effect|sin efectos retroactivos
pending further notice|en tanto no se avise
until further notice|hasta nuevo aviso
until further order|hasta nueva orden
until countermanded|hasta contramandato
unless earlier terminated|salvo extinción anterior
unless otherwise agreed|salvo pacto en contrario
unless otherwise stated|salvo indicación en contrario
unless the context requires|salvo que el contexto exija
unless the contrary appears|salvo que conste lo contrario
where the context so admits|donde el contexto lo admite
where the context so requires|donde el contexto lo exige
as the context requires|según exija el contexto
as the case may be|según el caso
as the case requires|según exija el caso
as circumstances require|según exijan las circunstancias
as circumstances permit|según permitan las circunstancias
weather permitting|si el tiempo lo permite
time permitting|si el tiempo alcanza
space permitting|si el espacio alcanza
all being well|si todo marcha
other things being equal|siendo lo demás igual
`);
const C1_EN_PRONOUNS = parseWordBlob(`
the foregoing|lo antedicho
the following|lo que sigue
the above|lo de arriba
the below|lo de abajo
the above-named|el arriba nombrado
the below-named|el abajo nombrado
the signatory|el firmante
the co-signatory|el cofirmante
the counterparty|la contraparte
the counterpart|el homólogo
one's opposite number|el homólogo
the incumbent|el titular
the outgoing|el saliente
the incoming|el entrante
the predecessor|el antecesor
the successor|el sucesor
the appellant|el recurrente
the appellee|el recurrido
the claimant|el demandante
the respondent|el demandado
the petitioner|el solicitante
the complainant|el denunciante
the applicant|el peticionario
the interviewee|el entrevistado
the addressee|el destinatario
the recipient|el receptor
the bearer|el tenedor
the holder|el titular
the trustee|el fideicomisario
the settlor|el constituyente
the beneficiary|el beneficiario
the nominee|el nominado
the appointee|el nombrado
the designate|el designado
the designee|el designado
the proxy|el apoderado
the stand-in|el suplente
the locum|el interino
the caretaker|el interino
the acting holder|el titular en funciones
the interim holder|el titular interino
those in post|los que están en el cargo
those concerned|los interesados
those involved|los implicados
those affected|los afectados
those implicated|los incriminados
those named|los nombrados
those listed|los enumerados
those cited|los citados
those quoted|los transcritos
those present|los presentes
those absent|los ausentes
those in attendance|los asistentes
those entitled|los legitimados
those eligible|los elegibles
those so entitled|los así legitimados
those so minded|los así dispuestos
those so inclined|los así inclinados
anyone so minded|quien así lo disponga
anyone so inclined|quien así se incline
whoever sees fit|quien lo estime oportuno
whoever thinks fit|quien lo juzgue oportuno
whoever deems fit|quien lo considere oportuno
as one sees fit|como uno estime oportuno
as one thinks fit|como uno juzgue oportuno
as one deems fit|como uno considere oportuno
the powers that be|los que mandan
the rank and file|la base
the great and the good|los próceres
the usual suspects|los de siempre
the uninitiated|los no iniciados
the well-informed|los bien enterados
the better-off|los más holgados
the worse-off|los más apurados
the well-to-do|los acomodados
the dispossessed|los desposeídos
the disenfranchised|los privados de voto
the voiceless|los sin voz
the overlooked|los preteridos
the sidelined|los arrinconados
the excluded|los excluidos
the privileged|los privilegiados
the underprivileged|los desfavorecidos
a person of standing|persona de solvencia
a person of means|persona de caudal
persons unknown|personas desconocidas
the person concerned|el interesado
the parties concerned|las partes interesadas
the interested party|la parte interesada
the injured party|la parte perjudicada
the aggrieved party|la parte agraviada
the third party|el tercero
third parties|terceros
the contracting parties|las partes contratantes
the unnamed source|la fuente innominada
a serving official|un funcionario en activo
a sitting member|un miembro en el escaño
the presiding officer|el presidente de mesa
he or she|él o ella
him or her|a él o a ella
his or her|su
his or hers|suyo
either of the parties|cualquiera de las partes
neither of the parties|ninguna de las partes
both of the parties|ambas partes
each of the parties|cada una de las partes
any of the parties|cualquiera de las partes
none of the parties|ninguna de las partes
the bulk of them|el grueso de ellos
the greater part of them|la mayor parte de ellos
a good many of them|no pocos de ellos
precious few of them|muy pocos de ellos
virtually none of them|casi ninguno de ellos
virtually all of them|casi todos ellos
virtually everyone|casi todo el mundo
scarcely anyone|casi nadie
hardly anyone|casi nadie
barely anyone|apenas nadie
next to no one|casi nadie
next to nobody|casi nadie
all but a few|todos menos unos pocos
all but one|todos menos uno
those present and voting|los presentes y votantes
those entitled to vote|los con derecho a voto
each as he or she sees fit|cada cual como estime
to each his or her own|a cada cual lo suyo
not a single person present|ni un presente
none of those present|ninguno de los presentes
all of those present|todos los presentes
most of those present|la mayoría de los presentes
a handful of those present|un puñado de los presentes
the silent majority|la mayoría callada
the vocal minority|la minoría ruidosa
a minority of one|una minoría de uno
one's counterpart|el homólogo
one's predecessor|el antecesor
one's successor|el sucesor
one's peer|el par
one's junior|el subalterno
one's senior|el superior
one's equal|el igual
the other side|la otra parte
the opposing camp|el bando contrario
one's own camp|el propio bando
neither side|ningún bando
either side|cualquiera de los bandos
both sides|ambos bandos
all sides|todos los bandos
the winning side|el bando vencedor
the losing side|el bando vencido
the dissenting side|el bando discrepante
the majority|la mayoría
the minority|la minoría
the board as a whole|el consejo en pleno
those on the panel|los del tribunal
those on the bench|los de la toga
those on the floor|los del hemiciclo
those in the chamber|los de la cámara
whoever holds the post|quien ocupe el cargo
whoever occupies the chair|quien ocupe la presidencia
the outgoing chair|el presidente saliente
the incoming chair|el presidente entrante
the sitting judge|el juez titular
the unnamed official|el cargo innominado
a senior official|un alto cargo
a junior official|un cargo menor
a former official|un ex cargo
a former member|un ex miembro
the remainder of the board|el resto del consejo
the full board|el consejo en pleno
those in office|los que mandan
those in power|los que detentan el poder
those at the helm|los que llevan el timón
those on the ground|los que están sobre el terreno
the moneyed|los de caudal
the landed|los de solar
the hard-up|los apurados
the well-off|los holgados
the least well-off|los menos holgados
the worst-off|los peor parados
the better-informed|los mejor enterados
the less well-informed|los peor enterados
one's own kind|los de su jaez
one's own people|los suyos
one's own side|el propio bando
the opposing side|el bando contrario
every last person present|hasta el último presente
not a person present|ni un presente
not one of those present|ni uno de los presentes
few of those present|pocos de los presentes
several of those present|varios de los presentes
some of those present|algunos de los presentes
a sprinkling of those present|un puñado de los presentes
practically everyone|prácticamente todos
practically no one|prácticamente nadie
almost no one|casi nadie
next to nothing|casi nada
precious little|bien poco
anyone so entitled|quien así esté legitimado
those unqualified|los no habilitados
those qualified|los habilitados
those ineligible|los inelegibles
those so named|los así nombrados
the party aggrieved|la parte agraviada
the party at fault|la parte culpable
the party in default|la parte morosa
the defaulting party|la parte incumplidora
the moving party|la parte actora
the opposing party|la parte contraria
the prevailing party|la parte vencedora
the unsuccessful party|la parte vencida
the successful party|la parte ganadora
the losing party|la parte perdedora
the winning party|la parte ganadora
the like-minded|los de igual parecer
the right-minded|los de sano criterio
the high-minded|los de altos vuelos morales
the faint-hearted|los pusilánimes
the hard-hearted|los de entraña dura
the open-minded|los de mente abierta
the closed-minded|los de mente cerrada
the single-minded|los de una pieza
whoever it concerns|a quien ataña
those it concerns|a quienes ataña
those to whom it falls|a quienes corresponda
whoever is tasked|quien tenga el encargo
those tasked|los encargados
those charged|los comisionados
those briefed|los instruidos
those instructed|los apoderados
those commissioned|los comisionados
those appointed|los nombrados
those elected|los electos
those returned|los proclamados
those unseated|los desposeídos del escaño
those ousted|los desalojados
those voted out|los votados fuera
those voted in|los votados dentro
the newly elected|los recién electos
the newly appointed|los recién nombrados
the newly installed|los recién instalados
the outgoing holder|el titular saliente
the incoming holder|el titular entrante
the sitting holder|el titular en el cargo
the current holder|el titular actual
the former holder|el titular anterior
the late holder|el titular fallecido
the beneficial owner|el titular real
the legal owner|el titular formal
the registered holder|el titular registral
the nominee holder|el titular fiduciario
the account holder|el titular de la cuenta
the policyholder|el tomador
the insured|el asegurado
the insurer|el asegurador
the underwriter|el suscriptor
the reinsurer|el reasegurador
the cedant|el cedente
the cessionary|el cesionario
the obligor|el obligado
the obligee|el acreedor de la obligación
the debtor|el deudor
the creditor|el acreedor
the mortgagor|el hipotecante
the mortgagee|el acreedor hipotecario
the pledgor|el pignorante
the pledgee|el acreedor pignoraticio
the lessor|el arrendador
the lessee|el arrendatario
the licensor|el licenciante
the licensee|el licenciatario
the franchisor|el franquiciador
the franchisee|el franquiciado
the consignor|el consignador
the consignee|el consignatario
the bailor|el depositante
the bailee|el depositario
the vendor|el vendedor
the purchaser|el comprador
the transferor|el transmitente
the transferee|el adquirente
the chargor|el constituyente de la carga
the chargee|el titular de la carga
`);
const C1_EN_PREPOSITIONS = parseWordBlob(`
in the light of|a la luz de
in light of|a la luz de
against the backdrop of|contra el telón de
against a backdrop of|contra un telón de
in the context of|en el marco de
within the framework of|dentro del marco de
within the ambit of|dentro del ámbito de
within the scope of|dentro del alcance de
within the remit of|dentro de la competencia de
outside the remit of|fuera de la competencia de
beyond the remit of|más allá de la competencia de
beyond the scope of|más allá del alcance de
beyond the ambit of|más allá del ámbito de
within the meaning of|en el sentido de
for the purposes of|a los efectos de
for purposes of|a efectos de
in the interests of|en interés de
against the interests of|contra el interés de
to the advantage of|en provecho de
to the disadvantage of|en perjuicio de
to the credit of|en abono de
to the debit of|en cargo de
at the instigation of|a instigación de
at the prompting of|a instigación de
at the invitation of|a invitación de
at the request of|a petición de
at the suggestion of|a sugerencia de
under the direction of|bajo la dirección de
under the supervision of|bajo la supervisión de
under the stewardship of|bajo la tutela de
under the chairmanship of|bajo la presidencia de
under the auspices of|bajo los auspicios de
under the patronage of|bajo el patrocinio de
under the aegis of|bajo la égida de
under the umbrella of|bajo el paraguas de
under the banner of|bajo la enseña de
under the heading of|bajo el epígrafe de
under the rubric of|bajo la rúbrica de
in the orbit of|en la órbita de
in the sphere of|en la esfera de
in the realm of|en el terreno de
in the domain of|en el dominio de
in the field of|en el campo de
in the province of|en el solar de
on the soil of|en el suelo de
on the premises of|en el recinto de
off the premises of|fuera del recinto de
on the books of|en los libros de
off the books of|fuera de los libros de
on the payroll of|en la nómina de
off the payroll of|fuera de la nómina de
on the staff of|en la plantilla de
on the board of|en el consejo de
off the board of|fuera del consejo de
on the panel of|en el tribunal de
on the roster of|en la plantilla de
on the slate of|en la candidatura de
on the ticket of|en la papeleta de
in the pay of|a sueldo de
in the employ of|al servicio de
in the service of|al servicio de
in the gift of|en merced de
at the disposal of|a disposición de
at the service of|al servicio de
at the command of|al mando de
in the pocket of|en el bolsillo de
at the pleasure of|al albedrío de
during the tenure of|durante el mandato de
throughout the tenure of|a lo largo del mandato de
for the duration of|durante la vigencia de
for the term of|por el plazo de
over the course of|a lo largo de
over the span of|a lo largo del arco de
over the lifetime of|a lo largo de la vida de
over the life of|a lo largo de la vida de
across the span of|a lo ancho del arco de
throughout the life of|a lo largo de la vida de
throughout the course of|a lo largo del curso de
in the run-up to|en la antesala de
in the lead-up to|en el preámbulo de
in the aftermath of|en las secuelas de
on the back of|a lomos de
off the back of|a rebufo de
in the slipstream of|en la estela de
in the shadow of|a la sombra de
on the coat-tails of|a rebufo de
on the shoulders of|a hombros de
at the shoulder of|al hombro de
at the elbow of|al codo de
in the ear of|al oído de
within earshot of|a oídas de
within reach of|al alcance de
within sight of|a la vista de
within striking distance of|a tiro de
within walking distance of|a pie de
within commuting distance of|a distancia de diario de
out of earshot of|fuera de oídas de
out of reach of|fuera del alcance de
out of sight of|fuera de la vista de
out of range of|fuera de alcance de
out of bounds of|fuera de los linderos de
beyond the reach of|más allá del alcance de
beyond the grasp of|más allá de la presa de
beyond the pale of|más allá de lo admisible de
within the pale of|dentro de lo admisible de
on either side of|a uno y otro lado de
on both sides of|a ambos lados de
on neither side of|a ningún lado de
on all sides of|a todos los lados de
to either side of|hacia uno u otro lado de
to both sides of|hacia ambos lados de
either side of|a uno y otro lado de
either end of|a uno y otro cabo de
at either end of|en uno u otro cabo de
at both ends of|en ambos cabos de
from either end of|desde uno u otro cabo de
from both ends of|desde ambos cabos de
down the length of|a lo largo de
up the length of|aguas arriba de
along the length of|a lo largo de
the length of|a lo largo de
the breadth of|a lo ancho de
the width of|a lo ancho de
the depth of|a lo hondo de
the height of|a lo alto de
to the height of|hasta la altura de
to the depth of|hasta el fondo de
to the width of|hasta el ancho de
to the breadth of|hasta la anchura de
the length and breadth of|a lo largo y ancho de
in the orbit around|en la órbita de
in the slipstream behind|en la estela de
for the account of|por cuenta de
for the benefit of|en beneficio de
for the credit of|en abono de
for the debit of|en cargo de
for the honour of|en honor de
for the credit standing of|en abono de la firma de
to the order of|a la orden de
to the bearer of|al portador de
to the order and for the account of|a la orden y por cuenta de
by and on behalf of|por y en nombre de
in and on behalf of|en y por nombre de
for the account and risk of|por cuenta y riesgo de
at the risk and expense of|a riesgo y costa de
at the cost and expense of|a costa y cargo de
for the sole account of|por cuenta exclusiva de
for the joint account of|por cuenta conjunta de
for the several account of|por cuenta mancomunada de
for the joint and several account of|por cuenta solidaria de
without the leave of|sin licencia de
without the consent of|sin consentimiento de
without the authority of|sin autoridad de
without the knowledge of|sin conocimiento de
without the privity of|sin noticia de
with the privity of|con noticia de
with the knowledge of|con conocimiento de
with the leave of|con licencia de
with the consent of|con consentimiento de
with the authority of|con autoridad de
under colour of office of|con capa de oficio de
under colour of right of|con capa de derecho de
under colour of title of|con capa de título de
in right of|en derecho de
in right and title of|en derecho y título de
in the right of|en el derecho de
to the use of|al uso de
to the use and behoof of|al uso y provecho de
to the behoof of|al provecho de
for the use of|para uso de
for the use and benefit of|para uso y provecho de
upon the faith of|sobre la fe de
upon the credit of|sobre el crédito de
upon the security of|sobre la garantía de
upon the footing of|sobre el pie de
upon the terms of|sobre los términos de
upon the conditions of|sobre las condiciones de
upon the happening of|al acaecer de
upon the occurrence of|al sobrevenir de
upon the expiry of|al vencimiento de
upon the termination of|al término de
upon the completion of|al cierre de
upon the closing of|al cierre de
upon the signing of|al firmar de
upon the delivery of|al entregar de
upon the receipt of|al recibo de
upon the giving of|al dar de
pending receipt of|en tanto se reciba
pending delivery of|en tanto se entregue
pending completion of|en tanto se cierre
pending determination of|en tanto se resuelva
pending the outcome of|en tanto se conozca el resultado de
pending the result of|en tanto se conozca el resultado de
subject to the outcome of|sujeto al resultado de
subject to the result of|sujeto al resultado de
subject to the determination of|sujeto a la resolución de
subject to the approval of|sujeto a la aprobación de
subject to the consent of|sujeto al consentimiento de
subject to the leave of|sujeto a la licencia de
subject to the sanction of|sujeto a la sanción de
subject to the ratification of|sujeto a la ratificación de
conditional upon the approval of|condicionado a la aprobación de
conditional upon the consent of|condicionado al consentimiento de
conditional upon receipt of|condicionado al recibo de
conditional upon delivery of|condicionado a la entrega de
conditional upon completion of|condicionado al cierre de
in anticipation of receipt of|en previsión del recibo de
in anticipation of delivery of|en previsión de la entrega de
in anticipation of completion of|en previsión del cierre de
in expectation of receipt of|a la espera del recibo de
in expectation of delivery of|a la espera de la entrega de
in the event of default of|en caso de incumplimiento de
in the event of breach of|en caso de quebranto de
in the event of failure of|en caso de fallo de
in the event of insolvency of|en caso de insolvencia de
in the event of winding-up of|en caso de liquidación de
in the event of receivership of|en caso de administración de
on the occurrence of default of|al acaecer el incumplimiento de
on the occurrence of breach of|al acaecer el quebranto de
by reason of default of|por razón del incumplimiento de
by reason of breach of|por razón del quebranto de
by reason of failure of|por razón del fallo de
for want of payment of|a falta de pago de
for want of delivery of|a falta de entrega de
for want of performance of|a falta de cumplimiento de
for want of notice of|a falta de aviso de
for lack of notice of|por falta de aviso de
for lack of payment of|por falta de pago de
for lack of delivery of|por falta de entrega de
in default of payment of|a falta de pago de
in default of delivery of|a falta de entrega de
in default of notice of|a falta de aviso de
in default of appearance of|a falta de comparecencia de
in default of answer of|a falta de contestación de
save in the case of|salvo en el caso de
except in the case of|excepto en el caso de
other than in the case of|salvo en el caso de
but for the case of|de no ser por el caso de
but in the case of|pero en el caso de
as in the case of|como en el caso de
unlike the case of|a diferencia del caso de
unlike that of|a diferencia de
unlike those of|a diferencia de los de
as distinct from|a diferencia de
as opposed to|frente a
as against that of|frente al de
as compared with that of|frente al de
as compared to that of|frente al de
relative to that of|respecto del de
relative to those of|respecto de los de
in comparison to that of|en comparación con el de
in comparison with that of|en comparación con el de
by comparison with that of|por comparación con el de
by comparison to that of|por comparación con el de
measured against that of|medido frente al de
set against that of|puesto frente al de
weighed against that of|pesado frente al de
benchmarked against that of|cotejado frente al de
indexed to that of|indexado al de
pegged to that of|atado al de
tied to that of|ligado al de
geared to that of|engranado al de
keyed to that of|ajustado al de
calibrated to that of|calibrado al de
scaled to that of|escalado al de
proportioned to that of|proporcionado al de
referable to|imputable a
attributable to|atribuible a
ascribable to|achacable a
traceable to|rastreable a
referable to that of|imputable al de
incident to|anejo a
appurtenant to|anejo a
accessory to|accesorio a
ancillary to|accesorio a
incidental to|accesorio a
collateral to|colateral a
subsidiary to|subsidiario de
subordinate to|subordinado a
subject always to|siempre sujeto a
without prejudice always to|siempre sin perjuicio de
save always|salvo siempre
except always|excepto siempre
other than always|salvo siempre
`);
const C1_EN_VERBS = parseVerbBlob(`
underpin|underpinned|underpinned|apuntalar|apuntaló|apuntalado|regular
outweigh|outweighed|outweighed|pesar más que|pesó más que|pesado más que|regular
outstrip|outstripped|outstripped|dejar atrás|dejó atrás|dejado atrás|regular
outpace|outpaced|outpaced|adelantar|adelantó|adelantado|regular
overhaul|overhauled|overhauled|reformar de arriba abajo|reformó de arriba abajo|reformado de arriba abajo|regular
override|overrode|overridden|prevalecer sobre|prevaleció sobre|prevalecido sobre|irregular
overrule|overruled|overruled|desestimar|desestimó|desestimado|regular
overstep|overstepped|overstepped|extralimitarse|se extralimitó|extralimitado|regular
undercut|undercut|undercut|socavar los precios|socavó los precios|socavado los precios|irregular
underwrite|underwrote|underwritten|avalar|avaló|avalado|irregular
undermine|undermined|undermined|socavar|socavó|socavado|regular
underscore|underscored|underscored|subrayar|subrayó|subrayado|regular
undertake|undertook|undertaken|acometer|acometió|acometido|irregular
undergo|underwent|undergone|someterse a|se sometió a|sometido a|irregular
overshadow|overshadowed|overshadowed|eclipsar|eclipsó|eclipsado|regular
overwhelm|overwhelmed|overwhelmed|abrumar|abrumó|abrumado|regular
overstate|overstated|overstated|ponderar en exceso|ponderó en exceso|ponderado en exceso|regular
understate|understated|understated|quedarse corto|se quedó corto|quedado corto|regular
overplay|overplayed|overplayed|hinchar|hinchó|hinchado|regular
underplay|underplayed|underplayed|restar importancia|restó importancia|restado importancia|regular
shelve|shelved|shelved|aparcar|aparcó|aparcado|regular
mothball|mothballed|mothballed|dejar en suspenso|dejó en suspenso|dejado en suspenso|regular
fudge|fudged|fudged|tergiversar|tergiversó|tergiversado|regular
prevaricate|prevaricated|prevaricated|escurrir el bulto|escurrió el bulto|escurrido el bulto|regular
leapfrog|leapfrogged|leapfrogged|saltar por encima|saltó por encima|saltado por encima|regular
green-light|green-lighted|green-lighted|dar luz verde|dio luz verde|dado luz verde|regular
rubber-stamp|rubber-stamped|rubber-stamped|refrendar sin más|refrendó sin más|refrendado sin más|regular
fast-track|fast-tracked|fast-tracked|acelerar el trámite|aceleró el trámite|acelerado el trámite|regular
backtrack|backtracked|backtracked|desdecirse|se desdijo|desdicho|regular
backpedal|backpedaled|backpedaled|echarse atrás|se echó atrás|echado atrás|regular
second-guess|second-guessed|second-guessed|poner en tela de juicio|puso en tela de juicio|puesto en tela de juicio|regular
cherry-pick|cherry-picked|cherry-picked|espigar a conveniencia|espigó a conveniencia|espigado a conveniencia|regular
short-change|short-changed|short-changed|dar gato por liebre|dio gato por liebre|dado gato por liebre|regular
shortlist|shortlisted|shortlisted|incluir en la terna|incluyó en la terna|incluido en la terna|regular
headhunt|headhunted|headhunted|cazar talentos|cazó talentos|cazado talentos|regular
sandbag|sandbagged|sandbagged|guardar baza|guardó baza|guardado baza|regular
railroad|railroaded|railroaded|imponer a empujones|impuso a empujones|impuesto a empujones|regular
steamroll|steamrolled|steamrolled|aplanar|aplanó|aplanado|regular
bulldoze|bulldozed|bulldozed|pasar por encima|pasó por encima|pasado por encima|regular
strong-arm|strong-armed|strong-armed|forzar a empujones|forzó a empujones|forzado a empujones|regular
ring-fence|ring-fenced|ring-fenced|aislar patrimonialmente|aisló patrimonialmente|aislado patrimonialmente|regular
earmark|earmarked|earmarked|afectar a un fin|afectó a un fin|afectado a un fin|regular
front-load|front-loaded|front-loaded|cargar al inicio|cargó al inicio|cargado al inicio|regular
back-load|back-loaded|back-loaded|cargar al final|cargó al final|cargado al final|regular
drip-feed|drip-fed|drip-fed|dosificar|dosificó|dosificado|irregular
spoon-feed|spoon-fed|spoon-fed|dar en cuchara|dio en cuchara|dado en cuchara|irregular
force-feed|force-fed|force-fed|embutir|embutió|embutido|irregular
blacklist|blacklisted|blacklisted|poner en lista negra|puso en lista negra|puesto en lista negra|regular
whitelist|whitelisted|whitelisted|poner en lista blanca|puso en lista blanca|puesto en lista blanca|regular
red-flag|red-flagged|red-flagged|marcar de alarma|marcó de alarma|marcado de alarma|regular
snowball|snowballed|snowballed|crecer como bola de nieve|creció como bola de nieve|crecido como bola de nieve|regular
balloon|ballooned|ballooned|hincharse|se hinchó|hinchado|regular
mushroom|mushroomed|mushroomed|brotar como setas|brotó como setas|brotado como setas|regular
crater|cratered|cratered|hundirse en picado|se hundió en picado|hundido en picado|regular
plunge|plunged|plunged|desplomarse|se desplomó|desplomado|regular
slump|slumped|slumped|venirse abajo|se vino abajo|venido abajo|regular
tank|tanked|tanked|hundirse|se hundió|hundido|regular
nosedive|nosedived|nosedived|caer en picado|cayó en picado|caído en picado|regular
tailspin|tailspinned|tailspinned|entrar en barrena|entró en barrena|entrado en barrena|regular
freefall|freefell|freefallen|caer en caída libre|cayó en caída libre|caído en caída libre|irregular
rebound|rebounded|rebounded|rebotar|rebotó|rebotado|regular
rally|rallied|rallied|reponerse|se repuso|repuesto|regular
overtake|overtook|overtaken|adelantar|adelantó|adelantado|irregular
overhang|overhung|overhung|amenazar desde arriba|amenazó desde arriba|amenazado desde arriba|irregular
overrun|overran|overrun|desbordar|desbordó|desbordado|irregular
overdo|overdid|overdone|pasarse de la raya|se pasó de la raya|pasado de la raya|irregular
overshoot|overshot|overshot|pasarse de largo|se pasó de largo|pasado de largo|irregular
undershoot|undershot|undershot|quedarse corto|se quedó corto|quedado corto|irregular
undersell|undersold|undersold|vender por debajo|vendió por debajo|vendido por debajo|irregular
offset|offset|offset|compensar|compensó|compensado|irregular
forecast|forecast|forecast|pronosticar|pronosticó|pronosticado|irregular
broadcast|broadcast|broadcast|difundir|difundió|difundido|irregular
recast|recast|recast|refundir|refundió|refundido|irregular
proofread|proofread|proofread|corregir pruebas|corrigió pruebas|corregido pruebas|irregular
misread|misread|misread|leer mal|leyó mal|leído mal|irregular
rewrite|rewrote|rewritten|reescribir|reescribió|reescrito|irregular
overwrite|overwrote|overwritten|sobrescribir|sobrescribió|sobrescrito|irregular
withdraw|withdrew|withdrawn|retirar|retiró|retirado|irregular
overcome|overcame|overcome|vencer|venció|vencido|irregular
shed|shed|shed|desprenderse de|se desprendió de|desprendido de|irregular
thrust|thrust|thrust|empujar|empujó|empujado|irregular
upset|upset|upset|trastocar|trastocó|trastocado|irregular
unwind|unwound|unwound|deshacer la posición|deshizo la posición|deshecho la posición|irregular
rewind|rewound|rewound|rebobinar|rebobinó|rebobinado|irregular
unbind|unbound|unbound|desligar|desligó|desligado|irregular
unstick|unstuck|unstuck|desatascar|desatascó|desatascado|irregular
misspeak|misspoke|misspoken|hablar a destiempo|habló a destiempo|hablado a destiempo|irregular
misspell|misspelt|misspelt|escribir mal|escribió mal|escrito mal|irregular
misspend|misspent|misspent|malgastar|malgastó|malgastado|irregular
mislead|misled|misled|inducir a error|indujo a error|inducido a error|irregular
mishear|misheard|misheard|oír mal|oyó mal|oído mal|irregular
mislay|mislaid|mislaid|extraviar|extravió|extraviado|irregular
outdo|outdid|outdone|superar|superó|superado|irregular
outgrow|outgrew|outgrown|quedar pequeño|quedó pequeño|quedado pequeño|irregular
outrun|outran|outrun|dejar atrás|dejó atrás|dejado atrás|irregular
outsell|outsold|outsold|vender más que|vendió más que|vendido más que|irregular
outspend|outspent|outspent|gastar más que|gastó más que|gastado más que|irregular
outbid|outbid|outbid|pujar por encima|pujó por encima|pujado por encima|irregular
foresee|foresaw|foreseen|prever|previó|previsto|irregular
foretell|foretold|foretold|pronosticar|pronosticó|pronosticado|irregular
arise|arose|arisen|surgir|surgió|surgido|irregular
reframe|reframed|reframed|replantear|replanteó|replanteado|regular
hone|honed|honed|afilar|afiló|afilado|regular
fine-tune|fine-tuned|fine-tuned|afinar|afinó|afinado|regular
tweak|tweaked|tweaked|retocar|retocó|retocado|regular
gazette|gazetted|gazetted|publicar en el boletín|publicó en el boletín|publicado en el boletín|regular
table|tabled|tabled|someter a debate|sometió a debate|sometido a debate|regular
second|seconded|seconded|secundar|secundó|secundado|regular
repeal|repealed|repealed|derogar|derogó|derogado|regular
revoke|revoked|revoked|revocar|revocó|revocado|regular
overturn|overturned|overturned|anular|anuló|anulado|regular
endorse|endorsed|endorsed|avalar|avaló|avalado|regular
paper-over|papered-over|papered-over|tapar las grietas|tapó las grietas|tapado las grietas|regular
gloss-over|glossed-over|glossed-over|pasar por alto|pasó por alto|pasado por alto|regular
skate-over|skated-over|skated-over|rozar de pasada|rozó de pasada|rozado de pasada|regular
shrug-off|shrugged-off|shrugged-off|quitarse de encima|se quitó de encima|quitado de encima|regular
brush-aside|brushed-aside|brushed-aside|despachar|despachó|despachado|regular
set-forth|set-forth|set-forth|exponer|expuso|expuesto|irregular
weigh-up|weighed-up|weighed-up|sopesar|sopesó|sopesado|regular
sound-out|sounded-out|sounded-out|sondear|sondeó|sondeado|regular
crowd-out|crowded-out|crowded-out|desplazar|desplazó|desplazado|regular
freeze-out|froze-out|frozen-out|dejar fuera|dejó fuera|dejado fuera|irregular
lock-out|locked-out|locked-out|cerrar el paso|cerró el paso|cerrado el paso|regular
lock-in|locked-in|locked-in|atar de por vida|ató de por vida|atado de por vida|regular
box-in|boxed-in|boxed-in|acorralar|acorraló|acorralado|regular
hem-in|hemmed-in|hemmed-in|cercar|cercó|cercado|regular
hive-off|hived-off|hived-off|escindir|escindió|escindido|regular
wall-off|walled-off|walled-off|tabicar|tabicó|tabicado|regular
walk-back|walked-back|walked-back|retractarse de|se retractó de|retractado de|regular
row-back|rowed-back|rowed-back|recular|reculó|reculado|regular
claw-back|clawed-back|clawed-back|recuperar lo dado|recuperó lo dado|recuperado lo dado|regular
write-down|wrote-down|written-down|sanear|saneó|saneado|irregular
write-off|wrote-off|written-off|castigar|castigó|castigado|irregular
spin-off|spun-off|spun-off|escindir|escindió|escindido|irregular
carve-out|carved-out|carved-out|segregar|segregó|segregado|regular
phase-out|phased-out|phased-out|retirar por etapas|retiró por etapas|retirado por etapas|regular
phase-in|phased-in|phased-in|introducir por etapas|introdujo por etapas|introducido por etapas|regular
roll-out|rolled-out|rolled-out|desplegar|desplegó|desplegado|regular
roll-back|rolled-back|rolled-back|echar atrás|echó atrás|echado atrás|regular
scale-back|scaled-back|scaled-back|recortar|recortó|recortado|regular
scale-up|scaled-up|scaled-up|ampliar de escala|amplió de escala|ampliado de escala|regular
wind-down|wound-down|wound-down|desmantelar con orden|desmanteló con orden|desmantelado con orden|irregular
wind-up|wound-up|wound-up|liquidar|liquidó|liquidado|irregular
shut-down|shut-down|shut-down|cerrar|cerró|cerrado|irregular
start-up|started-up|started-up|poner en marcha|puso en marcha|puesto en marcha|regular
kick-start|kick-started|kick-started|dar el empujón|dio el empujón|dado el empujón|regular
jump-start|jump-started|jump-started|poner en marcha de un golpe|puso en marcha de un golpe|puesto en marcha de un golpe|regular
fast-forward|fast-forwarded|fast-forwarded|avanzar de golpe|avanzó de golpe|avanzado de golpe|regular
slow-walk|slow-walked|slow-walked|dar largas|dio largas|dado largas|regular
run-down|ran-down|run-down|dejar decaer|dejó decaer|dejado decaer|irregular
talk-down|talked-down|talked-down|quitar hierro de palabra|quitó hierro de palabra|quitado hierro de palabra|regular
talk-up|talked-up|talked-up|ponderar de palabra|ponderó de palabra|ponderado de palabra|regular
talk-round|talked-round|talked-round|convencer a vueltas|convenció a vueltas|convencido a vueltas|regular
talk-through|talked-through|talked-through|repasar en voz alta|repasó en voz alta|repasado en voz alta|regular
walk-through|walked-through|walked-through|recorrer paso a paso|recorrió paso a paso|recorrido paso a paso|regular
run-through|ran-through|run-through|repasar de corrido|repasó de corrido|repasado de corrido|irregular
zero-in|zeroed-in|zeroed-in|apuntar de lleno|apuntó de lleno|apuntado de lleno|regular
home-in|homed-in|homed-in|fijar el blanco|fijó el blanco|fijado el blanco|regular
zero-out|zeroed-out|zeroed-out|dejar en cero|dejó en cero|dejado en cero|regular
net-off|netted-off|netted-off|compensar|compensó|compensado|regular
set-off|set-off|set-off|compensar|compensó|compensado|irregular
set-aside|set-aside|set-aside|reservar|reservó|reservado|irregular
set-about|set-about|set-about|ponerse a|se puso a|puesto a|irregular
pit-against|pitted-against|pitted-against|enfrentar|enfrentó|enfrentado|regular
play-down|played-down|played-down|quitar hierro|quitó hierro|quitado hierro|regular
play-up|played-up|played-up|hinchar|hinchó|hinchado|regular
play-off|played-off|played-off|enfrentar entre sí|enfrentó entre sí|enfrentado entre sí|regular
fob-off|fobbed-off|fobbed-off|despachar con evasivas|despachó con evasivas|despachado con evasivas|regular
palm-off|palmed-off|palmed-off|colar|coló|colado|regular
fob-onto|fobbed-onto|fobbed-onto|cargar a otro|cargó a otro|cargado a otro|regular
saddle-with|saddled-with|saddled-with|cargar con|cargó con|cargado con|regular
saddle|saddled|saddled|cargar|cargó|cargado|regular
saddle-on|saddled-on|saddled-on|imponer la carga|impuso la carga|impuesto la carga|regular
saddle-upon|saddled-upon|saddled-upon|cargar sobre|cargó sobre|cargado sobre|regular
saddle-onto|saddled-onto|saddled-onto|echar encima|echó encima|echado encima|regular
saddle-off|saddled-off|saddled-off|quitar la carga|quitó la carga|quitado la carga|regular
unload|unloaded|unloaded|deshacerse de|se deshizo de|deshecho de|regular
offload|offloaded|offloaded|traspasar la carga|traspasó la carga|traspasado la carga|regular
dump|dumped|dumped|deshacerse a pérdidas|se deshizo a pérdidas|deshecho a pérdidas|regular
unload-onto|unloaded-onto|unloaded-onto|echar encima a|echó encima a|echado encima a|regular
offload-onto|offloaded-onto|offloaded-onto|traspasar a|traspasó a|traspasado a|regular
dump-onto|dumped-onto|dumped-onto|echar encima a|echó encima a|echado encima a|regular
front-run|front-ran|front-run|adelantarse al mercado|se adelantó al mercado|adelantado al mercado|irregular
insider-deal|insider-dealt|insider-dealt|operar con información privilegiada|operó con información privilegiada|operado con información privilegiada|irregular
whistle-blow|whistle-blew|whistle-blown|denunciar desde dentro|denunció desde dentro|denunciado desde dentro|irregular
leak|leaked|leaked|filtrar|filtró|filtrado|regular
brief|briefed|briefed|poner al corriente|puso al corriente|puesto al corriente|regular
debrief|debriefed|debriefed|tomar declaración de vuelta|tomó declaración de vuelta|tomado declaración de vuelta|regular
doorstep|doorstepped|doorstepped|asaltar a la puerta|asaltó a la puerta|asaltado a la puerta|regular
ambush|ambushed|ambushed|tender una celada|tendió una celada|tendido una celada|regular
lowball|lowballed|lowballed|pujar a la baja|pujó a la baja|pujado a la baja|regular
highball|highballed|highballed|pujar al alza|pujó al alza|pujado al alza|regular
low-ball|low-balled|low-balled|ofrecer a la baja|ofreció a la baja|ofrecido a la baja|regular
high-ball|high-balled|high-balled|pedir al alza|pidió al alza|pedido al alza|regular
anchor|anchored|anchored|anclar|ancló|anclado|regular
peg|pegged|pegged|atar a un tipo|ató a un tipo|atado a un tipo|regular
unpeg|unpegged|unpegged|desatar del tipo|desató del tipo|desatado del tipo|regular
depeg|depegged|depegged|desvincular del tipo|desvinculó del tipo|desvinculado del tipo|regular
repeg|repegged|repegged|volver a atar al tipo|volvió a atar al tipo|vuelto a atar al tipo|regular
cap|capped|capped|poner tope|puso tope|puesto tope|regular
uncap|uncapped|uncapped|quitar el tope|quitó el tope|quitado el tope|regular
floor|floored|floored|poner suelo|puso suelo|puesto suelo|regular
collar|collared|collared|poner banda|puso banda|puesto banda|regular
unhedge|unhedged|unhedged|dejar sin cobertura|dejó sin cobertura|dejado sin cobertura|regular
net|netted|netted|liquidar en neto|liquidó en neto|liquidado en neto|regular
gross-up|grossed-up|grossed-up|brutar|brutó|brutado|regular
net-down|netted-down|netted-down|dejar en neto|dejó en neto|dejado en neto|regular
write-up|wrote-up|written-up|revalorizar|revalorizó|revalorizado|irregular
mark-up|marked-up|marked-up|marcar al alza|marcó al alza|marcado al alza|regular
mark-down|marked-down|marked-down|marcar a la baja|marcó a la baja|marcado a la baja|regular
mark-to-market|marked-to-market|marked-to-market|valorar a mercado|valoró a mercado|valorado a mercado|regular
impair|impaired|impaired|deteriorar|deterioró|deteriorado|regular
unimpair|unimpaired|unimpaired|dejar sin deterioro|dejó sin deterioro|dejado sin deterioro|regular
provision|provisioned|provisioned|dotar|dotó|dotado|regular
unprovision|unprovisioned|unprovisioned|liberar la dotación|liberó la dotación|liberado la dotación|regular
release|released|released|liberar|liberó|liberado|regular
charge|charged|charged|cargar|cargó|cargado|regular
recharge|recharged|recharged|recargar|recargó|recargado|regular
overcharge|overcharged|overcharged|cobrar de más|cobró de más|cobrado de más|regular
undercharge|undercharged|undercharged|cobrar de menos|cobró de menos|cobrado de menos|regular
surcharge|surcharged|surcharged|recargar|recargó|recargado|regular
claw|clawed|clawed|arrebatar|arrebató|arrebatado|regular
recoup|recouped|recouped|resarcirse|se resarció|resarcido|regular
recapture|recaptured|recaptured|recuperar|recuperó|recuperado|regular
reclaim|reclaimed|reclaimed|reclamar la devolución|reclamó la devolución|reclamado la devolución|regular
clawback|clawbacked|clawbacked|reintegrar|reintegró|reintegrado|regular
escheat|escheated|escheated|revertir al fisco|revirtió al fisco|revertido al fisco|regular
disapply|disapplied|disapplied|dejar sin aplicación|dejó sin aplicación|dejado sin aplicación|regular
sunset|sunsetted|sunsetted|dejar caducar|dejó caducar|dejado caducar|regular
grandfather|grandfathered|grandfathered|respetar derechos adquiridos|respetó derechos adquiridos|respetado derechos adquiridos|regular
hard-wire|hard-wired|hard-wired|dejar grabado|dejó grabado|dejado grabado|regular
soft-wire|soft-wired|soft-wired|dejar flexible|dejó flexible|dejado flexible|regular
future-proof|future-proofed|future-proofed|poner a prueba del porvenir|puso a prueba del porvenir|puesto a prueba del porvenir|regular
futureproof|futureproofed|futureproofed|blindar de antemano|blindó de antemano|blindado de antemano|regular
stress-test|stress-tested|stress-tested|someter a prueba de estrés|sometió a prueba de estrés|sometido a prueba de estrés|regular
road-test|road-tested|road-tested|poner a prueba en marcha|puso a prueba en marcha|puesto a prueba en marcha|regular
field-test|field-tested|field-tested|poner a prueba sobre el terreno|puso a prueba sobre el terreno|puesto a prueba sobre el terreno|regular
beta-test|beta-tested|beta-tested|poner a prueba piloto|puso a prueba piloto|puesto a prueba piloto|regular
pilot|piloted|piloted|poner en piloto|puso en piloto|puesto en piloto|regular
trial|trialled|trialled|ensayar|ensayó|ensayado|regular
outflank|outflanked|outflanked|rebasar por el flanco|rebasó por el flanco|rebasado por el flanco|regular
rollout|rollouted|rollouted|desplegar|desplegó|desplegado|regular
soft-launch|soft-launched|soft-launched|lanzar en sordina|lanzó en sordina|lanzado en sordina|regular
hard-launch|hard-launched|hard-launched|lanzar a bombo|lanzó a bombo|lanzado a bombo|regular
soft-open|soft-opened|soft-opened|abrir en sordina|abrió en sordina|abierto en sordina|regular
hard-close|hard-closed|hard-closed|cerrar en firme|cerró en firme|cerrado en firme|regular
soft-close|soft-closed|soft-closed|cerrar en sordina|cerró en sordina|cerrado en sordina|regular
hard-stop|hard-stopped|hard-stopped|parar en seco|paró en seco|parado en seco|regular
soft-stop|soft-stopped|soft-stopped|parar con tiento|paró con tiento|parado con tiento|regular
kill|killed|killed|echar abajo|echó abajo|echado abajo|regular
spike|spiked|spiked|archivar de un golpe|archivó de un golpe|archivado de un golpe|regular
outmanoeuvre|outmanoeuvred|outmanoeuvred|desbordar|desbordó|desbordado|regular
bin|binned|binned|tirar a la papelera|tiró a la papelera|tirado a la papelera|regular
can|canned|canned|dar carpetazo|dio carpetazo|dado carpetazo|regular
axe|axed|axed|destituir de un tajo|destituyó de un tajo|destituido de un tajo|regular
scrap|scrapped|scrapped|echar al desguace|echó al desguace|echado al desguace|regular
junk|junked|junked|tirar al desecho|tiró al desecho|tirado al desecho|regular
ditch|ditched|ditched|abandonar|abandonó|abandonado|regular
jettison|jettisoned|jettisoned|alijar|alijó|alijado|regular
jettison-off|jettisoned-off|jettisoned-off|echar por la borda|echó por la borda|echado por la borda|regular
warehouse|warehoused|warehoused|guardar en almacén|guardó en almacén|guardado en almacén|regular
stockpile|stockpiled|stockpiled|acopiar|acopió|acopiado|regular
hoard|hoarded|hoarded|atesorar|atesoró|atesorado|regular
squirrel|squirreled|squirreled|esconder para después|escondió para después|escondido para después|regular
squirrel-away|squirreled-away|squirreled-away|esconder a buen recaudo|escondió a buen recaudo|escondido a buen recaudo|regular
ringfence|ringfenced|ringfenced|poner cortafuegos|puso cortafuegos|puesto cortafuegos|regular
firewall|firewalled|firewalled|tabicar el riesgo|tabicó el riesgo|tabicado el riesgo|regular
silo|siloed|siloed|encerrar en silo|encerró en silo|encerrado en silo|regular
unsilo|unsiloed|unsiloed|sacar del silo|sacó del silo|sacado del silo|regular
silo-off|siloed-off|siloed-off|aislar en silo|aisló en silo|aislado en silo|regular
redistrict|redistricted|redistricted|redibujar distritos|redibujó distritos|redibujado distritos|regular
firewall-off|firewalled-off|firewalled-off|aislar con muro|aisló con muro|aislado con muro|regular
chinese-wall|chinese-walled|chinese-walled|alzar muralla china|alzó muralla china|alzado muralla china|regular
gag|gagged|gagged|amordazar|amordazó|amordazado|regular
ungag|ungagged|ungagged|quitar la mordaza|quitó la mordaza|quitado la mordaza|regular
gag-order|gag-ordered|gag-ordered|imponer silencio|impuso silencio|impuesto silencio|regular
injunct|injuncted|injuncted|interdecir|interdijo|interdicho|regular
restrain|restrained|restrained|coartar|coartó|coartado|regular
stay|stayed|stayed|suspender|suspendió|suspendido|regular
unstay|unstayed|unstayed|alzar la suspensión|alzó la suspensión|alzado la suspensión|regular
adjourn|adjourned|adjourned|aplazar la sesión|aplazó la sesión|aplazado la sesión|regular
prorogue|prorogued|prorogued|cerrar la legislatura|cerró la legislatura|cerrado la legislatura|regular
unseat|unseated|unseated|desalojar del escaño|desalojó del escaño|desalojado del escaño|regular
prorogate|prorogated|prorogated|prorrogar|prorrogó|prorrogado|regular
whip|whipped|whipped|imponer disciplina de voto|impuso disciplina de voto|impuesto disciplina de voto|regular
unwhip|unwhipped|unwhipped|levantar la disciplina|levantó la disciplina|levantado la disciplina|regular
pair|paired|paired|emparejar ausencias|emparejó ausencias|emparejado ausencias|regular
unpair|unpaired|unpaired|desemparejar|desemparejó|desemparejado|regular
cloture|clotured|clotured|cerrar el debate|cerró el debate|cerrado el debate|regular
outvote|outvoted|outvoted|ganar por votos|ganó por votos|ganado por votos|regular
timetable|timetabled|timetabled|poner calendario|puso calendario|puesto calendario|regular
steamroller|steamrollered|steamrollered|aplanar el trámite|aplanó el trámite|aplanado el trámite|regular
guillotine|guillotined|guillotined|cortar el debate|cortó el debate|cortado el debate|regular
kangaroo|kangarooed|kangarooed|saltar enmiendas|saltó enmiendas|saltado enmiendas|regular
closure|closured|closured|acordar el cierre|acordó el cierre|acordado el cierre|regular
`);

export function buildEnglishC1Words(takenIds: ReadonlySet<string>): VocabularyItem[] {
  return [
    ...expandLockedWords("en", "nouns", C1_EN_NOUNS, takenIds, "C1"),
    ...expandLockedWords("en", "adjectives", C1_EN_ADJECTIVES, takenIds, "C1"),
    ...expandLockedWords("en", "adverbs", C1_EN_ADVERBS, takenIds, "C1"),
    ...expandLockedWords("en", "connectors", C1_EN_CONNECTORS, takenIds, "C1"),
    ...expandLockedWords("en", "pronouns", C1_EN_PRONOUNS, takenIds, "C1"),
    ...expandLockedWords("en", "prepositions", C1_EN_PREPOSITIONS, takenIds, "C1"),
  ];
}

export function buildEnglishC1Verbs(takenIds: ReadonlySet<string>): VerbItem[] {
  return expandLockedVerbs("en", C1_EN_VERBS, takenIds, "C1");
}
