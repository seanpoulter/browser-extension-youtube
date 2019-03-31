module.exports = function (wallaby) {
  return {
    files: [
      'babel.config.js',
      'src/**/*.ts',
      '!src/**/*.test.ts'
    ],

    tests: [
      'src/**/*.test.ts',
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',
  };
}
