const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      URL: 'http://localhost:3000/app/home/1',
      POST_GAME_URL: 'http://localhost:3000/app/post',
      LANDING_PAGE_URL: 'http://localhost:3000/'
    }
  },
});
