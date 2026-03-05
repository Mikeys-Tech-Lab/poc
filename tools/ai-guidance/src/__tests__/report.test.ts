import { describe, expect, it } from 'vitest';
import cursorFixture from '../__fixtures__/cursor-check-unknown.json';
import nodeFixture from '../__fixtures__/node-check-ok.json';
import { formatCheckLine, formatManualItem, renderReport } from '../domain/report.js';
import type { CapabilityReport, CheckResult } from '../domain/types.js';

describe('formatCheckLine', () => {
  it('formats an OK check', () => {
    const check = nodeFixture as CheckResult;
    const line = formatCheckLine(check);
    expect(line).toBe(
      '- **Node.js**: OK (version: 25.6.1) — Version confirmed via node --version.',
    );
  });

  it('formats an unknown check', () => {
    const check = cursorFixture as CheckResult;
    const line = formatCheckLine(check);
    expect(line).toContain('UNKNOWN');
    expect(line).toContain('version: unknown');
  });
});

describe('formatManualItem', () => {
  it('formats a checklist item', () => {
    expect(formatManualItem('Check Cursor version manually')).toBe(
      '- [ ] Check Cursor version manually',
    );
  });
});

describe('renderReport', () => {
  it('renders a complete report with checks and manual items', () => {
    const report: CapabilityReport = {
      title: 'Capability Alignment Report',
      generatedAt: '2026-03-01T00:00:00Z',
      checks: [nodeFixture as CheckResult, cursorFixture as CheckResult],
      manualChecklist: [
        'Verify Cursor version via Help > About',
        'Check Cursor AskQuestion tool availability',
      ],
    };

    const output = renderReport(report);
    expect(output).toContain('# Capability Alignment Report');
    expect(output).toContain('Generated: 2026-03-01T00:00:00Z');
    expect(output).toContain('## Checks');
    expect(output).toContain('**Node.js**: OK');
    expect(output).toContain('**Cursor IDE**: UNKNOWN');
    expect(output).toContain('## Manual checklist');
    expect(output).toContain('- [ ] Verify Cursor version');
    expect(output).toContain('Do not aggregate, rank, or attach to individuals.');
  });

  it('renders a report with no checks', () => {
    const report: CapabilityReport = {
      title: 'Empty Report',
      generatedAt: '2026-03-01T00:00:00Z',
      checks: [],
      manualChecklist: [],
    };

    const output = renderReport(report);
    expect(output).toContain('No automated checks were run.');
    expect(output).not.toContain('## Manual checklist');
  });
});
