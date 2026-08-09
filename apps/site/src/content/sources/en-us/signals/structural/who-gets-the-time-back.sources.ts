import type { DirectSourceEntry, FurtherReadingEntry } from '../../../types';

export const directSourceEntries: readonly DirectSourceEntry[] = Object.freeze([
  {
    id: 'global-occupational-exposure',
    label: 'Global occupational exposure',
    title:
      'International Labour Organization, Generative AI and Jobs: A Refined Global Index of Occupational Exposure, 2025',
    href: 'https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure',
    supports:
      'Grounds one-in-four exposure, 3.3 percent highest exposure, gender and income differences, and transformation as the most likely broad pattern.',
    limits: 'Exposure is not displacement and does not predict one uniform result.',
  },
  {
    id: 'current-empirical-synthesis',
    label: 'Current empirical synthesis',
    title:
      'International Labour Organization, The impact of GenAI on jobs, productivity and work organization, 2026',
    href: 'https://www.ilo.org/publications/impact-genai-jobs-productivity-and-work-organization-review-empirical',
    supports:
      'Grounds the current synthesis: uneven productivity, limited large-scale displacement so far, modest reported time savings, and risks to inequality, younger workers, autonomy, and job quality.',
    limits: 'A review of early evidence, not a final account of long-term effects.',
  },
  {
    id: 'measured-time-relief',
    label: 'Measured time relief',
    title:
      'Dillon, Jaffe, Immorlica, and Stanton, Shifting Work Patterns with Generative AI, NBER, revised 2025',
    href: 'https://www.nber.org/papers/w33795',
    supports:
      'Grounds reduced email time and reduced out-of-hours work in a 66-firm field experiment.',
    limits:
      'Some authors worked for Microsoft, the tool provider. No detected wider task-composition effect during the experiment.',
  },
  {
    id: 'measured-workplace-productivity',
    label: 'Measured workplace productivity',
    title:
      'Brynjolfsson, Li, and Raymond, Generative AI at Work, Quarterly Journal of Economics, 2025',
    href: 'https://academic.oup.com/qje/article/140/2/889/7990658',
    supports:
      'Grounds the 15 percent average productivity gain, larger novice gains, some durable learning, and the quality tension for top workers.',
    limits:
      'One firm and workflow. No direct evidence on wages, total labor demand, or economy-wide hiring.',
  },
  {
    id: 'task-reorganization',
    label: 'Task reorganization',
    title: 'Humlum and Vestergaard, Still Waters, Rapid Currents, NBER, revised 2026',
    href: 'https://www.nber.org/papers/w33777',
    supports:
      'Grounds rapid adoption, reported benefits, new AI-related tasks, and no measurable average earnings or recorded-hours effect in the first two years.',
    limits:
      'Denmark-specific early evidence. Average null effects do not exclude uneven effects between workers.',
  },
  {
    id: 'working-time-standard',
    label: 'Working time standard',
    title: 'International Labour Organization, Hours of Work Convention, 1919, No. 1',
    href: 'https://normlex.ilo.org/dyn/nrmlx_en/f?p=NORMLEXPUB%3A12100%3A0%3A%3ANO%3A%3AP12100_ILO_CODE%3AC001',
    supports:
      'Grounds the historical claim that working-time limits were institutional and political achievements.',
    limits: 'Industrial standard, not universal current practice.',
  },
  {
    id: 'working-time',
    label: 'Working time',
    title:
      'International Labour Organization, Working Time and Work-Life Balance Around the World, 2023',
    href: 'https://www.ilo.org/publications/working-time-and-work-life-balance-around-world',
    supports:
      'Grounds the continuing scale of long working hours and the policy relevance of reduced working time.',
    limits: 'Broad global report, not specific to AI workplaces.',
  },
  {
    id: 'algorithmic-management',
    label: 'Algorithmic management',
    title: 'Milanez, Lemmens, and Ruggiu, Algorithmic management in the workplace, OECD, 2025',
    href: 'https://www.oecd.org/en/publications/algorithmic-management-in-the-workplace_287c13c4-en.html',
    supports:
      'Grounds prevalence across six countries, management uses, and concerns about accountability, explainability, and worker health.',
    limits: 'Employer survey. Not every algorithmic management tool uses AI.',
  },
  {
    id: 'worker-consultation',
    label: 'Worker consultation',
    title: 'Milanez, Exploring win-win outcomes of algorithmic management, OECD, 2025',
    href: 'https://www.oecd.org/en/publications/2025/07/exploring-win-win-outcomes-of-algorithmic-management_88216705.html',
    supports:
      'Grounds the claim that consultation can change system design and job-quality outcomes.',
    limits: 'Laboratory experiment in three German manufacturing firms. Not universal evidence.',
  },
  {
    id: 'employment-ai-classification',
    label: 'Employment AI classification',
    title: 'European Union AI Act Service Desk, Annex III',
    href: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3',
    supports:
      'Grounds the classification of specified employment and worker-management uses as high-risk.',
    limits: 'Classification does not itself guarantee enforcement, justice, or worker power.',
  },
  {
    id: 'ai-act-timing',
    label: 'AI Act timing',
    title: 'European Union AI Act Service Desk, implementation timeline',
    href: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/eu-ai-act-implementation-timeline',
    supports:
      'Grounds the staged application timeline current on 8 August 2026, including the scheduled 2 December 2027 application of Annex III obligations.',
    limits:
      'Current legal implementation detail. Recheck if publication occurs after the audit date.',
  },
]);

