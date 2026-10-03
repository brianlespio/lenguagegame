import { algebraCards } from "./algebra";
import { calculusCards } from "./calculus";
import { discreteCards } from "./discrete";
import { informationCards } from "./information";
import { machineCards } from "./machine";
import { statisticsCards } from "./statistics";
import { systemCards } from "./systems";
import type { MathCard } from "../types/card";

export const mathBank: readonly MathCard[] = [
  ...calculusCards,
  ...algebraCards,
  ...statisticsCards,
  ...discreteCards,
  ...machineCards,
  ...systemCards,
  ...informationCards,
];

export function cardById(id: string): MathCard {
  const card = mathBank.find((item) => item.id === id);
  if (!card) throw new Error(`No está la carta ${id}`);
  return card;
}
