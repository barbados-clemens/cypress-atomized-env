# Cypress Env Loading Example

When using ESM configuration files, include the file exentions in the import.
i.e.

```diff
+ import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset.js';
- import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
```
