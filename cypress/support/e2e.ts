// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands'

// TODO add custom commands to support file

before(() => {
    cy.log('I run once before all spec files!')

})

beforeEach(() => {
    cy.log('I run before every test in every spec file!')
})

afterEach(() => {
    cy.log('I run after every test in every spec file!')
})

after(() => {
    cy.log('I run once after all spec files!')
})