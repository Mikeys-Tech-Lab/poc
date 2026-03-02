import { runCommand } from "./run-command.js";
import { parseVersion } from "../domain/parse-version.js";
import type { CheckResult } from "../domain/types.js";

const now = () => new Date().toISOString();

export const checkNode = async (): Promise<CheckResult> => {
  try {
    const raw = await runCommand("node", ["--version"]);
    const version = parseVersion(raw);
    return {
      name: "Node.js",
      status: version ? "ok" : "unknown",
      version: version?.raw ?? null,
      detail: version
        ? "Version confirmed via node --version."
        : `Could not parse version from: ${raw}`,
      checkedAt: now(),
    };
  } catch (e) {
    return {
      name: "Node.js",
      status: "error",
      version: null,
      detail: e instanceof Error ? e.message : String(e),
      checkedAt: now(),
    };
  }
};

export const checkPnpm = async (): Promise<CheckResult> => {
  try {
    const raw = await runCommand("pnpm", ["--version"]);
    const version = parseVersion(raw);
    return {
      name: "pnpm",
      status: version ? "ok" : "unknown",
      version: version?.raw ?? null,
      detail: version
        ? "Version confirmed via pnpm --version."
        : `Could not parse version from: ${raw}`,
      checkedAt: now(),
    };
  } catch (e) {
    return {
      name: "pnpm",
      status: "error",
      version: null,
      detail: e instanceof Error ? e.message : String(e),
      checkedAt: now(),
    };
  }
};

export const checkCursor = (): CheckResult => ({
  name: "Cursor IDE",
  status: "unknown",
  version: null,
  detail:
    "No stable machine-readable source for Cursor version/capability data. Use manual checklist.",
  checkedAt: now(),
});
