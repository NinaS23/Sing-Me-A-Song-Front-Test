
Cypress.Commands.add("createRecommendation", (recommendation) => {
    cy.request("POST", "http://localhost:6003/recommendations", recommendation);
});

Cypress.Commands.add("resetDatabase", (recommendation) => {
    cy.request("POST", 'http://localhost:6003/e2e/reset');
});
