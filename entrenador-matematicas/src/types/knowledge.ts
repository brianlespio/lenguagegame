export interface Lesson {
  id: string;
  concept: string;
  teach: string;
  worked: string;
  ask: string;
  expect: string;
  accept?: readonly string[];
  rule: string;
}

export interface SubjectPath {
  id: string;
  name: string;
  learns: string;
  cardIds: readonly string[];
  lessonIds: readonly string[];
}
