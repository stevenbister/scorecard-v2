/// <reference types="cypress" />

it('Navigates user to the sign in page', () => {
  cy.visit('/')

  cy.get('.chakra-heading').as('heading')
  cy.get('.chakra-button:first').as('primaryButton')

  cy.get('@heading').should('have.text', 'Scorecard')
  cy.get('@primaryButton').should('have.text', 'Sign in')

  cy.get('@primaryButton').click()

  cy.url().should('include', '/sign-in')
  cy.get('@heading').should('have.text', 'Sign in')
})

context('Sign in flow', () => {
  beforeEach(() => {
    cy.visit('/sign-in')
  })

  it('Shows an error if we try and login with a non-existant user', () => {
    const testUser = {
      email: 'test@test.com',
      password: 'EU9nwH8V%f&#',
    }

    cy.login(testUser, false)

    cy.get('div[role="alert"]')
      .should('be.visible')
      .and('have.text', 'Invalid login credentials')
  })

  it('Sends user back to updated homepage when they sign in', () => {
    const testUser = {
      email: Cypress.env('username'),
      password: Cypress.env('password'),
    }

    cy.login(testUser)

    cy.url().should('eq', Cypress.config().baseUrl)

    cy.get('.chakra-heading').as('heading')
    cy.get('.chakra-button:first').as('primaryButton')
    cy.get('.chakra-button:last').as('secondaryButton')

    cy.get('@heading').should('have.text', 'Scorecard')
    cy.get('@primaryButton').should('have.text', 'Start a game')
    cy.get('@secondaryButton').should('have.text', 'Join a game')
  })
})
