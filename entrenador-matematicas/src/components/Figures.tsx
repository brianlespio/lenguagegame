import type { BayesTable, MathCard, MatrixView } from "../types/card";
import { getPlot, samplePlot } from "../utils/plot";

function formatNum(value: number): string {
  if (Number.isInteger(value)) return String(value);
  const rounded = Math.round(value * 1000) / 1000;
  return String(rounded);
}

export function FunctionPlot({
  plotId,
  x0,
  y0,
  slope,
  tangent,
  showTangent,
}: {
  plotId: string;
  x0: number;
  y0: number;
  slope: number;
  tangent: string;
  showTangent: boolean;
}) {
  const plot = getPlot(plotId);
  if (!plot) return null;
  const samples = samplePlot(plot);
  const span = (plot.xMax - plot.xMin) / 6;
  const x1 = Math.max(plot.xMin, x0 - span);
  const x2 = Math.min(plot.xMax, x0 + span);
  const y1 = y0 + slope * (x1 - x0);
  const y2 = y0 + slope * (x2 - x0);
  const ys = samples.map((sample) => sample.y);
  if (showTangent) ys.push(y1, y2);
  const minY = Math.min(...ys, y0);
  const maxY = Math.max(...ys, y0);
  const padY = maxY === minY ? 1 : (maxY - minY) * 0.12;
  const yLo = minY - padY;
  const yHi = maxY + padY;
  const width = 640;
  const height = 280;
  const pad = 28;
  const sx = (x: number) => pad + ((x - plot.xMin) / (plot.xMax - plot.xMin)) * (width - pad * 2);
  const sy = (y: number) => pad + (1 - (y - yLo) / (yHi - yLo)) * (height - pad * 2);
  const line = samples.map((sample) => `${sx(sample.x)},${sy(sample.y)}`).join(" ");
  const caption = showTangent
    ? `${plot.label}. En ${plot.xName} = ${formatNum(x0)} la altura es ${formatNum(y0)}. ${tangent}`
    : `${plot.label}. Punto de estudio: ${plot.xName} = ${formatNum(x0)}. La tangente está en la cara B.`;

  return (
    <figure className="figure">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={caption} data-testid="function-plot">
        <line x1={pad} y1={sy(0)} x2={width - pad} y2={sy(0)} className="plot-axis" />
        <polyline points={line} className="plot-curve" />
        {showTangent ? (
          <line x1={sx(x1)} y1={sy(y1)} x2={sx(x2)} y2={sy(y2)} className="plot-tangent" />
        ) : null}
        <circle cx={sx(x0)} cy={sy(y0)} r="6" className="plot-point" />
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function MatrixFigure({ matrix }: { matrix: MatrixView }) {
  const { a, b, c, d, caption } = matrix;
  const image = (x: number, y: number): [number, number] => [a * x + b * y, c * x + d * y];
  const original: [number, number][] = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ];
  const transformed = original.map(([x, y]) => image(x, y));
  const xs = [...original, ...transformed].map(([x]) => x);
  const ys = [...original, ...transformed].map(([, y]) => y);
  const minX = Math.min(...xs, -0.2) - 0.3;
  const maxX = Math.max(...xs, 1.2) + 0.3;
  const minY = Math.min(...ys, -0.2) - 0.3;
  const maxY = Math.max(...ys, 1.2) + 0.3;
  const width = 320;
  const height = 320;
  const sx = (x: number) => ((x - minX) / (maxX - minX)) * width;
  const sy = (y: number) => height - ((y - minY) / (maxY - minY)) * height;
  const poly = (points: [number, number][]) => points.map(([x, y]) => `${sx(x)},${sy(y)}`).join(" ");
  const e1 = image(1, 0);
  const e2 = image(0, 1);

  return (
    <figure className="figure">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={caption}>
        <polygon points={poly(original)} className="square-original" />
        <polygon points={poly(transformed)} className="square-image" />
      </svg>
      <figcaption>
        <p>{caption}</p>
        <p>
          Trazo continuo: imagen. Trazo gris: cuadrado unidad. (1, 0) → ({formatNum(e1[0])}, {formatNum(e1[1])}). (0, 1) → ({formatNum(e2[0])}, {formatNum(e2[1])}).
        </p>
      </figcaption>
    </figure>
  );
}

function BayesFigure({ table, revealed }: { table: BayesTable; revealed: boolean }) {
  return (
    <figure className="figure">
      <table className="count-table">
        <caption>{revealed ? table.claim : "Tabla de conteos. La condicional se revela."}</caption>
        <thead>
          <tr>
            <th scope="col"> </th>
            {table.colLabels.map((label) => (
              <th key={label} scope="col">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rowLabels.map((label, row) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {table.counts[row].map((count, column) => (
                <td key={`${label}-${column}`}>{count}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

function BarsFigure({ labels, values, caption }: { labels: readonly string[]; values: readonly number[]; caption: string }) {
  const max = Math.max(...values, 1);
  return (
    <figure className="figure">
      <svg viewBox="0 0 640 220" role="img" aria-label={caption} className="bars">
        {values.map((value, index) => {
          const slot = 640 / values.length;
          const barHeight = (value / max) * 160;
          return (
            <g key={labels[index] ?? index}>
              <rect x={index * slot + 12} y={180 - barHeight} width={slot - 24} height={barHeight} className="bar" />
              <text x={index * slot + slot / 2} y={200} textAnchor="middle" className="bar-label">
                {labels[index]} · {value}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function TruthFigure({ formula, rows }: { formula: string; rows: readonly (readonly [boolean, boolean, boolean])[] }) {
  const bit = (value: boolean) => (value ? "V" : "F");
  return (
    <figure className="figure">
      <table className="count-table">
        <caption>{formula}. V es verdadero y F es falso. La fila que falla se lee en la última columna.</caption>
        <thead>
          <tr>
            <th scope="col">A</th>
            <th scope="col">B</th>
            <th scope="col">{formula}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.map((value) => (value ? "V" : "F")).join("")}>
              {row.map((value, index) => (
                <td key={`${bit(value)}-${index}`}>{bit(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export function CardFigures({ card, revealed }: { card: MathCard; revealed: boolean }) {
  const point = card.decomposition ?? card.anchor;
  return (
    <>
      {card.plotId && point ? (
        <FunctionPlot
          plotId={card.plotId}
          x0={point.x0}
          y0={point.fAt}
          slope={point.fPrimeAt}
          tangent={point.tangent}
          showTangent={revealed}
        />
      ) : null}
      {card.visual?.kind === "matrix" ? <MatrixFigure matrix={card.visual.matrix} /> : null}
      {card.visual?.kind === "bayes" ? <BayesFigure table={card.visual.bayes} revealed={revealed} /> : null}
      {card.visual?.kind === "bars" ? (
        <BarsFigure labels={card.visual.bars.labels} values={card.visual.bars.values} caption={card.visual.bars.caption} />
      ) : null}
      {card.visual?.kind === "truth" ? <TruthFigure formula={card.visual.truth.formula} rows={card.visual.truth.rows} /> : null}
      {card.visual?.kind === "area" ? (
        <figure className="figure">
          <svg viewBox="0 0 220 220" role="img" aria-label={card.visual.area.caption}>
            <polygon points="20,200 200,200 200,20" className="square-image" />
            <line x1="20" y1="200" x2="200" y2="20" className="plot-curve" />
          </svg>
          <figcaption>{card.visual.area.caption} El triángulo es la zona bajo la recta. La base y la altura se leen en los ejes.</figcaption>
        </figure>
      ) : null}
    </>
  );
}
