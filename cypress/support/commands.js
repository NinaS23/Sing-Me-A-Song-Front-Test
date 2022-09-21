
Cypress.Commands.add("resetDatabase", (recommendation) => {
    cy.request("POST", "http://localhost:6003/recommendations", recommendation);
});
