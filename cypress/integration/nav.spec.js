/// <reference types="cypress" />
before(() => {
  cy.visit('/')
})

context('User is unauthenticated', () => {
  it('Redirects user to the sign in page', () => {
    cy.get('nav a:last').should('have.text', 'Profile').click()

    cy.url().should('include', '/sign-in')

    cy.get('.chakra-heading').should('have.text', 'Sign in')
    cy.get('form[name="signInForm"]').should('be.visible')
  })
})

context('User is authenticated', () => {
  before(() => {
    const testUser = {
      email: Cypress.env('username'),
      password: Cypress.env('password'),
    }

    cy.login(testUser)
  })

  it('Visits the protected profile page', () => {
    cy.get('nav a:last').should('have.text', 'Profile').click()

    cy.url().should('include', '/profile')
  })
})
