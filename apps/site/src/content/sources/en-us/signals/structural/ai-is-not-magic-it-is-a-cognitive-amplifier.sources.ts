import type { DirectSourceEntry, FurtherReadingEntry } from '../../../../types';

export const directSourceEntries: readonly DirectSourceEntry[] = Object.freeze([
  {
    id: 'ai-act-definition',
    label: 'Definition',
    title: 'Regulation (EU) 2024/1689, Article 3(1)',
    href: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
    supports:
      'Defines an AI system as a machine-based system that can infer how to generate outputs such as predictions, content, recommendations, or decisions.',
    limits:
      'A legal definition gives a useful baseline. It does not by itself explain the social, labor, infrastructure, or governance questions raised by AI.',
  },
  {
    id: 'stanford-ai-index-public-opinion',
    label: 'Public fear',
    title: 'Stanford HAI 2026 AI Index, Public Opinion',
    href: 'https://hai.stanford.edu/ai-index/2026-ai-index-report/public-opinion',
    supports:
      'Grounds the claim that many people expect AI to reduce jobs and that job fear is a real public concern.',
    limits:
      'The cited figure is public opinion data. It measures expectation and anxiety, not a guaranteed future labor outcome.',
  },
  {
    id: 'pew-workplace-worry',
    label: 'Workplace worry',
    title:
      'Pew Research Center, U.S. workers are more worried than hopeful about future AI use in the workplace',
    href: 'https://www.pewresearch.org/social-trends/2025/02/25/u-s-workers-are-more-worried-than-hopeful-about-future-ai-use-in-the-workplace/',
    supports:
      'Supports the claim that workplace anxiety about future AI use is widespread and not limited to technical specialists.',
    limits:
      'The survey is U.S.-centered. It describes worker attitudes and expectations, not global outcomes.',
  },
  {
    id: 'ilo-genai-jobs-update',
    label: 'Labor transformation',
    title: 'International Labour Organization, 2025 GenAI jobs update',
    href: 'https://www.ilo.org/resource/news/one-four-jobs-risk-being-transformed-genai-new-ilo%E2%80%93nask-global-index-shows',
    supports:
      'Grounds the distinction between occupational exposure to generative AI and simple job replacement.',
    limits:
      'Exposure is not the same as displacement or harm. Workplace outcomes depend on ownership, law, policy, and worker power.',
  },
  {
    id: 'iea-energy-and-ai',
    label: 'Material infrastructure',
    title: 'International Energy Agency, Energy and AI',
    href: 'https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai',
    supports:
      'Grounds the claim that data centers are projected to use much more electricity by 2030 and that AI is one driver of that growth.',
    limits:
      'The projection refers to data centers overall, not AI alone. It should ground material concern without turning every AI use into the same infrastructure claim.',
  },
  {
    id: 'ap-meta-publisher-lawsuit',
    label: 'Copyright dispute',
    title: 'Associated Press, major publishers sue Meta over AI training',
    href: 'https://apnews.com/article/5609846d4d840014974a847b01079c32',
    supports:
      'Grounds the claim that AI training is part of a live conflict over ownership, consent, extraction, and fair use.',
    limits:
      'The lawsuit is active. Allegations reported by AP are not legal findings, and Meta disputes the claims.',
  },
  {
    id: 'ec-gpai-code-of-practice',
    label: 'Governance',
    title: 'European Commission, General-Purpose AI Code of Practice',
    href: 'https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai',
    supports:
      'Shows that AI governance around transparency, copyright, safety, and security is already a live legal and political terrain.',
    limits:
      'Regulatory movement does not prove justice or effectiveness. A code can still be weak, late, technical, or shaped by industry pressure.',
  },
  {
    id: 'nist-ai-rmf-documentation',
    label: 'Trace and accountability',
    title: 'NIST AI Risk Management Framework 1.0 and AI Resource Center',
    href: 'https://airc.nist.gov/airmf-resources/airmf/5-sec-core/',
    supports:
      'Supports the narrower claim that documentation, transparency, human review, and accountability are necessary parts of trustworthy AI governance.',
    limits:
      'NIST does not make the full political demand for public reasoning trace. That broader demand is the article synthesis.',
  },
]);

export const furtherReadingEntries: readonly FurtherReadingEntry[] = Object.freeze([
  {
    id: 'eubanks-automating-inequality',
    title: 'Virginia Eubanks, Automating Inequality',
    href: 'https://virginia-eubanks.com/automating-inequality/',
    note: 'A deeper context entry for data systems that profile, police, and punish poor and working-class people.',
  },
  {
    id: 'noble-algorithms-of-oppression',
    title: 'Safiya Umoja Noble, Algorithms of Oppression',
    href: 'https://nyupress.org/9781479837243/algorithms-of-oppression/',
    note: 'A deeper context entry for search infrastructures, racism, sexism, and public knowledge systems.',
  },
  {
    id: 'benjamin-race-after-technology',
    title: 'Ruha Benjamin, Race After Technology',
    href: 'https://www.ruhabenjamin.com/race-after-technology',
    note: 'A deeper context entry for technologies that can reproduce racial hierarchy under neutral language.',
  },
  {
    id: 'kellogg-algorithmic-control',
    title: 'Kellogg, Valentine, and Christin on algorithms at work',
    href: 'https://journals.aom.org/doi/10.5465/annals.2018.0174',
    note: 'A deeper context entry for algorithmic control, management, and workplace power.',
  },
  {
    id: 'selbst-fairness-abstraction-traps',
    title: 'Selbst et al., Fairness and Abstraction in Sociotechnical Systems',
    href: 'https://dl.acm.org/doi/10.1145/3287560.3287598',
    note: 'A deeper context entry for why abstract fairness work can miss social and institutional conditions.',
  },
  {
    id: 'raji-actionable-auditing',
    title: 'Raji et al., Closing the AI Accountability Gap',
    href: 'https://dl.acm.org/doi/10.1145/3306618.3314244',
    note: 'A deeper context entry for auditing and accountability gaps around automated systems.',
  },
]);
