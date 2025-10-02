import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl:"https://jevgenia.dev.noseryoung.ch",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
