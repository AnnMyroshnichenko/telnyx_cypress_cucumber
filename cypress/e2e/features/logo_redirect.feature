Feature: Navigation

  Scenario: Verify Logo Redirects to Homepage
    Given I open the Voice AI Agents page
    When I click the Telnyx logo
    Then I should be redirected to the homepage