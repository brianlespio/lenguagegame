import { expandLockedVerbs, expandLockedWords } from "../c2/expand";
import { parseVerbBlob, parseWordBlob } from "../c2/parse";
import type { VerbItem, VocabularyItem } from "../../types/vocabulary";

const C1_FR_NOUNS = parseWordBlob(`
enjeu|lo que está en juego
constat|comprobación
démarche|enfoque
bilan|balance
écart|desfase
recul|retroceso
essor|auge
essoufflement|agotamiento del impulso
glissement|desliz
dérive|desvío
levier|palanca
curseur|cursor de ajuste
garde-fou|salvaguarda
levée de boucliers|oleada de protestas
prise de position|toma de postura
prise de recul|toma de distancia
prise d'acte|toma de razón
mise en œuvre|puesta en práctica
mise en cause|puesta en entredicho
mise à l'écart|apartamiento
mise sous tutelle|puesta bajo tutela
mise sous tension|puesta en tensión
tour de vis|apretón de tuerca
tour de table|ronda de consultas
tour de force|proeza
état des lieux|inventario de situación
état de grâce|luna de miel política
rapport de force|correlación de fuerzas
rapport d'étape|informe de situación
jeu d'influence|juego de influencias
jeu de dupes|engaño recíproco
marge de manœuvre|margen de maniobra
marge d'erreur|margen de error
seuil de tolérance|umbral de tolerancia
seuil de rentabilité|umbral de rentabilidad
point de bascule|punto de inflexión
point de rupture|punto de quiebre
point de friction|punto de roce
angle mort|ángulo muerto
angle d'attaque|ángulo de ataque
ligne de fracture|línea de fractura
ligne de crête|línea de cresta
ligne de conduite|pauta de conducta
ligne de mire|punto de mira
ventre mou|flanco débil
pierre d'achoppement|escollo
levier d'action|palanca de acción
effet de seuil|efecto umbral
effet cliquet|efecto trinquete
effet d'éviction|efecto de expulsión
effet d'entraînement|efecto de arrastre
effet pervers|efecto perverso
effet de bord|efecto colateral
effet de levier|efecto palanca
trou dans la raquette|laguna de cobertura
cap à tenir|rumbo a mantener
plafond de verre|techo de cristal
plancher salarial|suelo salarial
socle commun|suelo común
socle de droits|suelo de derechos
vivier|cantera
gisement d'emplois|yacimiento de empleo
gisement fiscal|yacimiento fiscal
trou budgétaire|agujero presupuestario
dérapage|descontrol
dérapage budgétaire|descontrol presupuestario
dérapage verbal|desliz verbal
emballement|embalamiento
emballement médiatique|embalamiento mediático
redressement|saneamiento
redressement fiscal|regularización tributaria
plan de relance|plan de reactivación
couac|fallo de coordinación
couac diplomatique|fallo diplomático
impasse|punto muerto
bras de fer|pulso
montée au créneau|salida a la palestra
montée en gamme|salto de gama
montée en charge|rampa de carga
descente aux enfers|caída en picado
fuite en avant|huida hacia adelante
fuite des cerveaux|fuga de cerebros
fuite de capitaux|fuga de capitales
ballottage|segunda vuelta reñida
ballottement|vaivén
essoufflement démographique|agotamiento demográfico
essoufflement de la croissance|agotamiento del crecimiento
glissement sémantique|desliz semántico
glissement de terrain politique|corrimiento político
dérive autoritaire|desvío autoritario
dérive identitaire|desvío identitario
garde-fou budgétaire|salvaguarda presupuestaria
garde-fou démocratique|salvaguarda democrática
prise de bec|altercado
prise d'otages|toma de rehenes
prise de pouvoir|toma del poder
prise de participation|toma de participación
mise au pas|poner en vereda
mise au ban|puesta al margen
mise à jour|puesta al día
mise à plat|puesta en claro
mise en demeure tacite|apremio tácito
mise en examen|imputación
mise en quarantaine|puesta en cuarentena
tour d'écrou|vuelta de tuerca
tour de chauffe|calentamiento
état de sidération|estado de estupor
état d'alerte|estado de alerta
rapport d'étonnement|informe de extrañeza
rapport de minorité|voto particular
jeu de bascule|juego de vaivén
jeu de rôle institutionnel|reparto institucional
marge de sécurité|margen de seguridad
marge brute|margen bruto
seuil d'alerte|umbral de alerta
seuil de pauvreté|umbral de pobreza
point d'achoppement|punto de tropiezo
point d'honneur|pundonor
point de passage|punto de paso
angle d'approche|ángulo de aproximación
ligne de partage|línea divisoria
ligne de faille|línea de falla
ventre de l'appareil|entrañas del aparato
vivier de talents|cantera de talento
gisement d'économies|yacimiento de ahorros
trou d'air|bache
trou de mémoire collectif|amnesia colectiva
dérapage inflationniste|descontrol inflacionario
emballement spéculatif|embalamiento especulativo
redressement productif|saneamiento productivo
bras de fer salarial|pulso salarial
montée des périls|crescendo de peligros
fuite en avant budgétaire|huida presupuestaria
ballottage serré|segunda vuelta ajustada
constat d'échec|comprobación de fracaso
constat d'huissier|acta de requerimiento
démarche qualité|enfoque de calidad
démarche participative|enfoque participativo
bilan de compétences|balance de competencias
bilan carbone|huella de carbono
écart salarial|brecha salarial
écart de richesse|brecha de riqueza
recul démocratique|retroceso democrático
essor industriel|auge industrial
levier fiscal|palanca tributaria
curseur réglementaire|cursor normativo
garde-fou éthique|salvaguarda ética
levée d'immunité|alzamiento de inmunidad
prise de risque calculée|riesgo calculado
mise sous cloche|puesta bajo campana
tour de piste médiatique|ronda mediática
état des forces|estado de fuerzas
rapport d'étonnement interne|nota de extrañeza interna
jeu serré|partida ajustada
marge nette|margen neto
seuil critique|umbral crítico
point mort économique|punto de equilibrio
angle mort réglementaire|ángulo muerto normativo
ligne rouge|línea roja
ventre mou électoral|flanco electoral débil
pierre angulaire|piedra angular
effet boomerang|efecto bumerán
cap budgétaire|techo de gasto
plafond d'endettement|techo de endeudamiento
plancher de recettes|suelo de ingresos
socle électoral|suelo electoral
vivier militant|cantera militante
gisement de croissance|yacimiento de crecimiento
trou législatif|laguna legislativa
dérapage sécuritaire|desliz securitario
emballement sécuritaire|embalamiento securitario
redressement des comptes|saneamiento de cuentas
couac de communication|fallo de comunicación
impasse diplomatique|punto muerto diplomático
bras de fer commercial|pulso comercial
montée en puissance|ascenso en potencia
descente aux urnes|bajada a las urnas
fuite organisée|filtración organizada
ballottage improbable|segunda vuelta inesperada
enjeu caché|envite oculto
constat amer|comprobación amarga
démarche dilatoire|enfoque dilatorio
bilan contrasté|balance mixto
écart abyssal|desfase abismal
recul historique|retroceso histórico
essor furtif|auge furtivo
glissement programmé|desliz programado
dérive comptable|desvío contable
levier réglementaire|palanca normativa
`);
const C1_FR_ADJECTIVES = parseWordBlob(`
saillant|destacado
épineux|espinoso
litigieux|contencioso
contestable|impugnable
discutable|cuestionable
préoccupant|preocupante
alarmant|alarmante
latent|latente
sous-jacent|subyacente
conjoncturel|coyuntural
structurel de fond|de fondo
de façade|de escaparate
de circonstance|de circunstancias
de convenance|de conveniencia
de principe|de principio
de fond|de sustancia
brûlant|candente
sensible à vif|en carne viva
délicat à manier|delicado de manejar
explosif|explosivo
inflammable|inflamable
irréversible|irreversible
réversible à grand-peine|reversible a duras penas
tenace|tenaz
persistant|persistente
récurrent|recurrente
chronique|crónico
endémique|endémico
systémique|sistémico
oblique|oblicuo
biaise|sesgado
partial|parcial
impartial|imparcial
équivoque|equívoco
sans équivoque|inequívoco
ambigu|ambiguo
univoque|unívoco
opaque|opaco
lisible|legible
illisible|ilegible
opaque à dessein|opaco a propósito
lisible d'emblée|legible de entrada
recevable sur le fond|admisible en el fondo
irrecevable sur la forme|inadmisible en la forma
fondé|fundado
infondé|infundado
fondé en droit|fundado en derecho
mal fondé|mal fundado
étayé|apuntalado
étayé de preuves|apuntalado con pruebas
étayé de chiffres|apuntalado con cifras
pérenne|perenne
éphémère|efímero
fugace|fugaz
durable|duradero
intenable|insostenible
tenable|sostenible
praticable|practicable
impraticable|impracticable
opérant|operante
inopérant|inoperante
efficace à la marge|eficaz en el margen
inefficace au fond|ineficaz de fondo
coûteux|costoso
onéreux|oneroso
gratuit de prime abord|gratuito a primera vista
dissuasif|disuasorio
incitatif|incentivador
prohibitoire|prohibitivo
abordable|asequible
inabordable|inasequible
soutenable|sostenible
insoutenable|insostenible
tenable à court terme|sostenible a corto plazo
intenable à terme|insostenible a plazo
criant|escandaloso
flagrant|flagrante
patent|patente
manifeste|manifiesto
occulte|oculto
dissimulé|disimulado
avoué|confeso
inavoué de fait|inconfeso de hecho
tacite|tácito
explicite|explícito
implicite|implícito
sous-entendu|sobrentendido
à géométrie variable|de geometría variable
à deux vitesses|a dos velocidades
à rebours du réel|a contrapelo de lo real
à contre-courant du débat|a contracorriente del debate
hors sol|desarraigado
hors d'haleine|sin aliento
hors de propos|fuera de lugar
hors-norme|fuera de norma
hors-sol intellectuel|desarraigado intelectualmente
en trompe-l'œil|de trampantojo
en sursis|en suspenso
en porte-à-faux|en falso
en décalage|desfasado
en porte-à-faux moral|en falso moral
en décalage horaire politique|desfasado políticamente
en roue libre|en rueda libre
en porte-à-faux juridique|en falso jurídico
en porte-à-faux budgétaire|en falso presupuestario
en porte-à-faux éthique|en falso ético
en porte-à-faux diplomatique|en falso diplomático
sous tension|bajo tensión
sous perfusion|bajo suero
sous cloche|bajo campana
sous emprise|bajo dominio
sous tutelle|bajo tutela
sous le feu des critiques|bajo el fuego de las críticas
sous le feu des projecteurs|bajo los focos
sous le feu croisé|bajo fuego cruzado
sous le feu des marchés|bajo el fuego de los mercados
lourd de conséquences|cargado de consecuencias
lourd de menaces|cargado de amenazas
lourd de non-dits|cargado de lo no dicho
lourd de sous-entendus|cargado de sobrentendidos
lourd d'arrière-pensées|cargado de segundas intenciones
porteur|prometedor
porteur d'espoir|portador de esperanza
porteur de risques|portador de riesgos
porteur de fractures|portador de fracturas
porteur de germes|portador de gérmenes
porteur d'avenir|portador de porvenir
porteur de conflits|portador de conflictos
porteur de ruptures|portador de rupturas
porteur de bascules|portador de inflexiones
porteur de dérives|portador de desvíos
porteur d'emballements|portador de embalajes
porteur d'essoufflements|portador de agotamientos
porteur de reculs|portador de retrocesos
porteur d'écarts|portador de desfases
porteur de seuils|portador de umbrales
porteur de leviers|portador de palancas
porteur de garde-fous|portador de salvaguardas
porteur de points de rupture|portador de quiebres
porteur d'angles morts|portador de ángulos muertos
porteur de ventres mous|portador de flancos débiles
porteur de fuites en avant|portador de huidas hacia adelante
porteur de bras de fer|portador de pulsos
porteur de couacs|portador de fallos
porteur d'impasses|portador de puntos muertos
porteur de dérapages|portador de descontroles
porteur d'emballements médiatiques|portador de embalajes mediáticos
porteur de fuites de capitaux|portador de fugas de capital
porteur de plafonds de verre|portador de techos de cristal
porteur de lignes de fracture|portador de líneas de fractura
porteur de rapports de force|portador de correlaciones de fuerza
porteur de prises de recul|portador de tomas de distancia
porteur de mises en cause|portador de puestas en entredicho
porteur de levées de boucliers|portador de oleadas de protesta
porteur de tours de vis|portador de apretones de tuerca
porteur d'états des lieux|portador de inventarios
porteur de marges de manœuvre|portador de márgenes de maniobra
porteur de seuils de tolérance|portador de umbrales de tolerancia
porteur de points de bascule|portador de puntos de inflexión
porteur d'angles d'attaque|portador de ángulos de ataque
porteur de lignes de crête|portador de líneas de cresta
porteur de ventres mous électoraux|portador de flancos electorales
porteur de pierres d'achoppement|portador de escollos
porteur d'effets de seuil|portador de efectos umbral
porteur d'effets cliquet|portador de efectos trinquete
porteur d'effets d'éviction|portador de efectos de expulsión
porteur d'effets pervers|portador de efectos perversos
porteur de trous dans la raquette|portador de lagunas de cobertura
porteur de plafonds d'endettement|portador de techos de deuda
porteur de socles électoraux|portador de suelos electorales
porteur de viviers militants|portador de canteras militantes
porteur de gisements de croissance|portador de yacimientos de crecimiento
porteur de trous législatifs|portador de lagunas legislativas
porteur de constats amers|portador de comprobaciones amargas
porteur de bilans contrastés|portador de balances mixtos
porteur d'écarts abyssaux|portador de desfases abismales
porteur de reculs historiques|portador de retrocesos históricos
porteur d'essors furtifs|portador de auges furtivos
porteur de dérives comptables|portador de desvíos contables
porteur de leviers réglementaires|portador de palancas normativas
`);
const C1_FR_ADVERBS = parseWordBlob(`
de facto|de hecho
de jure|de derecho
de plein droit|de pleno derecho
de plein fouet|de lleno
de plain-pied|al mismo nivel
de près|de cerca
de loin|de lejos
de près ou de loin|de cerca o de lejos
de surcroît encore|por añadidura aún
par ailleurs encore|por lo demás aún
d'ailleurs|por lo demás
d'ailleurs même|por lo demás incluso
au demeurant|a fin de cuentas
au reste|por lo demás
du reste|por lo demás
à cet égard|a este respecto
à ce titre|a ese título
à ce propos|a este propósito
à ce sujet|sobre este asunto
à ce stade|en esta etapa
à ce jour|a día de hoy
à ce compte|a esa cuenta
à ce prix|a ese precio
à ce rythme|a ese ritmo
à cette aune-ci|a esta vara
à cette heure|a estas horas
à cette date|a esta fecha
à cette enseigne|a esa enseña
dans cette optique|en esta óptica
dans cette perspective|en esta perspectiva
dans cette logique|en esta lógica
dans cette veine|en esta línea
dans cet esprit|en este espíritu
dans cette mesure|en esa medida
dans cette hypothèse|en esa hipótesis
dans ce sillage|en esa estela
dans ce sillon|en ese surco
dans ce droit-fil|en esa línea
sous cet angle|bajo este ángulo
sous cet éclairage|bajo esta luz
sous cette réserve|bajo esta reserva
sous cet éclairage-là|bajo aquella luz
pour le moins|cuando menos
à tout le moins|cuando menos
a minima|como mínimo
en l'occurrence|en el caso
en tout cas de figure|en todo supuesto
en tout hypothèse|en toda hipótesis
en tout état|en todo estado
en tout bien tout honneur|con toda honra
en tout bien|con todo bien
ce faisant|al hacerlo
ce disant|al decirlo
ce rappelé|recordado esto
ce posé|sentado esto
ce convenu|convenido esto
ce entendu|entendido esto
ce vu|visto esto
ce admis|admitido esto
force est de|fuerza es
force est|fuerza es
partant|por consiguiente
partant de là|partiendo de ahí
dès lors donc|desde entonces pues
or donc|ahora bien
or bien|ahora bien
or voici|ahora bien he aquí
non sans|no sin
non sans mal|no sin trabajo
non sans peine|no sin pena
non sans raison|no sin razón
non sans motif|no sin motivo
non sans fondement|no sin fundamento
non sans arrière-pensée|no sin segunda intención
non sans calcul|no sin cálculo
non sans détour|no sin rodeo
non sans ambages|no sin ambages
non sans réserve|no sin reserva
loin s'en faut|ni mucho menos
tant s'en faut|ni mucho menos
peu s'en faut|por poco
peu s'en est fallu|faltó poco
à peine si|apenas si
à grand-peine|a duras penas
à grand-peine encore|a duras penas aún
à grand renfort|a gran refuerzo
à grand bruit|con gran ruido
à grand spectacle|con gran espectáculo
à grand renfort de|a gran toque de
à grand renfort de chiffres|a gran toque de cifras
à grand renfort d'arguments|a gran toque de argumentos
à grand renfort de preuves|a gran toque de pruebas
à grand renfort de précautions|a gran toque de precauciones
à grand renfort de communications|a gran toque de comunicados
à grand renfort de mises en scène|a gran toque de puestas en escena
à grand renfort de dénégations|a gran toque de negaciones
à grand renfort de mises au point|a gran toque de puntualizaciones
à grand renfort de démentis|a gran toque de desmentidos
à grand renfort de précisions|a gran toque de precisiones
à grand renfort de nuances|a gran toque de matices
à grand renfort de précautions oratoires|a gran toque de cautelas oratorias
à grand renfort de formules|a gran toque de fórmulas
à grand renfort de communiqués|a gran toque de comunicados
à grand renfort de mises en garde|a gran toque de advertencias
à grand renfort de rappels|a gran toque de recordatorios
à grand renfort de précautions de langage|a gran toque de cautelas de lenguaje
à grand renfort de mises à distance|a gran toque de tomas de distancia
à grand renfort de prises de recul|a gran toque de tomas de distancia
à grand renfort d'états des lieux|a gran toque de inventarios
à grand renfort de tours de table|a gran toque de rondas
à grand renfort de mises à plat|a gran toque de puestas en claro
à grand renfort de mises en cause|a gran toque de puestas en entredicho
à grand renfort de levées de boucliers|a gran toque de oleadas de protesta
à grand renfort de tours de vis|a gran toque de apretones
à grand renfort de rapports de force|a gran toque de correlaciones
à grand renfort de lignes de fracture|a gran toque de líneas de fractura
à grand renfort d'angles d'attaque|a gran toque de ángulos de ataque
à grand renfort de points de bascule|a gran toque de inflexiones
à grand renfort de seuils de tolérance|a gran toque de umbrales
à grand renfort de marges de manœuvre|a gran toque de márgenes
à grand renfort de garde-fous|a gran toque de salvaguardas
à grand renfort de leviers|a gran toque de palancas
à grand renfort de curseurs|a gran toque de cursores
à grand renfort de constats|a gran toque de comprobaciones
à grand renfort de bilans|a gran toque de balances
à grand renfort d'écarts|a gran toque de desfases
à grand renfort de reculs|a gran toque de retrocesos
à grand renfort d'essors|a gran toque de auges
à grand renfort de dérives|a gran toque de desvíos
à grand renfort de dérapages|a gran toque de descontroles
à grand renfort d'emballements|a gran toque de embalajes
à grand renfort de fuites en avant|a gran toque de huidas
à grand renfort de bras de fer|a gran toque de pulsos
à grand renfort de couacs|a gran toque de fallos
à grand renfort d'impasses|a gran toque de puntos muertos
à grand renfort de ballottages|a gran toque de segundas vueltas
à grand renfort de montées en gamme|a gran toque de saltos de gama
à grand renfort de fuites de capitaux|a gran toque de fugas de capital
à grand renfort de plafonds de verre|a gran toque de techos de cristal
à grand renfort de ventres mous|a gran toque de flancos débiles
à grand renfort de pierres d'achoppement|a gran toque de escollos
à grand renfort d'effets pervers|a gran toque de efectos perversos
à grand renfort d'effets cliquet|a gran toque de efectos trinquete
à grand renfort de trous dans la raquette|a gran toque de lagunas
à grand renfort de socles électoraux|a gran toque de suelos electorales
à grand renfort de viviers|a gran toque de canteras
à grand renfort de gisements|a gran toque de yacimientos
à grand renfort de trous législatifs|a gran toque de lagunas legislativas
à grand renfort de constats amers|a gran toque de comprobaciones amargas
à grand renfort de bilans contrastés|a gran toque de balances mixtos
à grand renfort d'écarts abyssaux|a gran toque de desfases abismales
à grand renfort de reculs historiques|a gran toque de retrocesos históricos
à grand renfort d'essors furtifs|a gran toque de auges furtivos
à grand renfort de dérives comptables|a gran toque de desvíos contables
à grand renfort de leviers réglementaires|a gran toque de palancas normativas
à grand renfort de curseurs réglementaires|a gran toque de cursores normativos
à grand renfort de gardes-fous éthiques|a gran toque de salvaguardas éticas
à grand renfort de levées d'immunité|a gran toque de alzamientos de inmunidad
à grand renfort de prises de risque|a gran toque de tomas de riesgo
à grand renfort de mises sous cloche|a gran toque de puestas bajo campana
à grand renfort de tours de piste|a gran toque de rondas mediáticas
à grand renfort d'états des forces|a gran toque de estados de fuerzas
à grand renfort de jeux serrés|a gran toque de partidas ajustadas
à grand renfort de marges nettes|a gran toque de márgenes netos
à grand renfort de seuils critiques|a gran toque de umbrales críticos
à grand renfort de points morts|a gran toque de puntos de equilibrio
à grand renfort d'angles morts|a gran toque de ángulos muertos
à grand renfort de lignes rouges|a gran toque de líneas rojas
de ce seul fait|por ese solo hecho
de ce seul chef|por esa sola razón
de ce seul titre|por ese solo título
de ce seul motif|por ese solo motivo
de ce seul regard|por esa sola mirada
de ce seul angle|por ese solo ángulo
de ce seul prisme|por ese solo prisma
de ce seul filtre|por ese solo filtro
de ce seul jour|por esa sola luz
de ce seul sillage|por esa sola estela
`);
const C1_FR_CONNECTORS = parseWordBlob(`
partant|por consiguiente
ce faisant|al hacerlo
à cet égard|a este respecto
à ce titre|a ese título
à ce propos|a este propósito
à ce sujet|sobre este asunto
à ce stade|en esta etapa
au demeurant|a fin de cuentas
d'ailleurs|por lo demás
au reste|por lo demás
du reste|por lo demás
cela dit|dicho esto
ceci dit|dicho esto
ceci étant|siendo esto así
cela étant|siendo ello así
en l'occurrence|en el caso
à tout le moins|cuando menos
pour le moins|cuando menos
a minima|como mínimo
dans cette optique|en esta óptica
dans cette perspective|en esta perspectiva
dans cette logique|en esta lógica
dans cette veine|en esta línea
dans cet esprit|en este espíritu
dans cette mesure|en esa medida
sous cet angle|bajo este ángulo
sous cet éclairage|bajo esta luz
force est de constater que|fuerza es comprobar que
il convient de|conviene
il convient de rappeler que|conviene recordar que
on ne saurait|no se podría
on ne saurait ignorer que|no se podría ignorar que
au-delà de la question de|más allá de la cuestión de
au-delà même de|más allá incluso de
en deçà même de|más acá incluso de
loin s'en faut|ni mucho menos
tant s'en faut|ni mucho menos
peu s'en faut|por poco
non que l'on|no es que se
non pas que l'on|no es que se
ce n'est pas tant que|no es tanto que
ce n'est pas tant|no es tanto
ce n'est pas seulement que|no es solo que
ce n'est pas seulement|no es solo
c'est moins que|es menos que
c'est moins|es menos
c'est davantage que|es más bien que
c'est davantage|es más bien
c'est plutôt que|es más bien que
c'est plutôt|es más bien
c'est moins une affaire de|es menos asunto de
c'est davantage une affaire de|es más asunto de
c'est moins une question de|es menos cuestión de
c'est davantage une question de|es más cuestión de
non sans que|no sin que
non sans dire que|no sin decir que
non sans observer que|no sin observar que
non sans rappeler que|no sin recordar que
non sans préciser que|no sin precisar que
non sans ajouter que|no sin añadir que
non sans souligner que|no sin subrayar que
non sans noter que|no sin señalar que
non sans convenir que|no sin convenir que
non sans admettre que|no sin admitir que
non sans reconnaître que|no sin reconocer que
non sans accorder que|no sin conceder que
non sans accorder|no sin conceder
encore s'en faut-il que|aún falta que
encore s'en faut-il|aún falta
encore se peut-il|aún cabe
encore se peut|aún cabe
encore reste-t-il que|aún queda que
encore reste-t-il|aún queda
encore demeure-t-il que|aún permanece que
encore demeure-t-il|aún permanece
encore convient-il que|aún conviene que
encore convient-il|aún conviene
encore faut-il convenir que|aún hay que convenir que
encore faut-il convenir|aún hay que convenir
encore faut-il reconnaître que|aún hay que reconocer que
encore faut-il reconnaître|aún hay que reconocer
encore faut-il admettre que|aún hay que admitir que
encore faut-il admettre|aún hay que admitir
encore faut-il préciser que|aún hay que precisar que
encore faut-il préciser|aún hay que precisar
encore faut-il ajouter que|aún hay que añadir que
encore faut-il ajouter|aún hay que añadir
encore faut-il souligner que|aún hay que subrayar que
encore faut-il souligner|aún hay que subrayar
encore faut-il noter que|aún hay que señalar que
encore faut-il noter|aún hay que señalar
encore faut-il observer que|aún hay que observar que
encore faut-il observer|aún hay que observar
encore faut-il rappeler que|aún hay que recordar que
encore faut-il rappeler|aún hay que recordar
à ceci près que|con la salvedad de que
à ceci près|con esta salvedad
à cela près|con esa salvedad
à cette différence près que|con la diferencia de que
à cette différence près|con esa diferencia
à cette nuance près que|con el matiz de que
à cette nuance près|con ese matiz
à cette restriction près que|con la restricción de que
à cette restriction près|con esa restricción
à cette condition près que|con la condición de que
à cette condition près|con esa condición
à cette limite près que|con el límite de que
à cette limite près|con ese límite
à cette réserve d'usage près|con la reserva de uso
à cette réserve d'usage près que|con la reserva de uso de que
à cette réserve près|con esa reserva
du moins|al menos
du moins si|al menos si
du moins lorsque|al menos cuando
du moins quand|al menos cuando
du moins dès que|al menos en cuanto
du moins encore que|al menos todavía que
du moins que|al menos que
du moins en ce que|al menos en que
du moins en tant que|al menos en cuanto
du moins pour autant que|al menos en la medida en que
du moins dans la mesure où|al menos en la medida en que
dans la seule mesure où|en la sola medida en que
dans la stricte mesure où|en la estricta medida en que
dans la exacte mesure où|en la exacta medida en que
pour autant que l'on|en la medida en que se
pour autant que l'on sache|en la medida en que se sepa
pour autant que l'on puisse|en la medida en que se pueda
pour autant que l'on veuille|en la medida en que se quiera
pour autant que l'on doive|en la medida en que se deba
pour autant que l'on juge|en la medida en que se juzgue
pour autant que l'on estime|en la medida en que se estime
pour autant que l'on tienne|en la medida en que se tenga
pour autant que l'on fasse|en la medida en que se haga
pour autant que l'on dise|en la medida en que se diga
pour autant que l'on voie|en la medida en que se vea
pour autant que l'on entende|en la medida en que se oiga
pour autant que l'on sente|en la medida en que se sienta
pour peu que l'on|con poco que se
pour peu que l'on sache|con poco que se sepa
pour peu que l'on puisse|con poco que se pueda
pour peu que l'on veuille|con poco que se quiera
pour peu que l'on doive|con poco que se deba
pour peu que l'on juge|con poco que se juzgue
pour peu que l'on estime|con poco que se estime
pour peu que l'on tienne|con poco que se tenga
pour peu que l'on fasse|con poco que se haga
pour peu que l'on dise|con poco que se diga
pour peu que l'on voie|con poco que se vea
si tant est que l'on|si es que se
si tant est que l'on sache|si es que se sepa
si tant est que l'on puisse|si es que se pueda
si tant est que l'on veuille|si es que se quiera
si tant est que l'on doive|si es que se deba
si tant est que l'on juge|si es que se juzgue
si tant est que l'on estime|si es que se estime
si tant est que l'on tienne|si es que se tenga
si tant est que l'on fasse|si es que se haga
si tant est que l'on dise|si es que se diga
si tant est que l'on voie|si es que se vea
à condition que l'on|a condición de que se
à condition que l'on sache|a condición de que se sepa
à condition que l'on puisse|a condición de que se pueda
à condition que l'on veuille|a condición de que se quiera
à condition que l'on doive|a condición de que se deba
à condition que l'on juge|a condición de que se juzgue
à condition que l'on estime|a condición de que se estime
à condition que l'on tienne|a condición de que se tenga
à condition que l'on fasse|a condición de que se haga
à condition que l'on dise|a condición de que se diga
à condition que l'on voie|a condición de que se vea
pourvu que l'on|con tal de que se
pourvu que l'on sache|con tal de que se sepa
pourvu que l'on puisse|con tal de que se pueda
pourvu que l'on veuille|con tal de que se quiera
pourvu que l'on doive|con tal de que se deba
pourvu que l'on juge|con tal de que se juzgue
pourvu que l'on estime|con tal de que se estime
pourvu que l'on tienne|con tal de que se tenga
pourvu que l'on fasse|con tal de que se haga
pourvu que l'on dise|con tal de que se diga
pourvu que l'on voie|con tal de que se vea
`);
const C1_FR_PRONOUNS = parseWordBlob(`
celui dont|aquel de quien
celle dont|aquella de quien
ceux dont|aquellos de quienes
celles dont|aquellas de quienes
celui à qui|aquel a quien
celle à qui|aquella a quien
ceux à qui|aquellos a quienes
celles à qui|aquellas a quienes
celui pour qui|aquel para quien
celle pour qui|aquella para quien
ceux pour qui|aquellos para quienes
celles pour qui|aquellas para quienes
celui avec qui|aquel con quien
celle avec qui|aquella con quien
ceux avec qui|aquellos con quienes
celles avec qui|aquellas con quienes
celui contre qui|aquel contra quien
celle contre qui|aquella contra quien
ceux contre qui|aquellos contra quienes
celles contre qui|aquellas contra quienes
celui chez qui|aquel en casa de quien
celle chez qui|aquella en casa de quien
ceux chez qui|aquellos en casa de quienes
celles chez qui|aquellas en casa de quienes
celui sans qui|aquel sin quien
celle sans qui|aquella sin quien
ceux sans qui|aquellos sin quienes
celles sans qui|aquellas sin quienes
celui sur qui|aquel sobre quien
celle sur qui|aquella sobre quien
ceux sur qui|aquellos sobre quienes
celles sur qui|aquellas sobre quienes
celui en qui|aquel en quien
celle en qui|aquella en quien
ceux en qui|aquellos en quienes
celles en qui|aquellas en quienes
celui par qui|aquel por quien
celle par qui|aquella por quien
ceux par qui|aquellos por quienes
celles par qui|aquellas por quienes
celui auprès de qui|aquel ante quien
celle auprès de qui|aquella ante quien
ceux auprès de qui|aquellos ante quienes
celles auprès de qui|aquellas ante quienes
celui grâce à qui|aquel gracias a quien
celle grâce à qui|aquella gracias a quien
ceux grâce à qui|aquellos gracias a quienes
celles grâce à qui|aquellas gracias a quienes
celui auprès duquel|aquel ante el cual
celle auprès de laquelle|aquella ante la cual
ceux auprès desquels|aquellos ante los cuales
celles auprès desquelles|aquellas ante las cuales
celui au sein duquel|aquel en cuyo seno
celle au sein de laquelle|aquella en cuyo seno
ceux au sein desquels|aquellos en cuyo seno
celles au sein desquelles|aquellas en cuyo seno
celui au regard duquel|aquel a la vista del cual
celle au regard de laquelle|aquella a la vista de la cual
ceux au regard desquels|aquellos a la vista de los cuales
celles au regard desquelles|aquellas a la vista de las cuales
celui auquel|aquel al cual
celle à laquelle|aquella a la cual
ceux auxquels|aquellos a los cuales
celles auxquelles|aquellas a las cuales
celui duquel|aquel del cual
celle de laquelle|aquella de la cual
ceux desquels|aquellos de los cuales
celles desquelles|aquellas de las cuales
celui pour lequel|aquel para el cual
celle pour laquelle|aquella para la cual
ceux pour lesquels|aquellos para los cuales
celles pour lesquelles|aquellas para las cuales
celui avec lequel|aquel con el cual
celle avec laquelle|aquella con la cual
ceux avec lesquels|aquellos con los cuales
celles avec lesquelles|aquellas con las cuales
celui sans lequel|aquel sin el cual
celle sans laquelle|aquella sin la cual
ceux sans lesquels|aquellos sin los cuales
celles sans lesquelles|aquellas sin las cuales
celui sur lequel|aquel sobre el cual
celle sur laquelle|aquella sobre la cual
ceux sur lesquels|aquellos sobre los cuales
celles sur lesquelles|aquellas sobre las cuales
celui dans lequel|aquel en el cual
celle dans laquelle|aquella en la cual
ceux dans lesquels|aquellos en los cuales
celles dans lesquelles|aquellas en las cuales
celui par lequel|aquel por el cual
celle par laquelle|aquella por la cual
ceux par lesquels|aquellos por los cuales
celles par lesquelles|aquellas por las cuales
celui selon lequel|aquel según el cual
celle selon laquelle|aquella según la cual
ceux selon lesquels|aquellos según los cuales
celles selon lesquelles|aquellas según las cuales
celui grâce auquel|aquel gracias al cual
celle grâce à laquelle|aquella gracias a la cual
ceux grâce auxquels|aquellos gracias a los cuales
celles grâce auxquelles|aquellas gracias a las cuales
celui d'entre eux|aquel de entre ellos
celle d'entre elles|aquella de entre ellas
ceux d'entre eux|aquellos de entre ellos
celles d'entre elles|aquellas de entre ellas
chacun d'entre eux|cada uno de entre ellos
chacune d'entre elles|cada una de entre ellas
aucun d'entre eux|ninguno de entre ellos
aucune d'entre elles|ninguna de entre ellas
nul d'entre eux|ninguno de entre ellos
nulle d'entre elles|ninguna de entre ellas
ce dernier|este último
cette dernière|esta última
ces derniers|estos últimos
ces dernières|estas últimas
celui-là même|ese mismo
celle-là même|esa misma
ceux-là mêmes|esos mismos
celles-là mêmes|esas mismas
celui-ci même|este mismo
celle-ci même|esta misma
ceux-ci mêmes|estos mismos
celles-ci mêmes|estas mismas
nulle autre que|ninguna otra que
nulle autre|ninguna otra
tout un chacun|todo quisque
l'un ou l'autre|uno u otro
l'une ou l'autre|una u otra
ni l'un ni l'autre|ni uno ni otro
ni l'une ni l'autre|ni una ni otra
tel ou tel|tal o cual
telle ou telle|tal o cual
qui que l'on soit|sea uno quien sea
quoi que l'on fasse|haga uno lo que haga
où que l'on soit|esté uno donde esté
quelque chose d'autre|algo más
rien d'autre|nada más
personne d'autre|nadie más
tout autre|cualquier otro
tout autre que|cualquier otro que
ce grâce à quoi|gracias a lo cual
ce faute de quoi|a falta de lo cual
ce en vertu de quoi|en virtud de lo cual
ce au vu de quoi|a la vista de lo cual
ce au regard de quoi|respecto de lo cual
ce à la lumière de quoi|a la luz de lo cual
ce par quoi|por lo cual
ce contre quoi|contra lo cual
ce sans quoi|sin lo cual
ce auprès de quoi|ante lo cual
ce au-delà de quoi|más allá de lo cual
ce en deçà de quoi|más acá de lo cual
n'importe lequel d'entre eux|cualquiera de entre ellos
n'importe laquelle d'entre elles|cualquiera de entre ellas
le premier d'entre eux|el primero de entre ellos
le dernier d'entre eux|el último de entre ellos
la première d'entre elles|la primera de entre ellas
la dernière d'entre elles|la última de entre ellas
qui bon vous semblera|quien bien les parezca
quiconque s'y risque|quienquiera que se arriesgue
quiconque s'y essaie|quienquiera que lo intente
quiconque s'en avise|quienquiera que se avenga
celui vers qui|aquel hacia quien
celle vers qui|aquella hacia quien
ceux vers qui|aquellos hacia quienes
celles vers qui|aquellas hacia quienes
celui derrière qui|aquel detrás de quien
celle derrière qui|aquella detrás de quien
ceux derrière qui|aquellos detrás de quienes
celles derrière qui|aquellas detrás de quienes
celui devant qui|aquel ante quien
celle devant qui|aquella ante quien
ceux devant qui|aquellos ante quienes
celles devant qui|aquellas ante quienes
ceux parmi lesquels|aquellos entre los cuales
celles parmi lesquelles|aquellas entre las cuales
celui faute duquel|aquel a falta del cual
celle faute de laquelle|aquella a falta de la cual
ceux faute desquels|aquellos a falta de los cuales
celles faute desquelles|aquellas a falta de las cuales
celui en vertu duquel|aquel en virtud del cual
celle en vertu de laquelle|aquella en virtud de la cual
ceux en vertu desquels|aquellos en virtud de los cuales
celles en vertu desquelles|aquellas en virtud de las cuales
`);
const C1_FR_PREPOSITIONS = parseWordBlob(`
à la lumière de|a la luz de
à la faveur de|al amparo de
à la croisée de|en la encrucijada de
à la lisière de|en el linde de
à la veille de|en vísperas de
à l'aube de|al alba de
à l'orée de|al umbral de
à l'horizon de|en el horizonte de
à l'échelle de|a escala de
à l'échelon de|al escalón de
à hauteur de|a la altura de
au seuil de|al umbral de
au pied de|al pie de
au faîte de|en la cúspide de
au sommet de|en la cumbre de
au cœur de|en el corazón de
au centre de|en el centro de
au mitan de|en el ecuador de
en marge de|al margen de
en sus de|además de
en plus de|además de
par-delà|más allá de
du côté de|del lado de
du chef de|por razón de
du fait de|por el hecho de
du haut de|desde lo alto de
du fond de|desde el fondo de
à portée de|al alcance de
à l'écart de|al margen de
à distance de|a distancia de
à deux pas de|a dos pasos de
à deux doigts de|a dos dedos de
à un cheveu de|a un pelo de
à un fil de|de un hilo de
sous l'angle de|bajo el ángulo de
sous l'aspect de|bajo el aspecto de
sous le rapport de|en el orden de
sous le prisme de|bajo el prisma de
sous le jour de|a la luz de
au prisme de|al prisma de
au filtre de|al filtro de
en échange de|a cambio de
en contrepartie de|en contrapartida de
en retour de|a cambio de
en récompense de|en recompensa de
en punition de|en castigo de
face à|frente a
envers et contre|contra viento y
envers et contre tout|contra viento y marea
abstraction faite de|hecha abstracción de
déduction faite de|hecha deducción de
au titre de|a título de
au titre même de|al título mismo de
au seul titre de|al solo título de
au motif de|con motivo de
au seul motif de|con el solo motivo de
sur le fondement de|sobre el fundamento de
sur la base de|sobre la base de
sur le modèle de|sobre el modelo de
sur le mode de|al modo de
sur le ton de|en el tono de
à la manière de|a la manera de
à la façon de|a la hechura de
dans le sillage de|en la estela de
dans le sillon de|en el surco de
dans le prolongement de|en la prolongación de
dans le droit fil de|en la línea de
à la merci de|a merced de
à la portée de|al alcance de
hors de portée de|fuera del alcance de
à la disposition de|a disposición de
à la charge de|a cargo de
à la tête de|al frente de
à la solde de|a sueldo de
à la botte de|al dictado de
au service de|al servicio de
au contact de|al contacto de
au contact même de|al contacto mismo de
du seul fait de|por el solo hecho de
du seul chef de|por la sola razón de
du fait même de|por el hecho mismo de
du chef même de|por la razón misma de
à la croisée des|en la encrucijada de los
à la lisière même de|en el linde mismo de
à la veille même de|en vísperas mismas de
à l'aube même de|al alba misma de
à l'orée même de|al umbral mismo de
à l'horizon même de|en el horizonte mismo de
à l'échelle même de|a escala misma de
à l'échelon même de|al escalón mismo de
à hauteur même de|a la altura misma de
au seuil même de|al umbral mismo de
au pied même de|al pie mismo de
au faîte même de|en la cúspide misma de
au sommet même de|en la cumbre misma de
au cœur même de|en el corazón mismo de
au centre même de|en el centro mismo de
au mitan même de|en el ecuador mismo de
en marge même de|al margen mismo de
en sus même de|además mismo de
par-delà même|más allá mismo de
au-delà même de|más allá mismo de
du côté même de|del lado mismo de
du haut même de|desde lo alto mismo de
du fond même de|desde el fondo mismo de
à portée même de|al alcance mismo de
à l'écart même de|al margen mismo de
à distance même de|a distancia misma de
à deux pas même de|a dos pasos mismos de
à deux doigts même de|a dos dedos mismos de
sous l'angle même de|bajo el ángulo mismo de
sous l'aspect même de|bajo el aspecto mismo de
sous le rapport même de|en el orden mismo de
sous le prisme même de|bajo el prisma mismo de
sous le jour même de|a la luz misma de
au prisme même de|al prisma mismo de
au filtre même de|al filtro mismo de
en échange même de|a cambio mismo de
en contrepartie même de|en contrapartida misma de
en retour même de|a cambio mismo de
face même à|frente mismo a
au titre seul de|al título solo de
au motif même de|con motivo mismo de
sur le fondement même de|sobre el fundamento mismo de
sur la base même de|sobre la base misma de
sur le modèle même de|sobre el modelo mismo de
sur le mode même de|al modo mismo de
sur le ton même de|en el tono mismo de
à la manière même de|a la manera misma de
à la façon même de|a la hechura misma de
dans le sillage même de|en la estela misma de
dans le sillon même de|en el surco mismo de
dans le prolongement même de|en la prolongación misma de
dans le droit fil même de|en la línea misma de
à la merci même de|a merced misma de
à la portée même de|al alcance mismo de
à la disposition même de|a disposición misma de
à la charge même de|a cargo mismo de
à la tête même de|al frente mismo de
à la solde même de|a sueldo mismo de
à la botte même de|al dictado mismo de
au service même de|al servicio mismo de
hors de portée même de|fuera del alcance mismo de
à un cheveu même de|a un pelo mismo de
à un fil même de|de un hilo mismo de
envers et contre même|contra viento mismo
abstraction faite même de|hecha abstracción misma de
déduction faite même de|hecha deducción misma de
en récompense même de|en recompensa misma de
en punition même de|en castigo mismo de
à la faveur même de|al amparo mismo de
à la lumière même de|a la luz misma de
à la lumière seule de|a la sola luz de
à la faveur seule de|al solo amparo de
au seul prisme de|al solo prisma de
au seul filtre de|al solo filtro de
sous le seul angle de|bajo el solo ángulo de
sous le seul rapport de|en el solo orden de
sous le seul prisme de|bajo el solo prisma de
sous le seul jour de|a la sola luz de
dans le seul sillage de|en la sola estela de
dans le seul prolongement de|en la sola prolongación de
dans le seul droit fil de|en la sola línea de
du seul côté de|del solo lado de
du seul haut de|desde el solo alto de
du seul fond de|desde el solo fondo de
à la seule merci de|a la sola merced de
à la seule portée de|al solo alcance de
à la seule disposition de|a la sola disposición de
à la seule charge de|al solo cargo de
à la seule tête de|al solo frente de
à la seule solde de|al solo sueldo de
au seul service de|al solo servicio de
au seul contact de|al solo contacto de
au seul seuil de|al solo umbral de
au seul pied de|al solo pie de
au seul faîte de|en la sola cúspide de
au seul sommet de|en la sola cumbre de
au seul cœur de|en el solo corazón de
au seul centre de|en el solo centro de
au seul mitan de|en el solo ecuador de
en seule marge de|al solo margen de
`);
const C1_FR_VERBS = parseVerbBlob(`
constater|a constaté|constaté|comprobar|comprobó|comprobado|auxiliary-avoir
susciter|a suscité|suscité|suscitar|suscitó|suscitado|auxiliary-avoir
fragiliser|a fragilisé|fragilisé|quebrar la solidez|quebró la solidez|quebrada la solidez|auxiliary-avoir
pérenniser|a pérennisé|pérennisé|hacer perdurable|hizo perdurable|hecho perdurable|auxiliary-avoir
recentrer|a recentré|recentré|reorientar|reorientó|reorientado|auxiliary-avoir
atténuer|a atténué|atténué|atenuar|atenuó|atenuado|auxiliary-avoir
accentuer|a accentué|accentué|acentuar|acentuó|acentuado|auxiliary-avoir
exacerber|a exacerbé|exacerbé|exacerbar|exacerbó|exacerbado|auxiliary-avoir
cristalliser|a cristallisé|cristallisé|cuajar|cuajó|cuajado|auxiliary-avoir
polariser|a polarisé|polarisé|hendir el campo|hendió el campo|hendido el campo|auxiliary-avoir
contourner|a contourné|contourné|sortear|sorteó|sorteado|auxiliary-avoir
délimiter|a délimité|délimité|deslindar|deslindó|deslindado|auxiliary-avoir
encadrer|a encadré|encadré|enmarcar|enmarcó|enmarcado|auxiliary-avoir
dénoncer|a dénoncé|dénoncé|denunciar|denunció|denunciado|auxiliary-avoir
stigmatiser|a stigmatisé|stigmatisé|estigmatizar|estigmatizó|estigmatizado|auxiliary-avoir
minimiser|a minimisé|minimisé|restar peso|restó peso|restado peso|auxiliary-avoir
relativiser|a relativisé|relativisé|poner en perspectiva|puso en perspectiva|puesto en perspectiva|auxiliary-avoir
étoffer|a étoffé|étoffé|dar cuerpo|dio cuerpo|dado cuerpo|auxiliary-avoir
renforcer|a renforcé|renforcé|reforzar|reforzó|reforzado|auxiliary-avoir
ébranler|a ébranlé|ébranlé|hacer temblar|hizo temblar|hecho temblar|auxiliary-avoir
baliser|a balisé|balisé|balizar|balizó|balizado|auxiliary-avoir
aménager|a aménagé|aménagé|acondicionar|acondicionó|acondicionado|auxiliary-avoir
ménager|a ménagé|ménagé|tratar con tiento|trató con tiento|tratado con tiento|auxiliary-avoir
désamorcer|a désamorcé|désamorcé|desactivar|desactivó|desactivado|auxiliary-avoir
déboulonner|a déboulonné|déboulonné|destronar|destronó|destronado|auxiliary-avoir
décrédibiliser|a décrédibilisé|décrédibilisé|restar crédito|restó crédito|restado crédito|auxiliary-avoir
délégitimer|a délégitimé|délégitimé|deslegitimar|deslegitimó|deslegitimado|auxiliary-avoir
fiscaliser|a fiscalisé|fiscalisé|someter a tributo|sometió a tributo|sometido a tributo|auxiliary-avoir
budgétiser|a budgétisé|budgétisé|presupuestar|presupuestó|presupuestado|auxiliary-avoir
prioriser|a priorisé|priorisé|dar primacía|dio primacía|dado primacía|auxiliary-avoir
cautionner|a cautionné|cautionné|amparar|amparó|amparado|auxiliary-avoir
avaliser|a avalisé|avalisé|avalar|avaló|avalado|auxiliary-avoir
endosser|a endossé|endossé|cargar con|cargó con|cargado con|auxiliary-avoir
alerter|a alerté|alerté|poner en guardia|puso en guardia|puesto en guardia|auxiliary-avoir
circonscrire|a circonscrit|circonscrit|circunscribir|circunscribió|circunscrito|auxiliary-avoir
compromettre|a compromis|compromis|poner en peligro|puso en peligro|puesto en peligro|auxiliary-avoir
prescrire|a prescrit|prescrit|preceptuar|preceptuó|preceptuado|auxiliary-avoir
proscrire|a proscrit|proscrit|vedar|vedó|vedado|auxiliary-avoir
souscrire|a souscrit|souscrit|adherirse|se adhirió|adherido|auxiliary-avoir
transcrire|a transcrit|transcrit|pasar a escrito|pasó a escrito|pasado a escrito|auxiliary-avoir
réécrire|a réécrit|réécrit|reescribir|reescribió|reescrito|auxiliary-avoir
affaiblir|a affaibli|affaibli|quebrantar|quebrantó|quebrantado|auxiliary-avoir
amoindrir|a amoindri|amoindri|menguar|menguó|menguado|auxiliary-avoir
aboutir|a abouti|abouti|venir a parar|vino a parar|venido a parar|auxiliary-avoir
assouplir|a assoupli|assoupli|aflojar|aflojó|aflojado|auxiliary-avoir
assouvir|a assouvi|assouvi|saciar|sació|saciado|auxiliary-avoir
approfondir|a approfondi|approfondi|ahondar|ahondó|ahondado|auxiliary-avoir
élargir|a élargi|élargi|ensanchar|ensanchó|ensanchado|auxiliary-avoir
rétrécir|a rétréci|rétréci|estrechar|estrechó|estrechado|auxiliary-avoir
raccourcir|a raccourci|raccourci|acortar|acortó|acortado|auxiliary-avoir
allonger|a allongé|allongé|alargar|alargó|alargado|auxiliary-avoir
alourdir|a alourdi|alourdi|hacer más gravoso|hizo más gravoso|hecho más gravoso|auxiliary-avoir
clarifier|a clarifié|clarifié|poner en claro|puso en claro|puesto en claro|auxiliary-avoir
obscurcir|a obscurci|obscurci|entenebrecer|entenebreció|entenebrecido|auxiliary-avoir
brouiller|a brouillé|brouillé|enturbiar|enturbió|enturbiado|auxiliary-avoir
démêler|a démêlé|démêlé|desenredar|desenredó|desenredado|auxiliary-avoir
dénouer|a dénoué|dénoué|desatar|desató|desatado|auxiliary-avoir
nouer|a noué|noué|anudar|anudó|anudado|auxiliary-avoir
renouer|a renoué|renoué|reanudar|reanudó|reanudado|auxiliary-avoir
trancher|a tranché|tranché|zanjar|zanjó|zanjado|auxiliary-avoir
arbitrer|a arbitré|arbitré|dirimir|dirimió|dirimido|auxiliary-avoir
modérer|a modéré|modéré|templar|templó|templado|auxiliary-avoir
tempérer|a tempéré|tempéré|atemperar|atemperó|atemperado|auxiliary-avoir
canaliser|a canalisé|canalisé|encauzar|encauzó|encauzado|auxiliary-avoir
cibler|a ciblé|ciblé|poner en el punto de mira|puso en el punto de mira|puesto en el punto de mira|auxiliary-avoir
accéder|a accédé|accédé|acceder|accedió|accedido|auxiliary-avoir
concéder|a concédé|concédé|conceder|concedió|concedido|auxiliary-avoir
céder|a cédé|cédé|ceder|cedió|cedido|auxiliary-avoir
précéder|a précédé|précédé|anteceder|antecedió|antecedido|auxiliary-avoir
succéder|a succédé|succédé|suceder|sucedió|sucedido|auxiliary-avoir
intercéder|a intercédé|intercédé|interceder|intercedió|intercedido|auxiliary-avoir
procéder|a procédé|procédé|proceder|procedió|procedido|auxiliary-avoir
aggraver|a aggravé|aggravé|agravar|agravó|agravado|auxiliary-avoir
alléger|a allégé|allégé|aligerar|aligeró|aligerado|auxiliary-avoir
alléguer|a allégué|allégué|alegar|alegó|alegado|auxiliary-avoir
amender|a amendé|amendé|enmendar|enmendó|enmendado|auxiliary-avoir
amplifier|a amplifié|amplifié|amplificar|amplificó|amplificado|auxiliary-avoir
ancrer|a ancré|ancré|anclar|ancló|anclado|auxiliary-avoir
apaiser|a apaisé|apaisé|aplacar|aplacó|aplacado|auxiliary-avoir
appréhender|a appréhendé|appréhendé|aprehender|aprehendió|aprehendido|auxiliary-avoir
approuver|a approuvé|approuvé|aprobar|aprobó|aprobado|auxiliary-avoir
désapprouver|a désapprouvé|désapprouvé|desaprobar|desaprobó|desaprobado|auxiliary-avoir
articuler|a articulé|articulé|articular|articuló|articulado|auxiliary-avoir
assigner|a assigné|assigné|asignar|asignó|asignado|auxiliary-avoir
assumer|a assumé|assumé|cargar con|cargó con|cargado con|auxiliary-avoir
attester|a attesté|attesté|atestiguar|atestiguó|atestiguado|auxiliary-avoir
authentifier|a authentifié|authentifié|autentificar|autentificó|autentificado|auxiliary-avoir
bâillonner|a bâillonné|bâillonné|amordazar|amordazó|amordazado|auxiliary-avoir
basculer|a basculé|basculé|bascular|basculó|basculado|auxiliary-avoir
biaiser|a biaisé|biaisé|sesgar|sesgó|sesgado|auxiliary-avoir
bifurquer|a bifurqué|bifurqué|bifurcar|bifurcó|bifurcado|auxiliary-avoir
borner|a borné|borné|acotar|acotó|acotado|auxiliary-avoir
bouleverser|a bouleversé|bouleversé|trastornar|trastornó|trastornado|auxiliary-avoir
brider|a bridé|bridé|poner brida|puso brida|puesto brida|auxiliary-avoir
cadrer|a cadré|cadré|cuadrar|cuadró|cuadrado|auxiliary-avoir
capter|a capté|capté|captar|captó|captado|auxiliary-avoir
censurer|a censuré|censuré|censurar|censuró|censurado|auxiliary-avoir
cerner|a cerné|cerné|cercar|cercó|cercado|auxiliary-avoir
chapeauter|a chapeauté|chapeauté|tutelar|tuteló|tutelado|auxiliary-avoir
cliver|a clivé|clivé|hendir|hendió|hendido|auxiliary-avoir
cloisonner|a cloisonné|cloisonné|tabicar|tabicó|tabicado|auxiliary-avoir
coincer|a coincé|coincé|aprisionar|aprisionó|aprisionado|auxiliary-avoir
compenser|a compensé|compensé|compensar|compensó|compensado|auxiliary-avoir
concerter|a concerté|concerté|concertar|concertó|concertado|auxiliary-avoir
concilier|a concilié|concilié|conciliar|concilió|conciliado|auxiliary-avoir
condamner|a condamné|condamné|condenar|condenó|condenado|auxiliary-avoir
conforter|a conforté|conforté|afianzar|afianzó|afianzado|auxiliary-avoir
congédier|a congédié|congédié|despedir|despidió|despedido|auxiliary-avoir
consolider|a consolidé|consolidé|consolidar|consolidó|consolidado|auxiliary-avoir
contester|a contesté|contesté|impugnar|impugnó|impugnado|auxiliary-avoir
contrarier|a contrarié|contrarié|contrariar|contrarió|contrariado|auxiliary-avoir
contrebalancer|a contrebalancé|contrebalancé|contrapesar|contrapesó|contrapesado|auxiliary-avoir
contrecarrer|a contrecarré|contrecarré|contrarrestar|contrarrestó|contrarrestado|auxiliary-avoir
contrevenir|a contrevenu|contrevenu|contravenir|contravino|contravenido|auxiliary-avoir
convoquer|a convoqué|convoqué|convocar|convocó|convocado|auxiliary-avoir
coordonner|a coordonné|coordonné|coordinar|coordinó|coordinado|auxiliary-avoir
corroborer|a corroboré|corroboré|corroborar|corroboró|corroborado|auxiliary-avoir
cotiser|a cotisé|cotisé|cotizar|cotizó|cotizado|auxiliary-avoir
créditer|a crédité|crédité|abonar|abonó|abonado|auxiliary-avoir
creuser|a creusé|creusé|ahondar|ahondó|ahondado|auxiliary-avoir
croiser|a croisé|croisé|cruzar|cruzó|cruzado|auxiliary-avoir
culminer|a culminé|culminé|culminar|culminó|culminado|auxiliary-avoir
cumuler|a cumulé|cumulé|acumular|acumuló|acumulado|auxiliary-avoir
débattre|a débattu|débattu|debatir|debatió|debatido|auxiliary-avoir
déborder|a débordé|débordé|desbordar|desbordó|desbordado|auxiliary-avoir
déboucher|a débouché|débouché|desembocar|desembocó|desembocado|auxiliary-avoir
décaler|a décalé|décalé|desfasar|desfasó|desfasado|auxiliary-avoir
décanter|a décanté|décanté|decantar|decantó|decantado|auxiliary-avoir
décentrer|a décentré|décentré|desplazar el centro|desplazó el centro|desplazado el centro|auxiliary-avoir
décerner|a décerné|décerné|otorgar|otorgó|otorgado|auxiliary-avoir
déclencher|a déclenché|déclenché|desencadenar|desencadenó|desencadenado|auxiliary-avoir
décloisonner|a décloisonné|décloisonné|destabicar|destabicó|destabicado|auxiliary-avoir
décortiquer|a décortiqué|décortiqué|desgranar|desgranó|desgranado|auxiliary-avoir
découpler|a découplé|découplé|desacoplar|desacopló|desacoplado|auxiliary-avoir
décréter|a décrété|décrété|decretar|decretó|decretado|auxiliary-avoir
décrypter|a décrypté|décrypté|descifrar|descifró|descifrado|auxiliary-avoir
dédommager|a dédommagé|dédommagé|indemnizar|indemnizó|indemnizado|auxiliary-avoir
défaire|a défait|défait|deshacer|deshizo|deshecho|auxiliary-avoir
défavoriser|a défavorisé|défavorisé|perjudicar|perjudicó|perjudicado|auxiliary-avoir
déferler|a déferlé|déferlé|abatirse|se abatió|abatido|auxiliary-avoir
dégager|a dégagé|dégagé|despejar|despejó|despejado|auxiliary-avoir
dégénérer|a dégénéré|dégénéré|degenerar|degeneró|degenerado|auxiliary-avoir
dégrader|a dégradé|dégradé|degradar|degradó|degradado|auxiliary-avoir
dégrever|a dégrevé|dégrevé|aliviar la carga|alivió la carga|aliviado la carga|auxiliary-avoir
déjouer|a déjoué|déjoué|desbaratar|desbarató|desbaratado|auxiliary-avoir
délester|a délesté|délesté|alijar|alijó|alijado|auxiliary-avoir
délibérer|a délibéré|délibéré|deliberar|deliberó|deliberado|auxiliary-avoir
démanteler|a démantelé|démantelé|desmantelar|desmanteló|desmantelado|auxiliary-avoir
démasquer|a démasqué|démasqué|desenmascarar|desenmascaró|desenmascarado|auxiliary-avoir
démembrer|a démembré|démembré|desmembrar|desmembró|desmembrado|auxiliary-avoir
démobiliser|a démobilisé|démobilisé|desmovilizar|desmovilizó|desmovilizado|auxiliary-avoir
dénaturer|a dénaturé|dénaturé|desvirtuar|desvirtuó|desvirtuado|auxiliary-avoir
dénombrer|a dénombré|dénombré|enumerar|enumeró|enumerado|auxiliary-avoir
déplafonner|a déplafonné|déplafonné|quitar el techo|quitó el techo|quitado el techo|auxiliary-avoir
déployer|a déployé|déployé|desplegar|desplegó|desplegado|auxiliary-avoir
déposséder|a dépossédé|dépossédé|desposeer|desposeyó|desposeído|auxiliary-avoir
dépouiller|a dépouillé|dépouillé|despojar|despojó|despojado|auxiliary-avoir
déprécier|a déprécié|déprécié|depreciar|depreció|depreciado|auxiliary-avoir
dérégler|a déréglé|déréglé|desajustar|desajustó|desajustado|auxiliary-avoir
désenclaver|a désenclavé|désenclavé|sacar del aislamiento|sacó del aislamiento|sacado del aislamiento|auxiliary-avoir
désengager|a désengagé|désengagé|desvincular|desvinculó|desvinculado|auxiliary-avoir
déséquilibrer|a déséquilibré|déséquilibré|desequilibrar|desequilibró|desequilibrado|auxiliary-avoir
désolidariser|a désolidarisé|désolidarisé|desolidarizar|desolidarizó|desolidarizado|auxiliary-avoir
dessaisir|a dessaisi|dessaisi|desposeer|desposeyó|desposeído|auxiliary-avoir
détourner|a détourné|détourné|desviar|desvió|desviado|auxiliary-avoir
dévoiler|a dévoilé|dévoilé|desvelar|desveló|desvelado|auxiliary-avoir
différer|a différé|différé|diferir|difirió|diferido|auxiliary-avoir
diluer|a dilué|dilué|diluir|diluyó|diluido|auxiliary-avoir
disqualifier|a disqualifié|disqualifié|inhabilitar|inhabilitó|inhabilitado|auxiliary-avoir
dissocier|a dissocié|dissocié|disociar|disoció|disociado|auxiliary-avoir
divulguer|a divulgué|divulgué|divulgar|divulgó|divulgado|auxiliary-avoir
dompter|a dompté|dompté|domeñar|domeñó|domeñado|auxiliary-avoir
écarter|a écarté|écarté|apartar|apartó|apartado|auxiliary-avoir
échafauder|a échafaudé|échafaudé|urdir|urdió|urdido|auxiliary-avoir
échelonner|a échelonné|échelonné|escalonar|escalonó|escalonado|auxiliary-avoir
éclaircir|a éclairci|éclairci|aclarar|aclaró|aclarado|auxiliary-avoir
éclipser|a éclipsé|éclipsé|eclipsar|eclipsó|eclipsado|auxiliary-avoir
écoper|a écopé|écopé|cargar con|cargó con|cargado con|auxiliary-avoir
édulcorer|a édulcoré|édulcoré|endulzar|endulzó|endulzado|auxiliary-avoir
égarer|a égaré|égaré|extraviar|extravió|extraviado|auxiliary-avoir
élaguer|a élagué|élagué|podar|podó|podado|auxiliary-avoir
emboîter|a emboîté|emboîté|encajar|encajó|encajado|auxiliary-avoir
émerger|a émergé|émergé|emerger|emergió|emergido|auxiliary-avoir
encombrer|a encombré|encombré|atascar|atascó|atascado|auxiliary-avoir
encourir|a encouru|encouru|incurrir en|incurrió en|incurrido en|auxiliary-avoir
englober|a englobé|englobé|abarcar|abarcó|abarcado|auxiliary-avoir
enrayer|a enrayé|enrayé|atajar|atajó|atajado|auxiliary-avoir
entamer|a entamé|entamé|emprender|emprendió|emprendido|auxiliary-avoir
s'avérer|s'est avéré|avéré|resultar ser|resultó ser|resultado ser|auxiliary-etre
se muer|s'est mué|mué|mudarse en|se mudó en|mudado en|auxiliary-etre
se traduire|s'est traduit|traduit|traducirse|se tradujo|traducido|auxiliary-etre
s'esquiver|s'est esquivé|esquivé|escabullirse|se escabulló|escabullido|auxiliary-etre
s'évertuer|s'est évertué|évertué|esforzarse|se esforzó|esforzado|auxiliary-etre
s'acharner|s'est acharné|acharné|empeñarse|se empeñó|empeñado|auxiliary-etre
s'employer|s'est employé|employé|aplicarse|se aplicó|aplicado|auxiliary-etre
s'ingénier|s'est ingénié|ingénié|ingeniárselas|se las ingenió|ingeniado|auxiliary-etre
s'insurger|s'est insurgé|insurgé|insurreccionarse|se insurreccionó|insurreccionado|auxiliary-etre
s'indigner|s'est indigné|indigné|indignarse|se indignó|indignado|auxiliary-etre
s'offusquer|s'est offusqué|offusqué|ofenderse|se ofendió|ofendido|auxiliary-etre
s'emparer|s'est emparé|emparé|apoderarse|se apoderó|apoderado|auxiliary-etre
s'acquitter|s'est acquitté|acquitté|desempeñar|desempeñó|desempeñado|auxiliary-etre
s'ériger|s'est érigé|érigé|erigirse|se erigió|erigido|auxiliary-etre
s'interposer|s'est interposé|interposé|interponerse|se interpuso|interpuesto|auxiliary-etre
s'enliser|s'est enlisé|enlisé|atascarse|se atascó|atascado|auxiliary-etre
s'embourber|s'est embourbé|embourbé|atollarse|se atolló|atollado|auxiliary-etre
s'enferrer|s'est enferré|enferré|enredarse|se enredó|enredado|auxiliary-etre
s'arc-bouter|s'est arc-bouté|arc-bouté|atrincherarse|se atrincheró|atrincherado|auxiliary-etre
s'escrimer|s'est escrimé|escrimé|porfiar|porfió|porfiado|auxiliary-etre
`);

export function buildFrenchC1Words(takenIds: ReadonlySet<string>): VocabularyItem[] {
  return [
    ...expandLockedWords("fr", "nouns", C1_FR_NOUNS, takenIds, "C1"),
    ...expandLockedWords("fr", "adjectives", C1_FR_ADJECTIVES, takenIds, "C1"),
    ...expandLockedWords("fr", "adverbs", C1_FR_ADVERBS, takenIds, "C1"),
    ...expandLockedWords("fr", "connectors", C1_FR_CONNECTORS, takenIds, "C1"),
    ...expandLockedWords("fr", "pronouns", C1_FR_PRONOUNS, takenIds, "C1"),
    ...expandLockedWords("fr", "prepositions", C1_FR_PREPOSITIONS, takenIds, "C1"),
  ];
}

export function buildFrenchC1Verbs(takenIds: ReadonlySet<string>): VerbItem[] {
  return expandLockedVerbs("fr", C1_FR_VERBS, takenIds, "C1");
}
