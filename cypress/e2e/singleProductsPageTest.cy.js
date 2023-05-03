describe('single product page', () => {
  beforeEach(() => {
    cy.login();
  });

  it('very slow response', () => {
    cy.intercept(
      'http://localhost:3000/product/1',
      (req) => {
        req.on('response', (res) => {
          res.setDelay(2000);
        });
      },
    ).as('slowResponse');
  });

  it('should get a list of products', () => {
    cy.visit('http://localhost:3000/products');
    cy.get('[data-cy=test-products-list]').should('exist');
    cy.get('ul').find('li.ant-list-item').should('have.length', 10);
  });
  it('go to single products page with product in stock', () => {
    cy.visit('http://localhost:3000/products');
    cy.get('[data-cy=productNameUrl]').eq(0).click();

    cy.get('[data-cy=productName]').contains('iPhone 9');
    cy.get('[data-cy=productBrand]').contains('Apple');
    cy.get('[data-cy=productPrice]').contains('€ 549');
    cy.get('[data-cy=productStock]').contains('in stock (94 left)');
    cy.get('[data-cy=productDescription]').contains('An apple mobile which is nothing like apple');
  });

  it('go to single products page without stock', () => {
    cy.visit('http://localhost:3000/products');
    cy.get('[data-cy=test-products-filter-inStockTab]').click();
    cy.get('[data-cy=test-products-filter-inStock]').click();
    cy.get('[data-cy=productNameUrl]').eq(0).click();

    cy.get('[data-cy=productName]').contains('iPhone X');
    cy.get('[data-cy=productBrand]').contains('Apple');
    cy.get('[data-cy=productPrice]').contains('€ 899');
    cy.get('[data-cy=productStock]').contains('Out of stock');
    cy.get('[data-cy=productDescription]').contains('SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...');
  });
  it('add to shopping cart test', () => {
    cy.visit('http://localhost:3000/product/1');
    cy.get('[data-cy=btnAddToCart]').click();
    cy.get('[data-cy=shoppingCartBadge]').contains('1');
  });
});
