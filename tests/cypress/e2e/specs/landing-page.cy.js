/*
 * File: landing-page.cy.js
 * Project: job-ad
 *
 * Author: Denes Solti
 */

/* eslint-disable no-undef */
describe('Landing page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be the default without login', () => {
    cy
      .get('.welcome')
      .should('exist');
  });

  it('should contain a slide show', () => {
    cy.get('.slide-show').then(ss => {
      ss = cy.wrap(ss);

      ss.get('img').should('have.length.gt', 1);

      ss.get('img.visible').should('have.length', 1).then(originalImg => {
        ss.get('.material-icons').contains('arrow_forward_ios').click();

        cy.wrap(originalImg).should('not.have.class', 'visible');

        ss.get('img.visible').should('have.length', 1).then(newImage => {
          expect(originalImg.attr('src')).not.to.equal(newImage.attr('src'));
        });
      });
    });
  });
});