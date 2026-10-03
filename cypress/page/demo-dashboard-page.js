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

    getCard(id) {
        return cy.get(`[data-testid="challenge-card-${id}"]`)
    }

    getCardLink(id) {
        return cy.get(`[data-testid="challenge-link-${id}"]`)
    }

    assertCard(id, nivel, title, description) {
        this.getCard(id)
            .should('be.visible')
            .should('contain.text', nivel)
            .should('contain.text', title)
            .should('contain.text', description)
    }

    assertCardLink(id, link) {
        this.getCardLink(id)
            .should('be.visible')
            .should('have.attr', 'href', link)
            .should('contain.text', 'Acessar Laboratório →')
    }

}

export default DemoDashboardPage