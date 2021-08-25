describe('Make order', function() {

  before(function() {
    cy.visit('http://localhost:3000');
  })

  it('should be available on localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });

  it('should add bun', function() {
    cy.get('h2').contains('Булки').parent().find('li').first().as('bun')
    cy.get('[class^=BurgerConstructor_burger-constructor__]').first().as('burgerConstructor');
    cy.get('@bun').trigger('dragstart')
    cy.get('@burgerConstructor').trigger('drop');
    cy.get('@bun').find('p').first().should(($p) => {
      expect($p.text().trim()).equal("2");
    });
    cy.get('@burgerConstructor').find('.constructor-element').should('have.length', 2);
  })

  it('should add sauce', function() {
    cy.get('h2').contains('Соусы').parent().find('li').first().as('sauce')
    cy.get('[class^=BurgerConstructor_burger-constructor__]').first().as('burgerConstructor');
    cy.get('@sauce').trigger('dragstart')
    cy.get('@burgerConstructor').trigger('drop');
    cy.get('@sauce').find('p').first().should(($p) => {
      expect($p.text().trim()).equal("1");
    });
    cy.get('@burgerConstructor').find('.constructor-element').should('have.length', 3);
  })
  it('should add main', function() {
    cy.get('[class^=BurgerConstructor_burger-constructor__]').first().as('burgerConstructor');
    cy.get('h2').contains('Начинки').parent().find('li').first().as('main')
    cy.get('@main').trigger('dragstart')
    cy.get('@burgerConstructor').trigger('drop');
    cy.get('@main').find('p').first().should(($p) => {
      expect($p.text().trim()).equal("1");
    });

    cy.get('@burgerConstructor').find('.constructor-element').should('have.length', 4);
  })

  // it('should make order after login', function() {
  //   cy.get('button').contains('Оформить').trigger('click');
  //   cy.get('form h2').first().should(($h2) => {
  //     expect($h2.text().trim()).equal("Вход");
  //   });
  //
  //   //
  //   // cy.get('form path').first().trigger('click');
  //   // cy.get('form input').first().type('12345678@test.ru');
  //   // cy.get('form input').last().type('12345678');
  //   //
  //   // cy.intercept()
  //   //
  //   // cy.get('button').contains('Войти')
  // })
})