import { PLOTS } from "./plots";
import type { AxisId, Decomposition, LevelId, MathCard } from "../types/card";

const AXES: readonly AxisId[] = ["calculus", "algebra", "statistics", "discrete", "machine"];
const LEVELS: readonly LevelId[] = ["L0", "L1", "L2", "L3"];
const BANNED = /lorem|placeholder|framework|workstream|\blocus\b|pseudoc[oó]digo|TODO:|FIXME/i;

function close(left: number, right: number): boolean {
  return Math.abs(left - right) < 1e-6;
}

export function decompositionHolds(d: Decomposition): boolean {
  if (d.relation === "compose") {
    return close(d.fAt, d.gAt) && close(d.fPrimeAt, d.gPrimeAt * d.hPrimeAt);
  }
  if (d.relation === "sum") {
    return close(d.fAt, d.gAt + d.hAt) && close(d.fPrimeAt, d.gPrimeAt + d.hPrimeAt);
  }
  return close(d.fAt, d.gAt * d.hAt) && close(d.fPrimeAt, d.gPrimeAt * d.hAt + d.gAt * d.hPrimeAt);
}

function codeLines(source: string): string[] {
  return source.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
}

function collectStrings(value: unknown, sink: string[]): void {
  if (typeof value === "string") {
    sink.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, sink);
    return;
  }
  if (value && typeof value === "object") {
    for (const nested of Object.values(value)) collectStrings(nested, sink);
  }
}

function bayesError(card: MathCard): string | null {
  const table = card.bayes;
  if (!table) return null;
  const cells = [table.counts[0][0], table.counts[0][1], table.counts[1][0], table.counts[1][1]];
  if (cells.some((count) => !Number.isInteger(count) || count < 0)) {
    return `${card.id}: Bayes con conteos que no son enteros`;
  }
  const total = cells.reduce((sum, count) => sum + count, 0);
  if (total <= 0) return `${card.id}: Bayes vacío`;
  const proportion = cells.reduce((sum, count) => sum + count / total, 0);
  if (!close(proportion, 1)) return `${card.id}: las cuatro celdas no suman 1`;
  const column = table.counts[0][0] + table.counts[1][0];
  if (column <= 0 || table.denominator <= 0) return `${card.id}: Bayes sin denominador`;
  const ratio = table.counts[0][0] / column;
  if (!close(ratio, table.numerator / table.denominator)) {
    return `${card.id}: la condicional no sale de la primera columna`;
  }
  return null;
}

export function bankErrors(cards: readonly MathCard[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const card of cards) {
    if (ids.has(card.id)) errors.push(`id repetido: ${card.id}`);
    ids.add(card.id);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(card.id)) errors.push(`id inestable: ${card.id}`);

    const strings: string[] = [];
    collectStrings(card, strings);
    if (strings.some((text) => text.trim().length === 0)) errors.push(`${card.id}: texto vacío`);
    if (strings.some((text) => BANNED.test(text))) errors.push(`${card.id}: texto de relleno`);

    if (card.kind === "machine" && !card.code) errors.push(`${card.id}: carta de máquina sin Python`);
    if (card.code) {
      const lines = codeLines(card.code.source);
      if (lines.length < 4 || lines.length > 8) {
        errors.push(`${card.id}: el Python tiene ${lines.length} líneas`);
      }
    }

    if (card.kind === "decomposition" && !card.decomposition) {
      errors.push(`${card.id}: descomposición sin g y h`);
    }
    if ((card.isFunction || card.decomposition) && card.level !== "L0") {
      if (!card.decomposition) errors.push(`${card.id}: función sin descomposición`);
      else if (!decompositionHolds(card.decomposition)) errors.push(`${card.id}: la cadena no cuadra`);
      else if (!card.decomposition.g.trim() || !card.decomposition.h.trim()) {
        errors.push(`${card.id}: g o h vacíos`);
      }
    }

    const point = card.decomposition ?? card.anchor;
    if (card.plotId) {
      const plot = PLOTS[card.plotId];
      if (!plot) errors.push(`${card.id}: gráfica desconocida`);
      else if (!point) errors.push(`${card.id}: gráfica sin punto`);
      else if (!close(plot.f(point.x0), point.fAt) || !close(plot.df(point.x0), point.fPrimeAt)) {
        errors.push(`${card.id}: la gráfica no pasa por el punto de la carta`);
      }
    }

    const bayes = bayesError(card);
    if (bayes) errors.push(bayes);
    if (card.visual?.kind === "bayes" && card.bayes) {
      const shown = card.visual.bayes.counts.flat().join(",");
      const stored = card.bayes.counts.flat().join(",");
      if (shown !== stored) errors.push(`${card.id}: la tabla dibujada no es la tabla comprobada`);
    }

    for (const face of [card.quiz.forward, card.quiz.reverse]) {
      if (face.prompt.trim().length < 8 || face.correct.trim().length === 0) {
        errors.push(`${card.id}: pregunta de test incompleta`);
      }
    }
  }

  for (const axis of AXES) {
    if (!cards.some((card) => card.axis === axis && card.kind === "machine")) {
      errors.push(`${axis}: ninguna carta en la máquina`);
    }
    for (const level of LEVELS) {
      const group = cards.filter((card) => card.axis === axis && card.level === level);
      if (group.length < 4) errors.push(`${axis} ${level}: solo ${group.length} cartas`);
      for (const direction of ["forward", "reverse"] as const) {
        const answers = group.map((card) => card.quiz[direction].correct.trim().toLowerCase());
        const unique = new Set(answers);
        if (unique.size !== answers.length) {
          errors.push(`${axis} ${level} ${direction}: respuestas repetidas`);
        }
      }
    }
  }

  return errors;
}
