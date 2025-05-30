/*
 * File: theme.cy.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */

/* eslint-disable no-undef */
describe('Theme', () => {
  it('can be dark', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        // Stub matchMedia to simulate dark mode
        cy.stub(win, 'matchMedia').callsFake(query => ({
          matches: query === '(prefers-color-scheme: dark)'
        }));
      }
    });

    cy
      .get('#app')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(44, 44, 44)');

    cy.get('label[for="dark-mode"]').click();

    cy
      .get('#app')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(250, 250, 250)');
  });
});