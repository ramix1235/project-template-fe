module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  rules: {
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
      {
        message:
          'Expected class selector to be "kebab-case". This is necessary for standardization.',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.module.css', '**/*.module.scss'],
      rules: {
        'selector-class-pattern': [
          '^(?:[a-z][a-z0-9]*(_[a-z0-9]+)*|[a-z]+[a-zA-Z0-9]*)$',
          {
            message:
              'Expected class selector to be "snake_case" or "camelCase" in css module. This is necessary to avoid using bracket notation when accessing an object property.',
          },
        ],
      },
    },
  ],
};
