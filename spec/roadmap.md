# Roadmap — idiomas y matemáticas

Fuente: *Lenguagegame × Wordkeep — Analysis & Merge Plan* (Marc, 2 de octubre de 2026) y la auditoría del 3 de octubre de 2026 sobre `main` `396a613`. Contraste con `src/utils/storage.ts`, `src/utils/profiles.ts`, `src/components/NavigationControls/NavigationControls.tsx`, `entrenador-matematicas/src/data/knowledge/paths.ts`, `entrenador-matematicas/src/utils/profiles.ts` y `.github/workflows/deploy-pages.yml`.

Este archivo manda sobre las fases 21 a 31 de `implementation-plan.md`. Cada fase se cierra con la prueba que indica. No se da por hecha si la prueba no se ha ejecutado.

## Qué se hace y qué no

Se hace en este repositorio, en GitHub Pages, sin servidor. El estudio a pantalla completa sigue siendo la entrada. El repaso de fallos es un modo dentro del entrenador.

No se hace ahora:

- Fork, organización nueva, ni traer el historial de otro repositorio.
- Cambiar Vite, TypeScript, Tailwind, ni añadir router o un atlas 3D.
- Cuentas, sincronización en la nube, ni un idioma de destino distinto del español.
- Pasar los bancos a JSON o CSV. El recorte del bundle se hace con `import()` de los módulos que ya existen.
- Añadir una licencia. La elige quien tiene el repositorio; no bloquea estas fases.

## Hechos que el código confirma

- La fase 21 migra la versión 1 a la 2 y conserva `lastReviewed`, `nextReview` y `difficulty`. Una versión desconocida vacía ese registro.
- La fase 22 escribe `learningProgress` en el test y en el dictado. Revelar no puntúa. Repasar fallos lee `lastOutcome === "miss"`.
- La fase 23 aplica los umbrales a la nota por encima del azar. Un 25 % con cuatro opciones y 20 respuestas o más no es A1. Con menos de 20 respuestas el texto es «Aún no hay bastante».
- Matemáticas tiene el mismo contrato en su propio almacén (`mathtrainer.v1.*`, versión 2): fallo por carta, repaso, y `scoreNote` con la misma corrección de azar.
- `addScore` de idiomas corta a 500 puntuaciones de todos los nombres. El de matemáticas corta a 80, también de todos.
- `data-model.md` documenta `english` / `spanish`; el código usa `term` / `translation`. `quiz-spec.md` todavía dice que no hay puntuación ni escritura de `LearningProgress`, y las dos cosas ya existen.
- Los pares son `en-es`, `fr-es`, `ca-es`, `eu-es` y `de-es`. El destino es español. La puerta está en español. El alemán está cableado y el menú lo deja en «Próximamente» hasta la paridad 89 % (`parity-spec.md`).
- Frente al inglés (11.618): francés ~89 %, euskera ~9,5 %, catalán ~9,2 %, alemán publicado 0 % (~34 % en glosas). La oleada 32–37 iguala a todos al 89 %; después solo sube el inglés.
- El estudio de idiomas muestra Previous, Next, REVEAL, TEST, SCORE, Auto Play, Voice y Fullscreen. El botón apagado baja la opacidad.
- El banco de matemáticas tiene 96 cartas únicas y 138 enlaces. Ocho asignaturas no tienen ninguna carta: `poo`, `automatas`, `adquisicion`, `redes`, `bases`, `infra`, `distribuidos`, `software`.
- Un nivel suelto de cálculo no llega a 20 preguntas. L1 son 14. Esa prueba no puede juzgar el nivel.
- Pages ejecuta `npm test` y `npm run build` en la raíz. La suite de `entrenador-matematicas` no entra en ese flujo. El build de la raíz sí publica `matematicas.html`.

## Fase 21 — No perder el progreso

Estado: hecha. `STORAGE_VERSION` es 2. `migrate` conserva el documento de la versión 1.

Spec que se actualiza: `data-model.md`.

`STORAGE_VERSION` puede subir. `loadProgress` y `loadSettings` llaman a `migrate(from, data)` y conservan lo que ya era válido. Una versión desconocida o un JSON roto sigue cayendo al valor por defecto, sin romper la pantalla.

