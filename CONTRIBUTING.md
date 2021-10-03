# Contributing

## What is the workflow?

1 - Create and describe your proposal in an `issue` and create a `merge request` and branch 

2 - Create a new branch with o pattern `isse/MY_FEATURE`

3 - Write your tests BEFORE your code, MERGE REQUESTS WITHOUT TEST WILL BE REJECTED

4 - Commit your code using we coventional commit, COMMITS OUTSIDE THE CONVENTIONAL WILL BE REJECTED

5 - Write a docs for your changes, MERGE REQUESTS WITHOUT DOCS WILL BE REJECTED

6 - Generate a new CHANGELOG with yours commit using the script python below

7 - Generate a new tag for each new MINOR update in semantic version


## Conventional Commit and Semmantic Version

- **[Major] deprecated**: modification that breaks compatibility
- **[Minor] issued**: resolve any issue
- **[Patch] added**: adds a new feature
- **[Patch] fixed**: fixes a bug
- **changed**: does not add a feature or fix a bug
- **removed**: feature removed
- **security**: in the case of vulnerabilities

