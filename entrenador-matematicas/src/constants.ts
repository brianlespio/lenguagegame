import type { AxisId, CardKind, LevelId } from "./types/card";

export const USERS_KEY = "mathtrainer.v1.users";
export const SCORES_KEY = "mathtrainer.v1.scores";

export function settingsKey(userId: string): string {
  return `mathtrainer.v1.settings.${userId}`;
}

export function progressKey(userId: string): string {
  return `mathtrainer.v1.progress.${userId}`;
}

export const AXIS_META: readonly { id: AxisId; label: string; hint: string }[] = [
  { id: "calculus", label: "Cálculo", hint: "Pendiente, cadena, gradiente" },
  { id: "algebra", label: "Álgebra", hint: "Vectores, matrices, núcleos" },
  { id: "statistics", label: "Estadística", hint: "Media, Bayes, riesgo" },
  { id: "discrete", label: "Lógica", hint: "Tablas, inducción, grafos" },
  { id: "machine", label: "Máquina", hint: "Bits, float, bucles" },
];

export const LEVEL_META: readonly { id: LevelId; label: string; hint: string }[] = [
  { id: "L0", label: "L0 Base", hint: "Notación y el error de signo" },
  { id: "L1", label: "L1 Uso", hint: "Evaluar a mano" },
  { id: "L2", label: "L2 Oficio", hint: "Cadena, Bayes, inducción" },
  { id: "L3", label: "L3 IA", hint: "Backprop, riesgo, bits" },
];

export const KIND_LABEL: Record<CardKind, string> = {
  identity: "Idea",
  worked: "Ejemplo",
  decomposition: "Descomposición",
  prediction: "Predicción",
  visual: "Figura",
  machine: "En la máquina",
  trap: "Error típico",
};

export const INTERVALS = [8000, 12000, 20000] as const;

export const NONE_OF_THE_ABOVE = "Ninguna de las anteriores";
