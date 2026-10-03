export type AxisId = "calculus" | "algebra" | "statistics" | "discrete" | "machine";

export type LevelId = "L0" | "L1" | "L2" | "L3";

export type AxisFilter = AxisId | "all";

export type LevelFilter = LevelId | "all";

export type CardKind =
  | "identity"
  | "worked"
  | "decomposition"
  | "prediction"
  | "visual"
  | "machine"
  | "trap";

export type StudyMode = "study" | "test";

export type Relation = "compose" | "sum" | "product";

export interface Decomposition {
  expression: string;
  relation: Relation;
  g: string;
  h: string;
  x0: number;
  hAt: number;
  gAt: number;
  fAt: number;
  gPrimeAt: number;
  hPrimeAt: number;
  fPrimeAt: number;
  tangent: string;
}

export interface Anchor {
  x0: number;
  fAt: number;
  fPrimeAt: number;
  tangent: string;
}

export interface MatrixView {
  a: number;
  b: number;
  c: number;
  d: number;
  caption: string;
}

export interface TruthView {
  formula: string;
  rows: readonly (readonly [boolean, boolean, boolean])[];
}

export interface BarsView {
  caption: string;
  labels: readonly string[];
  values: readonly number[];
}

export interface BayesTable {
  rowLabels: readonly [string, string];
  colLabels: readonly [string, string];
  counts: readonly [readonly [number, number], readonly [number, number]];
  numerator: number;
  denominator: number;
  claim: string;
}

export interface AreaView {
  caption: string;
}

export type Visual =
  | { kind: "matrix"; matrix: MatrixView }
  | { kind: "truth"; truth: TruthView }
  | { kind: "bars"; bars: BarsView }
  | { kind: "bayes"; bayes: BayesTable }
  | { kind: "area"; area: AreaView };

export interface StepPrompt {
  ask: string;
  expect: string;
  accept?: readonly string[];
}

export interface MachineCode {
  source: string;
  result: string;
}

export interface QuizFace {
  prompt: string;
  correct: string;
}

export interface MathCard {
  id: string;
  axis: AxisId;
  level: LevelId;
  kind: CardKind;
  object: string;
  title: string;
  face: string;
  answer: string;
  definition: string;
  example: string;
  whyAi: string;
  trap: string;
  steps?: readonly string[];
  step?: StepPrompt;
  decomposition?: Decomposition;
  anchor?: Anchor;
  plotId?: string;
  visual?: Visual;
  code?: MachineCode;
  bayes?: BayesTable;
  isFunction: boolean;
  quiz: { forward: QuizFace; reverse: QuizFace };
}

export type ChoiceKey = "a" | "b" | "c" | "d";

export interface QuizChoice {
  key: ChoiceKey;
  text: string;
  correct: boolean;
  kind: "catalog" | "none";
}

export interface QuizItem {
  id: string;
  cardId: string;
  axis: AxisId;
  level: LevelId;
  direction: "forward" | "reverse";
  prompt: string;
  choices: readonly QuizChoice[];
}
