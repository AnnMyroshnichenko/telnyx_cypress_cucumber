Feature: Contact Form

  Background:
    Given I open the Contact Us page

  Scenario: Verify Contact Form Validation with Empty Fields
    When I submit the contact form without filling any fields
    Then the Reason field should be marked as required

  Scenario: Verify Business Email Field Validation
    Given I fill the contact form with valid data except the business email
    When I enter an invalid business email
    And I submit the contact form
    Then the business email field should display a validation error