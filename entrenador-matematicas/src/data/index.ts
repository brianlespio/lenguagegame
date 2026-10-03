import { algebraCards } from "./algebra";
import { calculusCards } from "./calculus";
import { discreteCards } from "./discrete";
import { machineCards } from "./machine";
import { statisticsCards } from "./statistics";
import type { MathCard } from "../types/card";

export const mathBank: readonly MathCard[] = [
  ...calculusCards,
  ...algebraCards,
  ...statisticsCards,
  ...discreteCards,
  ...machineCards,
];

export function cardById(id: string): MathCard {
  const card = mathBank.find((item) => item.id === id);
  if (!card) throw new Error(`No está la carta ${id}`);
  return card;
}
