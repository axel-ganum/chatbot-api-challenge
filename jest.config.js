export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.js$': 'babel-jest', // Esto indica que Babel debe transformar todos los archivos .js
    },
    globals: {
      'jest/globals': true,
    },
    testMatch: ['**/tests/**/*.test.js'],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };
  