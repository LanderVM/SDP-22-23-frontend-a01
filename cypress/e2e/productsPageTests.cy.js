const exampleProduct = "iPhone 9";

describe('products page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/products');
  });

  it('should look up correct product', () => {
    cy.visit('http://localhost:3000/products');
    cy.get('[data-cy=products_searchBar]').eq(0).type(`${exampleProduct}{enter}`);
    cy.wait(500);
    cy.get('[data-cy=productNameUrl]').eq(0).contains(exampleProduct);
  });

  it('should look up nonexistent product', () => {
    cy.visit('http://localhost:3000/products');
    cy.get('[data-cy=products_searchBar]').eq(0).type(`${exampleProduct}nonexistent{enter}`);
    cy.wait(500);
    cy.get('[data-cy=products_empty]').eq(0).should('exist');
  });

  it('should get a list of products', () => {
    cy.get('[data-cy=test-products-list]').should('exist');
    cy.get('ul').find('li.ant-list-item').should('have.length', 10);
  });

  it('filter price test with ordering on price', () => {
    cy.get('[data-cy=test-products-filter-priceTab]').click();
    cy.get('[data-cy=test-products-filter-price-firstInput]').clear().type('549');
    cy.get('[data-cy=test-products-filter-price-secondInput]').clear().type('700');
    cy.get('[data-cy=test-products-filter-sortTab]').click();
    cy.get('[data-cy=test-products-filter-sortOnPriceOption]').click();
    cy.wait(500);
    cy.get('[data-cy=products_price]').eq(0).should('have.text', '€ 549')
  });
});
