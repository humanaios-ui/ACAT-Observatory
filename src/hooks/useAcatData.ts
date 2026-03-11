import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { AcatDataPoint, AcatDatasetStats } from '../types/acat';
import {
  LIVE_DATA_URL,
  extractProvider,
  getSampleData } from
'../utils/acatHelpers';

export function useAcatData(): AcatDatasetStats {
  const [stats, setStats] = useState<AcatDatasetStats>({
    data: [],
    totalAssessments: 0,
    uniqueSystems: 0,
    pairedAssessments: 0,
    meanLI: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(LIVE_DATA_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data as any[];
            const liveData: AcatDataPoint[] = [];
            const systemNames = new Set<string>();
            const totalCount = parsedData.length;

            for (const row of parsedData) {
              if (!row.agent_name || !row.phase1_total || !row.phase3_total)
              continue;

              systemNames.add(row.agent_name);

              const phase1 = parseFloat(row.phase1_total);
              const phase3 = parseFloat(row.phase3_total);

              if (!isNaN(phase1) && !isNaN(phase3)) {
                const p1 = [
                parseFloat(row.phase1_truthfulness) || 0,
                parseFloat(row.phase1_service) || 0,
                parseFloat(row.phase1_harm) || 0,
                parseFloat(row.phase1_autonomy) || 0,
                parseFloat(row.phase1_value) || 0,
                parseFloat(row.phase1_humility) || 0];


                const p3 = [
                parseFloat(row.phase3_truthfulness) || 0,
                parseFloat(row.phase3_service) || 0,
                parseFloat(row.phase3_harm) || 0,
                parseFloat(row.phase3_autonomy) || 0,
                parseFloat(row.phase3_value) || 0,
                parseFloat(row.phase3_humility) || 0];


                liveData.push({
                  model: row.agent_name,
                  provider: row.provider || extractProvider(row.agent_name),
                  phase1,
                  phase3,
                  gap: phase1 - phase3,
                  li: Number((phase3 / phase1).toFixed(3)),
                  p1,
                  p3,
                  truth1: p1[0],
                  service1: p1[1],
                  harm1: p1[2],
                  autonomy1: p1[3],
                  value1: p1[4],
                  humility1: p1[5],
                  truth3: p3[0],
                  service3: p3[1],
                  harm3: p3[2],
                  autonomy3: p3[3],
                  value3: p3[4],
                  humility3: p3[5]
                });
              }
            }

            const meanLI =
            liveData.length > 0 ?
            Number(
              (
              liveData.reduce((sum, d) => sum + d.li, 0) /
              liveData.length).
              toFixed(3)
            ) :
            0;

            setStats({
              data: liveData,
              totalAssessments: totalCount,
              uniqueSystems: systemNames.size,
              pairedAssessments: liveData.length,
              meanLI,
              loading: false,
              error: null
            });
          },
          error: (error: any) => {
            console.error('PapaParse error:', error);
            useFallback();
          }
        });
      } catch (error) {
        console.error('Fetch error:', error);
        useFallback();
      }
    }

    function useFallback() {
      const sampleData = getSampleData();
      setStats({
        data: sampleData,
        totalAssessments: 475,
        uniqueSystems: 136,
        pairedAssessments: 20,
        meanLI: 0.876,
        loading: false,
        error: 'Failed to load live data. Showing sample data.'
      });
    }

    fetchData();
  }, []);

  return stats;
}