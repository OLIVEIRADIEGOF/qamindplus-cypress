import BasePage from "../page/base-page"
import DemoDashboardPage from "../page/demo-dashboard-page"
import type { ChallengeCard } from '../types/challenge-card'

const page = new BasePage()
const dashboard = new DemoDashboardPage()

describe('Demo Dashboard Page', () => {

    beforeEach(() => {
        cy.log('I run before each test in this spec file!')
        dashboard.visit()
        dashboard.assertLocation('/sandbox/demo-dashboard')
        dashboard.assertHeaderAndFooter()
    })

    it('should display the correct title and description', () => {
        dashboard.getWelcomeTitle().should('contain.text', 'Bem-vindo ao Espaço de Treinamento!')
        dashboard.getWelcomeDescription().should('contain.text', 'Selecione um dos cenários abaixo para rodar seus scripts de automação. Cada laboratório simula problemas e comportamentos reais do mercado para desafiar suas habilidades com Playwright, Cypress, Selenium ou Appium.')
        dashboard.getPlatformStatus().should('contain.text', 'Ambiente Totalmente Client-Side e Resiliente')
    })

    it('should display the correct cards', () => {
        cy.fixture<ChallengeCard[]>('cards.json').then((cards) => {
            dashboard.getCards().should('have.length', cards.length)
            cards.forEach((card) => {
                dashboard.assertCard(card.id, card.nivel, card.titulo, card.descricao)
                dashboard.assertCardLink(card.id, card.link)
            })
        })
    })

    it('should navigate to the correct card link', () => {
        cy.fixture<ChallengeCard[]>('cards.json').then((cards) => {
            cards.forEach((card) => {
                dashboard.getCardLink(card.id).click()
                page.assertLocation(card.link)
                page.backToDashboard()
                dashboard.assertLocation('/sandbox/demo-dashboard')
            })
        })
    })

})