/// <reference types="cypress" />
before(() => {
  const testUser = {
    email: Cypress.env('email'),
    password: Cypress.env('password'),
  }

  cy.login(testUser)
})

it('Displays the user profile', () => {
  cy.visit('/profile')

  cy.findByLabelText('Email').should('have.value', Cypress.env('email'))
  cy.findByLabelText('Username')
    // .should('have.value', Cypress.env('username'))
    .focus()
    .clear()
    .type('New username')

  cy.findByRole('button', {
    name: /update/i,
  }).click()

  cy.findAllByText('New username').should('have.length', 2)
  cy.get('svg > title').should('not.be.visible')
  cy.get('.chakra-text').should('be.visible')

  // Tidy up and return our user back to their original details
  cy.tidyUp('profile')
})