`normalizeProgress` conserva, cuando vienen bien formados:

- `lastReviewed` y `nextReview`: cadena ISO.
- `difficulty`: número finito.

Un campo ausente o mal formado se omite. No se inventa una fecha.

**Puerta.** Un test carga progreso guardado con versión 1 bajo la versión 2 y comprueba que siguen el id, los tres contadores y los tres campos opcionales.

## Fase 22 — El test y el dictado escriben el aprendizaje

Estado: hecha. El fallo queda en `lastOutcome`. Repasar fallos lee ese campo del perfil y no calcula `nextReview`.

Spec que se actualiza: `quiz-spec.md`.

Cada respuesta de test, y cada dictado terminado, actualiza `LearningProgress` de esa carta y de ese perfil. Estudiar y revelar no puntúan: la pantalla de proyección sigue siendo pasiva.

| Modo | Hecho | Efecto |
| --- | --- | --- |
| Test | Fallo | `incorrectAnswers` + 1. La carta queda para repasar. |
| Test | Acierto, también si la correcta es «Ninguna de las anteriores» | `correctAnswers` + 1. |
| Dictado | Terminado sin reiniciar | `correctAnswers` + 1. |
| Dictado | Terminado tras uno o más reinicios | se anota el reinicio; no cuenta como acierto limpio. |
| Estudio | Solo revelar | no escribe grado. |

`lastReviewed` se actualiza en los cuatro primeros casos. `nextReview` aún no se calcula: eso es la fase 27.

Hay un filtro **Repasar fallos**: cartas de ese perfil cuyo último resultado fue un fallo y que siguen en el banco activo. No borra el historial al cambiar de categoría, de par o de test.

**Puerta.** Un test falla una carta, recarga, y esa carta aparece en Repasar fallos con `incorrectAnswers >= 1`. Revelar una carta de estudio no cambia esos contadores.

## Fase 23 — El nivel no premia el azar

Estado: hecha. Un 25 % con cuatro opciones queda por debajo de A1. Con menos de 20 respuestas el texto es «Aún no hay bastante».

Spec que se actualiza: `product-spec.md`.

Con cuatro opciones, la puntuación que estima el nivel es `(aciertos / total − 0,25) / 0,75`, limitada a 0–1. Si el ítem tiene `n` opciones y `n` no es 4, el azar es `1 / n` y el divisor es `1 − 1 / n`.

No se muestra nivel si hay menos de 20 respuestas en esa prueba. El texto es «Aún no hay bastante», no un CEFR.

Los umbrales actuales de `estimateLevel` se aplican a esa puntuación ajustada, no al porcentaje bruto. Un 25 % en modo «todos» no es A1.

**Puerta.** `estimateLevel` de un 25 % con cuatro opciones y 20 respuestas o más no devuelve A1. Con 19 respuestas no devuelve un CEFR.

## Fase 24 — Las specs dicen lo que el código hace

Se reescriben solo los párrafos que contradicen el código. No se reabre el diseño del test.

- `product-spec.md`: perfiles, puntuaciones, dictado, catalán y la puerta de idiomas o matemáticas están dentro. El SRS queda descrito por la fase 27, no como prohibido ni como ya hecho.
- `data-model.md`: `term` y `translation`. Se quitan `english` y `spanish` como nombres de campo.
- `quiz-spec.md`: el marcador existe. El SRS no forma parte del constructor de preguntas.

**Puerta.** Una búsqueda en `spec/` ya no afirma que no hay puntuación, ni documenta `english` / `spanish` como campos de `VocabularyItem`.

## Fase 25 — El perfil se puede llevar

Spec que se actualiza: `data-model.md`.

Sobre el perfil local que ya existe:

- Renombrar cambia el nombre visible. El id no cambia.
- Borrar elimina ese perfil, sus ajustes, su progreso y sus puntuaciones. No toca a los demás.
- Exportar baja un JSON de ese perfil: nombre, ajustes, progreso y puntuaciones.
- Importar valida el JSON antes de escribir. Un archivo inválido no modifica lo guardado. Si el id ya existe, se sustituye ese perfil, no se duplica.

El tope pasa a 500 puntuaciones por perfil en los dos almacenes. Hoy idiomas corta a 500 en el array de todos, y matemáticas corta a 80 también entre todos.

