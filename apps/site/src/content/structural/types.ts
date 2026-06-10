import type { EssayRegister } from '../../lib/structural/essay-route';

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
