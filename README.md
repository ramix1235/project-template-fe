# Branch vite-ts-min

## Description

Implements a minimal project structure with recommended development configuration. 

## Features

- Development configuration - for quickly starting a project from scratch.

## Pages:

- Home

## Getting Started

1. Read general instructions in main branch.
2. ``pnpm run dev`` - run the development server and http://localhost:4200 automatically opens in the browser.
3. Check all TODO comments in the whole project to customize the template for yourself and remove stubs and mocks.

## Deployment

1. ``pnpm run build`` - run the production build command.
2. Check dist folder in the project root.

## Dependencies:

- #### Development configuration:
    - [react](https://react.dev) - building fast, interactive UI using reusable components.
        - [react-dom](https://www.npmjs.com/package/react-dom) - entry point to the DOM renderers for React.
        - [@types/react](https://www.npmjs.com/package/@types/react) - TS types for React.
        - [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) - TS types for React DOM.
    - [typescript](https://www.typescriptlang.org) - static typing and other features to improve code quality and maintainability.
    - [vite](https://vitejs.dev) - instant server start, lightning-fast hot module replacement (HMR), and optimized production build.
        - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) - uses Babel for Fast Refresh, automatic JSX runtime, custom Babel plugins/presets.
        - [vite-plugin-checker](https://vite-plugin-checker.netlify.app) - shows TS, ESLint, Stylelint errors in the worker thread.
        - [vite-plugin-qrcode](https://github.com/svitejs/vite-plugin-qrcode) - fast access to the app on mobile devices by scanning a QR code.
        - [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr) - transforms SVG files into React components.
        - [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths) - cleaner and more manageable import paths by automatically resolving TS path aliases.
    - [eslint](https://eslint.org) - analyzes JS/TS code to identify and fix issues related to code quality, consistency, and potential errors.
        - [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) - React rules.
        - [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) - React Hooks rules.
        - [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) - accessibility rules for JSX elements, helping ensure that React application meet web accessibility standards.
        - [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh) - validates that React components can safely be updated with Fast Refresh.
        - [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin) - TS rules.
            - [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) - allows ESLint to lint TS code.
        - [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) - lints import/export syntax, and prevents issues with misspelling of file paths and import names.
            - [eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript) - TS resolver to accurately resolve import paths and aliases based on tsconfig.
            - [eslint-import-resolver-alias](https://github.com/johvin/eslint-import-resolver-alias) - alias resolver for custom path in imports.
    - [stylelint](https://stylelint.io/) - consistent and error-free CSS by analyzing stylesheets for issues and applying coding standards.
        - [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss) - SCSS rules.
        - [stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order) - sorts CSS properties the same way Recess and Bootstrap did.
    - [prettier](https://prettier.io) - consistent code style across the project.
    - [husky](https://github.com/typicode/husky) - runs scripts automatically before committing code to a git repository.
    - [lint-staged](https://github.com/lint-staged/lint-staged) - runs scripts on files that are staged in git.

- #### Design:
    - [sass](https://sass-lang.com) - CSS preprocessor that extends CSS with features like variables, nested rules, and mixins to enhance styling and maintainability.

- #### Miscellaneous:
    - meow - workaround for __vite-plugin-checker stylelint__ integration. [Check warning section](https://vite-plugin-checker.netlify.app/checkers/stylelint.html#installation).
