
Cypress.Commands.add("createRecommendation", (recommendation) => {
  cy.request("POST", "http://localhost:6003/recommendations", recommendation);
});

Cypress.Commands.add("resetDatabase", (recommendation) => {
  cy.request("POST", 'http://localhost:6003/e2e/reset');
});

Cypress.Commands.add('MultiClick', (element, times) => {
  for (let n = 0; n < times; n++) {
    cy.get(element).click({ force: true })
  }
});

