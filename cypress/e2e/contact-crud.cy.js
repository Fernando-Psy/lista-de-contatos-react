describe('CRUD de Contatos - Testes Simplificados', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    describe('Inclusão de Contatos', () => {
        it('deve criar um novo contato com sucesso', () => {
            cy.get('nav a').contains('Adicionar Contato').click();

            cy.get('#name').type('João Silva');
            cy.get('#email').type('joao@example.com');
            cy.get('#phone').type('(11) 99999-9999');

            cy.get('button[type="submit"]').click();

            cy.url().should('eq', Cypress.config('baseUrl') + '/');

            cy.get('[data-cy="contact-item"]').should('have.length', 1);
            cy.get('[data-cy="contact-name"]').should('contain', 'João Silva');
            cy.get('[data-cy="contact-email"]').should('contain', 'joao@example.com');
            cy.get('[data-cy="contact-phone"]').should('contain', '(11) 99999-9999');
        });

        it('deve validar campos obrigatórios', () => {
            cy.visit('/adicionar');

            cy.window().then((win) => {
                cy.stub(win, 'alert').as('alert');
            });

            cy.get('button[type="submit"]').click();
            cy.get('@alert').should('have.been.calledWith', 'Por favor, preencha todos os campos!');
        });
    });

    describe('Edição de Contatos', () => {
        beforeEach(() => {
            cy.addContact('João Original', 'joao.original@test.com', '(11) 99999-0000');
            cy.visit('/');
        });

        it('deve editar contato com sucesso', () => {
            cy.get('[data-cy="edit-button"]').click();

            cy.url().should('include', '/editar');
            cy.get('h2').should('contain', 'Editar Contato');

            cy.get('#name').should('have.value', 'João Original');
            cy.get('#email').should('have.value', 'joao.original@test.com');
            cy.get('#phone').should('have.value', '(11) 99999-0000');

            cy.get('#name').clear().type('João Editado');
            cy.get('#email').clear().type('joao.editado@test.com');
            cy.get('#phone').clear().type('(11) 88888-8888');

            cy.get('button[type="submit"]').click();

            cy.url().should('eq', Cypress.config('baseUrl') + '/');
            cy.get('[data-cy="contact-name"]').should('contain', 'João Editado');
            cy.get('[data-cy="contact-email"]').should('contain', 'joao.editado@test.com');
            cy.get('[data-cy="contact-phone"]').should('contain', '(11) 88888-8888');
        });

        it('deve cancelar edição sem salvar', () => {
            cy.get('[data-cy="edit-button"]').click();

            cy.get('#name').clear().type('Nome que não deve ser salvo');

            cy.get('button').contains('Cancelar').click();

            cy.url().should('eq', Cypress.config('baseUrl') + '/');
            cy.get('[data-cy="contact-name"]').should('contain', 'João Original');
        });
    });

    describe('Exclusão de Contatos', () => {
        beforeEach(() => {
            cy.addContact('Contato Para Excluir', 'excluir@test.com', '(11) 99999-9999');
            cy.visit('/');
        });

        it('deve excluir contato após confirmação', () => {
            cy.window().then((win) => {
                cy.stub(win, 'confirm').returns(true).as('confirm');
            });

            cy.get('[data-cy="delete-button"]').click();

            cy.get('@confirm').should('have.been.calledWith', 'Tem certeza que deseja excluir o contato Contato Para Excluir?');

            cy.get('[data-cy="contact-item"]').should('not.exist');
            cy.get('[data-cy="empty-message"]').should('contain', 'Nenhum contato adicionado ainda');
        });

        it('deve cancelar exclusão quando negada', () => {
            cy.window().then((win) => {
                cy.stub(win, 'confirm').returns(false).as('confirm');
            });

            cy.get('[data-cy="delete-button"]').click();

            cy.get('[data-cy="contact-item"]').should('exist');
            cy.get('[data-cy="contact-name"]').should('contain', 'Contato Para Excluir');
        });
    });

    describe('Fluxo Completo CRUD', () => {
        it('deve realizar ciclo completo: criar, editar e excluir contato', () => {
            cy.visit('/adicionar');
            cy.get('#name').type('Teste Completo');
            cy.get('#email').type('teste@example.com');
            cy.get('#phone').type('(11) 99999-9999');
            cy.get('button[type="submit"]').click();

            cy.get('[data-cy="contact-item"]').should('have.length', 1);
            cy.get('[data-cy="contact-name"]').should('contain', 'Teste Completo');

            cy.get('[data-cy="edit-button"]').click();
            cy.get('#name').clear().type('Teste Editado');
            cy.get('button[type="submit"]').click();

            cy.get('[data-cy="contact-name"]').should('contain', 'Teste Editado');

            cy.window().then((win) => {
                cy.stub(win, 'confirm').returns(true);
            });

            cy.get('[data-cy="delete-button"]').click();

            cy.get('[data-cy="contact-item"]').should('not.exist');
            cy.get('[data-cy="empty-message"]').should('contain', 'Nenhum contato adicionado ainda');
        });
    });
});