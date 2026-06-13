import type { DirectSourceEntry, FurtherReadingEntry } from '../../../../../types';

export const directSourceEntries: readonly DirectSourceEntry[] = Object.freeze([
  {
    id: 'continuous-integration-lineage',
    label: 'Integration discipline',
    title: 'Martin Fowler, Continuous Integration',
    href: 'https://martinfowler.com/articles/continuousIntegration.html',
    supports:
      'Anchors integration as repeated practice supported by feedback, not merely a tool or pipeline.',
    limits:
      'Continuous integration is technical integration. This signal applies the discipline more broadly to understanding, evidence, assumptions, and decision-making.',
  },
  {
    id: 'technical-debt-lineage',
    label: 'Hidden future cost',
    title: 'Martin Fowler, Technical Debt',
    href: 'https://martinfowler.com/bliki/TechnicalDebt.html',
    supports:
      'Supports the idea that hidden internal quality gaps create future cost and slow later change.',
    limits:
      'Technical debt is not identical to integration lag. Integration lag also includes trace, shared understanding, AI-generated output pressure, and decision accountability.',
  },
  {
    id: 'socio-technical-architecture',
    label: 'Socio-technical shape',
    title: "Martin Fowler, Conway's Law",
    href: 'https://martinfowler.com/bliki/ConwaysLaw.html',
    supports:
      'Supports the claim that software systems and human communication structures shape each other.',
    limits:
      "Conway's Law is a source hook for socio-technical awareness, not a complete explanation of integration lag.",
  },
  {
    id: 'ai-collaboration-friction',
    label: 'AI friction',
    title: 'Martin Fowler site, Patterns for Reducing Friction in AI-Assisted Development',
    href: 'https://martinfowler.com/articles/reduce-friction-ai/',
    supports:
      'Supports the shift from asking AI for output toward priming context, anchoring design, encoding team standards, and learning from feedback.',
    limits:
      'This is compatible lineage, not the origin of Practice of Clarity terms or the eight movements in this signal.',
  },
  {
    id: 'ai-as-amplifier',
    label: 'Amplifier',
    title: 'DORA, State of AI-assisted Software Development 2025',
    href: 'https://dora.dev/research/2025/dora-report/',
    supports:
      'Supports the claim that AI does not fix delivery systems by itself, but amplifies the underlying organizational system.',
    limits:
      'DORA does not define the eight movements in this signal. It supports the system-level framing.',
  },
  {
    id: 'refactoring-lineage',
    label: 'Small safe change',
    title: 'Martin Fowler, Refactoring',
    href: 'https://martinfowler.com/tags/refactoring.html',
    supports:
      'Supports the idea that safer change often happens through small, behavior-preserving steps rather than large speculative rewrites.',
    limits:
      'Refactoring is about code structure. This signal applies the incremental discipline more broadly to delivery understanding and AI-assisted work.',
  },
  {
    id: 'developer-trust-gap',
    label: 'Trust gap',
    title: 'Stack Overflow Developer Survey 2025, AI',
    href: 'https://survey.stackoverflow.co/2025/ai',
    supports:
      'Grounds the claim that AI use and AI distrust coexist in current developer practice.',
    limits:
      'Survey data does not explain every cause of distrust. This signal interprets it through delivery practice.',
  },
  {
    id: 'ai-generated-code-security-risk',
    label: 'Security risk',
    title: 'Veracode, October 2025 Update: GenAI Code Security Report',
    href: 'https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/',
    supports:
      'Supports the need for checks before confidence when generated code may introduce security flaws.',
    limits:
      'Security research supports risk awareness. It does not mean all generated code is wrong or unusable.',
  },
]);

export const furtherReadingEntries: readonly FurtherReadingEntry[] = Object.freeze([]);
