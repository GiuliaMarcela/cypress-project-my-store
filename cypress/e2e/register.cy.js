import { randomUser } from '../utils/get-user'
import { REGISTER_ELEMENTS as registerPage } from './elements'

describe('Register', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.intercept('GET', '/index.php').as('loading')
  })

  it('should access Register page', () => {
    cy.visit('/index.php')
    cy.wait('@loading')
    cy.validate('/index.php', { pathname: true })

    cy.xpath(registerPage.signInButton)
      .should('be.visible')
      .and('have.attr', 'title', 'Log in to your customer account')
      .and('contain', 'Sign in')
      .click()

    cy.validate('?controller=authentication&back=my-account', { search: true })
  })

  it('should fill email address to create an account', () => {
    cy.xpath(registerPage.emailAddressField)
      .should('be.visible')
      .and('have.attr', 'data-validate', 'isEmail')
      .type(randomUser.email)
      .and('have.value', randomUser.email)
  })

  it('should click on create an account button', () => {
    cy.xpath(registerPage.createAnAccountButton)
      .should('be.visible')
      .and('have.attr', 'type', 'submit')
      .and('have.attr', 'name', 'SubmitCreate')
      .and('contain.text', 'Create an account')
      .click()
  })

  it('should verify that it is on the registration page', () => {
    cy.url({ timeout: 10000 }).should('include', '#account-creation')

    cy.contains('Your personal information')
      .should('be.visible')
      .and('have.text', 'Your personal information')
  })

  it('should fill personal data form', () => {
    cy.xpath(registerPage.personal.personalMrTitleRadio)
      .should('be.hidden')
      .and('have.attr', 'id', 'id_gender1')
      .check()
      .parent()
      .should('have.class', 'checked')

    cy.xpath(registerPage.personal.firstNameField)
      .should('be.visible')
      .and('have.attr', 'data-validate', 'isName')
      .type(randomUser.firstName)
      .should('have.value', randomUser.firstName)

    cy.xpath(registerPage.personal.lastNameField)
      .should('be.visible')
      .and('have.attr', 'data-validate', 'isName')
      .type(randomUser.lastName)
      .should('have.value', randomUser.lastName)

    cy.xpath(registerPage.personal.emailField)
      .should('be.visible')
      .and('have.id', 'email')
      .and('have.attr', 'data-validate', 'isEmail')
      .and('have.value', randomUser.email)

    cy.xpath(registerPage.personal.passwordField)
      .should('be.visible')
      .and('have.attr', 'type', 'password')
      .and('have.id', 'passwd')
      .type(Cypress.env('password'), { sensitive: true })
      .and('be.visible')
      .invoke('val')
      .should((value) =>
        expect(value.length).to.be.eq(Cypress.env('password').length)
      )

    cy.xpath(registerPage.personal.dayOfBirthField)
      .should('be.hidden')
      .and('have.id', 'days')
      .select(randomUser.dayOfBirth)
      .should('have.value', randomUser.dayOfBirth)

    cy.xpath(registerPage.personal.monthOfBirthField)
      .should('be.hidden')
      .and('have.id', 'months')
      .select(randomUser.monthOfBirth)
      .should('have.value', randomUser.monthOfBirth)

    cy.get('#years')
      .should('be.hidden')
      .and('have.id', 'years')
      .select(randomUser.yearOfBirth.toString())
      .should('have.value', randomUser.yearOfBirth)
  })

  it('should fill all address form', () => {
    cy.xpath(registerPage.address.fistNameField)
      .should('be.visible')
      .and('have.value', randomUser.firstName)

    cy.xpath(registerPage.address.lastNameField)
      .should('be.visible')
      .and('have.value', randomUser.lastName)

    cy.xpath(registerPage.address.companyField)
      .should('be.visible')
      .and('have.id', 'company')
      .type(randomUser.company)
      .and('have.value', randomUser.company)

    cy.xpath(registerPage.address.addressField)
      .should('be.visible')
      .and('have.id', 'address1')
      .type(randomUser.address)
      .and('have.value', randomUser.address)

    cy.xpath(registerPage.address.addressDetailsField)
      .should('be.visible')
      .and('have.id', 'address2')
      .type(randomUser.addressLine2)
      .and('have.value', randomUser.addressLine2)

    cy.xpath(registerPage.address.cityField)
      .should('be.visible')
      .and('have.id', 'city')
      .type(randomUser.city)
      .and('have.value', randomUser.city)

    cy.xpath(registerPage.address.stateField)
      .should('be.hidden')
      .and('have.id', 'id_state')
      .select(randomUser.state)
      .and('contain', randomUser.state)

    cy.xpath(registerPage.address.zipCode)
      .should('be.visible')
      .and('have.id', 'postcode')
      .type(randomUser.zipCode)
      .and('have.value', randomUser.zipCode)

    cy.xpath(registerPage.address.countryField)
      .should('be.hidden')
      .and('have.id', 'id_country')
      .and('contain', 'United States')

    cy.xpath(registerPage.address.additionalInformationTextArea)
      .should('be.visible')
      .and('have.id', 'other')
      .type(randomUser.additionalInformation)
      .and('have.value', randomUser.additionalInformation)

    cy.xpath(registerPage.address.mobilePhoneField)
      .should('be.visible')
      .and('have.id', 'phone_mobile')
      .type(randomUser.phoneNumber)
      .and('have.value', randomUser.phoneNumber)

    cy.xpath(registerPage.address.addressAliasField)
      .should('be.visible')
      .and('have.id', 'alias')
      .clear()
      .type(randomUser.addressAlias)
      .and('have.value', randomUser.addressAlias)

    cy.xpath(registerPage.registerCompleteButton)
      .should('be.visible')
      .and('have.id', 'submitAccount')
      .click()
  })

  it('should validate that the registration was completed successfully', () => {
    cy.xpath('//a[@title="View my customer account"]')
      .children()
      .should('contain', `${randomUser.firstName} ${randomUser.lastName}`)
  })
})