La misma operación existe en los dos. Cada uno lee y escribe sus propias claves. Importar un JSON de idiomas no toca `mathtrainer.v1.*`, ni al revés.

**Puerta.** Exportar e importar en un almacén vacío devuelve el mismo nombre y los mismos contadores de una carta. Un JSON sin id no borra perfiles ya guardados. El perfil A conserva sus puntuaciones cuando el perfil B supera 500. El caso se prueba en idiomas y en matemáticas.

## Fase 26 — Un solo idioma de interfaz, y el botón apagado se lee

Spec que se actualiza: `ux-spec.md`.

Los rótulos fijos de la interfaz de idiomas pasan a español, igual que la puerta. El contenido de la carta no se traduce: sigue siendo el par de estudio. Matemáticas ya está en español; esta fase no reescribe sus cartas.

Pasan a español, como mínimo: Previous, Next, REVEAL, TEST, SCORE, Auto Play, Pause, Voice, Muted, Fullscreen, Exit, y la pista `← → navigate · R reveal · P play · S speak · F fullscreen`. El título de `index.html` y `lang` dejan de presentar la página como solo inglesa. `STUDY_MODE_KICKER` no se muestra; se quita para que no quede un rótulo inglés muerto.

El botón desactivado, en la puerta y en el estudio de los dos entrenadores, no puede depender solo de bajar la opacidad. Tiene que distinguirse del fondo con borde o con texto que siga leyéndose.

**Puerta.** Una búsqueda en los componentes de idiomas ya no encuentra Previous, REVEAL ni SCORE como texto visible. Un test del componente de la puerta encuentra «Idiomas» y «Matemáticas» desactivados y visibles en el árbol de accesibilidad.

## Fase 27 — Una sola cola de repaso

Spec nueva: `spec/review-spec.md`, escrita al empezar la fase, no antes.

Función pura `grade(state, grade, now)` en cada entrenador. El paquete de matemáticas no importa `src/` de idiomas, así que la función se copia y los dos tests fijan la misma fecha. No llama a la red ni a `localStorage`. `now` entra como argumento.

Grados, sobre el estado que ya guardan las fases 21 y 22:

| Grado | Cuándo | Calidad |
| --- | --- | --- |
| Otra vez | Fallo de test | 1 |
| Difícil | Dictado terminado con reinicio | 3 |
| Bien | Acierto de test, o dictado sin reinicio | 4 |
| Fácil | Reservado al repaso activo; el test no lo emite | 5 |

Regla, con `ease` inicial 2,5 y mínimo 1,3:

- Calidad menor que 3: repeticiones a 0 e intervalo de 1 día.
- Si no: con 0 repeticiones previas el intervalo es 1 día; con 1, es 6 días; después, `redondeo(intervalo × ease)`.
- `ease` nuevo = `ease + (0,1 − (5 − calidad) × (0,08 + (5 − calidad) × 0,02))`, y nunca por debajo de 1,3.

`difficulty` guarda `ease`. `nextReview` es `now` más el intervalo, en ISO. Repasar fallos pasa a ser la cola cuya `nextReview` ya ha llegado. El orden de esa cola es el `nextReview` más antiguo primero.

En matemáticas no hay dictado. El fallo de test es Otra vez. El acierto de test es Bien. Comprobar un paso de estudio no escribe grado, igual que revelar.

**Puerta.** Los tests de `grade` usan una fecha fija. Una carta fallada en el test tiene `nextReview` a un día vista y, llegada esa fecha, entra en la cola. El mismo caso pasa en los dos entrenadores.

## Fase 28 — El banco no viaja entero en el primer archivo

Spec que se actualiza: `architecture.md`.

Los bancos de frases se cargan con `import()` al elegir par y nivel, no en el arranque. El primer JavaScript de la página no incluye esos bancos. El icono de favoritos deja de ser el PNG grande: uno de 32 px y otro de 180 px.

El flujo de publicación usa Node 22. Un smoke test abre el `index.html` construido con base `/lenguagegame/` y comprueba que el script apuntado responde, para que no vuelva el 404 de mayúsculas.

**Puerta.** `npm run build` produce un `index` inicial por debajo de 400 KB sin comprimir, sin contar los bancos cargados después. El smoke test pasa en local sobre `dist/`.

