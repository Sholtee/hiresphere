/*
 * File: cypress.config.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */

import {resolve} from 'path';

import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: {
    supportFile: resolve('./tests/cypress/support/e2e.js'),
    specPattern: ['tests/cypress/e2e/specs/**/*.cy.js'],
    baseUrl: 'http://localhost:4173'
  },
  reporter: 'mocha-junit-reporter',
  reporterOptions: {
    mochaFile: './artifacts/cypress/test-results.xml',
    toConsole: false
  },
  defaultCommandTimeout: 4000,
  screenshotsFolder: './artifacts/cypress/screenshots/',
  videosFolder: './artifacts/cypress/videos/'
});