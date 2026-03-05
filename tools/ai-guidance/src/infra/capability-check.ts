import { resolve } from 'node:path';
import { renderReport } from '../domain/report.js';
import type { CapabilityReport } from '../domain/types.js';
import { checkCursor, checkNode, checkPnpm } from './collect-checks.js';
import { writeReport } from './write-report.js';

const REPORT_PATH = resolve(import.meta.dirname, '../../../../docs/ai/capability-report.md');

const main = async () => {
  const checks = await Promise.all([checkNode(), checkPnpm()]);
  checks.push(checkCursor());

  const manualChecklist: string[] = [];

  for (const check of checks) {
    if (check.status === 'unknown') {
      manualChecklist.push(`Verify ${check.name} version/capabilities manually.`);
    }
  }

  const report: CapabilityReport = {
    title: 'Capability Alignment Report',
    generatedAt: new Date().toISOString(),
    checks,
    manualChecklist,
  };

  const content = renderReport(report);
  await writeReport(REPORT_PATH, content);
  console.log(`Capability report written to ${REPORT_PATH}`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
