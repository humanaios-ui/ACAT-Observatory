import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ScatterController } from
'chart.js';
import { Scatter } from 'react-chartjs-2';
import { AcatDataPoint } from '../types/acat';
import { PROVIDER_COLORS } from '../utils/acatHelpers';
ChartJS.register(LinearScale, PointElement, Tooltip, Legend, ScatterController);
// Custom plugin for the diagonal line
const diagonalPlugin = {
  id: 'diagonalLine',
  afterDatasetsDraw(chart: any) {
    if (chart.canvas.id !== 'scatterChart') return;
    const {
      ctx,
      scales: { x, y }
    } = chart;
    ctx.save();
    ctx.strokeStyle = 'rgba(244,235,223,0.25)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    // Use scale min/max to draw the line
    const minVal = Math.max(x.min, y.min);
    const maxVal = Math.min(x.max, y.max);
    const startX = x.getPixelForValue(minVal);
    const startY = y.getPixelForValue(minVal);
    const endX = x.getPixelForValue(maxVal);
    const endY = y.getPixelForValue(maxVal);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(244,235,223,0.7)';
    ctx.font = '12px "IBM Plex Sans"';
    ctx.fillText('Perfect calibration', endX - 110, endY - 10);
    ctx.restore();
  }
};
ChartJS.register(diagonalPlugin);
interface CalibrationChartProps {
  data: AcatDataPoint[];
  allData: AcatDataPoint[];
  providerFilter: string;
  onFilterChange: (provider: string) => void;
}
export function CalibrationChart({
  data,
  allData,
  providerFilter,
  onFilterChange
}: CalibrationChartProps) {
  const providers = useMemo(() => {
    return [
    'All',
    ...Array.from(new Set(allData.map((d) => d.provider))).sort()];

  }, [allData]);
  const chartData = useMemo(() => {
    const grouped = Array.from(new Set(data.map((d) => d.provider))).map(
      (provider) => ({
        label: provider,
        data: data.
        filter((d) => d.provider === provider).
        map((d) => ({
          x: d.phase1,
          y: d.phase3,
          model: d.model,
          provider: d.provider,
          gap: d.gap,
          li: d.li
        })),
        pointRadius: 6,
        pointHoverRadius: 8,
        backgroundColor: PROVIDER_COLORS[provider] || '#d4a04a'
      })
    );
    return {
      datasets: grouped
    };
  }, [data]);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#f4ebdf'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(20,18,15,0.96)',
        borderColor: 'rgba(212,160,74,0.35)',
        borderWidth: 1,
        titleColor: '#f4ebdf',
        bodyColor: '#f4ebdf',
        callbacks: {
          title: (items: any) => items[0].raw.model,
          label: (item: any) => {
            const r = item.raw;
            return [
            `Provider: ${r.provider}`,
            `Phase 1: ${r.x}`,
            `Phase 3: ${r.y}`,
            `Gap: ${r.gap}`,
            `Learning Index: ${r.li}`];

          }
        }
      }
    },
    scales: {
      x: {
        min: 480,
        max: 540,
        grid: {
          color: 'rgba(255,255,255,0.08)'
        },
        ticks: {
          color: '#b9ad99'
        },
        title: {
          display: true,
          text: 'Phase 1 (Self-Assessment)',
          color: '#f4ebdf',
          font: {
            size: 13
          }
        }
      },
      y: {
        min: 410,
        max: 470,
        grid: {
          color: 'rgba(255,255,255,0.08)'
        },
        ticks: {
          color: '#b9ad99'
        },
        title: {
          display: true,
          text: 'Phase 3 (Observed Performance)',
          color: '#f4ebdf',
          font: {
            size: 13
          }
        }
      }
    }
  };
  return (
    <article className="bg-obs-panel-gradient bg-obs-panel border border-obs-line rounded-obs shadow-obs-panel p-4 md:p-[18px]">
      <div className="flex justify-between items-start gap-4 mb-3.5 flex-wrap">
        <div>
          <h3 className="font-serif text-[clamp(1.35rem,2.2vw,1.8rem)] leading-[1.04] m-0 mb-1 text-obs-text">
            Calibration Pattern
          </h3>
          <p className="m-0 text-obs-muted max-w-[70ch] text-[0.96rem]">
            Each point represents one AI system. The diagonal line represents
            perfect calibration. Points below the line indicate overestimation
            in Phase 1 self-assessment.
          </p>
        </div>
        <div className="flex gap-2.5 flex-wrap items-center">
          <label htmlFor="providerFilter" className="sr-only">
            Filter by provider
          </label>
          <select
            id="providerFilter"
            aria-label="Filter by provider"
            value={providerFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="bg-obs-bg-2 border border-obs-line-strong rounded-full text-obs-text px-3.5 py-2.5 font-sans text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber-bright focus-visible:ring-offset-2 focus-visible:ring-offset-obs-bg">

            {providers.map((p) =>
            <option key={p} value={p}>
                {p === 'All' ? 'All providers' : p}
              </option>
            )}
          </select>
        </div>
      </div>
      <div className="relative h-[320px] md:h-[400px]">
        <Scatter
          id="scatterChart"
          data={chartData}
          options={options}
          aria-label="Scatter plot of Phase 1 versus Phase 3 scores" />

      </div>
    </article>);

}