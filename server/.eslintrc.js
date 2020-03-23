module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'jest/globals': true
  },
  'plugins': [
    'jest',
    'no-null',
  ],
  'extends': [
    'eslint:recommended',
    'plugin:jest/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'indent': ["error", 2, { SwitchCase: 1 }],
    'linebreak-style': [ 'error', 'unix' ],
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'no-null/no-null': 2,
    'object-curly-spacing': [ 'error', 'always' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ],
  }
};
