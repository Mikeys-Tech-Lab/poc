import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export const writeReport = async (path: string, content: string): Promise<void> => {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, 'utf-8');
};
