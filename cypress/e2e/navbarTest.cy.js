describe('navigate', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should navigate home', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=navibar_logo]').eq(0).click();
    cy.wait(500);
    cy.url().should('equal', 'http://localhost:3000/home');
  });

  it('should look up correct product', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=navibar_searchBar]').eq(0).type('test_product vijf{enter}');
    cy.wait(500);
    cy.url().should('equal', 'http://localhost:3000/products/product/test_product%20vijf');
    cy.get('[data-cy=singleProduct_name]').eq(0).contains('test_product vijf');
  });

  it('should look up nonexistent product', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=navibar_searchBar]').eq(0).type('test_product onbestaand{enter}');
    cy.wait(500);
    cy.url().should('equal', 'http://localhost:3000/products/product/test_product%20onbestaand');
    cy.get('[data-cy=error]').eq(0).should('exist');
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

  it('should display dropdown menu', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=test-navbar-userIcon]').eq(0).click();
    cy.wait(500);
    cy.get('[data-cy=navibar_dropdownMenu_orderButton]').eq(0).should('be.visible');
  });
});
