const globals = require('globals');

module.exports = {
  root: true,
  env: {
    es2022: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: true
    }
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import'],
  rules: {
    'import/order': [
      'warn',
      {
        groups: [
          ['builtin', 'external'],
          ['internal'],
          ['parent', 'sibling', 'index']
        ],
        'newlines-between': 'always'
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off'
  },
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      env: {
        browser: true
      },
      globals: {
        ...globals.browser
      }
    },
    {
      files: ['backend/**/*.ts'],
      env: {
        node: true
      },
      globals: {
        ...globals.node
      }
    },
    {
      files: ['*.config.ts'],
      env: {
        node: true
      }
    },
    {
      files: ['src/**/*.{test.ts,test.tsx}'],
      env: {
        node: true,
        browser: true
      }
    }
  ],
  ignorePatterns: ['dist', 'backend/dist']
};
