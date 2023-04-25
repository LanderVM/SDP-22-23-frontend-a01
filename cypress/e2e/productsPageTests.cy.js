describe('products page tests', () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-cy=test-navbar-product]').click();
  })

  it('should go to the products page', () => {
    cy.url().should('include', '/products');
  })

  it('should get a list of products', () => {
    cy.get('ul').find('li.ant-list-item').should('have.length', 10);
  })
});