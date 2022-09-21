import {faker} from "@faker-js/faker";

beforeEach( async () => {
 await cy.resetDatabase()
});

describe('test creation of a recommendation', () => {
  it('passes', () => {
    const recommendation = {
      name: faker.random.words(),
      link: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
    }
    cy.visit('http://localhost:3000/')
    cy.get('#name').type(recommendation.name);
    cy.get('#link').type(recommendation.link);

    cy.intercept("POST", "/recommendations").as("sendRecommendation");
    cy.get("button").click();
    cy.wait("@sendRecommendation");

    cy.url().should("equal", "http://localhost:3000/");
  })
})