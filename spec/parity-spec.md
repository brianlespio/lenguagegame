# Parity specification — oleada al 89 %

Contrato de datos para igualar francés, catalán, euskera y alemán al umbral del 89 % respecto al inglés publicado. Las fases de ejecución viven en `roadmap.md` (32–37). Esta spec manda sobre el conteo; no redefine el test, el SRS ni la interfaz.

## Referencia congelada

El inglés publicado es la referencia de esta oleada. Mientras duren las fases 32–37:

- No se añaden cartas nuevas al catálogo inglés.
- El total de referencia es **11.618** cartas (`allEntries` en el estado que abre la fase 32).
- El desglose de referencia por categoría es el de ese mismo catálogo (ver tabla abajo).

Si el inglés crece antes de cerrar la oleada, se invalida el umbral. Crecer el inglés es la oleada siguiente, no esta.

## Umbral

```
PARITY_RATIO = 0.89
TARGET_TOTAL = floor(11_618 × 0.89) = 10_340
TARGET_CAT(c) = floor(count_en(c) × 0.89)
```

Un idioma **cumple la paridad 89 %** cuando, en el catálogo que `getCatalog` entrega al estudiante:

1. `catalog.length >= 10_340`
2. Para cada categoría de estudio del inglés, `count(catalog, c) >= TARGET_CAT(c)`
3. Ids únicos y prefijo de idioma (`fr-`, `ca-`, `eu-`, `de-`)
4. Las reglas de forma verbal de ese idioma siguen vigentes (perfecto hablado en alemán, pasado perifrástico en catalán, reconstrucción del participio en euskera)

Cumplir solo el total rellenando frases y dejando clases de palabra cortas **no** cierra la oleada.

## Desglose de referencia y suelos

| Categoría | Inglés (ref.) | Suelo 89 % |
| --- | ---: | ---: |
| Sustantivos | 1.230 | 1.094 |
| Verbos | 1.102 | 980 |
| Adjetivos | 1.027 | 914 |
| Adverbios | 801 | 712 |
| Conectores | 732 | 651 |
| Preposiciones | 793 | 705 |
| Pronombres | 707 | 629 |
| Preguntas | 803 | 714 |
| Respuestas afirmativas | 803 | 714 |
| Respuestas negativas | 803 | 714 |
| Preguntas técnicas | 591 | 525 |
| Respuestas técnicas | 591 | 525 |
| Preguntas abiertas | 536 | 477 |
| Respuestas abiertas | 536 | 477 |
| Avisos escolares | 563 | 501 |
| **Total** | **11.618** | **10.340** |

## Estado al abrir la oleada

| Idioma | Publicadas | Avance vs inglés | Qué falta para el 89 % |
| --- | ---: | ---: | --- |
| Inglés | 11.618 | 100 % | Congelado en esta oleada |
| Francés | 10.911 | cumple contrato 89 % | Fase 33 hecha |
| Euskera | 1.105 | 9,5 % | Casi todo el banco |
| Catalán | 1.067 | 9,2 % | Casi todo el banco |
| Alemán | 11.618 | cumple contrato 89 % | Fase 34 hecha (glosas 1:1) |

El francés cumple total y cada `TARGET_CAT` tras la fase 33. El alemán tras la fase 34.

## Cómo se amplía cada idioma

Se reutiliza el pipeline que ya existe. No se inventa un tercer formato de banco.

| Idioma | Pipeline | Nota |
| --- | --- | --- |
| Francés | Bancos TS existentes (`frenchVocabulary*`, `frenchVerbs*`, bancos B2–C2) | Solo clases de palabra hasta el suelo |
| Alemán | Glosas `src/data/german/gloss-*.tsv` mapeadas 1:1 a ids ingleses | Publicar cuando el mapeo cumpla total y suelos; el menú `de-es` pasa a `available: true` |
| Catalán | Bancos TS existentes (`catalanCatalog` y módulos que alimenta) | Mismas categorías y destino español |
| Euskera | Bancos TS existentes; sigue `>=` catalán categoría a categoría | No puede quedar por debajo del catalán al cerrar |

Calidad de contenido (sin relajar):

- La forma de estudio debe corresponder al español de la carta.
- Sin inglés pegado en el término de estudio (salvo préstamos reales del idioma).
- Verbos: tres formas según el contrato de ese par.
- Frases: registro natural; `Sie`/`du` (alemán) o equivalente según el español de la fila.

## Publicación del alemán

`germanEntries` publica el mapeo completo de glosas (11.618). El menú `de-es` está disponible. El contrato de paridad 89 % queda cumplido; el 100 % del inglés también.

## Fuera de esta oleada

- Subir el inglés por encima de 11.618.
- Empujar francés, catalán, euskera o alemán por encima del 89 % hacia el nuevo inglés.
- Cambiar el idioma de destino (sigue siendo español).
- Pasar los bancos a JSON/CSV.
- Cuentas en la nube.

Esas dos subidas (primero inglés, luego el resto) son la oleada siguiente, documentada al cerrar la fase 37.

## Prueba automatizada

Fase 32 hecha. Helper: `src/data/parity.ts`. Tests: `src/data/parity.test.ts`.

- `FROZEN_ENGLISH_TOTAL` / `FROZEN_ENGLISH_BY_CATEGORY` fijan la referencia.
- `PARITY_TARGETS.total` y `PARITY_TARGETS.byCategory` son `TARGET_TOTAL` / `TARGET_CAT`.
- `measureParity(catalog)` mide un idioma contra esos suelos.
- `assertEnglishFreeze(allEntries)` falla si el inglés se mueve durante la oleada.

Fase 33: francés con `meetsParity === true`. Fase 34: alemán con `meetsParity === true` y menú disponible. Siguen 35–36 para catalán y euskera.
