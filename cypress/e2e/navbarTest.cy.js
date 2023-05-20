describe('navigate', () => {
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

  it('should navigate home', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=navibar_logo]').eq(0).click();
    cy.wait(500);
    cy.url().should('equal', 'http://localhost:3000/home');
  });

  it('should navigate to shopping cart', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=navibar_shoppingCartButton]').eq(0).click();
    cy.wait(500);
    cy.url().should('equal', 'http://localhost:3000/shoppingCart');
  });

  it('should navigate to notifications', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=navibar_notificationsButton]').eq(0).click();
    cy.wait(500);
    cy.url().should('equal', 'http://localhost:3000/notifications');
  });

  it('should display dropdown menu with logout button', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=test-navbar-userIcon]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=test-navBar-LogOut]').eq(0).should('be.visible');
  });
});
