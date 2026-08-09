import type { EssayRegister } from '../../../../../lib/structural/who-gets-the-time-back-route';
import {
  buildEssayHref,
  ESSAY_ROUTE_ID,
} from '../../../../../lib/structural/who-gets-the-time-back-route';
import type { EssayAnchor } from '../../../../structural/types';

const makeAnchor = (
  anchorId: string,
  targetRegister: EssayRegister,
  title: string,
  signal: string,
  question: string,
  entryLabel: string,
): EssayAnchor => ({
  anchorId,
  routeId: ESSAY_ROUTE_ID,
  targetRegister,
  href: buildEssayHref(targetRegister),
  title,
  signal,
  question,
  entryLabel,
});

export const essayAnchors: readonly EssayAnchor[] = Object.freeze([
  makeAnchor(
    'when-ai-saves-time',
    'everyday',
    'When AI saves time',
    'Who Gets the Time Back?',
    'Does saved time become rest, care, learning, or just more work?',
    'Start with the pressure',
  ),
  makeAnchor(
    'when-productivity-sounds-too-clean',
    'orientation',
    'When productivity sounds too clean',
    'Who Gets the Time Back?',
    'Who measured the gain, and what costs were left out?',
    'Build the context',
  ),
  makeAnchor(
    'when-ai-enters-the-workplace',
    'practitioner',
    'When AI enters the workplace',
    'Who Gets the Time Back?',
    'What rights do workers have before, during, and after deployment?',
    'See the source hooks',
  ),
  makeAnchor(
    'when-the-dashboard-looks-good-but-people-feel-worse',
    'everyday',
    'When the dashboard looks good but people feel worse',
    'Who Gets the Time Back?',
    'Did output improve while bodies absorbed the cost?',
    'Start with the pressure',
  ),
  makeAnchor(
    'when-juniors-disappear',
    'practitioner',
    'When juniors disappear',
    'Who Gets the Time Back?',
    'Is AI raising the floor, or cutting the ladder into skilled work?',
    'See the source hooks',
  ),
  makeAnchor(
    'when-ai-becomes-the-manager',
    'orientation',
    'When AI becomes the manager',
    'Who Gets the Time Back?',
    'Is the system assisting workers, or monitoring and directing them?',
    'Build the context',
  ),
  makeAnchor(
    'when-saved-time-becomes-hidden-work',
    'practitioner',
    'When saved time becomes hidden work',
    'Who Gets the Time Back?',
    'Who performs the verification, repair, and documentation labor?',
    'See the source hooks',
  ),
  makeAnchor(
    'when-leaders-promise-efficiency',
    'everyday',
    'When leaders promise efficiency',
    'Who Gets the Time Back?',
    'Who gets the time back?',
    'Start with the pressure',
  ),
]);
