/*
 * File: jobs.cy.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */

/* eslint-disable no-undef */
describe('Jobs view', () => {
  beforeEach(() => {
    cy.visit('/jobs');
  });

  it('can be accessed from the navbar', () => {
    cy.visit('/');

    cy.get('.welcome').should('exist');
    cy.get('a[href="/jobs"]').click();
    cy.get('.jobs').should('exist');
  });

  it('should load a new page if the user scrolls to the bottom', () => {
    cy.get('.job').should('have.length.gt', 0).then($jobsOld => {
      cy.get('.scrollable > .items').scrollTo('bottom');
      cy.get('.job').should('have.length.gt', $jobsOld.length);
    });
  });

  it('should provide search functionality', () => {
    cy.get('.job').should('have.length.gt', 1);
    cy.get('.job-or-company > input').type('Factory Machine Operator');
    cy.get('.search > button').click();
    cy.get('.job').should('have.length', 1).should('contain.text', 'Factory Machine Operator');
  });

  it('should auto-scroll to the top', () => {
    const firstJob = () => cy.get('.job').eq(0);

    firstJob().should('be.visible');
    cy.get('.fab-up').should('not.exist');

    cy.get('.scrollable > .items').scrollTo('bottom');
    firstJob().should('not.be.visible');

    cy.get('.fab-up').should('exist').click();
    firstJob().should('be.visible');
  });

  it('should navigate to the job detailer', () => {
    cy.get('.job:nth-of-type(1) button').should('have.text', 'More details').click();
    cy.url().should('match', /\/job\/\d+$/);
  });
});