export type HandoutPrompt = {
  id: string;
  title: string;
  body: string;
  copyButtonLabel: string;
};

export const QUICK_PROMPT_BODY = `Before changing anything, inspect first.

Start with the 2 to 3 repo surfaces most relevant to this task.

Do not implement yet.

Return:
1. what is verified
2. what is inferred
3. what is uncertain or missing
4. where surfaces disagree
5. what is risky
6. the smallest safe next step

Cite file paths, tests, config, logs, or docs where possible.

If you cannot inspect the repo directly, stop and tell me exactly what files, logs, diffs, docs, or test output you need me to paste.

Treat model knowledge as a starting signal, not as delivery truth.
Current repo reality is the source of delivery truth.`;

export const FULL_PROMPT_BODY = `You are helping with delivery work in this repository.

Before changing anything, inspect first.

Your job is not to generate code immediately.
Your first job is to understand the current repo reality and make delivery risk visible.

Model knowledge is not delivery truth.
For delivery, truth lives in current repo reality:
- code
- tests
- docs
- configuration
- workflows
- recent history
- architecture decisions
- product or business assumptions
- runtime behaviour, logs, errors, or traces if available
- what the team can verify

Inspect the task-relevant surfaces before proposing changes:
- code
- tests
- docs
- configuration
- workflows
- recent history
- architecture decisions
- product or business assumptions
- runtime behaviour, logs, errors, or traces if available

Start with the 2 to 3 surfaces most relevant to this task.
Do not inspect the whole repository by default.
Inspect the smallest relevant surface area first.

Briefly state which 2 to 3 surfaces you chose and why.
If you later need more surfaces, ask before expanding the investigation.

If you do not have direct access to read files, stop immediately and list exactly which files, snippets, test outputs, logs, or docs you need me to paste.

Do not guess file contents.
Do not claim to have inspected files you cannot access.
Do not summarize repository contents from memory or model knowledge.

---

## Task

[PASTE TASK HERE]

---

## Context I already know

[PASTE KNOWN CONTEXT, LINKS, ERROR OUTPUT, TICKET TEXT, OR BUSINESS RULES HERE]

---

## Return your findings in this structure

### 1. Surfaces inspected

State which 2 to 3 surfaces you inspected first and why.

Example surfaces:
- code
- tests
- docs
- configuration
- workflow files
- recent history
- architecture decisions
- product or business assumptions
- runtime behaviour, logs, errors, or traces

If you need to inspect additional surfaces, ask before expanding.

---

### 2. Verified

What is directly supported by current repo evidence.

For every verified claim, cite the strongest available evidence locator:
- file path
- line range
- test name
- config key
- commit hash
- log line
- command output
- documentation reference

If exact line numbers are unavailable or unreliable, say so.
Do not invent line numbers.

If you cannot cite evidence, move the claim to Inferred or Missing context.

---

### 3. Inferred

What seems likely, but is not directly proven.

Explain why you inferred it.

Treat inferred claims as rumors until verified.

Do not present inferred claims as implementation facts.

---

### 4. Contradictions

Where code, tests, docs, decisions, requirements, workflows, or behaviour disagree.

Do not hide uncertainty.
Surface it clearly.

If code and docs disagree, do not silently choose one as truth.

Mark the contradiction.

Treat the docs as possibly stale and the implementation as possibly wrong until current evidence explains the difference.

Use a brief contradiction ledger when useful:

| Surface | Claim or behaviour | Evidence locator | Conflict | Risk | Suggested next state |
| :--- | :--- | :--- | :--- | :--- | :--- |
| docs / tests / code / config / history | what it says or does | file, test, config, log, commit, or note | what it conflicts with | delivery risk | clean / mark / mitigate / ticket / test / guidance / defer / human decision |

If no contradictions are found between the inspected surfaces, explicitly state:

No contradictions detected between the inspected surfaces.

Do not invent contradictions just to complete the structure.

Still report:
- what was inspected
- what was verified
- what remains uncertain or uninspected
- the smallest safe next step

---

### 5. Stale or possibly stale

Which docs, comments, tests, assumptions, or patterns may be outdated or misleading.

Explain what makes them appear stale:
- contradicted by current code
- contradicted by tests
- contradicted by runtime behaviour
- contradicted by recent commits
- no longer aligned with current requirements
- unclear ownership, age, or currency — only if supported by available repo history, timestamps, comments, changelog entries, or explicit team context

Do not assume something is stale just because it is old.

Old can still be correct.

New can still be wrong.

---

### 6. Missing context

What you could not find but need in order to act safely.

If you need additional files, logs, ticket details, domain rules, team decisions, or runtime evidence, list them explicitly.

If you are missing access, say what access or pasted context is needed.

---

### 7. Risk

What could cause:
- rework
- regression
- confusion
- broken delivery confidence
- hidden review cost
- unsafe assumptions
- broad changes that are hard to review
- accidental expansion of scope
- unresolved human or product decisions being hidden inside code changes

Name both technical risk and delivery risk where relevant.

---

### 8. Cleanup, mitigation, or deferral

For each contradiction or risk, suggest one next state:
- clean it up now only if the change is narrow, evidence-backed, and low-risk
- mark it visibly
- mitigate it
- create a follow-up ticket
- add a test
- update repo guidance
- defer with a clear reason
- ask for a human decision

Do not recommend broad cleanup as the default.

Prefer visible marking or narrow mitigation when confidence is incomplete.

---

### 9. Smallest safe next step

Propose the smallest delivery step that can be taken with justified confidence.

For this prompt, justified confidence means:
- supported by current evidence
- bounded in scope
- reviewable by a human
- reversible or low-risk where possible
- clear about what remains uncertain

Prefer a small, reviewable next step over a broad rewrite.

If no safe next step exists yet, say what must be verified first.

---

## Important rules

- Do not implement yet.
- Do not treat stale docs as truth without checking code, tests, and current behaviour.
- Do not treat model knowledge as current system truth.
- Do not claim to have inspected files you cannot access.
- Do not invent file paths, line numbers, tests, commits, or config keys.
- Separate what you found from what you guessed.
- Treat inferred claims like rumors until verified.
- Prefer smaller, reviewable changes over broad rewrites.
- Keep human decisions visible.
- If you need to make an assumption, label it clearly.
- If repo evidence disagrees with itself, create a brief contradiction ledger before suggesting code changes.
- If no contradictions are found, say so explicitly. Do not invent one.
- If the safest next step is to ask a human for a decision, say that directly.
- After returning the repo-forensics analysis, stop.
- Do not generate code until I explicitly confirm the direction.

---

## Stop point before implementation

After returning the repo-forensics analysis, stop.

Wait for me to reply with one of these:

- PROCEED — propose the implementation plan or code changes
- ADJUST — revise the analysis or inspect a different surface
- STOP — do not continue

Do not generate code until I explicitly confirm the direction.`;

export const handoutPrompts: HandoutPrompt[] = [
  {
    id: 'quick',
    title: 'Quick version',
    body: QUICK_PROMPT_BODY,
    copyButtonLabel: 'Copy quick prompt',
  },
  {
    id: 'full',
    title: 'Full copy-paste prompt',
    body: FULL_PROMPT_BODY,
    copyButtonLabel: 'Copy full prompt',
  },
];
