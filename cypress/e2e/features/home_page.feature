Feature: Homepage

  Background:
    Given I open the homepage

  Scenario: Verify "Explore the Stack" CTA Navigation
    When I click the "Explore the Stack" button
    Then I should be redirected to the Stack section

  Scenario: Verify "Talk to an Expert" CTA Navigation
    When I click the "Talk to an Expert" button
    Then the Contact Us form should be displayed

  Scenario: Verify Navigation Between Tabs in the Agent Platform Section
    When I open the "Speech to Text" tab
    Then it should become active

  Scenario: Verify Model List on the Inference tab
    When I open the Inference tab
    Then every AI model should be selectable

  Scenario: Verify Language Selector
    When I open the Inference tab
    And I select a language
    Then the selected language should be displayed
    And the language dropdown should close

  Scenario: Verify Send Message
    When I send a message
    Then the message should appear in the conversation

  Scenario: Verify Explore Our AI Assistant button
    When I click the "Explore Our AI Assistant" button
    Then the Voice AI Agents page should open

  Scenario: Verify Learn More navigation
    Given I scroll to the Solutions section
    When I hover over the Healthcare solution card
    And I click the "Learn More" button
    Then I should be redirected to the Healthcare solution page

  Scenario: Verify "Start Building" CTA Opens the Sign Up Page
    When I click the "Start Building" button
    Then I should be redirected to the Sign Up page