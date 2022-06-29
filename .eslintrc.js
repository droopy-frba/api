module.exports = {
  extends: './.eslint-airbnb.js',
  ignorePatterns: ['.eslintrc.js', 'tsconfig.paths.js', '**/migrations/*.ts', 'jest.config.js'],
  rules: {
    'class-methods-use-this': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-useless-constructor': 'off',
    quotes: ['error', 'single'],
    'no-underscore-dangle': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
