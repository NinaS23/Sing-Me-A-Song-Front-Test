
Cypress.Commands.add("resetDatabase", (recommendation) => {
    cy.request("POST", "http://localhost:5000/recommendations/reset", recommendation);
});
