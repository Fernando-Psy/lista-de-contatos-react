describe('CRUD de Contatos - Testes Detalhados', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    describe('CREATE - Criação de Contatos', () => {
        it('deve criar contato com dados válidos', () => {
            const contact = {
                name: 'Ana Carolina',
                email: 'ana.carolina@test.com',
                phone: '(11) 99999-0001'
            };

            cy.visit('/adicionar');

            cy.get('#name').type(contact.name);
            cy.get('#email').type(contact.email);
            cy.get('#phone').type(contact.phone);

            cy.get('button[type="submit"]').click();

            cy.url().should('eq', Cypress.config('baseUrl') + '/');
            cy.get('[data-cy="contact-item"]').should('have.length', 1);
            cy.get('[data-cy="contact-name"]').should('contain', contact.name);
            cy.get('[data-cy="contact-email"]').should('contain', contact.email);
            cy.get('[data-cy="contact-phone"]').should('contain', contact.phone);
        });

        it('deve validar campos obrigatórios', () => {
            cy.visit('/adicionar');

            // Interceptar window.alert
            cy.window().then((win) => {
                cy.stub(win, 'alert').as('alert');
            });

            // Tentar submeter formulário vazio
            cy.get('button[type="submit"]').click();
            cy.get('@alert').should('have.been.calledWith', 'Por favor, preencha todos os campos!');

            // Tentar com apenas nome
            cy.get('#name').type('João');
            cy.get('button[type="submit"]').click();
            cy.get('@alert').should('have.been.calledWith', 'Por favor, preencha todos os campos!');

            // Tentar com nome e email
            cy.get('#email').type('joao@test.com');
            cy.get('button[type="submit"]').click();
            cy.get('@alert').should('have.been.calledWith', 'Por favor, preencha todos os campos!');
        });

        it('deve criar múltiplos contatos', () => {
            const contacts = [
                { name: 'João Silva', email: 'joao@test.com', phone: '(11) 99999-0001' },
                { name: 'Maria Santos', email: 'maria@test.com', phone: '(11) 99999-0002' },
                { name: 'Pedro Costa', email: 'pedro@test.com', phone: '(11) 99999-0003' }
            ];

            contacts.forEach((contact, index) => {
                cy.visit('/adicionar');
                cy.get('#name').type(contact.name);
                cy.get('#email').type(contact.email);
                cy.get('#phone').type(contact.phone);
                cy.get('button[type="submit"]').click();

                cy.get('[data-cy="contact-item"]').should('have.length', index + 1);
            });

            cy.get('h2').should('contain', `Lista de Contatos (${contacts.length})`);
        });
    });

    describe('READ - Leitura e Busca de Contatos', () => {
        beforeEach(() => {
            // Adicionar contatos de teste
            const testContacts = [
                { name: 'Alice Johnson', email: 'alice@company.com', phone: '(11) 91111-1111' },
                { name: 'Bob Smith', email: 'bob@startup.com', phone: '(21) 92222-2222' },
                { name: 'Carol Brown', email: 'carol@freelance.com', phone: '(31) 93333-3333' }
            ];

            testContacts.forEach(contact => {
                cy.addContact(contact.name, contact.email, contact.phone);
            });
            cy.visit('/');
        });

        it('deve exibir todos os contatos', () => {
            cy.get('[data-cy="contact-item"]').should('have.length', 3);
            cy.get('h2').should('contain', 'Lista de Contatos (3)');
        });

        it('deve buscar por nome parcial', () => {
            cy.get('[data-cy="search-input"]').type('Alice');
            cy.get('[data-cy="contact-item"]').should('have.length', 1);
            cy.get('[data-cy="contact-name"]').should('contain', 'Alice Johnson');
        });

        it('deve buscar ignorando maiúsculas/minúsculas', () => {
            cy.get('[data-cy="search-input"]').type('bob');
            cy.get('[data-cy="contact-item"]').should('have.length', 1);
            cy.get('[data-cy="contact-name"]').should('contain', 'Bob Smith');
        });

        it('deve buscar por domínio de email', () => {
            cy.get('[data-cy="search-input"]').type('startup');
            cy.get('[data-cy="contact-item"]').should('have.length', 1);
            cy.get('[data-cy="contact-email"]').should('contain', 'bob@startup.com');
        });

        it('deve buscar por parte do telefone', () => {
            cy.get('[data-cy="search-input"]').type('93333');
            cy.get('[data-cy="contact-item"]').should('have.length', 1);
            cy.get('[data-cy="contact-phone"]').should('contain', '(31) 93333-3333');
        });

        it('deve mostrar mensagem quando não encontrar resultados', () => {
            cy.get('[data-cy="search-input"]').type('Inexistente');
            cy.get('[data-cy="contact-item"]').should('not.exist');
            cy.get('[data-cy="empty-message"]').should('contain', 'Nenhum contato encontrado para "Inexistente"');
        });

        it('deve limpar busca e mostrar todos os contatos', () => {
            cy.get('[data-cy="search-input"]').type('Alice');
            cy.get('[data-cy="contact-item"]').should('have.length', 1);

            cy.get('[data-cy="search-input"]').clear();
            cy.get('[data-cy="contact-item"]').should('have.length', 3);
        });
    });

    describe('UPDATE - Edição de Contatos', () => {
        beforeEach(() => {
            cy.addContact('João Original', 'joao.original@test.com', '(11) 99999-0000');
            cy.visit('/');
        });

        it('deve editar todos os campos do contato', () => {
            cy.get('[data-cy="edit-button"]').click();

            cy.url().should('include', '/editar');
            cy.get('h2').should('contain', 'Editar Contato');

            // Verificar se campos estão pré-preenchidos
            cy.get('#name').should('have.value', 'João Original');
            cy.get('#email').should('have.value', 'joao.original@test.com');
            cy.get('#phone').should('have.value', '(11) 99999-0000');

            // Editar todos os campos
            cy.get('#name').clear().type('João Editado');
            cy.get('#email').clear().type('joao.editado@test.com');
            cy.get('#phone').clear().type('(11) 88888-8888');

            cy.get('button[type="submit"]').click();

            // Verificar se foi salvo
            cy.url().should('eq', Cypress.config('baseUrl') + '/');
            cy.get('[data-cy="contact-name"]').should('contain', 'João Editado');
            cy.get('[data-cy="contact-email"]').should('contain', 'joao.editado@test.com');
            cy.get('[data-cy="contact-phone"]').should('contain', '(11) 88888-8888');
        });

        it('deve editar apenas um campo', () => {
            cy.get('[data-cy="edit-button"]').click();

            // Editar apenas o nome
            cy.get('#name').clear().type('João Apenas Nome Editado');
            cy.get('button[type="submit"]').click();

            // Verificar se apenas nome foi alterado
            cy.get('[data-cy="contact-name"]').should('contain', 'João Apenas Nome Editado');
            cy.get('[data-cy="contact-email"]').should('contain', 'joao.original@test.com');
            cy.get('[data-cy="contact-phone"]').should('contain', '(11) 99999-0000');
        });

        it('deve cancelar edição sem salvar', () => {
            cy.get('[data-cy="edit-button"]').click();

            // Fazer alterações
            cy.get('#name').clear().type('Nome que não deve ser salvo');
            cy.get('#email').clear().type('email.nao.salvo@test.com');

            // Cancelar
            cy.get('button').contains('Cancelar').click();

            // Verificar se valores originais foram mantidos
            cy.url().should('eq', Cypress.config('baseUrl') + '/');
            cy.get('[data-cy="contact-name"]').should('contain', 'João Original');
            cy.get('[data-cy="contact-email"]').should('contain', 'joao.original@test.com');
        });

        it('deve validar campos obrigatórios na edição', () => {
            cy.get('[data-cy="edit-button"]').click();

            cy.window().then((win) => {
                cy.stub(win, 'alert').as('alert');
            });

            // Limpar campo obrigatório
            cy.get('#name').clear();
            cy.get('button[type="submit"]').click();

            cy.get('@alert').should('have.been.calledWith', 'Por favor, preencha todos os campos!');
        });
    });

    describe('DELETE - Exclusão de Contatos', () => {
        beforeEach(() => {
            cy.addContact('Contato Para Excluir', 'excluir@test.com', '(11) 99999-9999');
            cy.visit('/');
        });

        it('deve excluir contato após confirmação', () => {
            // Stub window.confirm para aceitar exclusão
            cy.window().then((win) => {
                cy.stub(win, 'confirm').returns(true).as('confirm');
            });

            cy.get('[data-cy="delete-button"]').click();

            cy.get('@confirm').should('have.been.calledWith', 'Tem certeza que deseja excluir o contato Contato Para Excluir?');

            // Verificar se contato foi removido
            cy.get('[data-cy="contact-item"]').should('not.exist');
            cy.get('[data-cy="empty-message"]').should('contain', 'Nenhum contato adicionado ainda');
            cy.get('h2').should('contain', 'Lista de Contatos (0)');
        });

        it('deve cancelar exclusão quando negada', () => {
            // Stub window.confirm para negar exclusão
            cy.window().then((win) => {
                cy.stub(win, 'confirm').returns(false).as('confirm');
            });

            cy.get('[data-cy="delete-button"]').click();

            cy.get('@confirm').should('have.been.calledWith', 'Tem certeza que deseja excluir o contato Contato Para Excluir?');

            // Verificar se contato ainda existe
            cy.get('[data-cy="contact-item"]').should('exist');
            cy.get('[data-cy="contact-name"]').should('contain', 'Contato Para Excluir');
            cy.get('h2').should('contain', 'Lista de Contatos (1)');
        });

        it('deve excluir contato específico em lista com múltiplos', () => {
            // Adicionar mais contatos
            cy.addContact('Contato 1', 'contato1@test.com', '(11) 11111-1111');
            cy.addContact('Contato 2', 'contato2@test.com', '(11) 22222-2222');
            cy.visit('/');

            cy.window().then((win) => {
                cy.stub(win, 'confirm').returns(true);
            });

            // Excluir o segundo contato (índice 1)
            cy.get('[data-cy="contact-item"]').eq(1).find('[data-cy="delete-button"]').click();

            // Verificar se apenas um contato foi removido
            cy.get('[data-cy="contact-item"]').should('have.length', 2);
            cy.get('h2').should('contain', 'Lista de Contatos (2)');

            // Verificar se o contato correto foi removido
            cy.get('[data-cy="contact-name"]').should('not.contain', 'Contato 1');
            cy.get('[data-cy="contact-name"]').should('contain', 'Contato Para Excluir');
            cy.get('[data-cy="contact-name"]').should('contain', 'Contato 2');
        });
    });

    describe('Fluxos Integrados', () => {
        it('deve realizar fluxo completo: criar, buscar, editar e excluir', () => {
            // 1. Criar contato
            cy.visit('/adicionar');
            cy.get('#name').type('Teste Fluxo Completo');
            cy.get('#email').type('fluxo@test.com');
            cy.get('#phone').type('(11) 99999-9999');
            cy.get('button[type="submit"]').click();

            // Verificar criação
            cy.get('[data-cy="contact-item"]').should('have.length', 1);
            cy.get('h2').should('contain', 'Lista de Contatos (1)');

            // 2. Buscar contato
            cy.get('[data-cy="search-input"]').type('Fluxo');
            cy.get('[data-cy="contact-item"]').should('have.length', 1);
            cy.get('[data-cy="contact-name"]').should('contain', 'Teste Fluxo Completo');

            // Limpar busca
            cy.get('[data-cy="search-input"]').clear();

            // 3. Editar contato
            cy.get('[data-cy="edit-button"]').click();
            cy.get('#name').clear().type('Teste Fluxo Editado');
            cy.get('button[type="submit"]').click();

            // Verificar edição
            cy.get('[data-cy="contact-name"]').should('contain', 'Teste Fluxo Editado');

            // 4. Excluir contato
            cy.window().then((win) => {
                cy.stub(win, 'confirm').returns(true);
            });

            cy.get('[data-cy="delete-button"]').click();

            // Verificar exclusão
            cy.get('[data-cy="contact-item"]').should('not.exist');
            cy.get('[data-cy="empty-message"]').should('contain', 'Nenhum contato adicionado ainda');
        });

        it('deve manter estado da busca após operações', () => {
            // Criar múltiplos contatos
            cy.addContact('Alice Test', 'alice@test.com', '(11) 11111-1111');
            cy.addContact('Bob Test', 'bob@test.com', '(11) 22222-2222');
            cy.addContact('Charlie Test', 'charlie@test.com', '(11) 33333-3333');
            cy.visit('/');

            // Buscar por "Alice"
            cy.get('[data-cy="search-input"]').type('Alice');
            cy.get('[data-cy="contact-item"]').should('have.length', 1);

            // Editar contato encontrado
            cy.get('[data-cy="edit-button"]').click();
            cy.get('#name').clear().type('Alice Editada');
            cy.get('button[type="submit"]').click();

            // Verificar se busca foi limpa após edição
            cy.get('[data-cy="search-input"]').should('have.value', '');
            cy.get('[data-cy="contact-item"]').should('have.length', 3);
        });
    });

    describe('Validações de Interface', () => {
        it('deve exibir placeholders corretos nos campos', () => {
            cy.visit('/adicionar');

            cy.get('#name').should('have.attr', 'placeholder', 'Digite o nome completo');
            cy.get('#email').should('have.attr', 'placeholder', 'Digite o email');
            cy.get('#phone').should('have.attr', 'placeholder', 'Digite o telefone');
        });

        it('deve exibir labels corretos', () => {
            cy.visit('/adicionar');

            cy.get('label[for="name"]').should('contain', 'Nome:');
            cy.get('label[for="email"]').should('contain', 'Email:');
            cy.get('label[for="phone"]').should('contain', 'Telefone:');
        });

        it('deve exibir ícones corretos nos detalhes do contato', () => {
            cy.addContact('Teste Ícones', 'icones@test.com', '(11) 99999-9999');
            cy.visit('/');

            // Verificar se elementos com ícones estão presentes
            cy.get('[data-cy="contact-email"]').should('exist');
            cy.get('[data-cy="contact-phone"]').should('exist');
        });

        it('deve exibir botões com textos corretos', () => {
            cy.addContact('Teste Botões', 'botoes@test.com', '(11) 99999-9999');
            cy.visit('/');

            cy.get('[data-cy="edit-button"]').should('contain', 'Editar');
            cy.get('[data-cy="delete-button"]').should('contain', 'Excluir');

            cy.get('[data-cy="edit-button"]').click();
            cy.get('button[type="submit"]').should('contain', 'Salvar');
            cy.get('button').contains('Cancelar').should('exist');
        });
    });

    describe('Responsividade e Acessibilidade', () => {
        it('deve funcionar em diferentes tamanhos de tela', () => {
            // Teste mobile
            cy.viewport(375, 667);
            cy.visit('/');
            cy.get('h1').should('be.visible');
            cy.get('nav').should('be.visible');

            // Teste tablet
            cy.viewport(768, 1024);
            cy.visit('/adicionar');
            cy.get('form').should('be.visible');

            // Teste desktop
            cy.viewport(1920, 1080);
            cy.visit('/');
            cy.get('[data-cy="search-input"]').should('be.visible');
        });

        it('deve permitir navegação por teclado', () => {
            cy.visit('/adicionar');

            // Navegar pelos campos usando Tab
            cy.get('#name').focus().type('Teste Teclado');
            cy.get('#name').tab();
            cy.focused().should('have.id', 'email');

            cy.get('#email').type('teclado@test.com');
            cy.get('#email').tab();
            cy.focused().should('have.id', 'phone');

            cy.get('#phone').type('(11) 99999-9999');

            // Submeter usando Enter
            cy.get('form').submit();

            cy.url().should('eq', Cypress.config('baseUrl') + '/');
            cy.get('[data-cy="contact-name"]').should('contain', 'Teste Teclado');
        });

        it('deve ter labels associados aos inputs', () => {
            cy.visit('/adicionar');

            cy.get('label[for="name"]').should('exist');
            cy.get('label[for="email"]').should('exist');
            cy.get('label[for="phone"]').should('exist');

            // Verificar associação label-input
            cy.get('label[for="name"]').click();
            cy.focused().should('have.id', 'name');
        });
    });

    describe('Tratamento de Erros', () => {
        it('deve tratar erro de formulário inválido', () => {
            cy.visit('/adicionar');

            // Tentar submeter email inválido
            cy.get('#name').type('Teste Email Inválido');
            cy.get('#email').type('email-invalido');
            cy.get('#phone').type('(11) 99999-9999');

            cy.get('button[type="submit"]').click();

            // Verificar se navegador mostra erro de validação
            cy.get('#email:invalid').should('exist');
        });

        it('deve manter dados do formulário após erro', () => {
            cy.visit('/adicionar');

            cy.window().then((win) => {
                cy.stub(win, 'alert').as('alert');
            });

            cy.get('#name').type('Nome Teste');
            cy.get('#email').type('email@test.com');
            // Não preencher telefone

            cy.get('button[type="submit"]').click();
            cy.get('@alert').should('have.been.called');

            // Verificar se dados permanecem
            cy.get('#name').should('have.value', 'Nome Teste');
            cy.get('#email').should('have.value', 'email@test.com');
        });
    });
});