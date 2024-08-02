Feature: Users

  Scenario Outline: Create a user
    Given user information name "<name>" and email "<email>"
    When create user api call is performed
    Then user information name "<name>" and email "<email>" is received

    Examples:
      | name    | email               |
      | user{a} | user{a}@example.com |
