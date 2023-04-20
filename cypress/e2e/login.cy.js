describe('login', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should successfully log into the app', () => {
    cy.goToHomePage();
  });

  it('should successfully log out of the app', () => {
    cy.logout();
  })

});