module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'standard',
    'plugin:jest/all'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'jest/prefer-expect-assertions': [
      'warn',
      { onlyFunctionsWithAsyncKeyword: true }
    ],
    'jest/require-hook': 'off'
  },
  plugins: ['jest']
}
