module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'jest/globals': true
  },
  'plugins': [
    'jest'
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
    'indent': [ 'error', 2 ],
    'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
  }
};