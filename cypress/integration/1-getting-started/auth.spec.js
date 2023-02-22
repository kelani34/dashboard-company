/// <reference types="cypress" />

// Welcome to Cypress!
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

const newUserEmail = 'aj3@rocketplantech.com';
const existingUserAccount = { email: 'aj@rocketplantech.com', password: 'signon123' };
// Gotta keep updating the line below after every test run
const newUserAccount = { email: 'aj00@rocketplantech.com', password: 'signon123', phone: '236-833-6689' };

describe('rocketplan tech', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://test.rocketplantech.com:3000/');
  });

  it('log in existing user', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.wait(4000);
    cy.get('input[name=email]')
      .should('have.length', 1)
      .type(existingUserAccount.email)
      .should('have.value', existingUserAccount.email);
    cy.wait(2000);
    cy.get('input[name=password]')
      .should('have.length', 1)
      .type(existingUserAccount.password)
      .should('have.value', existingUserAccount.password);
    cy.get('button[type=submit]').click();
    cy.get('#Dashboard').should('have.length', 1);
  });

  // This reaches the phone verification screen
  it('create new user', () => {
    cy.wait(4000);
    cy.get('input[name=email]')
      .should('have.length', 1)
      .type(newUserAccount.email)
      .should('have.value', newUserAccount.email);
    cy.wait(2000);
    cy.get('#CreateCompany_Button').click();
    cy.get('input[name=password]')
      .should('have.length', 1)
      .type(newUserAccount.password)
      .should('have.value', newUserAccount.password);
    cy.get('input[name=confirm_password]')
      .should('have.length', 1)
      .type(newUserAccount.password)
      .should('have.value', newUserAccount.password);
    cy.get('#Signup_Next').click();
    cy.wait(1000);
    cy.get('#Signup_PhoneNumber')
      .should('have.length', 1)
      .type(newUserAccount.phone)
      .should('have.value', newUserAccount.phone);
    cy.get('button[type=submit]').click();
  });
});
