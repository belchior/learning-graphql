module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'jest/globals': true
  },
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
    'sourceType': 'module',
  },
  'plugins': [
    'jest',
  ],
  'rules': {
    'indent': ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': [ 'error', 'unix' ],
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'object-curly-spacing': [ 'error', 'always' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ],
  }
};
