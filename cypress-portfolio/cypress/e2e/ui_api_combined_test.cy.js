describe("UI + API Combined Test", () => {
  beforeEach(() => {
    // Visit a test site before each test
    cy.visit("https://example.cypress.io/commands/network-requests");
  });

  it("intercepts a GET request and validates the response", () => {
    // Intercept the GET call before the button triggers it
    cy.intercept("GET", "**/comments/*").as("getComment");

    // Trigger the request through the UI
    cy.contains("Get Comment").click();

    // Wait for the network call to complete
    cy.wait("@getComment").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property("body");
      expect(interception.response.body).to.have.property("email");
    });
  });

  it("simulates a POST request and verifies UI feedback", () => {
    // Intercept POST call
    cy.intercept("POST", "**/comments").as("postComment");

    // Trigger it through the button
    cy.contains("Post Comment").click();

    // Wait for the POST request to complete
    cy.wait("@postComment").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      expect(interception.response.body).to.have.property(
        "name",
        "Using POST in cy.intercept()"
      );
    });

    // Verify UI updates after the API call
    cy.get(".network-post-comment").should("contain", "POST successful!");
  });
});
