describe('add a game to the database', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/app/post')
    })

    it('fill in the input', () => {
        // Aqui compreta el formulario
        cy.get('[name="name"]').type('test')
        cy.get('[name="released"]').type('2022-10-09')
        cy.get('[name="rating"]').type(4)
        cy.get('[type="checkbox"]').first().check()
        cy.get('[value="PC"]').check()
        cy.get('textarea').type('Esto es una prueba')

        // Aqui envia el juego creado y verifica que existe
        cy.get('button[type="submit"]').click()
        cy.visit('http://localhost:3000/app/home/1')
        cy.contains('Test')
    })
})