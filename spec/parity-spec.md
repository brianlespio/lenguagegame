# Parity specification — oleada al 89 %

Contrato de datos para igualar francés, catalán, euskera y alemán al umbral del 89 % respecto al inglés publicado. Las fases de ejecución viven en `roadmap.md` (32–37). Esta spec manda sobre el conteo; no redefine el test, el SRS ni la interfaz.

## Referencia congelada

El inglés publicado es la referencia de la oleada 32–37 (cerrada en fase 37):

- Durante esa oleada no se añadieron cartas nuevas al catálogo inglés.
- El total de referencia sigue siendo **11.618** cartas hasta que se abra la oleada siguiente.
- El desglose de referencia por categoría es el de ese mismo catálogo (ver tabla abajo).

Crecer el inglés por encima de 11.618 es la oleada siguiente (documentada abajo), no un remiendo de esta.

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

## Estado al cerrar la oleada (fase 37)

| Idioma | Publicadas | Contrato 89 % | Notas |
| --- | ---: | --- | --- |
| Inglés | 11.618 | referencia congelada | No creció en esta oleada |
| Francés | 10.911 | cumple | Fase 33 |
| Alemán | 11.618 | cumple | Fase 34 (glosas 1:1) |
| Catalán | 10.352 | cumple | Fase 35 |
| Euskera | 10.352 | cumple | Fase 36; EU ≥ CA por categoría |

Los cuatro idiomas de estudio hacia español cumplen `measureParity(...).meetsParity === true` contra `TARGET_TOTAL = 10_340` y cada `TARGET_CAT`.

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

## Oleada siguiente (documentada; no ejecutada en fase 37)

Arranque acordado al cerrar la oleada 89 %:

1. **Subir solo el inglés** por encima de 11.618 (nuevas cartas en el catálogo EN).
2. **Congelar el nuevo total inglés** y recalcular `TARGET_TOTAL` / `TARGET_CAT` (mismo `PARITY_RATIO = 0,89`, u otro umbral si se decide al abrir esa oleada).
3. **Empujar el resto** (FR, DE, CA, EU) hasta el nuevo umbral, sin mezclar ese relleno con la subida del inglés en el mismo cambio.

Hasta que se abra esa oleada:

- El inglés de referencia de la oleada 32–37 sigue en **11.618**.
- No se exige a FR/DE/CA/EU crecer hacia un inglés mayor.
- El destino sigue siendo español. JSON/CSV y cuentas en la nube siguen fuera.

## Prueba automatizada

Helper: `src/data/parity.ts`. Tests: `src/data/parity.test.ts`.

- `FROZEN_ENGLISH_TOTAL` / `FROZEN_ENGLISH_BY_CATEGORY` fijan la referencia de esta oleada.
- `PARITY_TARGETS.total` y `PARITY_TARGETS.byCategory` son `TARGET_TOTAL` / `TARGET_CAT`.
- `measureParity(catalog)` mide un idioma contra esos suelos.
- `assertEnglishFreeze(allEntries)` falla si el inglés se mueve mientras esta referencia esté vigente.

Fases 32–37 hechas: congelación EN; FR; DE; CA; EU (≥ CA); cierre de oleada con los cuatro en `meetsParity === true`.
