module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/src/**/**interfaces**',
    '!<rootDir>/src/app/database/**',
    '!<rootDir>/src/app/types/**',
    '!<rootDir>/src/app/configs/**',
  ],
  coverageDirectory: '<rootDir>/__tests__/coverage',
  transform: {
    '^.+\\.(t|j)s?$': ['@swc/jest'],
  },
  testEnvironment: 'node',
  clearMocks: true,
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/__tests__/**/*.spec.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@tests/(.*)': '<rootDir>/__tests__/$1',
  },
};
