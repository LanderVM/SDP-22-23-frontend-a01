const exampleProducts = [
  {
    name: 'iPhone 9',
    brand: 'Apple',
    price: '€ 549',
    stock_message: 'in stock (94 left)',
    description: 'An apple mobile which is nothing like apple',
  },
  {
    name: 'iPhone X',
    brand: 'Apple',
    price: '€ 899',
    stock_message: 'Out of stock',
    description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
  },
];

describe('single product page', () => {
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

  it('should get a list of products-overview', () => {
    cy.visit('http://localhost:3000/products');
    cy.get('[data-cy=test-products-overview-list]').should('exist');
    cy.get('ul').find('li.ant-list-item').should('have.length', 10);
  });
  it('go to single products-overview page with product in stock', () => {
    cy.visit('http://localhost:3000/products');
    cy.get('[data-cy=productNameUrl]').eq(0).click();

    cy.get('[data-cy=productName]').contains(exampleProducts[0].name);
    cy.get('[data-cy=productBrand]').contains(exampleProducts[0].brand);
    cy.get('[data-cy=productPrice]').contains(exampleProducts[0].price);
    cy.get('[data-cy=productStock]').contains(exampleProducts[0].stock_message);
    cy.get('[data-cy=productDescription]').contains(exampleProducts[0].description);
  });

  it('go to single products-overview page without stock', () => {
    cy.visit('http://localhost:3000/products');
    cy.get('[data-cy=productNameUrl]').eq(1).click();
    cy.get('[data-cy=productName]').contains(exampleProducts[1].name);
    cy.get('[data-cy=productBrand]').contains(exampleProducts[1].brand);
    cy.get('[data-cy=productPrice]').contains(exampleProducts[1].price);
    cy.get('[data-cy=productStock]').contains(exampleProducts[1].stock_message);
    cy.get('[data-cy=productDescription]').contains(exampleProducts[1].description);
  });

  it('add to shopping cart test', () => {
    cy.visit('http://localhost:3000/product/1');
    cy.get('[data-cy=btnAddToCart]').click();
    cy.get('[data-cy=shoppingCartBadge]').contains('1');
  });
});
