const exampleTrackingInfo = [
  {
    trackingCode: '322228968778',
    verificationCode: '2',
  },
  {
    trackingCode: 'bpost_S0CYTUZ6AA8MM',
    verificationCode: '9000',
  },
]

describe('track order', () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/notifications/fiveMostRecent",
      { fixture: 'fiveMostRecentNotifications.json' }
    );
    cy.intercept(
      "GET",
      "http://localhost:9000/api/notifications/amountNotRead",
      { fixture: 'amountNotReadNotifications.json' }
    );
    cy.login();
  });

  it('should track correct order', () => {
    cy.visit('http://localhost:3000/track');
    cy.get('[data-cy=trackingCode_input]').eq(0).type(exampleTrackingInfo[0].trackingCode);
    cy.get('[data-cy=extraVerification_input]').eq(0).type(exampleTrackingInfo[0].verificationCode);
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=status_steps]').should('be.visible');
  });

  it('should track two correct orders', () => {
    cy.visit('http://localhost:3000/track');
    cy.get('[data-cy=trackingCode_input]').eq(0).type(exampleTrackingInfo[0].trackingCode);
    cy.get('[data-cy=extraVerification_input]').eq(0).type(exampleTrackingInfo[0].verificationCode);
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=status_steps]').should('be.visible');
    cy.wait(500);
    cy.get('[data-cy=trackDifferentOrder_button]').eq(0).click();
    cy.get('[data-cy=trackingCode_input]').eq(0).clear().type(exampleTrackingInfo[1].trackingCode);
    cy.get('[data-cy=extraVerification_input]').eq(0).clear().type(exampleTrackingInfo[1].verificationCode);
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=status_steps]').should('be.visible');
  });

  it('should get error on nonexistent order', () => {
    cy.visit('http://localhost:3000/track');
    cy.get('[data-cy=trackingCode_input]').eq(0).type(exampleTrackingInfo[0].trackingCode);
    cy.get('[data-cy=extraVerification_input]').eq(0).type('222222');
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=error]').should('be.visible');
  });

  it('should not be able to track without both input fields filled in', () => {
    cy.visit('http://localhost:3000/track');
    cy.get('[data-cy=trackingCode_input]').eq(0).type(exampleTrackingInfo[0].trackingCode);
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=status_steps]').should('not.exist');
  });

  it('should get error on non-numerical verification code', () => {
    cy.visit('http://localhost:3000/track');
    cy.get('[data-cy=trackingCode_input]').eq(0).type(exampleTrackingInfo[0].trackingCode);
    cy.get('[data-cy=extraVerification_input]').eq(0).type('2a');
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=error]').should('be.visible');
  });

  it('should get error on negative verification code', () => {
    cy.visit('http://localhost:3000/track');
    cy.get('[data-cy=trackingCode_input]').eq(0).type(exampleTrackingInfo[0].trackingCode);
    cy.get('[data-cy=extraVerification_input]').eq(0).type('-2');
    cy.get('[data-cy=track_button]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=error]').should('be.visible');
  });
});
