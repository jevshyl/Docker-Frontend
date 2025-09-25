describe("Try to add list element for other user as user", () => {

    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-cy=email]').type("user@example.com");
        cy.get('[data-cy=password]').type("1234");
        cy.get('[data-cy=submit-login]').click();

        cy.request("POST", "http://localhost:8080/user/login", {
            email: "user@example.com",
            password: "1234"
        })
    })

    it("Should create a new list element successfully", () => {
        cy.visit("/users");
        cy.get('[data-cy=view-button]').eq(2).click();
        cy.get('[data-cy=addListElement]', { timeout: 15000 }).should("not.exist");

    });
});
