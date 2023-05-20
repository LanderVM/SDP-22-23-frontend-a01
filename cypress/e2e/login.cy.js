describe('login', () => {
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

  it('should successfully log into the app', () => {
    cy.goToHomePage();
  });

  it('should successfully log out of the app', () => {
    cy.logout();
  })

});