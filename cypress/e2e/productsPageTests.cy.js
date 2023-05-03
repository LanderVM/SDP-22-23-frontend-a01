describe('products page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/products');
  });

  it('should get a list of products', () => {
    cy.get('[data-cy=test-products-list]').should('exist');
    cy.get('ul').find('li.ant-list-item').should('have.length', 10);
  });

  it('filter price test', () => {
    cy.get('[data-cy=test-products-filter-priceTab]').click();
    cy.get('[data-cy=test-products-filter-price-firstInput]').clear().type('500');
    cy.get('[data-cy=test-products-filter-price-secondInput]').clear().type('700');
    cy.get('ul').find('li.ant-list-item').should('have.length', 5);
  });

  it('filter inStock test', () => {
    cy.get('[data-cy=test-products-filter-inStockTab]').click();
    cy.get('[data-cy=test-products-filter-inStock]').click();
    cy.get('ul').find('li.ant-list-item').should('have.length', 1);
  });
});
