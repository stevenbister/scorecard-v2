// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands'

// Login to our app
// -------------------
Cypress.Commands.add('login', (user, validUser = true) => {
  cy.visit('/sign-in')
  cy.get('input[type="email"]')
    .type(user.email, { log: false })
    .should('have.value', user.email)

  cy.get('input[type="password"]')
    .type(user.password, { log: false })
    .should((el$) => {
      // Check password is correct without displaying it in the logs
      if (el$.val() !== user.password) {
        throw new Error('Different value of typed password')
      }
    })

  cy.get('button[type="submit"]').click()

  cy.intercept('POST', '/api/auth').as('login')

  if (validUser) {
    cy.wait('@login').its('response.statusCode').should('equal', 200)
    cy.wait('@login').then((interception) => {
      expect(interception.request.body.event).to.equal('SIGNED_IN')
    })
  }
})
