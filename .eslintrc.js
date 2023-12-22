// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//     'prettier',
//   ],
//   plugins: ['@typescript-eslint', 'prettier'],
//   overrides: [
//     {
//       env: {
//         node: true,
//       },
//       files: ['.eslintrc.{js,cjs}'],
//       parserOptions: {
//         sourceType: 'script',
//       },
//     },
//   ],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//   },
//   rules: {
//     '@typescript-eslint/no-shadow': 'warn',
//     'import/no-unresolved': 'off', // https://github.com/typescript-eslint/typescript-eslint/issues/1624
//     'import/extensions': ['warn', 'never'], // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
//   },
// };

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
  ignorePatterns: ['main.js'],
  rules: {
    'max-len': [
      'error',
      {
        code: 140,
        ignoreComments: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'import/no-unresolved': 'off', // https://github.com/typescript-eslint/typescript-eslint/issues/1624
    'import/extensions': ['warn', 'never'], // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
  },
};
