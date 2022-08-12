import { HOME_ELEMENTS as home } from './elements'

describe('Buy 3 products', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.clearCookies()
    cy.intercept('GET', '/index.php').as('loading')
  })

  it('should access home page and choose three products product', () => {
    cy.visit('/index.php')
    cy.wait('@loading')
    cy.validate('/index.php', { pathname: true })

    const products = [
      home.firstProductCard,
      home.secondProductCard,
      home.seventhProductCard
    ]

    products.forEach((product, index) => {
      let messageValidation = 'There is 1 item in your cart'

      if (index > 0) {
        messageValidation = `There are ${index + 1} items in your cart`
      }

      cy.get(product)
        .realHover({ pointer: 'mouse', position: 'center' })
        .should('contain', 'Add to cart')
        .click(100, 350)

      cy.xpath(home.modalProduct, { timeout: 10000 })
        .should('be.visible')
        .and('contain.text', 'Product successfully added to your shopping cart')

      cy.xpath(home.modalLeftSide)
        .should('be.visible')
        .and('contain.text', messageValidation)

      if (index < 2) {
        cy.xpath(home.continueShoppingButton)
          .should('be.visible')
          .and('contain.text', 'Continue shopping')
          .click()
      } else {
        cy.xpath(home.proceedToCheckoutButton)
          .should('be.visible')
          .and('contain.text', 'Proceed to checkout')
          .click()
      }
    })
  })

  it('should validate in shopping cart if has 3 products and click to checkout', () => {
    cy.xpath(home.shoppingCartDropdown)
      .should('be.visible')
      .children(home.shoppingCartChildrenSpan)
      .should('include.text', '3')

    cy.xpath('//*[@class="cart_unit"]').should('exist').as('products-price')

    cy.get('.last_item.cart_item .cart_quantity_up').should('exist').click()

    cy.get('@products-price').then((el) => {
      const htmlSpanPrices = el.children().children().toArray().slice(0, -2)
      const totalShipping = 2
      let totalProducts = 0
      let total = 0

      htmlSpanPrices.forEach((price) => {
        const removeDollarSign = price.innerText.slice(
          1,
          price.innerHTML.length
        )

        totalProducts += parseFloat(removeDollarSign)
      })

      total = (parseFloat(totalProducts) + parseFloat(totalShipping)).toFixed(2)
      cy.get('#total_price').should('be.visible').and('have.text', `$${total}`)
      cy.get('.cart_navigation > .button > span')
        .should('be.visible')
        .and('contain', 'Proceed to checkout')
        .click()
    })
  })
})
