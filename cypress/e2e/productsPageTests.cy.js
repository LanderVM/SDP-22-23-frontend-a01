const exampleProduct = 'iPhone 9';

describe('products page tests', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'http://localhost:9000/api/notifications/fiveMostRecent',
      { fixture: 'fiveMostRecentNotifications.json' },
    );
    cy.intercept(
      'GET',
      'http://localhost:9000/api/notifications/amountNotRead',
      { fixture: 'amountNotReadNotifications.json' },
    );
    cy.visit('http://localhost:3000/products');
  });

  it('should look up correct product', () => {
    cy.visit('http://localhost:3000/products');
    cy.get('[data-cy=products_searchBar]').eq(0).type(`${exampleProduct}`);
    cy.get('[data-cy=products_searchButton]').eq(0).click();
    // cy.wait(500);
    cy.get('[data-cy=productNameUrl]').eq(0).contains(exampleProduct);
  });

  it('should look up nonexistent product', () => {
    cy.visit('http://localhost:3000/products');
    cy.get('[data-cy=products_searchBar]').eq(0).type(`${exampleProduct}nonexistent`);
    cy.get('[data-cy=products_searchButton]').eq(0).click();
    cy.get('[data-cy=products_empty]').eq(0).should('exist');
  });

  it('should get a list of products', () => {
    cy.get('[data-cy=test-products-list]').should('exist');
    cy.get('ul').find('li.ant-list-item').should('have.length', 10);
  });

  it('filter price test with ordering on price', () => {
    cy.get('[data-cy=test-products-filter-priceTab]').click();
    cy.get('[data-cy=test-products-filter-price-firstInput]').clear();
    cy.get('[data-cy=test-products-filter-price-firstInput]').type('549');
    cy.get('[data-cy=test-products-filter-price-secondInput]').clear();
    cy.get('[data-cy=test-products-filter-price-secondInput]').type('700');
    cy.get('[data-cy=test-products-filter-sortTab]').click();
    cy.get('[data-cy=test-products-filter-sortOnPriceOption]').click();
    // cy.wait(500);
    cy.get('[data-cy=products_price]').eq(0).should('have.text', '€ 549');
  });
});
