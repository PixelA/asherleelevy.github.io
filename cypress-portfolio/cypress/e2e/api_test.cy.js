describe("Public API Tests", () => {
  it("verifies a GET request to JSONPlaceholder API", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts/1").then(
      (response) => {
        expect(response.status).to.eq(200);

        expect(response.body).to.include({
          id: 1,
          userId: 1,
        });

        expect(response.body.title).to.be.a("string").and.not.be.empty;
        expect(response.body.body).to.be.a("string").and.not.be.empty;
      },
    );
  });

  it("creates a new resource with a POST request", () => {
    cy.request({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      body: {
        title: "Cypress Portfolio Test",
        body: "This is a sample post created by Cypress.",
        userId: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);

      expect(response.body).to.include({
        title: "Cypress Portfolio Test",
        body: "This is a sample post created by Cypress.",
        userId: 1,
      });

      expect(response.body.id).to.exist;
    });
  });
});
