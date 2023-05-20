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

  it('test notifications overview',()=>{
    cy.visit('http://localhost:3000/notifications');
    cy.wait(500);
    cy.get('[data-cy=notification]').should("have.length", 8);
    cy.get('[data-cy=notificationDate]').eq(0).contains('2023-05-17');
    cy.get('[data-cy=notificationMessage]').eq(0).contains('Your order has been processed');
    cy.get('[data-cy=notificationStatus]').eq(0).contains('new');
    cy.get('[data-cy=notificationOrderId]').eq(0).contains(4);
    cy.get('[data-cy=notificationDate]').eq(1).contains('2023-04-21');
    cy.get('[data-cy=notificationMessage]').eq(1).contains('Your order has been processed');
    cy.get('[data-cy=notificationStatus]').eq(1).contains('read');
    cy.get('[data-cy=notificationOrderId]').eq(1).contains(5);
  })

  it('test notification order 5 navigate from notifications overview',()=>{
    cy.visit('http://localhost:3000/notifications');
    cy.wait(500);
    cy.get('[data-cy=notification]').eq(0).click();
    cy.wait(500);
    cy.url().should('equal', 'http://localhost:3000/orders/4');
  })
});