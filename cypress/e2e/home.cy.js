import { HOME_ELEMENTS as homepage } from './elements'

describe('Home', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.intercept('GET', '/index.php').as('loading')
  })

  it('should visit the Automation Practice website', () => {
    cy.visit('/index.php')
    cy.wait('@loading')
    cy.validate('/index.php', { pathname: true })
  })

  it('should validate if the slide is visible', () => {
    cy.get(homepage.slider).should('be.visible').and('contain.html', 'img')
    cy.get(homepage.banners)
      .should('be.visible')
      .and('contain.html', 'img')
      .and('contain.html', 'a')
  })

  it('should validate if there is an editorial about the automation site', () => {
    cy.get(homepage.editorial)
      .should('be.visible')
      .and('contain.text', 'Subsidiary of seleniumframework.com')
      .and('contain.text', 'Practice Selenium')
  })

  it('should validate there is no breadcrumb on the page', () => {
    cy.get(homepage.breadcrumb).should('not.exist')
    cy.validate('/index.php', { pathname: true })
  })
})
