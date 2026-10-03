export function counterAfter(adds: readonly number[]): number {
  let value = 0;
  for (const add of adds) value += add;
  return value;
}

export function movedX(x: number, dx: number): number {
  return x + dx;
}

export function chainLength(symbols: string): number {
  return [...symbols].length;
}

export function acceptsEndingInOne(input: string): boolean {
  let lastWasOne = false;
  for (const symbol of input) {
    if (symbol !== "0" && symbol !== "1") throw new Error(`Símbolo ajeno al alfabeto: ${symbol}`);
    lastWasOne = symbol === "1";
  }
  return lastWasOne;
}

export function hopCount(stops: number): number {
  if (stops < 2) throw new Error("Un camino necesita origen y destino");
  return stops - 1;
}

export function transferSeconds(megabits: number, megabitsPerSecond: number): number {
  if (megabitsPerSecond <= 0) throw new Error("Un enlace sin caudal no mueve el fichero");
  return megabits / megabitsPerSecond;
}

export function sampleCount(seconds: number, period: number): number {
  if (period <= 0) throw new Error("El periodo tiene que ser positivo");
  const count = seconds / period;
  if (!Number.isInteger(count)) throw new Error("La duración no cabe en periodos enteros");
  return count;
}

export function rowsWithAge(ages: readonly number[], age: number): number {
  return ages.filter((value) => value === age).length;
}

export function repeatedKeyAllowed(): number {
  return 1;
}

export function secondPop(values: readonly string[]): string {
  const stack = [...values];
  stack.pop();
  const value = stack.pop();
  if (value === undefined) throw new Error("La pila no tiene segundo elemento");
  return value;
}

export function secondDequeue(values: readonly string[]): string {
  const queue = [...values];
  queue.shift();
  const value = queue.shift();
  if (value === undefined) throw new Error("La cola no tiene segundo elemento");
  return value;
}

export function casePasses(got: number, expected: number): boolean {
  return got === expected;
}

export function senderKeeps(value: number): number {
  return value;
}

export function equalParts(records: number, parts: number): number {
  if (parts <= 0 || records % parts !== 0) throw new Error("Las partes no son enteras e iguales");
  return records / parts;
}

export function cheaper(left: number, right: number): number {
  return Math.min(left, right);
}
