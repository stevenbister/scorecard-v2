/// <reference types="cypress" />

context('Game host starts game', () => {
  beforeEach(() => {
    const testUser = {
      email: Cypress.env('email'),
      password: Cypress.env('password'),
    }

    cy.login(testUser)

    cy.visit('/')
    cy.findByRole('link', {
      name: /start a game/i,
    }).click()

    cy.url().should('include', '/lobby')
  })

  it('Starts a game and enters the waiting room', () => {
    cy.findByRole('heading', {
      name: /([Pin:\s])+(\d\d\d\d\d)/g,
    })

    cy.findByTestId('player').should('be.visible').and('have.length', 1)

    cy.findByText('Waiting for players...').should('be.visible')
  })

  it('Ends a game', () => {
    cy.findByRole('button', {
      name: /end game/i,
    }).click()

    cy.findByText('Are you sure you want to end the game?').should('be.visible')

    cy.findByRole('button', {
      name: /no/i,
    }).click()

    cy.findByText('Are you sure you want to end the game?').should('not.exist')

    cy.findByRole('button', {
      name: /end game/i,
    }).click()

    cy.findByRole('button', {
      name: /yes/i,
    }).click()

    cy.url().should('eq', Cypress.config().baseUrl)
  })
})

// TODO: Test for joining a game
