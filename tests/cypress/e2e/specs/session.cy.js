/*
 * File: session.cy.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */

/* eslint-disable no-undef */
describe('User', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookies();
  });

  it('can log in', () => {
    cy.get('.welcome').should('exist');
    cy.get('#app-frame > .head > .controls > .material-icons').should('have.text', 'account_circle').click();
    cy.url().should('match', /\/login$/);

    cy.get('input[type="text"]').should('have.focus').type('test@employer1.hu');
    cy.get('input[type="password"]').type('very secure password{enter}');
    cy.url().should('match', /\/yourjobs$/);
    cy.get('.jobs').should('exist');

    cy.getCookie('fake-session').should('exist');
  });

  it('can log out', () => {
    cy.get('#app-frame > .head > .controls > .material-icons').should('have.text', 'account_circle').click();

    cy.get('input[type="text"]').should('have.focus').type('test@employer1.hu');
    cy.get('input[type="password"]').type('very secure password{enter}');

    cy.get('#app-frame > .head > .controls > .material-icons').should('have.text', 'login').click();
    cy.url().should('match', /\/welcome$/);
    cy.get('.welcome').should('exist');

    cy.getCookie('fake-session').should('not.exist');
  });
});