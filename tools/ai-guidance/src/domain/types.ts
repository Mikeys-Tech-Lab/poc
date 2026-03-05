export type CheckStatus = 'ok' | 'unknown' | 'mismatch' | 'error';

export interface CheckResult {
  readonly name: string;
  readonly status: CheckStatus;
  readonly version: string | null;
  readonly detail: string;
  readonly checkedAt: string;
}

export interface CapabilityReport {
  readonly title: string;
  readonly generatedAt: string;
  readonly checks: readonly CheckResult[];
  readonly manualChecklist: readonly string[];
}
