import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend } from
'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
import { AcatDataPoint } from '../types/acat';
import { DIMENSION_LABELS, average } from '../utils/acatHelpers';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
interface DimensionChartsProps {
  data: AcatDataPoint[];
}
export function DimensionCharts({ data }: DimensionChartsProps) {
  const { gapsByDimension, phase1Mean, phase3Mean } = useMemo(() => {
    if (data.length === 0)
    return {
      gapsByDimension: [],
      phase1Mean: [],
      phase3Mean: []
    };
    const keys = ['truth', 'service', 'harm', 'autonomy', 'value', 'humility'];
    const p1Mean = keys.map((k) =>
    average(data.map((d) => (d as any)[`${k}1`]))
    );
    const p3Mean = keys.map((k) =>
    average(data.map((d) => (d as any)[`${k}3`]))
    );
    const gaps = p1Mean.map((val, i) => Number((val - p3Mean[i]).toFixed(1)));
    return {
      gapsByDimension: gaps,
      phase1Mean: p1Mean,
      phase3Mean: p3Mean
    };
  }, [data]);
  const barData = {
    labels: DIMENSION_LABELS,
    datasets: [
    {
      label: 'Phase 1 - Phase 3 gap',
      data: gapsByDimension,
      backgroundColor: [
      '#d4a04a',
      '#c69253',
      '#b98b68',
      '#a88578',
      '#d97d70',
      '#f1c36e'],

      borderRadius: 8
    }]

  };
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(20,18,15,0.96)',
        borderColor: 'rgba(212,160,74,0.35)',
        borderWidth: 1,
        titleColor: '#f4ebdf',
        bodyColor: '#f4ebdf'
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#b9ad99',
          maxRotation: 0,
          minRotation: 0
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#b9ad99'
        },
        grid: {
          color: 'rgba(255,255,255,0.08)'
        },
        title: {
          display: true,
          text: 'Gap (Phase 1 - Phase 3)',
          color: '#f4ebdf'
        }
      }
    }
  };
  const radarData = {
    labels: DIMENSION_LABELS,
    datasets: [
    {
      label: 'Phase 1 (Self-Assessment)',
      data: phase1Mean,
      backgroundColor: 'rgba(212,160,74,0.18)',
      borderColor: '#d4a04a',
      pointBackgroundColor: '#d4a04a',
      pointBorderColor: '#d4a04a',
      borderWidth: 2
    },
    {
      label: 'Phase 3 (Observed)',
      data: phase3Mean,
      backgroundColor: 'rgba(136,167,216,0.05)',
      borderColor: '#88a7d8',
      pointBackgroundColor: '#88a7d8',
      pointBorderColor: '#88a7d8',
      borderWidth: 2
    }]

  };
  const radarOptions = {
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
        bodyColor: '#f4ebdf'
      }
    },
    scales: {
      r: {
        suggestedMin: 50,
        suggestedMax: 90,
        angleLines: {
          color: 'rgba(255,255,255,0.08)'
        },
        grid: {
          color: 'rgba(255,255,255,0.08)'
        },
        pointLabels: {
          color: '#f4ebdf',
          font: {
            size: 11
          }
        },
        ticks: {
          color: '#b9ad99',
          backdropColor: 'transparent'
        }
      }
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px] items-stretch">
      <article className="bg-obs-panel-gradient bg-obs-panel border border-obs-line rounded-obs shadow-obs-panel p-4 md:p-[18px]">
        <div className="flex justify-between items-start gap-4 mb-3.5 flex-wrap">
          <div>
            <h3 className="font-serif text-[clamp(1.35rem,2.2vw,1.8rem)] leading-[1.04] m-0 mb-1 text-obs-text">
              Gap by Dimension
            </h3>
            <p className="m-0 text-obs-muted max-w-[70ch] text-[0.96rem]">
              Difference between Phase 1 and Phase 3 scores for each ACAT
              dimension
            </p>
          </div>
        </div>
        <div className="relative h-[280px] md:h-[320px]">
          <Bar
            data={barData}
            options={barOptions as any}
            aria-label="Bar chart of gap by ACAT dimension" />

        </div>
      </article>

      <article className="bg-obs-panel-gradient bg-obs-panel border border-obs-line rounded-obs shadow-obs-panel p-4 md:p-[18px]">
        <div className="flex justify-between items-start gap-4 mb-3.5 flex-wrap">
          <div>
            <h3 className="font-serif text-[clamp(1.35rem,2.2vw,1.8rem)] leading-[1.04] m-0 mb-1 text-obs-text">
              Aggregate Comparison
            </h3>
            <p className="m-0 text-obs-muted max-w-[70ch] text-[0.96rem]">
              Filled area: Phase 1 self-assessment. Outline: Phase 3 observed
              performance.
            </p>
          </div>
        </div>
        <div className="relative h-[280px] md:h-[320px]">
          <Radar
            data={radarData}
            options={radarOptions as any}
            aria-label="Radar chart comparing aggregate Phase 1 and Phase 3 dimensions" />

        </div>
      </article>
    </div>);

}