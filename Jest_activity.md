

---

# Asynchronous Pair Programming Activity: Test-Driven Development (TDD) with Jest

## Introduction

In this activity, you will be practicing Test-Driven Development (TDD) using Jest, an automated unit testing tool for JavaScript. The goal is to collaboratively solve a coding problem in pairs, following the RED-GREEN-REFACTOR cycle.

### Prerequisites

1. Ensure that you have Node.js and npm installed on your machine.

## Activity Steps

### 1. Initial Setup

1. **Repository Setup:**
   - Clone the provided files in Canvas > Files (unit-test, unit-mvc)
   - Navigate to the project directory: `cd project-directory`
   - You may decide to work on a version control platform (such as Github) to navigate around the changes. If not, you can always pass files around at the very least (very bad practice though :/). 

2. **Install Dependencies:**
   - Install Jest globally: `npm install -g jest`
   - Install project dependencies: `npm install`

### 2. Collaborative TDD

#### Pair 1: Developer A

1. **Write the Failing Test (RED):**
   - Open the test file: (Write one if not yet present).
   - Write a test case for a specific functionality that is currently not implemented.
   - Ensure the test fails by running: `npm test`

2. **Switch Roles:**
   - Commit the failing test changes: `git commit -am "Add failing test for Module A"`
   - Push the changes to the repository: `git push origin main`
   - Notify your partner (Developer B) to pull the latest changes.

#### Pair 2: Developer B

1. **Write Code to Make the Test Pass (GREEN):**
   - Open the source code test file.
   - Write the minimum code necessary to make the failing test pass.
   - Run the tests: `npm test`
   - Ensure the test passes.

2. **Refactor Code (REFACTOR):**
   - If necessary, refactor the code.
   - Ensure the tests still pass: `npm test`

3. **Write the Next Test Case (RED):**
   - Open the test file again.
   - Write a new test case for the next functionality.
   - Ensure the test fails by running: `npm test`

4. **Switch Roles:**
   - Commit the changes: `git commit -am "Add failing test for next Module A functionality"`
   - Push the changes to the repository: `git push origin main`
   - Notify your partner (Developer A) to pull the latest changes.

### 3. Iterative TDD

Continue the RED-GREEN-REFACTOR cycle, switching roles after each step, until the entire problem is solved. Remember to follow the TDD principles: write failing tests first, make them pass, and refactor as needed.

### 4. Submission

1. **Code Review:**
   - Review the final code together.
   - Ensure all tests are passing.
   - Discuss any notable design decisions or challenges.

2. **Deliverables:**
   - Each developer should push their final changes to the repository.
   - Submit the following in Canvas
      - The GitHub repository link.
      - The final version of the files: `src/moduleA.js` and `src/__tests__/moduleATest.spec.js`.
      - A file history of terminal commands: 
         - Create a history file: `history > history.txt`
         - Commit and push the history file: `git add history.txt && git commit -m "Add terminal command history" && git push origin main`

## Jest Installation and Usage

### Jest Installation

- Install Jest globally: `npm install -g jest`

### Project Structure

- Place your source code in the `src/` directory.
- Create a corresponding `__tests__` directory inside `src/` for your test files.

```
project-directory/
|-- src/
|   |-- moduleA.js
|   |-- __tests__/
|       |-- moduleATest.spec.js
|-- node_modules/
|-- package.json
|-- ...
```

### Running Tests

- Run all tests: `npm test`
- Run tests for a sample (you can change this) specific file: `jest src/__tests__/moduleATest.spec.js`
- Run tests in watch mode: `jest --watch`

---


### Relevant Files

You may check out the following compressed files found in Canvas > Files

 - node-unit-test.zip
 - node-unit-mvc.zip 