import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import homePage from "../page_objects/homePage";
import contactUsPage from "../page_objects/contactUsPage";
import voiceAIAgentsPage from "../page_objects/voiceAIAgentsPage";
import solutionPage from "../page_objects/solutionPage";

import navigation from "../../test_data/navigation.json";
import sections from "../../test_data/sections.json";

Given("I open the homepage", () => {
  cy.visit(navigation.homeUrl);
});

When("I click the {string} button", (buttonName) => {
  homePage.clickButton(buttonName);
});

Then("I should be redirected to the Stack section", () => {
  cy.location("hash").should("eq", navigation.exploreStackSectionUrl);
  homePage.elements.stackSection().should("contain.text", sections.stack.stackSectionHeading);
});

Then("the Contact Us form should be displayed", () => {
  contactUsPage.elements.contactForm().should("be.visible");
  contactUsPage.elements.reasonSelect().should("be.visible");
  contactUsPage.elements.firstNameInput().should("be.visible");
  contactUsPage.elements.lastNameInput().should("be.visible");
  contactUsPage.elements.businessEmailInput().should("be.visible");
  contactUsPage.elements.websiteInput().should("be.visible");
});

When("I open the {string} tab", (tab) => {
  homePage.elements.agentPlatformSection().scrollIntoView();
  homePage.elements.tab(tab).click();
});

Then("it should become active", () => {
  homePage.elements.activeTab().should("have.attr", "aria-selected", "true");
  homePage.elements.activePanel().should("be.visible");
});

When("I open the Inference tab", () => {
  homePage.elements.agentPlatformSection().scrollIntoView().should("be.visible");
  homePage.elements.tab(sections.agentPlatform.inferenceTab).scrollIntoView().should("be.visible").click();
  homePage.elements.activeTab().should("contain.text", sections.agentPlatform.inferenceTab).and("have.attr", "aria-selected", "true");
});

Then("every AI model should be selectable", () => {
  sections.agentPlatform.models.forEach(model => {
    homePage.elements.modelButton(model).click().should("have.attr", "aria-pressed", "true");
  });
});

When("I select a language", () => {
  homePage.elements.languageSelector().should("be.visible").and("have.attr", "aria-expanded", "false").click();
  homePage.elements.languageDropdown().should("be.visible");
  homePage.elements.languageOption(sections.agentPlatform.language).click();
});

Then("the selected language should be displayed", () => {
  homePage.elements.languageSelector().should("contain.text", sections.agentPlatform.language);
});

Then("the language dropdown should close", () => {
  homePage.elements.languageSelector().should("have.attr", "aria-expanded", "false");
  homePage.elements.languageDropdown().should("not.exist");
});

When("I send a message", () => {
  homePage.elements.agentPlatformSection().scrollIntoView();
  homePage.elements.tab(sections.agentPlatform.inferenceTab).click();
  homePage.elements.messageInput().type(sections.agentPlatform.message);
  homePage.elements.sendMessageButton().click();
});

Then("the message should appear in the conversation", () => {
  homePage.elements.userMessage(sections.agentPlatform.message).should("be.visible");
});

Then("the Voice AI Agents page should open", () => {
  cy.location("pathname").should("eq", navigation.voiceAiAgentsUrl);
  voiceAIAgentsPage.elements.pageHeading().should("contain", sections.voiceAi.voiceAiSectionHeading);
});

Given("I scroll to the Solutions section", () => {
  homePage.elements.healthcarePanel().scrollIntoView().should("be.visible");
});

When("I hover over the Healthcare solution card", () => {
  homePage.elements.healthcarePanel().trigger("mouseover");
  homePage.elements.learnMoreButton().should("be.visible");
});

Then("I should be redirected to the Healthcare solution page", () => {
  cy.url().should("include", "/solutions/healthcare");
  cy.contains("h1", "Intelligent AI Agents for healthcare").should("be.visible");
});

Then("I should be redirected to the Sign Up page", () => {
  cy.url().should("include", navigation.signUpUrl);
  cy.get("h1").should("be.visible").and("contain.text", "Create your account");
});

When("I open the AI chat widget", () => {
  homePage.elements.chatLauncher().should('be.visible').and('not.be.disabled').click();;
});

Then("the AI chat window should be displayed", () => {
  homePage.elements.chatWindow().should('exist');
  homePage.elements.chatHeader().should('contain.text', 'Ask our');
  homePage.elements.chatInput().should('exist').and('have.attr', 'id', 'user-message-input');
});

Given("the AI chat widget is open", () => {
  homePage.elements.chatWindow().then(($widget) => {
  const isOpen = $widget.find("#user-message-input").length > 0;

  if (!isOpen) {
    homePage.elements.chatLauncher().click({ force: true });
  }
  });

  homePage.elements.chatInput().should("exist");
});

When("I enter {string} into the chat input", (message) => {
  homePage.elements.chatInput().should('exist').type(message, { force: true }).should('have.value', message);
});

When("I send the message", () => {
  homePage.elements.chatInput().type('{enter}', { force: true });
});

Then("the message {string} should appear in the chat history", (message) => {
  cy.contains(message, { includeShadowDom: true, timeout: 15000,}).should('exist');
});

When("I click the chat widget close button", () => {
  homePage.elements.chatCloseButton().should("exist").click({ force: true });
});

Then("the AI chat widget should be closed", () => {
  homePage.elements.chatInput().should("not.be.visible");
});

Then("the chat launcher should remain visible", () => {
  homePage.elements.chatLauncher().should("be.visible");
});