import { faker } from "@faker-js/faker";


before(async () => {
  await cy.resetDatabase()
});



describe('test for upvote a recommendation', () => {   
    it('upvote a recommendation , sucess', () => {
      const recommendation = {
        name: faker.random.word(),
        youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
      }
  
      cy.visit("http://localhost:3000/");
      cy.createRecommendation(recommendation);
  
  
      cy.MultiClick(`[data-cy=${recommendation.name}]`, 10)
   
      cy.intercept("POST", "/recommendations/1/upvote").as("upvote");
      cy.url().should("equal", "http://localhost:3000/");
    })

})

describe('test for upvote a recommendation', () => {
  it('create 3 recommendation', () => {
      const recommendation = {
          name: faker.random.word(),
          youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
      }
      const recommendation2 = {
          name: faker.random.word(),
          youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
      }
      const recommendation3 = {
          name: faker.random.word(),
          youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
      }


      cy.visit("http://localhost:3000/");

      cy.createRecommendation(recommendation);
      cy.createRecommendation(recommendation2);
      cy.createRecommendation(recommendation3);
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