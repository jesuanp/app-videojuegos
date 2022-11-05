describe('test home', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/app/home/1')
    })

    it('test find a game', () => {
        cy.get('input[placeholder="Buscar..."]').click().type('mario')
        cy.get('.Nav_button__3aRU5').click()
        cy.contains('Mario Bros.')
    })
    
    it('test select Alfabetico', () => {
        cy.get(':nth-child(1) > .Order_select__1B32p').select('A - Z')
    })

    it('test select genres', () => {
        cy.get(':nth-child(2) > .Order_select__1B32p').select('Action')
        cy.get(':nth-child(2) > .Order_select__1B32p').select('Adventure')
        cy.get(':nth-child(2) > .Order_select__1B32p').select('RPG')
    })

    it('test select platforms', () => {
        cy.get(':nth-child(3) > .Order_select__1B32p').select('PC')
        cy.get(':nth-child(3) > .Order_select__1B32p').select('Android')
    })
})