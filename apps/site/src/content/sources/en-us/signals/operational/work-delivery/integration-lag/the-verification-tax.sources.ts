import type { DirectSourceEntry, FurtherReadingEntry } from '../../../../../types';

export const directSourceEntries: readonly DirectSourceEntry[] = Object.freeze([
  {
    id: 'current-developer-ai-adoption',
    label: 'Developer adoption',
    title: 'JetBrains, State of Developer Ecosystem 2025, Artificial Intelligence',
    href: 'https://devecosystem-2025.jetbrains.com/artificial-intelligence',
    supports:
      'Supports the wider field signal that AI is already part of developer workflows and tool ecosystems.',
    limits:
      'Vendor ecosystem research should be treated as a field signal, not neutral proof of every team practice.',
  },
  {
    id: 'developer-trust-gap',
    label: 'Trust gap',
    title: 'Stack Overflow Developer Survey 2025, AI',
    href: 'https://survey.stackoverflow.co/2025/ai',
    supports:
      'Grounds the claim that many developers use or plan to use AI tools while trust in output accuracy remains low.',
    limits:
      'Survey data describes respondents, not every developer or team. It supports the trust and verification pressure, not the whole Practice of Clarity framing.',
  },
  {
    id: 'ai-generated-code-security-risk',
    label: 'Security risk',
    title: 'Veracode, October 2025 Update: GenAI Code Security Report',
    href: 'https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/',
    supports:
      'Grounds the claim that AI-generated code can introduce security risk and that checks remain necessary before production confidence.',
    limits:
      'Veracode is a security vendor and the report is security-focused. It does not mean all AI-generated code is unsafe or unusable.',
  },
  {
    id: 'ai-collaboration-friction',
    label: 'AI friction',
    title: 'Martin Fowler site, Patterns for Reducing Friction in AI-Assisted Development',
    href: 'https://martinfowler.com/articles/reduce-friction-ai/',
    supports:
      'Provides a software-practice source hook for context priming, design-first collaboration, context anchoring, encoded team standards, and the Frustration Loop where time saved by generation is consumed by correction.',
    limits:
      'This is compatible lineage, not the origin of this practice. Do not present it as Practice of Clarity authority.',
  },
  {
    id: 'ai-as-amplifier',
    label: 'Amplifier',
    title: 'DORA, State of AI-assisted Software Development 2025',
    href: 'https://dora.dev/research/2025/dora-report/',
    supports:
      'Supports the claim that AI amplifies existing organizational strengths and weaknesses, and that returns depend on the underlying system rather than tools alone.',
    limits:
      'DORA does not define the verification tax. This article applies the amplifier finding to AI-assisted delivery confidence.',
  },
]);

export const furtherReadingEntries: readonly FurtherReadingEntry[] = Object.freeze([
  {
    id: 'continuous-integration-lineage',
    title: 'Martin Fowler, Continuous Integration',
    href: 'https://martinfowler.com/articles/continuousIntegration.html',
    note: 'Lineage for integration as repeated discipline and feedback, useful as contrast with integration of understanding.',
  },
  {
    id: 'technical-debt-lineage',
    title: 'Martin Fowler, Technical Debt',
    href: 'https://martinfowler.com/bliki/TechnicalDebt.html',
    note: 'Lineage for hidden internal costs that surface later when teams move without maintaining quality and understanding.',
  },
]);
