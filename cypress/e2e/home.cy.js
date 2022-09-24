import { faker } from "@faker-js/faker";

beforeEach(async () => {
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

  it(" should not create recommendation with duplicated name, sucess", () => {
    const recommendation = {
      name: "hatuna matata",
      youtubeLink: "https://www.youtube.com/watch?v=zDsE4BPuFRQ"
    }
    cy.visit("http://localhost:3000/");

    cy.createRecommendation(recommendation);
    cy.request({
      method: "POST",
      url: 'http://localhost:6003/recommendations',
      failOnStatusCode: false,
      body: recommendation
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body).to.eq("Recommendations names must be unique");
    });
    cy.on('window:alert', (t) => {
      expect(t).to.contains('Error creating recommendation!');
    })
  });

  it("should not create recommendation with no Data", () => {
    cy.visit("http://localhost:3000/");
      
      cy.get("button").click();

      cy.on("window:alert", (alert) => {
        expect(alert).to.contains("Error creating recommendation!");
      });

      cy.url().should("equal", "http://localhost:3000/");
      cy.get("#empty").should("contain.text", "No recommendations yet! Create your own :)")
  });
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
  });
})