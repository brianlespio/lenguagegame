import { PLOTS, type PlotFn } from "../data/plots";

export interface PlotSample {
  x: number;
  y: number;
}

export function getPlot(id: string): PlotFn | undefined {
  return PLOTS[id];
}

export function samplePlot(plot: PlotFn, count = 80): PlotSample[] {
  const samples: PlotSample[] = [];
  const steps = Math.max(2, count);
  for (let index = 0; index < steps; index += 1) {
    const x = plot.xMin + ((plot.xMax - plot.xMin) * index) / (steps - 1);
    const y = plot.f(x);
    if (Number.isFinite(y)) samples.push({ x, y });
  }
  return samples;
}
