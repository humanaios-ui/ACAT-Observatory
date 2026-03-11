import { AcatDataPoint } from '../types/acat';

export const LIVE_DATA_URL =
'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ32O6M-CnerHYqlQn19bAzIBAq2Gt9Tp-SPoqKXXMJlsFBhGjy_BEPv37p9jnDf6O8uA4aUtiaO5s_/pub?gid=863685903&single=true&output=csv';

export const PROVIDER_COLORS: Record<string, string> = {
  Anthropic: '#d4a04a',
  OpenAI: '#88a7d8',
  Google: '#87b68b',
  Meta: '#d97d70',
  Mistral: '#c59af0',
  DeepSeek: '#76c6c6',
  Perplexity: '#e2c96b',
  Cohere: '#f0a36b',
  Moonshot: '#b5c781',
  '01.AI': '#d0a9d5',
  Alibaba: '#9fb2c8'
};

export const DIMENSION_LABELS = [
'Truthfulness',
'Service',
'Harm Awareness',
'Autonomy Respect',
'Value Alignment',
'Humility'];


export function extractProvider(name: string | undefined | null): string {
  if (!name) return 'Other';
  const lower = name.toLowerCase();
  if (lower.includes('claude') || lower.includes('anthropic'))
  return 'Anthropic';
  if (lower.includes('gpt') || lower.includes('openai')) return 'OpenAI';
  if (lower.includes('gemini') || lower.includes('google')) return 'Google';
  if (lower.includes('llama') || lower.includes('meta')) return 'Meta';
  if (lower.includes('mistral')) return 'Mistral';
  if (lower.includes('deepseek')) return 'DeepSeek';
  if (lower.includes('perplexity')) return 'Perplexity';
  if (lower.includes('cohere') || lower.includes('command')) return 'Cohere';
  if (lower.includes('kimi') || lower.includes('moonshot')) return 'Moonshot';
  if (lower.includes('qwen') || lower.includes('alibaba')) return 'Alibaba';
  if (lower.includes('yi')) return '01.AI';
  return 'Other';
}

export function average(list: number[]): number {
  if (list.length === 0) return 0;
  return list.reduce((sum, value) => sum + value, 0) / list.length;
}

