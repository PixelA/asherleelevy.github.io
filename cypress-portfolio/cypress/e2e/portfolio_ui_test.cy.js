const URL = "https://example.cypress.io";

describe("Example Cypress site UI test", () => {
  const ensureDesktopNav = () => {
    cy.viewport(1280, 900);
    cy.get("#navbar").should("be.visible");
    // If hamburger is visible, open it
    cy.get("button.navbar-toggle").then(($btn) => {
      if ($btn.is(":visible")) {
        cy.wrap($btn).click();
      }
    });
  };

  const openCommands = () => {
    // Hover the parent <li> to reveal dropdown
    cy.get("#navbar")
      .contains("li", "Commands")
      .as("commandsLi")
      .trigger("mouseenter");
    cy.get("@commandsLi")
      .find(".dropdown-menu")
      .then(($menu) => {
        if ($menu.css("display") === "none") {
          // Fallback: force the menu to show
          cy.wrap($menu).invoke("show").should("be.visible");
        } else {
          cy.wrap($menu).should("be.visible");
        }
      });
  };

  beforeEach(() => {
    cy.visit(URL);
    ensureDesktopNav();
  });

  it("should load successfully", () => {
    cy.title().should("include", "Cypress");
    cy.get(".banner").should("be.visible", "include", "Kitchen Sink");
  });

  it("should open all items in the Commands dropdown", () => {
    openCommands();

    // Capture labels up front
    cy.get("@commandsLi")
      .find(".dropdown-menu a")
      .should("have.length.greaterThan", 0)
      .then(($items) => {
        const labels = [...$items].map((el) => el.textContent.trim());

        // Visit each item by label
        cy.wrap(labels).each((label) => {
          // Reopen dropdown before each click
          openCommands();

          cy.contains(".dropdown-menu a", label)
            .scrollIntoView()
            .invoke("removeAttr", "target") // stay in same tab
            .click();

          // Basic assertion on destination
          cy.get("h1,h2,[data-cy],main").first().should("contain.text", label);

          // Return home for next item
          cy.visit(URL);
          ensureDesktopNav();
        });
      });
  });
});
