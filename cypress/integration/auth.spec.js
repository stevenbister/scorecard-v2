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
    cy.get('input[type="email"]').as('email')
    cy.get('input[type="password"]').as('password')
    cy.get('button[type="submit"]').as('submit')
  })

  it('Shows an error if we try and login with a non existant user', () => {
    const testUser = {
      email: 'test@test.com',
      password: 'EU9nwH8V%f&#',
    }

    cy.get('@email').type(testUser.email).should('have.value', testUser.email)

    cy.get('@password')
      .type(testUser.password, { log: false })
      .should('have.value', testUser.password)

    cy.get('@submit').click()

    cy.get('div[role="alert"]')
      .should('be.visible')
      .and('have.text', 'Invalid login credentials')
  })

  it.only('Sends user back to updated homepage when they sign in', () => {
    const testUser = {
      email: Cypress.env('username'),
      password: Cypress.env('password'),
    }

    cy.get('@email').type(testUser.email).should('have.value', testUser.email)
    cy.get('@password')
      .type(testUser.password, { log: false })
      .should((el$) => {
        // Check password is correct without displaying it in the logs
        if (el$.val() !== testUser.password) {
          throw new Error('Different value of typed password')
        }
      })

    cy.get('@submit').click()

    cy.url().should('eq', Cypress.config().baseUrl)

    cy.get('.chakra-heading').as('heading')
    cy.get('.chakra-button:first').as('primaryButton')
    cy.get('.chakra-button:last').as('secondaryButton')

    cy.get('@heading').should('have.text', 'Scorecard')
    cy.get('@primaryButton').should('have.text', 'Start a game')
    cy.get('@secondaryButton').should('have.text', 'Join a game')
  })
})
