describe("Public API Tests", () => {
  it("verifies a GET request to JSONPlaceholder API", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts/1").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id", 1);
        expect(response.body).to.have.property("title");
      }
    );
  });

  it("creates a new resource with POST request", () => {
    cy.request("POST", "https://jsonplaceholder.typicode.com/posts", {
      title: "Cypress Portfolio Test",
      body: "This is a sample post created by Cypress.",
      userId: 1,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("title", "Cypress Portfolio Test");
    });
  });
});
