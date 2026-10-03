export interface PlotFn {
  label: string;
  xName: string;
  xMin: number;
  xMax: number;
  f: (x: number) => number;
  df: (x: number) => number;
}

function sigmoid(u: number): number {
  return 1 / (1 + Math.exp(-u));
}

function sigmoidPrime(u: number): number {
  const s = sigmoid(u);
  return s * (1 - s);
}

function sigmoidPlot(w: number): PlotFn {
  return {
    label: `σ(${w}x)`,
    xName: "x",
    xMin: -2,
    xMax: 2,
    f: (x) => sigmoid(w * x),
    df: (x) => sigmoidPrime(w * x) * w,
  };
}

function lossPlot(xFeature: number, y: number): PlotFn {
  return {
    label: `(${xFeature}w − ${y})²`,
    xName: "w",
    xMin: -0.5,
    xMax: 2,
    f: (w) => (xFeature * w - y) ** 2,
    df: (w) => 2 * (xFeature * w - y) * xFeature,
  };
}

export const PLOTS: Record<string, PlotFn> = {
  "quad-minus": {
    label: "x² − 3x",
    xName: "x",
    xMin: -0.2,
    xMax: 3.2,
    f: (x) => x * x - 3 * x,
    df: (x) => 2 * x - 3,
  },
  cube: {
    label: "(x² + 1)³",
    xName: "x",
    xMin: -0.25,
    xMax: 1.45,
    f: (x) => (x * x + 1) ** 3,
    df: (x) => 3 * (x * x + 1) ** 2 * (2 * x),
  },
  "product-x": {
    label: "x(x + 1)",
    xName: "x",
    xMin: -0.5,
    xMax: 3,
    f: (x) => x * (x + 1),
    df: (x) => 2 * x + 1,
  },
  sqrt: {
    label: "√x",
    xName: "x",
    xMin: 0.25,
    xMax: 6,
    f: (x) => Math.sqrt(x),
    df: (x) => 1 / (2 * Math.sqrt(x)),
  },
  sqrt1p: {
    label: "√(1 + x)",
    xName: "x",
    xMin: -0.6,
    xMax: 1.2,
    f: (x) => Math.sqrt(1 + x),
    df: (x) => 0.5 / Math.sqrt(1 + x),
  },
  "line-x": {
    label: "x",
    xName: "x",
    xMin: 0,
    xMax: 2,
    f: (x) => x,
    df: () => 1,
  },
  "sigmoid-w1": sigmoidPlot(1),
  "sigmoid-w2": sigmoidPlot(2),
  "sigmoid-w4": sigmoidPlot(4),
  "loss-x2-y1": lossPlot(2, 1),
  "loss-x3-y1": lossPlot(3, 1),
};
