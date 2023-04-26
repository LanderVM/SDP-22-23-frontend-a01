describe('track order', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should track correct order', () => {
    cy.visit('http://localhost:3000/track');
    cy.get('[data-cy=trackingCode_input]').eq(0).type('322228968778');
    cy.get('[data-cy=extraVerification_input]').eq(0).type('2');
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=status_steps]').should('be.visible');
  });

  it('should track two correct orders', () => {
    cy.visit('http://localhost:3000/track');
    cy.get('[data-cy=trackingCode_input]').eq(0).type('322228968778');
    cy.get('[data-cy=extraVerification_input]').eq(0).type('2');
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=status_steps]').should('be.visible');
    cy.wait(500);
    cy.get('[data-cy=trackDifferentOrder_button]').eq(0).click();
    cy.get('[data-cy=trackingCode_input]').eq(0).clear().type('testprefixS0CYTUZ6AA8MM');
    cy.get('[data-cy=extraVerification_input]').eq(0).clear().type('9000');
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=status_steps]').should('be.visible');
  });

  it('should get error on nonexistent order', () => {
    cy.visit('http://localhost:3000/track');
    cy.get('[data-cy=trackingCode_input]').eq(0).type('322228968778');
    cy.get('[data-cy=extraVerification_input]').eq(0).type('222222');
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=error]').should('be.visible');
  });

  it('should not be able to track without both input fields filled in', () => {
    cy.visit('http://localhost:3000/track');
    cy.get('[data-cy=trackingCode_input]').eq(0).type('322228968778');
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=status_steps]').should('not.exist');
  });

  it('should get error on non-numerical verification code', () => {
    cy.visit('http://localhost:3000/track');
    cy.get('[data-cy=trackingCode_input]').eq(0).type('322228968778');
    cy.get('[data-cy=extraVerification_input]').eq(0).type('2a');
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=error]').should('be.visible');
  });

  it('should get error on negative verification code', () => {
    cy.visit('http://localhost:3000/track');
    cy.get('[data-cy=trackingCode_input]').eq(0).type('322228968778');
    cy.get('[data-cy=extraVerification_input]').eq(0).type('-2');
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=error]').should('be.visible');
  });
});
