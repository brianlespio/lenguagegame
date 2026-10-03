import type { MathCard } from "../types/card";

export type CardDraft = Omit<MathCard, "isFunction" | "quiz"> & {
  isFunction?: boolean;
  quizForward: string;
  quizForwardAnswer: string;
  quizReverse: string;
  quizReverseAnswer: string;
};

export function makeCard(draft: CardDraft): MathCard {
  const { quizForward, quizForwardAnswer, quizReverse, quizReverseAnswer, isFunction, ...rest } = draft;
  return {
    ...rest,
    isFunction: isFunction ?? Boolean(draft.decomposition),
    quiz: {
      forward: { prompt: quizForward, correct: quizForwardAnswer },
      reverse: { prompt: quizReverse, correct: quizReverseAnswer },
    },
  };
}
