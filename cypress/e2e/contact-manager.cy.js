describe('Gerenciador de Contatos', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    describe('Página Inicial', () => {
        it('deve exibir o título da aplicação', () => {
            cy.get('h1').should('contain.text', 'Gerenciador de Contatos');
            cy.get('header p').should('contain.text', 'Adicione, edite e remova seus contatos');
        });

        it('deve exibir navegação com links corretos', () => {
            cy.get('nav').should('exist');
            cy.get('nav a').should('have.length', 2);
            cy.get('nav a').first().should('contain.text', 'Lista de Contatos');
            cy.get('nav a').last().should('contain.text', 'Adicionar Contato');
        });

        it('deve exibir mensagem quando não há contatos', () => {
            cy.get('[data-cy="empty-message"]').should('exist');
            cy.get('[data-cy="empty-message"]').should('contain.text', 'Nenhum contato adicionado ainda');
        });
    });

    describe('Adição de Contatos', () => {
        it('deve navegar para página de adição', () => {
            cy.get('nav a').contains('Adicionar Contato').click();
            cy.url().should('include', '/adicionar');
            cy.get('h2').should('contain.text', 'Adicionar Contato');
        });

        it('deve adicionar um novo contato com sucesso', () => {
            cy.get('nav a').contains('Adicionar Contato').click();

            cy.get('#name').type('João Silva');
            cy.get('#email').type('joao@example.com');
            cy.get('#phone').type('(11) 99999-9999');

            cy.get('button[type="submit"]').click();

            cy.url().should('eq', 'http://localhost:3000/');

            cy.get('[data-cy="contact-item"]').should('have.length', 1);
            cy.get('[data-cy="contact-name"]').should('contain.text', 'João Silva');
            cy.get('[data-cy="contact-email"]').should('contain.text', 'joao@example.com');
            cy.get('[data-cy="contact-phone"]').should('contain.text', '(11) 99999-9999');
        });

        it('deve exibir alerta quando campos obrigatórios não são preenchidos', () => {
            cy.get('nav a').contains('Adicionar Contato').click();

            cy.get('button[type="submit"]').click();

            cy.window().then((win) => {
                cy.stub(win, 'alert').as('windowAlert');
            });

            cy.get('button[type="submit"]').click();
            cy.get('@windowAlert').should('have.been.calledWith', 'Por favor, preencha todos os campos!');
        });

        it('deve limpar formulário ao cancelar', () => {
            cy.get('nav a').contains('Adicionar Contato').click();

            cy.get('#name').type('Teste');
            cy.get('#email').type('teste@test.com');
            cy.get('#phone').type('123456789');

            cy.get('button').contains('Cancelar').click();

            cy.url().should('eq', 'http://localhost:3000/');
        });
    });

    describe('Listagem e Busca de Contatos', () => {
        beforeEach(() => {
            cy.addContact('João Silva', 'joao@example.com', '(11) 99999-9999');
            cy.addContact('Maria Santos', 'maria@example.com', '(11) 88888-8888');
            cy.addContact('Pedro Costa', 'pedro@example.com', '(11) 77777-7777');
        });

        it('deve exibir contador de contatos', () => {
            cy.get('h2').should('contain.text', 'Lista de Contatos (3)');
        });

        it('deve buscar contatos por nome', () => {
            cy.get('[data-cy="search-input"]').type('João');
            cy.get('[data-cy="contact-item"]').should('have.length', 1);
            cy.get('[data-cy="contact-name"]').should('contain.text', 'João Silva');
        });

        it('deve buscar contatos por email', () => {
            cy.get('[data-cy="search-input"]').type('maria@example.com');
            cy.get('[data-cy="contact-item"]').should('have.length', 1);
            cy.get('[data-cy="contact-name"]').should('contain.text', 'Maria Santos');
        });

        it('deve buscar contatos por telefone', () => {
            cy.get('[data-cy="search-input"]').type('77777');
            cy.get('[data-cy="contact-item"]').should('have.length', 1);
            cy.get('[data-cy="contact-name"]').should('contain.text', 'Pedro Costa');
        });

        it('deve exibir mensagem quando nenhum contato é encontrado na busca', () => {
            cy.get('[data-cy="search-input"]').type('Contato Inexistente');
            cy.get('[data-cy="empty-message"]').should('contain.text', 'Nenhum contato encontrado para "Contato Inexistente"');
        });
    });

    describe('Edição de Contatos', () => {
        beforeEach(() => {
            cy.addContact('João Silva', 'joao@example.com', '(11) 99999-9999');
        });

        it('deve navegar para página de edição ao clicar em editar', () => {
            cy.get('[data-cy="edit-button"]').click();
            cy.url().should('include', '/editar');
            cy.get('h2').should('contain.text', 'Editar Contato');
        });

        it('deve pré-preencher formulário com dados do contato', () => {
            cy.get('[data-cy="edit-button"]').click();

            cy.get('#name').should('have.value', 'João Silva');
            cy.get('#email').should('have.value', 'joao@example.com');
            cy.get('#phone').should('have.value', '(11) 99999-9999');
        });

        it('deve editar contato com sucesso', () => {
            cy.get('[data-cy="edit-button"]').click();

            cy.get('#name').clear().type('João Silva Editado');
            cy.get('#email').clear().type('joao.editado@example.com');
            cy.get('#phone').clear().type('(11) 11111-1111');

            cy.get('button[type="submit"]').click();

            cy.url().should('eq', 'http://localhost:3000/');
            cy.get('[data-cy="contact-name"]').should('contain.text', 'João Silva Editado');
            cy.get('[data-cy="contact-email"]').should('contain.text', 'joao.editado@example.com');
            cy.get('[data-cy="contact-phone"]').should('contain.text', '(11) 11111-1111');
        });

        it('deve cancelar edição e voltar para lista', () => {
            cy.get('[data-cy="edit-button"]').click();

            cy.get('#name').clear().type('Nome Alterado');

            cy.get('button').contains('Cancelar').click();

            cy.url().should('eq', 'http://localhost:3000/');
            cy.get('[data-cy="contact-name"]').should('contain.text', 'João Silva');
        });
    });

    describe('Exclusão de Contatos', () => {
        beforeEach(() => {
            cy.addContact('João Silva', 'joao@example.com', '(11) 99999-9999');
        });

        it('deve exibir confirmação ao tentar excluir contato', () => {
            cy.window().then((win) => {
                cy.stub(win, 'confirm').returns(false).as('confirmDialog');
            });

            cy.get('[data-cy="delete-button"]').click();
            cy.get('@confirmDialog').should('have.been.calledWith', 'Tem certeza que deseja excluir o contato João Silva?');
        });

        it('deve excluir contato quando confirmado', () => {
            cy.window().then((win) => {
                cy.stub(win, 'confirm').returns(true);
            });

            cy.get('[data-cy="delete-button"]').click();

            cy.get('[data-cy="contact-item"]').should('not.exist');
            cy.get('[data-cy="empty-message"]').should('contain.text', 'Nenhum contato adicionado ainda');
        });

        it('não deve excluir contato quando cancelado', () => {
            cy.window().then((win) => {
                cy.stub(win, 'confirm').returns(false);
            });

            cy.get('[data-cy="delete-button"]').click();

            cy.get('[data-cy="contact-item"]').should('exist');
            cy.get('[data-cy="contact-name"]').should('contain.text', 'João Silva');
        });
    });

    describe('Navegação', () => {
        it('deve navegar entre páginas usando os links de navegação', () => {
            cy.url().should('eq', 'http://localhost:3000/');

            cy.get('nav a').contains('Adicionar Contato').click();
            cy.url().should('include', '/adicionar');

            cy.get('nav a').contains('Lista de Contatos').click();
            cy.url().should('eq', 'http://localhost:3000/');
        });

        it('deve destacar link ativo na navegação', () => {
            cy.get('nav a').contains('Lista de Contatos').should('have.css', 'background-color', 'rgb(21, 171, 146)');

            cy.get('nav a').contains('Adicionar Contato').click();
            cy.get('nav a').contains('Adicionar Contato').should('have.css', 'background-color', 'rgb(21, 171, 146)');
        });
    });
});

Cypress.Commands.add('addContact', (name, email, phone) => {
    cy.get('nav a').contains('Adicionar Contato').click();
    cy.get('#name').type(name);
    cy.get('#email').type(email);
    cy.get('#phone').type(phone);
    cy.get('button[type="submit"]').click();
});