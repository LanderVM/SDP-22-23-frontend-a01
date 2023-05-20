describe('notifications test', () => {
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
    cy.intercept(
      "GET",
      "http://localhost:9000/api/notifications",
      { fixture: 'allNotifications.json' }
    );
    cy.login();
  });

  it('test on notifications badge',() => {
    cy.get('[data-cy=amountNotReadNotifications]').should('exist');
  });

  it('test notifications dropdown menu',() =>{
    cy.get('[data-cy=amountNotReadNotifications]').click();
    cy.wait(500);
    cy.get('[data-cy=dropdownAllNotifications]').should('exist');
    cy.get('[data-cy=notificationInDropdown1]').should('exist');
  });

  it('test notification order 5 navigate from dropdown menu',() =>{
    cy.get('[data-cy=amountNotReadNotifications]').click();
    cy.wait(500);
    cy.get('[data-cy=notificationInDropdown1]').click();
    cy.wait(500);
    cy.url().should('equal', 'http://localhost:3000/orders/5');
  });

  it('test all notifications navigate from dropdown menu', () => {
    cy.get('[data-cy=amountNotReadNotifications]').click();
    cy.wait(500);
    cy.get('[data-cy=dropdownAllNotifications]').click();
    cy.wait(500);
    cy.url().should('equal', 'http://localhost:3000/notifications');
  });

  it('test notifications from new to unread',()=>{
    cy.visit('http://localhost:3000/notifications');
    cy.wait(500);
    cy.get('[data-cy=notificationStatus]').eq(0).contains('new');
    cy.visit('http://localhost:3000/')
    cy.wait(500);
    cy.visit('http://localhost:3000/notifications');
    cy.wait(500);
    cy.get('[data-cy=notificationStatus]').eq(0).contains('unread');
  })
});