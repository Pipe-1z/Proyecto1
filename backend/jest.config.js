module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
};
