import { phraseSetIdFromParts } from "./vocabulary";

export type RandomFn = () => number;

export function fisherYatesShuffle<T>(items: readonly T[], random: RandomFn = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const current = result[i];
    const swap = result[j];
    if (current === undefined || swap === undefined) continue;
    result[i] = swap;
    result[j] = current;
  }
  return result;
}

export interface Identifiable {
  id: string;
}

export class ShuffleBag<T extends Identifiable> {
  private remaining: T[] = [];
  private lastServedId: string | null = null;
  private items: readonly T[];
  private readonly random: RandomFn;

  constructor(items: readonly T[], random: RandomFn = Math.random) {
    this.items = items;
    this.random = random;
    this.refill();
  }

  setItems(items: readonly T[]): void {
    this.items = items;
    this.remaining = [];
    this.refill();
  }

  getRemainingCount(): number {
    return this.remaining.length;
  }

  next(): T | undefined {
    if (this.items.length === 0) return undefined;
    if (this.remaining.length === 0) this.refill();
    const item = this.remaining.shift();
    if (!item) return undefined;
    this.lastServedId = item.id;
    return item;
  }

  refill(): void {
    this.remaining = fisherYatesShuffle(this.items, this.random);
    if (
      this.remaining.length > 1 &&
      this.lastServedId !== null &&
      this.remaining[0]?.id === this.lastServedId
    ) {
      const swapAt = 1 + Math.floor(this.random() * (this.remaining.length - 1));
      const first = this.remaining[0];
      const swap = this.remaining[swapAt];
      if (first && swap) {
        this.remaining[0] = swap;
        this.remaining[swapAt] = first;
      }
    }
  }
}

export function buildShuffleOrder<T extends Identifiable>(
  items: readonly T[],
  lastId: string | null,
  random: RandomFn = Math.random,
): T[] {
  const order = fisherYatesShuffle(items, random);
  if (order.length > 1 && lastId !== null && order[0]?.id === lastId) {
    const swapAt = 1 + Math.floor(random() * (order.length - 1));
    const first = order[0];
    const swap = order[swapAt];
    if (first && swap) {
      order[0] = swap;
      order[swapAt] = first;
    }
  }
  return order;
}

export function buildPhraseSetShuffleOrder<T extends Identifiable & { tags?: string[]; category?: string }>(
  items: readonly T[],
  lastId: string | null,
  random: RandomFn = Math.random,
): T[] {
  const groups = new Map<string, T[]>();
  const setOrder: string[] = [];
  const leftovers: T[] = [];
  for (const item of items) {
    const setId = phraseSetIdFromParts(item.id, item.tags);
    if (!setId) {
      leftovers.push(item);
      continue;
    }
    const list = groups.get(setId);
    if (list) list.push(item);
    else {
      groups.set(setId, [item]);
      setOrder.push(setId);
    }
  }
  const lastSet =
    lastId === null
      ? null
      : (phraseSetIdFromParts(lastId, items.find((item) => item.id === lastId)?.tags) ?? null);
  const shuffledSets = buildShuffleOrder(
    setOrder.map((id) => ({ id })),
    lastSet,
    random,
  ).map((item) => item.id);
  const roleRank = (category: string | undefined) => {
    if (category === "questions" || category === "techQuestions" || category === "openQuestions") return 0;
    if (category === "positiveAnswers" || category === "techAnswers" || category === "openAnswers") return 1;
    if (category === "negativeAnswers") return 2;
    return 9;
  };
  return [
    ...shuffledSets.flatMap((id) => (groups.get(id) ?? []).slice().sort((a, b) => roleRank(a.category) - roleRank(b.category))),
    ...leftovers,
  ];
}
