const { defineConfig } = require("cypress");
const {addCucumberPreprocessorPlugin} = require("@badeball/cypress-cucumber-preprocessor");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  projectId: "2g3191",

  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature",
    baseUrl: "https://telnyx.com/",
    defaultCommandTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true,
    watchForFileChanges: false,
    scrollBehavior: "center",
    includeShadowDom: true,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      const preprocessor =
        createEsbuildPlugin.default || createEsbuildPlugin;

      on(
        "file:preprocessor",
        createBundler({
          plugins: [preprocessor(config)],
        })
      );

      return config;
    },
  },
});
