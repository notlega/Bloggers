module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/button-has-type': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    'object-curly-newline': 'off',
    'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-plusplus': 'off',
  },
  ignorePatterns: ['**/*.json', 'node_modules', '.next', 'public'],
};
