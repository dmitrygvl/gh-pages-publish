module.exports = {
  env: {
    browser: true,
    es2021: true,
    //   "jest/globals": true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    //    "jest"
  ],
  extends: [
    'airbnb-base',
    //   "plugin:jest/recommended",
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  // ignorePatterns: ['main.js'],
  rules: {
    'max-len': [
      'error',
      {
        code: 140,
        ignoreComments: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'no-useless-escape': 'off',
    'no-await-in-loop': 'off',
    'noelse-return': 'off',
    'import/no-unresolved': 'off', // https://github.com/typescript-eslint/typescript-eslint/issues/1624
    'import/extensions': ['warn', 'never'], // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
  },
};
