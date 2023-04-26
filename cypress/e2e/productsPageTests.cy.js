describe('products page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/products');
  })

  it('should get a list of products', () => {
    cy.get('[data-cy=test-products-list]').should('exist');
    cy.get('ul').find('li.ant-list-item').should('have.length', 10);
  })

  it('filter price test', () => {
    const currentValue = 0;
    const targetValue = 49;
    const increment = 1;
    const steps = (targetValue - currentValue) / increment;
    const arrows = '{leftarrow}'.repeat(steps);

    cy.get('[data-cy=test-products-filter-priceTab]').click();
    // cy.get('.ant-slider-handle-1').type(arrows);
    cy.get('.ant-slider-handle-2').should('have.attr', 'aria-valuenow', 50).type(arrows);
    cy.get('ul').find('li.ant-list-item').should('have.length', 3);
  })

  it('filter inStock test', () => {
    cy.get('[data-cy=test-products-filter-inStockTab]').click();
    cy.get('[data-cy=test-products-filter-inStock]').click();
    cy.get('[data-cy=test-products-listEmpty]').should('exist');
  })
});