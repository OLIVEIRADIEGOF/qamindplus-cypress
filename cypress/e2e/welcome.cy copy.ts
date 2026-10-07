import BasePage from "../page/base-page";
import WelcomePage from "../page/welcome.page";

import type { ServiceCard } from '../types/service-card'
import type { LinkCard } from '../types/link-card'
const welcome = new WelcomePage()

describe('Welcome Page', () => {

    beforeEach(() => {
        cy.log('I run once before all tests in this spec file!')
        welcome.visit()
        welcome.assertLocation('/')
        welcome.assertHeaderAndFooter()
    })

    it('should display the correct title and description', () => {

        cy.get('app-welcome').should('contain.text', 'Domine')
        cy.get('app-welcome').should('contain.text', 'Qualidade de Software')
        cy.get('app-welcome').should('contain.text', 'e Automação de Testes')
        cy.get('app-welcome').should('contain.text', 'do Zero ao Avançado')

        cy.get('app-welcome').should('contain.text', 'Seja bem-vindo ao QAmindPlus')
        cy.get('app-welcome').should('contain.text', 'O HUB de formações, mentorias, artigos técnicos e laboratórios reais')
        cy.get('app-welcome').should('contain.text', 'focado em acelerar sua evolução profissional.')
    })

    it('should display the correct cards', () => {
        cy.fixture<ServiceCard[]>('services.json').then((cards) => {
            welcome.getCards().should('have.length', cards.length)
            cards.forEach((card) => {
                welcome.assertCard(card.id, card.imagem, card.titulo, card.descricao)
            })
        })
    })

    it('should display correct title and links', () => {
        welcome.getComunidadeTitulo()
            .should('contain.text', 'Entre na Comunidade e Evolua seu Mindset')

        cy.fixture<LinkCard[]>('links.json').then((links) => {
            welcome.getLinks().should('have.length', links.length)
            links.forEach((link) => {
                welcome.assertLink(link.id, link.href, link.text)
            })
        })
    })

})
