import BasePage from './base-page'

class DemoDashboardPage extends BasePage {

    visit() {
        cy.visit('/sandbox/demo-dashboard')
    }

    getWelcomeTitle() {
        return cy.get('[data-testid="dashboard-welcome-title"]')
    }

    getWelcomeDescription() {
        return this.getWelcomeTitle().parent()
    }

    getPlatformStatus() {
        return cy.get('[data-testid="platform-status"]')
    }

    getCards() {
        return cy.get('[data-testid^="challenge-card-"]')
    }

    getCard(id: string) {
        return cy.get(`[data-testid="challenge-card-${id}"]`)
    }

    getCardLink(id: string) {
        return cy.get(`[data-testid="challenge-link-${id}"]`)
    }

    assertCard(id: string, nivel: string, title: string, description: string) {
        this.getCard(id)
            .should('be.visible')
            .should('contain.text', nivel)
            .should('contain.text', title)
            .should('contain.text', description)
    }

    assertCardLink(id: string, link: string) {
        this.getCardLink(id)
            .should('be.visible')
            .should('have.attr', 'href', link)
            .should('contain.text', 'Acessar Laboratório →')
    }

}

export default DemoDashboardPage