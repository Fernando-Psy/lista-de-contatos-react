describe('Navegação com Estados', () => {
    it('deve manter contexto ao navegar para edição', () => {
        cy.addContact('Teste Navegação', 'nav@test.com', '(11) 99999-9999');

        cy.get('[data-cy="contact-item"]').should('be.visible');
        cy.get('[data-cy="contact-name"]').should('contain', 'Teste Navegação');

        cy.get('[data-cy="edit-button"]').should('be.visible').click();

        cy.url().should('include', '/editar');
        cy.get('#name').should('have.value', 'Teste Navegação');
    });

    it('deve limpar contexto ao cancelar edição', () => {
        cy.addContact('Teste Cancelar', 'cancelar@test.com', '(11) 99999-9999');

        cy.get('[data-cy="contact-item"]').should('be.visible');
        cy.get('[data-cy="contact-name"]').should('contain', 'Teste Cancelar');

        cy.get('[data-cy="edit-button"]').should('be.visible').click();
        cy.get('#name').clear().type('Nome Alterado');

        cy.get('button').contains('Cancelar').click();

        cy.url().should('eq', Cypress.config('baseUrl') + '/');
        cy.get('[data-cy="contact-item"]').should('be.visible');

        cy.get('[data-cy="edit-button"]').should('be.visible').click();
        cy.get('#name').should('have.value', 'Teste Cancelar');
    });
});