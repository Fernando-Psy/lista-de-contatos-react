describe('Navegação da Aplicação', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    describe('Navegação Básica', () => {
        it('deve navegar corretamente entre páginas', () => {
            cy.url().should('eq', Cypress.config('baseUrl') + '/');
            cy.get('h1').should('contain', 'Gerenciador de Contatos');

            cy.get('nav a').contains('Adicionar Contato').click();
            cy.url().should('include', '/adicionar');
            cy.get('h2').should('contain', 'Adicionar Contato');

            cy.get('nav a').contains('Lista de Contatos').click();
            cy.url().should('eq', Cypress.config('baseUrl') + '/');
        });

        it('deve destacar página ativa na navegação', () => {
            cy.get('nav a').contains('Lista de Contatos')
                .should('have.css', 'background-color')
                .and('not.equal', 'rgba(0, 0, 0, 0)');

            cy.get('nav a').contains('Adicionar Contato').click();
            cy.get('nav a').contains('Adicionar Contato')
                .should('have.css', 'background-color')
                .and('not.equal', 'rgba(0, 0, 0, 0)');
        });
    });

    describe('Navegação com Estados', () => {
        it('deve manter contexto ao navegar para edição', () => {
            cy.addContact('Teste Navegação', 'nav@test.com', '(11) 99999-9999');
            cy.visit('/');

            cy.get('[data-cy="edit-button"]').click();

            cy.url().should('include', '/editar');
            cy.get('#name').should('have.value', 'Teste Navegação');
        });

        it('deve limpar contexto ao cancelar edição', () => {
            cy.addContact('Teste Cancelar', 'cancelar@test.com', '(11) 99999-9999');
            cy.visit('/');

            cy.get('[data-cy="edit-button"]').click();
            cy.get('#name').clear().type('Nome Alterado');

            cy.get('button').contains('Cancelar').click();

            cy.get('[data-cy="edit-button"]').click();
            cy.get('#name').should('have.value', 'Teste Cancelar');
        });
    });

    describe('URLs e Rotas', () => {
        it('deve responder a URLs diretas', () => {
            cy.visit('/adicionar');
            cy.get('h2').should('contain', 'Adicionar Contato');

            cy.visit('/');
            cy.get('h2').should('contain', 'Lista de Contatos');
        });

        it('deve redirecionar após operações', () => {
            cy.visit('/adicionar');

            cy.get('#name').type('Teste Redirect');
            cy.get('#email').type('redirect@test.com');
            cy.get('#phone').type('(11) 99999-9999');
            cy.get('button[type="submit"]').click();

            cy.url().should('eq', Cypress.config('baseUrl') + '/');
        });
    });
});