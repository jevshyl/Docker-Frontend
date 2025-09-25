describe("Try to add list element without login", () => {

    it("Should not access the page and get redirected", () => {
        cy.visit("/profileList/0d8fa44c-54fd-4cd0-ace9-2a7da57992de");
        cy.url().should('include', '/login');
    });
});
