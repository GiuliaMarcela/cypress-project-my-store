/**
 * @description Command used to validate if the url has the same pathname or search as expected.
 * @description Comando utilizado para validar se a url tem o mesmo pathname ou busca que o esperado.
 *
 * @param {string} text - Enter pathname or query to be validated.
 * Based on baseUrl in cypress configuration file.
 * @param {object} options - Type of validation. Options { pathname: false, search: false }.
 * @example cy.validate('?query=true', { search: true })
 * */
Cypress.Commands.add('validate', (text, options) => {
  if (options && options.pathname) {
    return cy
      .location()
      .should((current) => expect(current.pathname).to.eq(text))
  }

  return cy.location().should((current) => expect(current.search).to.eq(text))
})

/**
 * @description Rewrite the type command to add functionality to hide sensitive data.
 * @description Reescrita do comando type para adicionar funcionalidade de esconder dados sensíveis.
 * @example cy.type('senhasupersecreta', { sensitive : true })
 * */
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false

    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length)
    })
  }

  return originalFn(element, text, options)
})
