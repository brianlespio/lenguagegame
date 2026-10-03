import type { AxisFilter, LevelFilter, MathCard } from "../types/card";

export function filterCards(
  cards: readonly MathCard[],
  axis: AxisFilter,
  level: LevelFilter,
): MathCard[] {
  return cards.filter((card) => {
    const axisOk = axis === "all" || card.axis === axis;
    const levelOk = level === "all" || card.level === level;
    return axisOk && levelOk;
  });
}
