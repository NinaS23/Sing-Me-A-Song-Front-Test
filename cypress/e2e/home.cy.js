import {faker} from "@faker-js/faker";

beforeEach( async () => {
 await cy.resetDatabase()
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

describe('test for upvote a recommendation', () => {
  it('upvote a recommendation , sucess', () => {
    const recommendation = {
      name: faker.random.word(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
    }

    cy.visit("http://localhost:3000/");
    cy.createRecommendation(recommendation);

    cy.get('[data-test-id="upvote"]').click();
 
    cy.intercept("POST", "/recommendations/1/upvote").as("upvote");
    cy.url().should("equal", "http://localhost:3000/");
  })

})


describe('test for downvote a recommendation', () => {
  it('dowvote a recommendation , sucess', () => {
    const recommendation = {
      name: faker.random.word(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
    }

    cy.visit("http://localhost:3000/");
    cy.createRecommendation(recommendation);

    cy.get('[data-test-id="downvote"]').click();

    cy.intercept("POST", "/recommendations/1/downvote").as("downvote");
    cy.url().should("equal", "http://localhost:3000/");
  })

  it('downvote five times should delete , sucess', () => {
    const recommendation = {
      name: faker.random.word(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
    }

    cy.visit("http://localhost:3000/");
    cy.createRecommendation(recommendation);

  
    cy.MultiClick('[data-test-id="downvote"]', 6)

    cy.intercept("POST", "/recommendations/1/downvote").as("downvote");
    cy.url().should("equal", "http://localhost:3000/");
  })
})