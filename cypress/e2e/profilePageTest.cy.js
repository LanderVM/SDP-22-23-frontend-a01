describe('profile page test',()=>{

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

  it('check for company info',()=>{
    cy.intercept(
      "GET",
      "http://localhost:9000/api/customers/me",
      { fixture: 'companyProfile.json' }
    );
    cy.intercept(
      "GET",
      "http://localhost:9000/api/customers/colleagues",
      { fixture: 'colleagues.json' }
    );
    cy.get('[data-cy=test-navbar-userIcon]').click();
    cy.get('[data-cy=navibar_dropdownMenu_profileButton]').click();

    cy.get('[data-cy=companyInfo]').should("exist");
    cy.get('[data-cy=companyInfoSupplierName]').contains('Jan INC');
    cy.get('[data-cy=companyInfoSupplierEmail]').contains('sales@timCo.com');
  });

  it('check for colleagues',()=>{
    cy.intercept(
      "GET",
      "http://localhost:9000/api/customers/me",
      { fixture: 'companyProfile.json' }
    );
    cy.intercept(
      "GET",
      "http://localhost:9000/api/customers/colleagues",
      { fixture: 'colleagues.json' }
    );
    cy.get('[data-cy=test-navbar-userIcon]').click();
    cy.get('[data-cy=navibar_dropdownMenu_profileButton]').click();

    cy.get('[data-cy=colleagueInfo]').should("have.length", 2);
    cy.get('[data-cy=colleagueUsername]').eq(0).contains('Bart');
    cy.get('[data-cy=colleagueEmail]').eq(0).contains('bart@timCo.com');
  });
  
});