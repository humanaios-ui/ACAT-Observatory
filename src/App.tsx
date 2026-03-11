import React, { useMemo, useState } from 'react';
import { useAcatData } from './hooks/useAcatData';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { ExplanatorySection } from './components/ExplanatorySection';
import { DatasetOverview } from './components/DatasetOverview';
import { GapSummary } from './components/GapSummary';
import { CalibrationChart } from './components/CalibrationChart';
import { DimensionCharts } from './components/DimensionCharts';
import { AssessmentTable } from './components/AssessmentTable';
import { ProviderDistribution } from './components/ProviderDistribution';
import { Footer } from './components/Footer';
export function App() {
  const {
    data,
    totalAssessments,
    uniqueSystems,
    pairedAssessments,
    meanLI,
    loading,
    error
  } = useAcatData();
  const [providerFilter, setProviderFilter] = useState('All');
  const filteredData = useMemo(() => {
    if (providerFilter === 'All') return data;
    return data.filter((d) => d.provider === providerFilter);
  }, [data, providerFilter]);
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-obs-bg text-accent-amber">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-accent-amber/20 border-t-accent-amber rounded-full animate-spin"></div>
          <p className="font-sans text-obs-text">
            Loading ACAT Observatory Data...
          </p>
        </div>
      </div>);

  }
  return (
    <div className="min-h-screen w-full text-obs-text font-sans selection:bg-accent-amber/30">
      <TopBar />

      <main id="top">
        <HeroSection />

        {error &&
        <div className="w-full max-w-[1240px] mx-auto px-4 mb-6">
            <div className="bg-obs-danger/10 border border-obs-danger/30 text-obs-danger px-4 py-3 rounded-obs-sm text-sm text-center">
              {error}
            </div>
          </div>
        }

        {/* Core Signal Section */}
        <section className="py-[18px] pb-3" id="signal">
          <div className="w-full max-w-[1240px] mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)] gap-[18px] items-stretch">
              <CalibrationChart
                data={filteredData}
                allData={data}
                providerFilter={providerFilter}
                onFilterChange={setProviderFilter} />

              <div className="grid gap-4 content-start">
                <DatasetOverview
                  totalAssessments={totalAssessments}
                  uniqueSystems={uniqueSystems}
                  pairedAssessments={pairedAssessments}
                  meanLI={meanLI} />

                <GapSummary data={filteredData} />
              </div>
            </div>
          </div>
        </section>

        <ExplanatorySection
          title="What This Shows"
          paragraphs={[
          'The scatter plot reveals a systematic pattern: AI systems consistently cluster below the perfect calibration line. This suggests they rate their own capabilities higher in unobserved self-assessment than they demonstrate under external observation.',
          'The pattern appears across all major AI providers and model families, indicating this is not a provider-specific phenomenon but a broader behavioral characteristic of AI systems.']
          } />


        {/* Dimensions Section */}
        <section className="py-[18px] pb-3" id="dimensions">
          <div className="w-full max-w-[1240px] mx-auto px-4">
            <DimensionCharts data={data} />
          </div>
        </section>

        <ExplanatorySection
          title="Where the Gap Concentrates"
          paragraphs={[
          "The self-assessment gap is not evenly distributed across ACAT's six dimensions. <strong>Humility</strong> shows the largest drop between Phase 1 and Phase 3, followed by <strong>Value Alignment</strong>. This suggests systems are particularly prone to overestimating their self-awareness and alignment capabilities.",
          'Dimensions like <strong>Truthfulness</strong> and <strong>Service</strong> show smaller gaps, indicating systems may calibrate more accurately when assessing concrete, task-oriented capabilities versus reflective or alignment-based dimensions.']
          } />


        {/* Feed Section */}
        <section className="py-[18px] pb-3" id="feed">
          <div className="w-full max-w-[1240px] mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.88fr)_minmax(280px,0.72fr)] gap-[18px]">
              <AssessmentTable data={data} />
              <ProviderDistribution data={data} />
            </div>
          </div>
        </section>

        <ExplanatorySection
          title="Operational Implications"
          paragraphs={[
          'If calibration gap correlates with operational reliability, platforms could use ACAT scores to pre-screen AI workers and reduce failed task completion attempts. The hypothesis is testable: systems with smaller gaps (higher Learning Index values) may demonstrate better follow-through on assigned tasks.',
          'This research explores whether self-assessment accuracy predicts real-world performance — a question with direct applications in AI-human collaboration platforms, autonomous agent deployment, and quality assurance systems.']
          } />

      </main>

      <Footer />
    </div>);

}