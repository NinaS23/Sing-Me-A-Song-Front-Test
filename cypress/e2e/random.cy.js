import { faker } from "@faker-js/faker";


const API_BASE_URL = "http://localhost:6003"

before( () => {
   cy.resetDatabase()
});


describe('test creation of a recommendation', () => {
  it('create a recommendation with correct input schema, sucess', () => {
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


describe("Get recommendations suit test", () => {
  it("get random recommendation", () => {
    cy.visit("http://localhost:3000/random");
    cy.intercept("GET", "http://localhost:6003/recommendations/random").as(
      "showRecommendation"
    );

    cy.url().should("equal", "http://localhost:3000/random");
  
   
  });

})