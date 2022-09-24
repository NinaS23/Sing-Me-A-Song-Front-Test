import { faker } from "@faker-js/faker"

const API_BASE_URL = "http://localhost:6003"

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
    it('upvote a recommendation , sucess', () => {
        const recommendation = {
          name: faker.random.word(),
          youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
        }
    
        cy.visit("http://localhost:3000/");
        cy.createRecommendation(recommendation);
    
    
        cy.MultiClick(`[data-cy=${recommendation.name}]`, 13)
     
        cy.intercept("POST", "/recommendations/2/upvote").as("upvote");
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



describe("get top", () => {
    it("more likes", async () => {
      cy.visit("http://localhost:3000/top");
  
      cy.intercept("GET", `${API_BASE_URL}/recommendations/top/2`).as(
        "showTopRecommendations"
      );
      cy.wait("@showTopRecommendations");
  
      cy.url().should("equal", "http://localhost:3000/top");
  
      cy.get("article").should(($article) => {
        expect($article).to.have.length.of.at.most(1);
      });
    });
  });
