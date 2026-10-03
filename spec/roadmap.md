# Roadmap — entrenador de idiomas

Fuente: *Lenguagegame × Wordkeep — Analysis & Merge Plan* (Marc, 2 de octubre de 2026). Contraste con el código del 3 de octubre de 2026: `src/utils/storage.ts`, `src/utils/profiles.ts`, `src/types/vocabulary.ts`, `spec/product-spec.md`, `spec/data-model.md`, `spec/quiz-spec.md`.

Este archivo manda sobre las fases 21 a 28 de `implementation-plan.md`. Cada fase se cierra con la prueba que indica. No se da por hecha si la prueba no se ha ejecutado.

## Qué se hace y qué no

Se hace en este repositorio, en GitHub Pages, sin servidor. El estudio a pantalla completa sigue siendo la entrada. El repaso de fallos es un modo dentro del entrenador.

No se hace ahora:

- Fork, organización nueva, ni traer el historial de otro repositorio.
- Cambiar Vite, TypeScript, Tailwind, ni añadir router o un atlas 3D.
- Cuentas, sincronización en la nube, ni un idioma de destino distinto del español.
- Pasar los bancos a JSON o CSV. El recorte del bundle se hace con `import()` de los módulos que ya existen.
- Añadir una licencia. La elige quien tiene el repositorio; no bloquea estas fases.

## Hechos que el código confirma

- La fase 21 ya migra la versión 1 a la 2 y conserva `lastReviewed`, `nextReview` y `difficulty`. Una versión desconocida sigue vaciando ese registro.
- El test escribe una puntuación. No escribe `learningProgress`.
- `estimateLevel`, con filtro `all`, trata un 25 % como A1. Con cuatro opciones, el azar ronda ese 25 %.
- `addScore` corta a 500 puntuaciones en total, de todos los nombres.
- `product-spec.md` sigue diciendo que puntuaciones y SRS están fuera. `data-model.md` documenta `english` / `spanish`; el código usa `term` / `translation`. `quiz-spec.md` deja el marcador y el SRS fuera, y el marcador ya existe.
- Los pares son `en-es`, `fr-es` y `ca-es`. El destino es español.
- La puerta está en español. Varios rótulos de estudio siguen en inglés.

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

El tope pasa a 500 puntuaciones por perfil. Hoy `addScore` corta a 500 en el array de todos.

**Puerta.** Exportar e importar en un almacén vacío devuelve el mismo nombre y los mismos contadores de una carta. Un JSON sin id no borra perfiles ya guardados. El perfil A conserva sus puntuaciones cuando el perfil B supera 500.

## Fase 26 — Un solo idioma de interfaz, y el botón apagado se lee

Spec que se actualiza: `ux-spec.md`.

Los rótulos fijos de la interfaz pasan a español, igual que la puerta. El contenido de la carta no se traduce: sigue siendo el par de estudio.

El botón desactivado de la puerta no puede depender solo de bajar la opacidad. Tiene que distinguirse del fondo con borde o con texto que siga leyéndose.

**Puerta.** Los rótulos STUDY, TEST y REVEAL ya no están en la interfaz. Un test del componente de la puerta encuentra «Idiomas» y «Matemáticas» desactivados y visibles en el árbol de accesibilidad.

## Fase 27 — Una sola cola de repaso

Spec nueva: `spec/review-spec.md`, escrita al empezar la fase, no antes.

Función pura `grade(state, grade, now)` en `src/utils/`. No llama a la red ni a `localStorage`. `now` entra como argumento para que el test fije la fecha.

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

**Puerta.** Los tests de `grade` usan una fecha fija. Una carta fallada en el test tiene `nextReview` a un día vista y, llegada esa fecha, entra en la cola.

## Fase 28 — El banco no viaja entero en el primer archivo

Spec que se actualiza: `architecture.md`.

Los bancos de frases se cargan con `import()` al elegir par y nivel, no en el arranque. El primer JavaScript de la página no incluye esos bancos. El icono de favoritos deja de ser el PNG grande: uno de 32 px y otro de 180 px.

El flujo de publicación usa Node 22. Un smoke test abre el `index.html` construido con base `/lenguagegame/` y comprueba que el script apuntado responde, para que no vuelva el 404 de mayúsculas.

**Puerta.** `npm run build` produce un `index` inicial por debajo de 400 KB sin comprimir, sin contar los bancos cargados después. El smoke test pasa en local sobre `dist/`.

## Orden

21, luego 22, luego 23. La 24 puede ir en paralelo con la 21. La 25 y la 26 no dependen del repaso. La 27 espera a la 21 y a la 22. La 28 puede ir cuando la 21 esté cerrada.

No se abre la 27 si la 21 no conserva `nextReview`.