const macroeconomicCautionSource: DirectSourceEntry = {
  id: 'macroeconomic-caution',
  label: 'Macroeconomic caution',
  title: 'Daron Acemoglu, The Simple Macroeconomics of AI, NBER, 2024',
  href: 'https://www.nber.org/papers/w32487',
  supports:
    'Grounds caution against extreme economy-wide productivity forecasts and the possibility of comparatively modest aggregate gains.',
  limits:
    'One macroeconomic model and estimate set, not final consensus or a workplace-level result.',
};

const directSourceById = new Map(
  [...directSourceEntries, macroeconomicCautionSource].map((entry) => [entry.id, entry]),
);

const selectDirectSources = (sourceIds: readonly string[]): readonly DirectSourceEntry[] =>
  Object.freeze(
    sourceIds.map((sourceId) => {
      const source = directSourceById.get(sourceId);
      if (!source) throw new Error(`Unknown Who Gets the Time Back source: ${sourceId}`);
      return source;
    }),
  );

export const orientationSourceEntries = selectDirectSources([
  'global-occupational-exposure',
  'current-empirical-synthesis',
  'measured-time-relief',
  'measured-workplace-productivity',
  'task-reorganization',
  'algorithmic-management',
  'worker-consultation',
  'employment-ai-classification',
  'ai-act-timing',
  'macroeconomic-caution',
  'working-time-standard',
  'working-time',
]);

export const everydaySourceEntries = selectDirectSources([
  'global-occupational-exposure',
  'current-empirical-synthesis',
  'measured-time-relief',
  'task-reorganization',
  'measured-workplace-productivity',
  'algorithmic-management',
]);

export const furtherReadingEntries: readonly FurtherReadingEntry[] = Object.freeze([
  {
    id: 'related-published-signal',
    title: 'Practice of Clarity, The Verification Tax: AI Helps, But We Still Check Everything',
    href: 'https://practiceofclarity.eu/en-us/signals/operational/work-delivery/integration-lag/the-verification-tax/',
    note: 'Connects the internal term “verification tax” to the published delivery-work signal.',
  },
  {
    id: 'macroeconomic-caution',
    title: 'Daron Acemoglu, The Simple Macroeconomics of AI, NBER, 2024',
    href: 'https://www.nber.org/papers/w32487',
    note: 'Deeper context for caution against extreme economy-wide productivity claims. One model and estimate set, not final consensus.',
  },
]);
