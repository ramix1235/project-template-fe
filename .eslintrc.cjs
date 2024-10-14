const path = require('path');

// Optionally, make typescript-eslint rules more strict: https://typescript-eslint.io/getting-started/typed-linting

module.exports = {
  root: true,
  env: { browser: true, es2023: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: true,
      alias: [
        ['', path.resolve(__dirname, 'app/public')], // Resolver for Vite when importing assets from public folder
      ],
    },
  },
  rules: {
    'no-restricted-imports': [
      'warn',
      {
        paths: [
          {
            name: 'moment',
            message: 'Please use date-fns or dayjs package instead',
          },
        ],
      },
    ],
    'react/prop-types': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/no-unresolved': ['error', { ignore: ['\\.svg\\?react$'] }], // Resolver for vite-plugin-svgr imports
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '#/**',
            group: 'internal',
            position: 'before',
            patternOptions: {
              partial: true,
            },
          },
          {
            pattern: '*.+(svg|png|jpg|?react)',
            group: 'unknown',
            position: 'after',
            patternOptions: {
              matchBase: true,
            },
          },
          {
            pattern: '*.+(scss|css|json)',
            group: 'unknown',
            position: 'after',
            patternOptions: {
              matchBase: true,
            },
          },
        ],
        pathGroupsExcludedImportTypes: [],
      },
    ],
  },
};