## Fase 29 — Las ocho asignaturas enseñan con cartas

Estado: hecha. Cada una enlaza al menos cuatro cartas. La respuesta sale de `checks.ts` y el test la recalcula.

Spec que se escribe al empezar, no antes: `spec/math-knowledge.md`.

Estas asignaturas tienen lección y cero cartas: `poo`, `automatas`, `adquisicion`, `redes`, `bases`, `infra`, `distribuidos`, `software`. Cada una pasa a tener al menos cuatro cartas del tipo que ya usa el banco. Las lecciones que ya existen se quedan. Las 96 cartas verificadas no se reescriben.

Cada carta nueva enseña el contenido que esa asignatura ya declara en `learns`:

| Id | Contenido |
| --- | --- |
| `poo` | Un objeto guarda un valor. Dos objetos no lo comparten. Una operación cambia solo a quien se le pide. |
| `automatas` | Símbolos, longitud de una cadena y un autómata que acepta o rechaza. |
| `adquisicion` | Cuántas muestras caben en un intervalo fijo. |
| `redes` | Saltos de un camino y tiempo de transferencia de un fichero. |
| `bases` | Qué identifica una fila y cuántas filas cumplen una condición. |
| `infra` | Partir un lote en partes iguales. |
| `distribuidos` | El mensaje lleva una copia. El emisor conserva la suya. |
| `software` | Un caso pasa solo si el resultado es el esperado. |

La respuesta numérica o exacta sale de `checks.ts`. Un test la vuelve a calcular con otro procedimiento y no copia el texto de la carta. La interfaz no muestra créditos ni códigos de asignatura.

**Puerta.** Las ocho ids tienen `cardIds.length >= 4`. Ninguna carta nueva contiene «ects» ni «crédito». Cada asignatura tiene al menos una respuesta recomprobada por el test.

## Fase 30 — Un test corto no finge un nivel

Spec que se actualiza: `product-spec.md` y la nota de `scoreNote` en el entrenador de matemáticas.

Si la prueba que se va a empezar tiene menos de 20 preguntas, la pantalla de arranque lo dice antes de pulsar Empezar: el resultado no asigna nivel y el texto será «Aún no hay bastante». La regla de la fase 23 no se afloja. Un nivel suelto de cálculo, con 14 preguntas, entra en este caso.

Al terminar, la nota sigue siendo «Aún no hay bastante». No aparece «este nivel está firme» ni un CEFR.

**Puerta.** Con 14 preguntas y cuatro opciones, el arranque muestra «Aún no hay bastante» y `scoreNote(100, { answered: 14, choices: 4 })` no dice que el nivel está firme. Con 20 respuestas y un 100 % ajustado, la nota firme sigue disponible.

## Fase 31 — Matemáticas se prueba al publicar

Spec que se actualiza: `architecture.md`.

El flujo de Pages, antes de `npm run build`, ejecuta la suite de `entrenador-matematicas` además de `npm test` de la raíz. No se añade otro sistema de integración. El build sigue siendo el de la raíz, que ya incluye `matematicas.html`.

**Puerta.** `.github/workflows/deploy-pages.yml` invoca los tests de matemáticas. En local, `npm test` dentro de `entrenador-matematicas` termina en cero.

## Fase 32 — Congelar el inglés y medir el 89 %

Estado: hecha. Spec: `spec/parity-spec.md`. Código: `src/data/parity.ts`, `src/data/parity.test.ts`.

Se fija la referencia de esta oleada: **11.618** cartas inglesas y el desglose por categoría de ese catálogo. `PARITY_RATIO = 0,89`. Meta total: **10.340**. Meta por categoría: `floor(count_en(c) × 0,89)`.

Durante las fases 32–37 no se añaden cartas al inglés. El helper calcula los suelos desde el freeze y `assertEnglishFreeze` falla si el inglés cambia de tamaño o de desglose sin actualizar la spec.

**Puerta.** `parity-spec.md` existe. Un test documenta `allEntries.length === 11618` y expone `TARGET_TOTAL` / `TARGET_CAT`. Francés, catalán, euskera y alemán se miden contra esos suelos, no contra un porcentaje informal.

## Fase 33 — Francés: cerrar clases de palabra al suelo 89 %

