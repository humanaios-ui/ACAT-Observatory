import React from 'react';
import { AcatDataPoint } from '../types/acat';
interface AssessmentTableProps {
  data: AcatDataPoint[];
}
export function AssessmentTable({ data }: AssessmentTableProps) {
  const sortedData = [...data].sort((a, b) => b.phase3 - a.phase3).slice(0, 20); // Show top 20 like HTML
  return (
    <article className="bg-obs-panel-gradient bg-obs-panel border border-obs-line rounded-obs shadow-obs-panel p-4 md:p-[18px]">
      <div className="flex justify-between items-start gap-4 mb-3.5 flex-wrap">
        <div>
          <h3 className="font-serif text-[clamp(1.35rem,2.2vw,1.8rem)] leading-[1.04] m-0 mb-1 text-obs-text">
            Sample Assessments
          </h3>
          <p className="m-0 text-obs-muted max-w-[70ch] text-[0.96rem]">
            20 representative paired assessments from the dataset, sorted by
            Phase 3 performance
          </p>
        </div>
      </div>

      <div className="max-h-[380px] overflow-auto rounded-obs-sm border border-white/5 table-wrap">
        <table
          className="w-full border-collapse text-[0.95rem]"
          aria-label="Sample ACAT paired assessments">

          <thead>
            <tr>
              <th className="text-left p-3 md:p-2.5 border-b border-white/5 text-obs-muted text-[0.78rem] uppercase tracking-[0.12em] sticky top-0 bg-gradient-to-b from-[#1d1915fa] to-[#1d1915f5] z-10">
                Model
              </th>
              <th className="text-left p-3 md:p-2.5 border-b border-white/5 text-obs-muted text-[0.78rem] uppercase tracking-[0.12em] sticky top-0 bg-gradient-to-b from-[#1d1915fa] to-[#1d1915f5] z-10">
                Provider
              </th>
              <th className="text-left p-3 md:p-2.5 border-b border-white/5 text-obs-muted text-[0.78rem] uppercase tracking-[0.12em] sticky top-0 bg-gradient-to-b from-[#1d1915fa] to-[#1d1915f5] z-10">
                Phase 1
              </th>
              <th className="text-left p-3 md:p-2.5 border-b border-white/5 text-obs-muted text-[0.78rem] uppercase tracking-[0.12em] sticky top-0 bg-gradient-to-b from-[#1d1915fa] to-[#1d1915f5] z-10">
                Phase 3
              </th>
              <th className="text-left p-3 md:p-2.5 border-b border-white/5 text-obs-muted text-[0.78rem] uppercase tracking-[0.12em] sticky top-0 bg-gradient-to-b from-[#1d1915fa] to-[#1d1915f5] z-10">
                Gap
              </th>
              <th className="text-left p-3 md:p-2.5 border-b border-white/5 text-obs-muted text-[0.78rem] uppercase tracking-[0.12em] sticky top-0 bg-gradient-to-b from-[#1d1915fa] to-[#1d1915f5] z-10">
                LI
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((d, i) =>
            <tr key={i}>
                <td className="text-left p-3 md:p-2.5 border-b border-white/5 align-top">
                  <strong>{d.model}</strong>
                </td>
                <td className="text-left p-3 md:p-2.5 border-b border-white/5 align-top text-obs-muted">
                  {d.provider}
                </td>
                <td className="text-left p-3 md:p-2.5 border-b border-white/5 align-top">
                  {d.phase1}
                </td>
                <td className="text-left p-3 md:p-2.5 border-b border-white/5 align-top">
                  {d.phase3}
                </td>
                <td className="text-left p-3 md:p-2.5 border-b border-white/5 align-top">
                  {d.gap}
                </td>
                <td className="text-left p-3 md:p-2.5 border-b border-white/5 align-top">
                  {d.li}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>);

}