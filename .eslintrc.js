module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    'react/prop-types': 0,
    'react/no-array-index-key': 0,
    'react/jsx-one-expression-per-line': 0,
    camelcase: 0,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};
