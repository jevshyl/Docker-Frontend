describe("Add list element as user", () => {

    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-cy=email]').type("user@example.com");
        cy.get('[data-cy=password]').type("1234");
        cy.get('[data-cy=submit-login]').click();

        cy.request("POST", "https://jevgenia.dev.noseryoung.ch/api/user/login", {
            email: "user@example.com",
            password: "1234",
        }).its('status').should('eq', 200);
    })

    it("Should create a new list element successfully", () => {
        cy.visit("/profileList/0d8fa44c-54fd-4cd0-ace9-2a7da57992de");
        cy.get('[data-cy=addListElement]', { timeout: 15000 }).should("be.visible").click();

        cy.get('[data-cy=title]').click();
        cy.get('[data-cy=text]').click();
        cy.get('[data-cy=select]').click();
        cy.contains("Title is required", { timeout: 10000 }).should("be.visible");
        cy.contains("Text is required", { timeout: 10000 }).should("be.visible");
        cy.get('li[data-value="HIGH"]').click();
        cy.get('[data-cy=submit]').should('be.disabled');


        cy.get('[data-cy=addListElement]').click();
        cy.get('[data-cy=title]').type('My Test Title');
        cy.get('[data-cy=text]').type('This is a test description.');
        cy.get('[data-cy=select]').click();
        cy.get('li[data-value="HIGH"]').click();

        cy.get('[data-cy=submit]').click();

        cy.contains('My Test Title').should('be.visible');

    });
});