Estado: hecha. Spec: `parity-spec.md`. Código: `frenchVocabularyParity.ts`, `frenchVerbsParity.ts` (generados vía `scripts/gen-fr-parity.ts`).

El francés tenía 10.343 cartas y todas las frases del inglés. Se ampliaron solo las clases de palabra hasta cada `TARGET_CAT` (+568 cartas). Total publicado tras la fase: **10.911**. `measureParity(frenchEntries).meetsParity === true`.

Mismo pipeline TS. Prefijo `fr-`. Ids únicos. Frases al 100 % no se reescribieron. Inglés congelado.

**Puerta.** `frenchEntries` cumple total ≥ 10.340 y cada `TARGET_CAT`. `parity.test.ts` y `dataset.test.ts` en verde.

## Fase 34 — Alemán: glosas hasta el 89 % y menú encendido

Estado: hecha. Spec: `parity-spec.md`, `product-spec.md`. Código: `src/data/german/gloss-*.tsv`, `germanCatalog.ts`.

Se completaron las glosas 1:1 al inglés (11.618). `germanEntries` publica el mapeo completo; `measureParity(germanEntries).meetsParity === true`. `LANGUAGE_PAIRS` marca `de-es` como `available: true` (también se abrió antes para revisión).

Siguen las reglas de glosa: alemán estándar, ß, nombres con mayúscula, perfecto hablado en verbos, significado alineado con el español de la fila inglesa.

**Puerta.** `germanEntries.length >= 10340`, cada categoría ≥ `TARGET_CAT`, ids `de-*` únicos, menú alemán seleccionable, test de formas verbales en verde. Cumplida.

## Fase 35 — Catalán al 89 %

Spec que se actualiza: `parity-spec.md`.

Desde ~1.067 cartas hasta ≥ 10.340, con cada categoría en su suelo. Pipeline TS existente. Destino español. Pasado perifrástico en verbos. Sin préstamos ingleses en frases habladas (regla ya en `dataset.test.ts`).

Orden de relleno recomendado: clases de palabra hasta el suelo, luego polar, abierta, técnica y avisos escolares. No se baja el euskera por debajo del catalán en ninguna categoría al terminar la fase 36; en esta fase el catalán puede adelantar.

**Puerta.** `catalanEntries` cumple el contrato de `parity-spec.md`. Tests de ids `ca-*`, pasado con `va`, y frases sin loans, en verde.

## Fase 36 — Euskera al 89 % (sin quedar bajo el catalán)

Spec que se actualiza: `parity-spec.md`.

Desde ~1.105 cartas hasta ≥ 10.340 y cada `TARGET_CAT`. Tras la ampliación, `count(eu, c) >= count(ca, c)` en todas las categorías (contrato que ya exige el dataset). Participio y pasado reconstruidos como ahora.

**Puerta.** `basqueEntries` cumple paridad 89 % y sigue ≥ catalán categoría a categoría. Tests de formas verbales en verde.

## Fase 37 — Cierre de la oleada 89 %; siguiente oleada solo inglés

Spec que se actualiza: `parity-spec.md`, `product-spec.md`.

Francés, alemán, catalán y euskera cumplen el contrato. La auditoría (canvas o tabla en spec) muestra ≥ 89 % en los cuatro. Se escribe al final de `parity-spec.md` el arranque de la **oleada siguiente**, sin ejecutarla aún:

1. Subir solo el inglés por encima de 11.618.
2. Congelar el nuevo total inglés.
3. Empujar el resto hasta el nuevo umbral (otra vez por ratio o por paridad plena, según se decida al abrir esa oleada).

**Puerta.** Los cuatro idiomas pasan el test de paridad 89 %. El inglés de referencia sigue en 11.618. No se ha empezado la subida del inglés en el mismo cambio que cierra esta fase.

## Orden

Hechas: 21, 22, 23, 29, 32, 33 y 34.

Siguiente en producto/UX (si se retoman): 30, 26, 31, 27, 24, 25, 28.

Oleada de bancos: **35 → 36 → 37** (32–34 hechas).

Tras la 37: solo inglés por encima del 89 % de referencia; después el resto. La 27 ya puede abrirse en paralelo (no toca tamaños de banco). La 28 espera a la 31.
