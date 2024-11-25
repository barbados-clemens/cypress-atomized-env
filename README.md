# Cypress Env Loading Example

Here is an example to load different environment variables based on the configuration of a project being used.
i.e. when serving the app for e2e you want to use a specific set of env vars, but when serving the app for local dev, use different ones.

## How it works

Nx automatically has a environment file loading logic, You can see the rules in the docs: https://nx.dev/recipes/tips-n-tricks/define-environment-variables

Simply put, the more specific the environment file, load first and those coming after will not override the variables set in the previous files.

So we can have a file in the project root called `.env` which will load the normal day to day dev env vars needed for the app.
Then when we run e2e tests, we can add a specific e2e serve env file `.env.serve.cypress`, which will load the e2e specific env vars first. usually a good idea to commit this file if the values contain non sensitive values. (i.e. mock api keys, and test values)

We then use the `NX_TASK_TARGET_CONFIGURATION` env var in the cypress config to pass through the configuration value into the underlying app serve command.

The configuration has to exist so, so even if nothing changes for the configuration name you can leave the configuration value blank.

Just make sure you set the configuration value in CI as well, and/or set the desired env vars in the CI environment before running Nx.

## Notes:

This when using .mjs for the cypress config, there is an issue where the deep import of the package isn't able to resolve. For now we apply a patch to define an `exports` on the `@nx/cypress` package. See [`.yarn/patches/@nx-cypress`](.yarn/patches/@nx-cypress-npm-20.1.2-383fe671e4.patch) for the patch details.

Because of yarn PnP strictness, we have to include any sub packages in the root package.json that will be called during the running of cypress, such as the webpack, webpack-dev-server, and webpack-cli.
