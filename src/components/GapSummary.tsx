import React, { useMemo } from 'react';
import { AcatDataPoint } from '../types/acat';
import { average, median } from '../utils/acatHelpers';
interface GapSummaryProps {
  data: AcatDataPoint[];
}
export function GapSummary({ data }: GapSummaryProps) {
  const summary = useMemo(() => {
    if (data.length === 0) return [];
    const gaps = data.map((d) => d.gap);
    const lis = data.map((d) => d.li);
    const over = gaps.filter((g) => g > 0).length;
    return [
    {
      label: 'Mean gap',
      value: `${average(gaps).toFixed(1)} pts`,
      color: '#d4a04a'
    },
    {
      label: 'Median gap',
      value: `${median(gaps).toFixed(1)} pts`,
      color: '#88a7d8'
    },
    {
      label: 'Overestimating',
      value: `${(over / data.length * 100).toFixed(0)}%`,
      color: '#d97d70'
    },
    {
      label: 'Mean LI',
      value: average(lis).toFixed(3),
      color: '#87b68b'
    }];

  }, [data]);
  return (
    <article className="bg-obs-panel-gradient bg-obs-panel border border-obs-line rounded-obs shadow-obs-panel p-4 md:p-[18px]">
      <div className="flex justify-between items-start gap-4 mb-3.5 flex-wrap">
        <div>
          <h3 className="font-serif text-[clamp(1.35rem,2.2vw,1.8rem)] leading-[1.04] m-0 mb-1 text-obs-text">
            Gap Summary
          </h3>
          <p className="m-0 text-obs-muted max-w-[70ch] text-[0.96rem]">
            Statistical measures from paired assessments
          </p>
        </div>
      </div>

      <div className="grid gap-3 mt-1" aria-live="polite">
        {summary.map((item, i) =>
        <div
          key={i}
          className="grid grid-cols-[auto_1fr_auto] gap-3 items-center p-3 px-3.5 rounded-obs-sm bg-white/[0.02] border border-white/5">

            <span
            className="w-2.5 h-2.5 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
            style={{
              backgroundColor: item.color
            }} />

            <span className="text-obs-muted">{item.label}</span>
            <strong className="text-[1.05rem] text-obs-text">
              {item.value}
            </strong>
          </div>
        )}
      </div>
    </article>);

}