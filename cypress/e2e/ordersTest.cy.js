const exampleProduct = {
    name: 'iPhone 9',
    price: '€ 549',
    description: 'An apple mobile which is nothing like apple',
};

describe('add to shopping cart', () => {
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

        cy.visit('http://localhost:3000/FinishingOrder');

    });
});
