import type { EssayRegister } from '../../lib/structural/essay-route';

export interface DirectSourceEntry {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly href: string;
  readonly supports: string;
  readonly limits: string;
}

export interface FurtherReadingEntry {
  readonly id: string;
  readonly title: string;
  readonly href: string;
  readonly note: string;
}

export interface EssayAnchor {
  readonly anchorId: string;
  readonly routeId: string;
  readonly targetRegister: EssayRegister;
  readonly href: string;
  readonly title: string;
  readonly signal: string;
  readonly question: string;
  readonly entryLabel: string;
}
