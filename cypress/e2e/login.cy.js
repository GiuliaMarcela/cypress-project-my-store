import { LOGIN_ELEMENTS, REGISTER_ELEMENTS } from './elements'

describe('Login', { tags: '@login' }, () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.intercept('GET', '/index.php').as('loading')
  })

  it('should access Register page', () => {
    cy.visit('/index.php')
    cy.wait('@loading')
    cy.validate('/index.php', { pathname: true })

    cy.xpath(REGISTER_ELEMENTS.signInButton)
      .should('be.visible')
      .and('have.attr', 'title', 'Log in to your customer account')
      .and('contain', 'Sign in')
      .click()

    cy.validate('?controller=authentication&back=my-account', { search: true })
  })

  it('should confirm that already registered is visible', () => {
    cy.get(LOGIN_ELEMENTS.form)
      .should('exist')
      .and('be.visible')
      .children('h3')
      .and('have.text', 'Already registered?')
      .and('have.class', 'page-subheading')
  })

  it('should fill in the fields and log in to the site', () => {
    cy.xpath(LOGIN_ELEMENTS.emailField)
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'type', 'text')
      .type(Cypress.env('email'))
      .should('have.value', Cypress.env('email'))

    cy.xpath(LOGIN_ELEMENTS.passwordField)
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'type', 'password')
      .type(Cypress.env('password'), { sensitive: true })
      .invoke('val')
      .should((el) =>
        expect(el.length).to.be.eq(Cypress.env('password').length)
      )

    cy.get(LOGIN_ELEMENTS.signInButton)
      .should('exist')
      .and('be.visible')
      .and('have.id', 'SubmitLogin')
      .click()
  })

  it('should confirm that the login was successful', () => {
    cy.get(LOGIN_ELEMENTS.errorMessage).should('not.exist')

    cy.validate('?controller=my-account', { search: true })

    cy.get(LOGIN_ELEMENTS.fullNameAccount).should('exist').and('be.visible')
    cy.get(LOGIN_ELEMENTS.welcomeAccountMessage)
      .should('exist')
      .and('be.visible')
      .and(
        'have.text',
        'Welcome to your account. Here you can manage all of your personal information and orders.'
      )
  })
})
