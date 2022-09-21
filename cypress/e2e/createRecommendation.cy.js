import {faker} from "@faker-js/faker";


describe('test creation of a recommendation', () => {
  const recommendation = {
    name: faker.random.words(),
    link: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
  }
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#name').type(recommendation.name);
    cy.get('#link').type(recommendation.link);

    cy.intercept("POST", "/recommendations").as("sendRecommendation");
    cy.get("button").click();
    cy.wait("@sendRecommendation");

    cy.url().should("equal", "http://localhost:3000/");
  })
})