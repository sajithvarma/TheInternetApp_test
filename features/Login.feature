@login
Feature: Login to The Internet Page
  @valid
  Scenario: Login with Valid Credentials
    Given The login page with title "The Internet" is open
    And I enter user credentials
    #as "tomsmith" and "SuperSecretPassword!"
    When I click the Login button
    Then the Secure Area Page is opened

    #test