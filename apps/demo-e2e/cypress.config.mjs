import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset.js';
import { defineConfig } from 'cypress';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);

console.log(
  `cypress: task config being used -->`,
  process.env.NX_TASK_TARGET_CONFIGURATION
);
// nx will set some env vars based on the target it's running, one of those is the configuration being used.
// we can use that change some behaviors based on the configuration being used if so desired
// see: https://nx.dev/reference/environment-variables#environment-variables
export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: `yarn nx run demo:serve:${process.env.NX_TASK_TARGET_CONFIGURATION}`,
        production: `yarn nx run demo:serve-static:${process.env.NX_TASK_TARGET_CONFIGURATION}`,
      },
      ciWebServerCommand: 'yarn nx run demo:serve-static',
      ciBaseUrl: 'http://localhost:4200',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
