import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import voiceAIAgentsPage from "../page_objects/voiceAIAgentsPage";
import navigation from "../../fixtures/navigation.json";

Given("I open the Voice AI Agents page", () => {
  cy.visit(navigation.voiceAiAgentsUrl);
});

When("I click the Telnyx logo", () => {
  voiceAIAgentsPage.elements.logo().should("be.visible").click();
});

Then("I should be redirected to the homepage", () => {
  cy.location("pathname").should("eq", navigation.homeUrl);
});