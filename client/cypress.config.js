const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      HOME_URL: 'http://localhost:3000/app/home/1',
    },
    baseUrl: 'http://localhost:3000/'
  },
});
