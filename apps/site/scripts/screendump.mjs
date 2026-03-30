import { spawn } from 'node:child_process';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { createServer } from 'node:net';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from '@playwright/test';

import {
  createScreendumpPlan,
  OUTPUT_DIRNAME,
  VIEWPORTS,
  zipFileName,
} from '../src/lib/screendump.js';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const siteDirectory = resolve(scriptDirectory, '..');
const workspaceDirectory = resolve(siteDirectory, '..', '..');
const distDirectory = resolve(workspaceDirectory, '.dist');
const outputDirectory = resolve(distDirectory, OUTPUT_DIRNAME);
const packageJsonPath = resolve(siteDirectory, 'package.json');

const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));

const runCommand = (command, args, options = {}) =>
  new Promise((resolveCommand, rejectCommand) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      ...options,
    });

    child.on('error', rejectCommand);
    child.on('exit', (code) => {
      if (code === 0) {
        resolveCommand();
        return;
      }

      rejectCommand(
        new Error(`${command} ${args.join(' ')} exited with code ${code ?? 'unknown'}`),
      );
    });
  });

const waitForServer = async (url, attempts = 50, delayMs = 200) => {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {}

    await delay(delayMs);
  }

  throw new Error(`Preview server did not become ready at ${url}`);
};

const nextFreePort = async (candidate) =>
  new Promise((resolvePort, rejectPort) => {
    const server = createServer();

    server.once('error', (error) => {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'EADDRINUSE') {
        resolvePort(nextFreePort(candidate + 1));
        return;
      }

      rejectPort(error);
    });

    server.once('listening', () => {
      const address = server.address();
      server.close(() => {
        if (!address || typeof address === 'string') {
          rejectPort(new Error('Could not resolve a free port'));
          return;
        }

        resolvePort(address.port);
      });
    });

    server.listen(candidate, '127.0.0.1');
  });

const startPreviewServer = async (port) => {
  const child = spawn('pnpm', ['preview', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: siteDirectory,
    stdio: 'ignore',
  });

  const url = `http://127.0.0.1:${port}/en-us/`;
  await waitForServer(url);

  return {
    child,
    url,
  };
};

const stopPreviewServer = async (child) => {
  if (child.exitCode !== null) {
    return;
  }

  child.kill('SIGTERM');

  await Promise.race([new Promise((resolveExit) => child.once('exit', resolveExit)), delay(2000)]);

  if (child.exitCode === null) {
    child.kill('SIGKILL');
  }
};

const readPackageVersion = async () => {
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
  return packageJson.version;
};

const ensureFreshDistDirectories = async () => {
  await rm(distDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });

  await Promise.all(
    Object.keys(VIEWPORTS).map((viewportName) =>
      mkdir(resolve(outputDirectory, viewportName), { recursive: true }),
    ),
  );
};

const zipSnapshots = async (zipPath) => {
  await rm(zipPath, { force: true });
  await runCommand('zip', ['-rq', zipPath, ...Object.keys(VIEWPORTS)], {
    cwd: outputDirectory,
  });
};

const captureScreenshots = async (plan) => {
  const browser = await chromium.launch({ headless: true });

  try {
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      for (const entry of plan.filter((item) => item.viewportName === viewportName)) {
        const context = await browser.newContext({ viewport });

        try {
          // Fresh storage per capture prevents register/theme state leaking across screenshots.
          await context.addInitScript(
            ({ register, theme }) => {
              window.localStorage.setItem('poc-register', register);
              window.localStorage.setItem('starlight-theme', theme);
            },
            { register: entry.register, theme: entry.theme.storageValue },
          );

          const page = await context.newPage();
          const targetPath = resolve(outputDirectory, viewportName, entry.fileName);
          await page.goto(entry.url, { waitUntil: 'networkidle' });
          await page.screenshot({ path: targetPath, fullPage: true });
          console.log(`${viewportName}/${entry.fileName}`);
        } finally {
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
};

const main = async () => {
  const version = await readPackageVersion();
  const zipPath = resolve(distDirectory, zipFileName(version));
  const port = await nextFreePort(4321);

  await runCommand('pnpm', ['build'], { cwd: siteDirectory });
  await ensureFreshDistDirectories();

  const preview = await startPreviewServer(port);

  try {
    const plan = createScreendumpPlan({ baseUrl: preview.url });
    await captureScreenshots(plan);
  } finally {
    await stopPreviewServer(preview.child);
  }

  await zipSnapshots(zipPath);

  console.log(`Screenshots: ${outputDirectory}`);
  console.log(`Archive: ${zipPath}`);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
