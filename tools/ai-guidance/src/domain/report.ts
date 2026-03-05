import type { CapabilityReport, CheckResult } from './types.js';

export const formatCheckLine = (check: CheckResult): string => {
  const version = check.version ?? 'unknown';
  const statusLabel =
    check.status === 'ok'
      ? 'OK'
      : check.status === 'unknown'
        ? 'UNKNOWN'
        : check.status === 'mismatch'
          ? 'MISMATCH'
          : 'ERROR';
  return `- **${check.name}**: ${statusLabel} (version: ${version}) — ${check.detail}`;
};

export const formatManualItem = (item: string): string => `- [ ] ${item}`;

export const renderReport = (report: CapabilityReport): string => {
  const lines: string[] = [
    `# ${report.title}`,
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Checks',
    '',
  ];

  if (report.checks.length === 0) {
    lines.push('No automated checks were run.');
  } else {
    for (const check of report.checks) {
      lines.push(formatCheckLine(check));
    }
  }

  lines.push('');

  if (report.manualChecklist.length > 0) {
    lines.push('## Manual checklist');
    lines.push('');
    lines.push('The following items could not be checked automatically. Verify manually:');
    lines.push('');
    for (const item of report.manualChecklist) {
      lines.push(formatManualItem(item));
    }
    lines.push('');
  }

  lines.push(
    '---',
    '',
    'This report is for local operator alignment only.',
    'Do not aggregate, rank, or attach to individuals.',
    '',
  );

  return lines.join('\n');
};
