Cypress.Commands.add('addContact', (name, email, phone) => {
    cy.visit('/adicionar');
    cy.get('#name').type(name);
    cy.get('#email').type(email);
    cy.get('#phone').type(phone);
    cy.get('button[type="submit"]').click();
});