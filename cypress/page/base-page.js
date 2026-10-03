class BasePage {

    visit() {
        cy.visit('/')
    }

    getTitle() {
        return cy.title();
    }

    getAppLogo() {
        return cy.get('[data-testid="app-logo"]')
    }

    getAppTitle() {
        return cy.get('[data-testid="app-title"]')
    }

    getHeader() {
        return cy.get('header')
    }

    getFooter() {
        return cy.get('[data-testid="footer-text"]')
    }

    assertLocation(path) {
        cy.location('pathname').should('eq', path)
    }

    assertTitle() {
        return this.getTitle().should('eq', 'QAmindPlus')
    }

    assertAppLogo() {
        return this.getAppLogo()
            .should('be.visible')
            .should('have.attr', 'src', 'favicon.png')
            .should('have.attr', 'alt', 'QAmind+ Icon')
    }

    assertAppTitle() {
        return this.getAppTitle()
            .should('be.visible')
            .should('have.attr', 'src', 'qamind_logo.png')
            .should('have.attr', 'alt', 'QAmind+ LogoMarca')
    }

    assertVersion() {
        return this.getHeader().should('contain.text', 'v1.0.0')
    }

    assertFooterText() {
        return this.getFooter().should('contain.text', 'QAmindPlus — Ecossistema de Qualidade de Software e Automação de Testes.')
    }

    assertHeaderAndFooter() {
        this.assertTitle()
        this.assertAppLogo()
        this.assertAppTitle()
        this.assertVersion()
        this.assertFooterText()
    }

    backToDashboard() {
        cy.get('[data-testid="back-to-dashboard"]').click()
    }

}

export default BasePage;