import { execFile } from 'node:child_process';

export const runCommand = (command: string, args: readonly string[]): Promise<string> =>
  new Promise((resolve, reject) => {
    execFile(command, [...args], { timeout: 10_000 }, (error, stdout) => {
      if (error) {
        reject(new Error(`Command failed: ${command} ${args.join(' ')} — ${error.message}`));
        return;
      }
      resolve(stdout.trim());
    });
  });
