describe('Authentication Flow', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('/');
  });

  it('should display the login form', () => {
    // Check if key elements exist
    cy.contains('Email');
    cy.contains('Password');
    cy.get('button').contains('Login').should('be.visible');
  });

  it('should allow a user to type in fields', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    
    cy.get('input[type="email"]').should('have.value', 'test@example.com');
  });

  // Note: This test will fail if the Backend isn't running or connected!
  it('should show error on invalid login', () => {
    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpass');
    cy.get('button').contains('Login').click();

    // Expect an error message (based on your LoginForm component)
    cy.contains(/Invalid credentials|Invalid email or password/i).should('be.visible');
  });
});