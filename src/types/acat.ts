export interface AcatDataPoint {
  model: string;
  provider: string;
  phase1: number;
  phase3: number;
  gap: number;
  li: number;
  p1: number[];
  p3: number[];
  truth1: number;
  service1: number;
  harm1: number;
  autonomy1: number;
  value1: number;
  humility1: number;
  truth3: number;
  service3: number;
  harm3: number;
  autonomy3: number;
  value3: number;
  humility3: number;
}

export interface ProviderSummary {
  provider: string;
  count: number;
  avgGap: string;
  avgLI: string;
}

export interface GapSummaryItem {
  label: string;
  value: string | number;
  color: string;
}

export interface AcatDatasetStats {
  data: AcatDataPoint[];
  totalAssessments: number;
  uniqueSystems: number;
  pairedAssessments: number;
  meanLI: number;
  loading: boolean;
  error: string | null;
}