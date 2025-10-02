describe("Try to add list element for other user as user", () => {

    beforeEach(() => {
        cy.visit("/login");
        cy.get('[data-cy=email]').type("admin@example.com");
        cy.get('[data-cy=password]').type("1234");
        cy.get('[data-cy=submit-login]').click();

        cy.request("POST", "http://localhost:8080/user/login", {
            email: "admin@example.com",
            password: "1234"
        })
    })

    it("Can't create own elements", () => {
        cy.visit("profileList/ba804cb9-fa14-42a5-afaf-be488742fc54");
        cy.get('[data-cy=addListElement]', { timeout: 15000 }).should("not.exist");

    });

    it("Can't create elements of other users", () => {
        cy.visit("/users");
        cy.get('[data-cy=view-button]').eq(2).click();
        cy.get('[data-cy=addListElement]', { timeout: 15000 }).should("not.exist");
    })
});
