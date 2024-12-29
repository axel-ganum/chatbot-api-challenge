
export default {
    transform: {
      '^.+\\.js$': 'babel-jest',  
    },
    testEnvironment: 'node',
    globals: {
      'jest/globals': true,
    },
    testTimeout: 10000,
    detectOpenHandles: true,
    testMatch: ['**/tests/**/*.test.js'],
  };
  