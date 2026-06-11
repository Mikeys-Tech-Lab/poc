import type { DirectSourceEntry, FurtherReadingEntry } from '../../../../types';

export const directSourceEntries: readonly DirectSourceEntry[] = Object.freeze([
  {
    id: 'continuous-integration-lineage',
    label: 'Integration discipline',
    title: 'Martin Fowler, Continuous Integration',
    href: 'https://martinfowler.com/articles/continuousIntegration.html',
    supports:
      'Provides software-practice lineage for integration as a repeated discipline supported by feedback, not merely a tool installation.',
    limits:
      'Continuous integration is technical integration. This signal applies the integration frame more broadly to understanding, assumptions, evidence, and accountable decisions.',
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
    id: 'developer-trust-gap',
    label: 'Trust gap',
    title: 'Stack Overflow Developer Survey 2025, AI',
    href: 'https://survey.stackoverflow.co/2025/ai',
    supports:
      'Grounds the field signal that many developers use or plan to use AI tools while trust in output accuracy remains limited.',
    limits:
      'Survey data describes respondents, not every developer or team. It supports the trust and verification pressure, not the whole integration lag concept.',
  },
  {
    id: 'ai-as-amplifier',
    label: 'Amplifier',
    title: 'DORA, State of AI-assisted Software Development 2025',
    href: 'https://dora.dev/research/2025/dora-report/',
    supports:
      'Supports the claim that AI amplifies existing organizational strengths and weaknesses rather than automatically fixing delivery systems.',
    limits:
      'DORA does not define integration lag. This signal applies the amplifier frame to shared understanding and delivery coherence.',
  },
  {
    id: 'ai-collaboration-friction',
    label: 'AI friction',
    title: 'Martin Fowler site, Patterns for Reducing Friction in AI-Assisted Development',
    href: 'https://martinfowler.com/articles/reduce-friction-ai/',
    supports:
      'Supports the claim that AI-assisted development works better when context, design, team standards, and feedback loops are made explicit before generation.',
    limits:
      'This is a compatible source hook, not the origin of Practice of Clarity terms or the integration lag concept.',
  },
  {
    id: 'ai-generated-code-security-risk',
    label: 'Security risk',
    title: 'Veracode, October 2025 Update: GenAI Code Security Report',
    href: 'https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/',
    supports:
      'Grounds the warning that AI-generated code can introduce risky flaws, so confidence needs checks rather than fluency.',
    limits:
      'Security findings do not mean every AI-generated output is unsafe. They support the need for bounded confidence and review.',
  },
]);

export const furtherReadingEntries: readonly FurtherReadingEntry[] = Object.freeze([]);
