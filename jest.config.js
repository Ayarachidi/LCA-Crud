module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|html)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage/',
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/main.ts',
      '!src/**/*.module.ts',
      '!src/environments/**',
    ],
    coverageReporters: ['html', 'lcov', 'text-summary'],
  };
  