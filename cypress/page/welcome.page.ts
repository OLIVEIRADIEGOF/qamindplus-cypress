import BasePage from './base-page'

class WelcomePage extends BasePage {

    visit() {
        cy.visit('/')
    }

    getCards() {
        return cy.get(`.gap-6 > :nth-child(n)`)
    }

    getCard(id: string) {
        return cy.get(`.gap-6 > :nth-child(${id})`)
    }

    assertCard(id: string, imagem: string, titulo: string, descricao: string) {
        this.getCard(id)
            // .should('have.attr', 'src', imagem)
            .should('contain.text', titulo)
            .should('contain.text', descricao)
    }

    getComunidadeTitulo() {
        return cy.get(`app-welcome > div >> h3`)
    }

    getLinks() {
        return cy.get(`app-welcome div a`)
    }

    getLink(id: string) {
        return cy.get(`app-welcome div a:nth-child(${id})`)
    }

    assertLink(id: string, href: string, text: string) {
        this.getLink(id)
            .should('have.attr', 'href', href)
            .should('contain.text', text)
    }

}

export default WelcomePage