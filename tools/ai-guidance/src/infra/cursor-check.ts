import { resolve } from 'node:path';
import { renderReport } from '../domain/report.js';
import type { CapabilityReport } from '../domain/types.js';
import { checkCursor } from './collect-checks.js';
import { writeReport } from './write-report.js';

const REPORT_PATH = resolve(import.meta.dirname, '../../../../docs/ai/cursor-state.md');

const main = async () => {
  const cursorCheck = checkCursor();

  const report: CapabilityReport = {
    title: 'Cursor Capability State',
    generatedAt: new Date().toISOString(),
    checks: [cursorCheck],
    manualChecklist: [
      'Verify Cursor version via Help > About',
      'Check if AskQuestion tool is available in current Cursor build',
      'Check if Plan mode is available in current Cursor build',
      'Check if project skills (.cursor/skills/) are supported',
      'Check if .mdc rule format is supported',
    ],
  };

  const content = renderReport(report);
  await writeReport(REPORT_PATH, content);
  console.log(`Cursor state report written to ${REPORT_PATH}`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