export function median(list: number[]): number {
  if (list.length === 0) return 0;
  const s = [...list].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 !== 0 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

export function getSampleData(): AcatDataPoint[] {
  const rawData = [
  {
    model: 'Claude Sonnet 4.5',
    provider: 'Anthropic',
    phase1: 508,
    phase3: 445,
    p1: [84, 88, 79, 80, 76, 82],
    p3: [73, 78, 70, 72, 65, 59]
  },
  {
    model: 'Claude Opus 4',
    provider: 'Anthropic',
    phase1: 515,
    phase3: 452,
    p1: [85, 87, 80, 81, 77, 83],
    p3: [74, 79, 72, 73, 67, 61]
  },
  {
    model: 'Claude Haiku 4',
    provider: 'Anthropic',
    phase1: 492,
    phase3: 432,
    p1: [81, 84, 76, 77, 73, 79],
    p3: [71, 75, 68, 69, 63, 58]
  },
  {
    model: 'GPT-4',
    provider: 'OpenAI',
    phase1: 520,
    phase3: 438,
    p1: [82, 86, 81, 79, 78, 84],
    p3: [71, 76, 72, 70, 64, 58]
  },
  {
    model: 'GPT-4 Turbo',
    provider: 'OpenAI',
    phase1: 532,
    phase3: 450,
    p1: [83, 87, 82, 80, 79, 85],
    p3: [73, 77, 74, 72, 66, 60]
  },
  {
    model: 'GPT-4o',
    provider: 'OpenAI',
    phase1: 525,
    phase3: 444,
    p1: [82, 85, 81, 80, 78, 84],
    p3: [72, 76, 73, 71, 65, 59]
  },
  {
    model: 'Gemini 1.5 Pro',
    provider: 'Google',
    phase1: 505,
    phase3: 430,
    p1: [79, 83, 78, 77, 74, 80],
    p3: [69, 73, 69, 68, 62, 57]
  },
  {
    model: 'Gemini 1.5 Flash',
    provider: 'Google',
    phase1: 500,
    phase3: 426,
    p1: [78, 82, 77, 76, 73, 79],
    p3: [68, 72, 68, 67, 61, 56]
  },
  {
    model: 'Gemini Advanced',
    provider: 'Google',
    phase1: 512,
    phase3: 438,
    p1: [80, 84, 79, 78, 75, 81],
    p3: [70, 74, 70, 69, 63, 58]
  },
  {
    model: 'Llama 3 70B',
    provider: 'Meta',
    phase1: 495,
    phase3: 420,
    p1: [77, 80, 75, 74, 71, 78],
    p3: [67, 70, 66, 65, 59, 53]
  },
  {
    model: 'Llama 3.1',
    provider: 'Meta',
    phase1: 501,
    phase3: 427,
    p1: [78, 81, 76, 75, 72, 79],
    p3: [68, 71, 67, 66, 60, 55]
  },
  {
    model: 'Mistral Large',
    provider: 'Mistral',
    phase1: 498,
    phase3: 425,
    p1: [78, 80, 76, 75, 72, 79],
    p3: [68, 71, 67, 66, 60, 54]
  },
  {
    model: 'Mistral Medium',
    provider: 'Mistral',
    phase1: 490,
    phase3: 421,
    p1: [77, 79, 75, 74, 71, 77],
    p3: [67, 70, 66, 65, 59, 53]
  },
  {
    model: 'DeepSeek Chat',
    provider: 'DeepSeek',
    phase1: 505,
    phase3: 435,
    p1: [79, 82, 78, 77, 74, 81],
    p3: [70, 73, 69, 68, 62, 58]
  },
  {
    model: 'DeepSeek Reasoner',
    provider: 'DeepSeek',
    phase1: 510,
    phase3: 441,
    p1: [80, 83, 79, 78, 75, 82],
    p3: [71, 74, 70, 69, 63, 59]
  },
  {
    model: 'Perplexity Pro',
    provider: 'Perplexity',
    phase1: 510,
    phase3: 440,
    p1: [80, 83, 79, 78, 75, 81],
    p3: [71, 74, 70, 69, 63, 58]
  },
  {
    model: 'Command R+',
    provider: 'Cohere',
    phase1: 493,
    phase3: 423,
    p1: [77, 81, 75, 74, 72, 78],
    p3: [67, 70, 66, 65, 59, 54]
  },
  {
    model: 'Kimi K2',
    provider: 'Moonshot',
    phase1: 499,
    phase3: 431,
    p1: [78, 82, 76, 75, 73, 80],
    p3: [69, 72, 67, 66, 61, 56]
  },
  {
    model: 'Yi Large',
    provider: '01.AI',
    phase1: 496,
    phase3: 426,
    p1: [78, 80, 76, 75, 72, 79],
    p3: [68, 71, 67, 66, 60, 54]
  },
  {
    model: 'Qwen Max',
    provider: 'Alibaba',
    phase1: 504,
    phase3: 434,
    p1: [79, 82, 78, 77, 74, 80],
    p3: [70, 73, 69, 68, 62, 57]
  }];


  return rawData.map((d) => {
    const gap = d.phase1 - d.phase3;
    const li = Number((d.phase3 / d.phase1).toFixed(3));
    return {
      ...d,
      gap,
      li,
      truth1: d.p1[0],
      service1: d.p1[1],
      harm1: d.p1[2],
      autonomy1: d.p1[3],
      value1: d.p1[4],
      humility1: d.p1[5],
      truth3: d.p3[0],
      service3: d.p3[1],
      harm3: d.p3[2],
      autonomy3: d.p3[3],
      value3: d.p3[4],
      humility3: d.p3[5]
    };
  });
}