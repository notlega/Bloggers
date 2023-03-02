const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // eslint-disable-next-line global-require
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    setupNodeEvents(on, config) {
      // eslint-disable-next-line global-require
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
  },
});
