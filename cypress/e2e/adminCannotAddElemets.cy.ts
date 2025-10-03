describe("Try to add list element for other user as user", () => {

    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-cy=email]').type("admin@example.com");
        cy.get('[data-cy=password]').type("1234");
        cy.get('[data-cy=submit-login]').click();

        cy.request("POST", "https://jevgenia.dev.noseryoung.ch/api/user/login", {
            email: "admin@example.com",
            password: "1234"
        }).its('status').should('eq', 200);
})

    it("Can't create own elements", () => {
        cy.visit("https://jevgenia.dev.noseryoung.ch/profileList/0d8fa44c-54fd-4cd0-ace9-2a7da57992de");
        cy.get('[data-cy=addListElement]', { timeout: 15000 }).should("not.exist");

    });

    it("Can't create elements of other users", () => {
        cy.visit("/users");
        cy.get('[data-cy=view-button]').eq(2).click();
        cy.get('[data-cy=addListElement]', { timeout: 15000 }).should("not.exist");
    })
});
