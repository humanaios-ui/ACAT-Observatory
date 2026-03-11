import React from 'react';
interface DatasetOverviewProps {
  totalAssessments: number;
  uniqueSystems: number;
  pairedAssessments: number;
  meanLI: number;
}
export function DatasetOverview({
  totalAssessments,
  uniqueSystems,
  pairedAssessments,
  meanLI
}: DatasetOverviewProps) {
  return (
    <article className="bg-obs-panel-gradient bg-obs-panel border border-obs-line rounded-obs shadow-obs-panel p-4 md:p-[18px]">
      <div className="flex justify-between items-start gap-4 mb-3.5 flex-wrap">
        <div>
          <h3 className="font-serif text-[clamp(1.35rem,2.2vw,1.8rem)] leading-[1.04] m-0 mb-1 text-obs-text">
            Dataset Overview
          </h3>
          <p className="m-0 text-obs-muted max-w-[70ch] text-[0.96rem]">
            Key metrics from {totalAssessments} assessments across{' '}
            {uniqueSystems} AI systems
          </p>
        </div>
      </div>

      <div className="grid gap-3 mt-1">
        <MetricItem
          color="#d4a04a"
          label="Total assessments"
          value={totalAssessments.toLocaleString()} />

        <MetricItem
          color="#88a7d8"
          label="Unique systems"
          value={uniqueSystems.toString()} />

        <MetricItem
          color="#87b68b"
          label="Paired assessments"
          value={pairedAssessments.toString()} />

        <MetricItem
          color="#d97d70"
          label="Mean Learning Index"
          value={meanLI.toFixed(3)} />

      </div>
    </article>);

}
function MetricItem({
  color,
  label,
  value




}: {color: string;label: string;value: string | number;}) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-center p-3 px-3.5 rounded-obs-sm bg-white/[0.02] border border-white/5">
      <span
        className="w-2.5 h-2.5 rounded-full shadow-[0_0_0_4px_rgba(212,160,74,0.14)]"
        style={{
          backgroundColor: color
        }} />

      <span className="text-obs-muted">{label}</span>
      <strong className="text-[1.05rem] text-obs-text">{value}</strong>
    </div>);

}