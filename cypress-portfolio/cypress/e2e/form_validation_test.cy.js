const URL = "https://example.cypress.io/commands/actions";

describe("Form-style validation on Actions page", () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  it("shows the email field and it is empty by default", () => {
    cy.get(".action-email").should("be.visible").and("have.value", "");
  });

  it("treats an invalid email format as invalid via HTML5 validation", () => {
    cy.get(".action-email").as("emailInput");

    cy.get("@emailInput").clear().type("not-a-valid-email");

    cy.get("@emailInput").then(($input) => {
      const input = $input[0];
      // Native browser validity check for obviously bad email
      expect(input.checkValidity()).to.eq(false);
    });
  });

  it("accepts a valid email string and updates the field value", () => {
    cy.get(".action-email").as("emailInput");

    const validEmail = "test@example.com";

    cy.get("@emailInput").clear().type(validEmail);

    cy.get("@emailInput").invoke("val").should("eq", validEmail);
  });
});
