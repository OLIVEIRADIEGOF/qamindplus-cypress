describe('Demo Dashboard', () => {

    it('should display the correct title', () => {
        cy.visit('/sandbox/demo-dashboard')
        cy.url()
            .should('eq', 'https://qamindplus.com.br/sandbox/demo-dashboard')
        cy.title().should('eq', 'QAmindPlus')
        cy.get('[data-testid="dashboard-welcome-title"]').should('contain.text', 'Bem-vindo ao Espaço de Treinamento!')
    })

})