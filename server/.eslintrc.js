module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'jest/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:jest/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'jest',
  ],
  'rules': {
    'indent': ["error", 2, { SwitchCase: 1 }],
    'linebreak-style': [ 'error', 'unix' ],
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'object-curly-spacing': [ 'error', 'always' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ],
  }
};
