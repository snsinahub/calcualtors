# PFML Calculators

This is the code repository for the PFML Benefits and Contribution Calculators:

- PFML Benefits Calculator
  - [Production](https://calculator.digital.mass.gov/pfml/yourbenefits)
  - [Development](https://calculator.digital.mass.gov/dev/pfml/yourbenefits)
- PFML Contribution Calculator
  - [Production](https://calculator.digital.mass.gov/pfml/contribution)
  - [Development](https://calculator.digital.mass.gov/dev/pfml/contribution)


## Quick Update Guide
To make a quick update to a variable in the PFML Benefits/Contribution Calculator, for examples, the statewide average wage, maximum weekly benefit amount, etc. that are used in calculating the PFML benefits or the SSI cap, etc. which is used in calculating contributions, you can follow these steps:

### 1. Go to the variable JSON file:
  - PFML Benefits Calculator Variables: https://github.com/massgov/calculators/blob/develop/PFML/BenefitsCalculator/src/data/BenefitsVariables.json
  - PFML Contribution Calculator Variables: https://github.com/massgov/calculators/blob/develop/PFML/ContributionCalculator/src/data/ContributionVariables.json
### 2. Create a new branch off of the develop branch
Use the prefix `pfml-benefits/` for changes specific to the PFML Benefits Calculator and `pfml-contribution/` for changes specific to the PFML Contribution Calculator. e.g. 
![Screen Shot 2021-05-19 at 1 57 33 PM](https://user-images.githubusercontent.com/5789411/118861165-32bb0300-b8aa-11eb-9c3b-d247ad161b04.png)
### 3. Click on edit this file
Make sure that you are on the branch that you just created
![Screen Shot 2021-05-19 at 2 00 47 PM](https://user-images.githubusercontent.com/5789411/118861578-a78e3d00-b8aa-11eb-9afe-775e5fe0e49a.png)
### 4. Commit your changes
After making your updates, save the changes to you branch by adding a message and create a commit.
![Screen Shot 2021-05-19 at 2 03 49 PM](https://user-images.githubusercontent.com/5789411/118861951-153a6900-b8ab-11eb-938f-05aea84b75cd.png)
### 5. Create a Pull Request
Go to the [Pull Requests tab](https://github.com/massgov/calculators/pulls), you should see your branch highlighted on the page. Click on "Compare & pull request" to make a pull request against the develop branch
### 6. Reach out to a DS team member for a code review on your changes
The DS team will take the following steps to release your changes:

  1.  Make sure the automatic tests pass on your branch 
  2.  **Squash and merge** the branch into `develop`
  3.  After all the tests passed on `develop`, check the Development URL and verify that the changes made are live
  4.  Make a PR from `develop` into `master` 
  5.  After all the tests passed on `master`, your changes should be live on the Production URL


## Local Development
For local development instructions and code breakdown, reference the READMEs:
https://github.com/massgov/calculators/tree/develop/PFML/BenefitsCalculator
https://github.com/massgov/calculators/tree/develop/PFML/ContributionCalculator
