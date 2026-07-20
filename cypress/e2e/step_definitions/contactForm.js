import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";

import contactUsPage from "../page_objects/contactUsPage";
import navigation from "../../test_data/navigation.json";
import validationMessages from "../../test_data/validationMessages.json";

Given("I open the Contact Us page", () => {
  cy.visit(navigation.contactFormUrl);
});

When("I submit the contact form without filling any fields", () => {
  contactUsPage.elements.contactForm().should("be.visible");
  contactUsPage.submit();
});

Then("the Reason field should be marked as required", () => {
  cy.location("pathname").should("eq", navigation.contactFormUrl);
  contactUsPage.elements.reasonSelect().should("have.attr", "aria-invalid", "true");
  contactUsPage.elements.reasonSelectError().should("be.visible").and("contain", validationMessages.requiredFieldMessage);
});

Given("I fill the contact form with valid data except the business email", () => {
  contactUsPage.selectReason("Support");
  contactUsPage.typeFirstName(faker.person.firstName());
  contactUsPage.typeLastName(faker.person.lastName());
});

When("I enter an invalid business email", () => {
  let invalidEmail = `${faker.internet.username()}gmail.com`;
  contactUsPage.typeBusinessEmail(invalidEmail);
  contactUsPage.elements.businessEmailInput().should("have.value", invalidEmail);
});

When("I submit the contact form", () => {
  contactUsPage.submit();
});

Then("the business email field should display a validation error", () => {
  contactUsPage.elements.businessEmailInput().should("have.attr", "aria-invalid", "true");
  contactUsPage.elements.emailError().should("be.visible").and("contain", validationMessages.emailValidationMessage);
});