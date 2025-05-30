/*
 * File: cypress.config.js
 * Project: job-ad
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
  defaultCommandTimeout: 4000,
  screenshotsFolder: './artifacts/screenshots/',
  videosFolder: './artifacts/videos/'
});