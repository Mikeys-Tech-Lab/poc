import type { EssayRegister } from '../../../../../lib/structural/essay-route';
import { buildEssayHref, ESSAY_ROUTE_ID } from '../../../../../lib/structural/essay-route';
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
    'ai-threatens-work',
    'everyday',
    'When AI Threatens Work',
    'Job fear, automation pressure, layoffs, deskilling, and management control.',
    'If AI saves time, who gets the time back?',
    'Start with the fear',
  ),
  makeAnchor(
    'ai-feels-like-theft',
    'orientation',
    'When AI Feels Like Theft',
    'Copyright lawsuits, training data anger, creator anxiety, scraping, attribution, and consent.',
    'Who gets to turn human work into a product, and who gets asked?',
    'Build the context',
  ),
  makeAnchor(
    'ai-costs-feel-invisible',
    'orientation',
    'What Does AI Cost If It Feels Invisible?',
    'Data centers, electricity, water, land, chips, grids, cooling, public subsidy, and local pressure.',
    'Where does the machine touch the ground?',
    'Build the context',
  ),
  makeAnchor(
    'ai-safety-filter',
    'orientation',
    'When AI Safety Sounds Like A Filter',
    'Chatbot filters, harmful content, moderation, safety teams, red teaming, and product trust claims.',
    'Can the system be inspected, challenged, and stopped?',
    'Build the context',
  ),
  makeAnchor(
    'ai-public-services',
    'practitioner',
    'When AI Enters Public Services',
    'Welfare systems, hiring tools, border systems, insurance risk scoring, health care triage, and appeal barriers.',
    'If a system affects your life, can you appeal it?',
    'See the source hooks',
  ),
  makeAnchor(
    'ai-faster-pressure',
    'everyday',
    'When AI Makes Work Faster And More Pressured',
    'Speedup, dashboards, automated monitoring, output targets, summarization at scale, and productivity claims.',
    'Faster for whom, and under whose rules?',
    'Start with the pressure',
  ),
  makeAnchor(
    'ai-regulation-innovation',
    'practitioner',
    'When Regulation Gets Called Anti-Innovation',
    'AI Act debate, codes of practice, compliance language, startup burden claims, corporate lobbying, and innovation rhetoric.',
    'If there are no public rules, who writes the private ones?',
    'See the source hooks',
  ),
  makeAnchor(
    'ai-feels-like-magic',
    'everyday',
    'When AI Feels Like Magic',
    'Awe, speed, productivity demos, agent hype, future language, and tools that feel more capable than expected.',
    'What labor, data, infrastructure, and decisions made this feel like magic?',
    'Start with demystification',
  ),
]);
