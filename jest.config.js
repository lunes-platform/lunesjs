/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const root = "./"

module.exports = {
  rootDir: root,
  displayName: 'based-tests',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  testEnvironment: 'node',
  preset: 'ts-jest',
};