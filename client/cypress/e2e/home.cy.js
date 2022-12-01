describe('test home', () => {

    describe.only('testing the selects', () => {
        
        it.only('testing the landing page button', () => {
            cy.visit(Cypress.env('LANDING_PAGE_URL'))
            cy.contains('Home').click()
        })
        
        it('Filter by alphabetical order', () => {
            // Aqui uso un wait porque la api tarda un poco en enviar los juegos
            cy.wait(3000)
            cy.get('select').first().select('A - Z')
            cy.contains('Alan Wake')
            
            cy.get('select').first().select('Z - A')
            cy.contains('Wolfenstein: The New Order')
        })
        
        it('Filter by gender', () => {
            cy.get('select').eq(1).select('Sports')
            cy.contains('Rocket League')
    
            cy.get('select').eq(1).select('Strategy')
            cy.contains('Company of Heroes 2')
        })
    
        it('Find a game', () => {
            cy.get('input[placeholder="Buscar..."]').as('inputSearch')
            cy.get('@inputSearch').click().type('mario')
            cy.get('@inputSearch').parent().find('button').click()
            cy.contains('Mario Bros.')
        })
    
        it('Filter by platforms', () => {
            cy.get('select').eq(2).select('Linux')
            cy.contains('PAYDAY 2')
    
            cy.get('select').eq(2).select('PC')
            cy.contains('The Witcher 3: Wild Hunt')
        })
    
        it('Filter by rating', () => {
            cy.get('select').eq(3).select('Menor a mayor')
            cy.contains('3.05')
    
            cy.get('select').eq(3).select('Mayor a menor')
            cy.contains('4.69')
        })
    })

    describe('add a game to the database', () => {

        before(() => {
            cy.visit(Cypress.env('POST_GAME_URL'))
        })
    
        it('Create new Video Game', () => {
            // Aqui completa el formulario
            cy.get('input[name="name"]').type('Test')
            cy.get('input[name="released"]').type('2022-10-09')
            cy.get('input[name="rating"]').type(4)
            cy.get('textarea').type('Esto es una prueba')

            cy.get('input[value="Action"]').check()
            cy.get('input[value="Indie"]').check()
            cy.get('input[value="Nintendo"]').check()
            cy.get('input[value="Xbox"]').check()

    
            // Aqui envia el juego creado y verifica que existe
            cy.get('button[type="submit"]').click()
            cy.visit(Cypress.env('URL'))
            cy.contains('Test', {timeout: 6000})
        })

        it('search game by platform', () => {
            cy.get('select').eq(2).select('Nintendo')
            cy.contains('Test')
        })

        it('delete the game from the database', () => {
            cy.visit(Cypress.env('URL'))
            cy.contains('Test').click({force: true})
            cy.contains('button', 'Eliminar videojuego').click()
            cy.contains('button', 'Si').click()
            cy.url().should('include', Cypress.env('URL'))
        })
    })
})