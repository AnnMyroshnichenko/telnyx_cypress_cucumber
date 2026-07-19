Feature: AI Chat Widget

  Background:
    Given I open the homepage

  Scenario: Verify AI Chat Widget Opens
    When I open the AI chat widget
    Then the AI chat window should be displayed

  Scenario: Verify AI Chat Widget Accepts User Input
    Given the AI chat widget is open
    When I enter "Hello" into the chat input
    And I send the message
    Then the message "Hello" should appear in the chat history

  Scenario: Verify AI Chat Widget Can Be Closed
    Given the AI chat widget is open
    When I click the chat widget close button
    Then the AI chat widget should be closed
    And the chat launcher should remain visible