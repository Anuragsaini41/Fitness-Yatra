module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',

    // JSX & React
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/state-in-constructor': 'off',
    'react/no-array-index-key': 'off',

    // Console and variables
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // Imports
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',

    // Formatting & Style
    'linebreak-style': 'off',
    'max-len': ['warn', { code: 120 }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-newline': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id', '_d', '_t', '_text'] }],

    // Accessibility
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/alt-text': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
