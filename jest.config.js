
export default {
    transform: {
      '^.+\\.js$': 'babel-jest',  
    },
    testEnvironment: 'node',
    globals: {
      'jest/globals': true,
    },
  };
  