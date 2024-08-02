Feature: Users

  Scenario Outline: Create a user
    Given user information name "<name>" and email "<email>"
    When create user api call is performed
    And all users are queried
    Then user information name "<name>" and email "<email>" is received
    And user name "<name>" and email "<email>" is present in result

    Examples:
      | name    | email               |
      | user{a} | user{a}@example.com |
