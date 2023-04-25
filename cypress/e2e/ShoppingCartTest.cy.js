describe('add to shopping cart', () => {
  beforeEach(() => {
    cy.login();
  });

  it('very slow response', () => {
    cy.intercept(
      'http://localhost:3000/products',
      (req) => {
        req.on('response', (res) => {
          res.setDelay(2000);
        });
      },
    ).as('slowResponse');
  });

  it('add to shopping cart test and then remove', () => {
    cy.visit('http://localhost:3000/products');
    cy.get('[data-cy=btnAddToCart]').eq(0).click();

    cy.visit('http://localhost:3000/shoppingCart');
    cy.get('[data-cy=cartPrice]').eq(0).contains('€ 11');
    cy.get('[data-cy=cartName]').eq(0).contains('test_product vijf');
    cy.get('[data-cy=cartDescription]').eq(0).contains('omschrijning test_product 5');
    cy.visit('http://localhost:3000/shoppingCart');
    cy.get('[data-cy=removeCartItem]').eq(0).click();
    cy.get('[data-cy=shoppingCart]').should('have.length', 0);
  });
});
