/**
 * @description Command used to validate if the url has the same pathname or search as expected.
 * @description Comando utilizado para validar se a url tem o mesmo pathname ou busca que o esperado.
 *
 * @param {string} query - Enter pathname or query to be validated.
 * Based on baseUrl in cypress configuration file.
 * @param {object} options - Type of validation.
 * */
Cypress.Commands.add(
  'validate',
  (query, options = { pathname: false, search: false }) => {
    if (!options.pathname) {
      cy.location().should((current) => expect(current.search).to.eq(query))
    } else {
      cy.location().should((current) => expect(current.pathname).to.eq(query))
    }
  }
)
