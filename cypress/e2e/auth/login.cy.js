describe('Login Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
    cy.visit('/login');
  });

  it('Renders properly', () => {
    cy.visit('/login');
  });

  // TODO: write error tests

  it('Logs in with valid credentials', () => {
    cy.get('input[placeholder="Email"]').type('ravima9512@pubpng.com');
    cy.get('input[placeholder="Password"]').type('ravima9512');
    cy.get("button[type='submit']").click();
    cy.location('pathname').should('eq', '/');
  });
});
