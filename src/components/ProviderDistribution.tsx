import React, { useMemo } from 'react';
import { AcatDataPoint } from '../types/acat';
import { PROVIDER_COLORS, average } from '../utils/acatHelpers';
interface ProviderDistributionProps {
  data: AcatDataPoint[];
}
export function ProviderDistribution({ data }: ProviderDistributionProps) {
  const { providers, summary } = useMemo(() => {
    const uniqueProviders = [...new Set(data.map((d) => d.provider))];
    const providerGroups = data.reduce(
      (acc, item) => {
        if (!acc[item.provider]) acc[item.provider] = [];
        acc[item.provider].push(item);
        return acc;
      },
      {} as Record<string, AcatDataPoint[]>
    );
    const summaryData = Object.entries(providerGroups).
    map(([provider, list]) => ({
      provider,
      count: list.length,
      avgGap: average(list.map((d) => d.gap)).toFixed(1),
      avgLI: average(list.map((d) => d.li)).toFixed(3)
    })).
    sort((a, b) => b.count - a.count);
    return {
      providers: uniqueProviders,
      summary: summaryData
    };
  }, [data]);
  return (
    <article className="bg-obs-panel-gradient bg-obs-panel border border-obs-line rounded-obs shadow-obs-panel p-4 md:p-[18px]">
      <div className="flex justify-between items-start gap-4 mb-3.5 flex-wrap">
        <div>
          <h3 className="font-serif text-[clamp(1.35rem,2.2vw,1.8rem)] leading-[1.04] m-0 mb-1 text-obs-text">
            Provider Distribution
          </h3>
          <p className="m-0 text-obs-muted max-w-[70ch] text-[0.96rem]">
            Representation across the sample dataset
          </p>
        </div>
      </div>

      <div className="mb-2.5">
        {providers.map((provider) =>
        <span
          key={provider}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-obs-muted text-[0.88rem] m-0 mr-2 mb-2">

            <span
            className="w-2 h-2 rounded-full inline-block"
            style={{
              backgroundColor: PROVIDER_COLORS[provider] || '#d4a04a'
            }} />

            {provider}
          </span>
        )}
      </div>

      <div className="grid gap-3 mt-1">
        {summary.map((item) =>
        <div
          key={item.provider}
          className="grid grid-cols-[auto_1fr_auto] gap-3 items-center p-3 px-3.5 rounded-obs-sm bg-white/[0.02] border border-white/5">

            <span
            className="w-2.5 h-2.5 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
            style={{
              backgroundColor: PROVIDER_COLORS[item.provider] || '#d4a04a'
            }} />

            <span className="text-obs-muted text-sm md:text-base">
              {item.provider} • {item.count} models • gap {item.avgGap}
            </span>
            <strong className="text-[1.05rem] text-obs-text">
              LI {item.avgLI}
            </strong>
          </div>
        )}
      </div>
    </article>);

}