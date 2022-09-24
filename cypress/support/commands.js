
const API_BASE_URL = "http://localhost:6003"


Cypress.Commands.add("createRecommendation", (recommendation) => {
  cy.request("POST", `${API_BASE_URL}/recommendations`, recommendation);
});

Cypress.Commands.add("resetDatabase", (recommendation) => {
  cy.request("POST", `${API_BASE_URL}/e2e/reset`);
});

Cypress.Commands.add('MultiClick', (element, times) => {
  for (let n = 0; n < times; n++) {
    cy.get(element).click({ force: true })
  }
});

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.contains(`[data-cy=${selector}]`, ...args)
})