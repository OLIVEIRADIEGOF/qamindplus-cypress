describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    // Page URL changed.
    cy.url()
      .should('eq', 'https://example.cypress.io/')
    // The page title 'Kitchen Sink' is visible.
    cy.get('h1')
      .should('contain.text', 'Kitchen Sink')
    // The 'Commands' section heading is visible.
    cy.get('#commands h2')
      .should('contain.text', 'Commands')
    // The list of command categories is visible.
    cy.get('div:nth-child(4) ul.home-list > li')
      .should('have.length', 17)
    
  })

  it('failed', () => {
    cy.visit('https://example.cypress.br')
  })
})