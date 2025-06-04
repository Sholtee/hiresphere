/*
 * File: session.cy.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */

/* eslint-disable no-undef */
describe('Employer', () => {
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

  it('can edit its jobs', () => {
    cy.get('#app-frame > .head > .controls > .material-icons').should('have.text', 'account_circle').click();

    cy.get('input[type="text"]').should('have.focus').type('test@employer1.hu');
    cy.get('input[type="password"]').type('very secure password{enter}');
    cy.get('.job').eq(1).find('button.primary').click();

    cy.get('.job').find('button.primary').should('have.text', 'Edit');
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

  it('should get 404 on expired session', () => {
    cy.get('#app-frame > .head > .controls > .material-icons').should('have.text', 'account_circle').click();

    cy.get('input[type="text"]').should('have.focus').type('test@employer1.hu');
    cy.get('input[type="password"]').type('very secure password{enter}');

    cy.get('.job').should('exist');

    cy.clearCookies();

    cy.reload();
    cy.get('.not-found').should('exist');
  });
});