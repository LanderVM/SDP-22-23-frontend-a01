describe('track & trace tests', () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-cy=test-navbar-track&trace]').click();
  })

  it('should go to the track & trace page', () => {
    cy.url().should('include', '/track');
  })
});