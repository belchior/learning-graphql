module.exports = {
  'env': {
    'es6': true,
    'browser': true,
    'jest/globals': true
  },
  'plugins': [
    'jest'
  ],
  'extends': [
    'react-app',
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
    'indent': [ 'error', 2 ],
    'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
  }
};