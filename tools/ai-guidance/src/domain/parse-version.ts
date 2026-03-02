export interface VersionInfo {
  readonly raw: string;
  readonly major: number;
  readonly minor: number;
  readonly patch: number;
}

const VERSION_PATTERN = /(\d+)\.(\d+)\.(\d+)/;

export const parseVersion = (raw: string): VersionInfo | null => {
  const match = VERSION_PATTERN.exec(raw.trim());
  if (!match) return null;
  return {
    raw: match[0],
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
};
