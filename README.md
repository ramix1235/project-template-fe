# Template for Single Page Application (SPA)

## Description
The template provides a set of settings and features that are usually required in medium-sized SPA project. Richness of functionality depends on the selected git branch.

## Branches
- #### main
  Overview of the repository.

- #### vite-ts-min
  Development Configuration - for quickly starting a project from scratch.

- #### vite-ts
  Implements a services-based project structure in which components use functionality isolated into services for better modularity. 
  
  _Note: services still depend on the project. For absolute independence, the repository should use [pnpm workspaces](https://pnpm.io/workspaces) or [Nx](https://nx.dev) and become a monorepository where services are packages with their own package.json, tsconfig.json, etc._

  Features:
  - Development Configuration - copy of vite-ts-min branch.
  - Design - set of components, set of hooks for state and UI management, set of icons, notifications management, forms management, theme management and theme select component.
  - Data Management - store and cache management for authorization and API.
  - Navigation - routing for pages which are described below.
  - Internationalization - translations and language select component.
  - Validations - schema-based validations for forms.
  - Permissions - access restriction for pages/components/logic.
  - Authorization - basic auth token-based flow.

  Pages ([Read more]((https://departmentp.atlassian.net/wiki/spaces/SD/pages/622968/User+Authentication))):
  - Identity:
    - Login
    - Register
    - Reset/Forgot/Setup Password
  - User:
    - Home
    - Settings:
      - Change Password
      - Change Email
    - Debug - was created to debug components, API, permissions, etc.
  - Other:
    - Action Redirect - handles redirects with special parameters for some actions.
    - Not Found - handles pages which don't exists in navigation.
    - Splash - handles loading state in pages.
    - Error Boundary - handles exceptions in component rendering.

## Infrastructure
- [NVM](https://github.com/nvm-sh/nvm) - allows quickly install and use different versions of Node.js via the command line.
- [Node.js](https://nodejs.org) - JS runtime environment that runs on the V8 JavaScript engine, and executes JS code outside a web browser.
- [Corepack](https://github.com/nodejs/corepack) - distributed by default with all recent Node.js versions and allows use yarn, npm, and pnpm without having to install them.
- [PNPM](https://pnpm.io) - disk space-efficient package manager that uses a unique symlink-based approach to manage dependencies. [Why not yarn/npm](https://refine.dev/blog/pnpm-vs-npm-and-yarn/#why-not-npm-or-yarn).
- [GIT](https://git-scm.com/) - version control system.
- [Vite environments](https://vitejs.dev/guide/env-and-mode) - env variables for development, staging, production modes.

## Getting Started
1. Setup Node.js (recommended via NVM) - check Vite [compatibility note](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).
2. Setup PNPM (recommended via Corepack).
1. ``pnpm run dev`` - run the development server and http://localhost:4200 automatically opens in the browser.
2. Check all TODO comments in the whole project to customize the template for yourself and remove stubs and mocks.
3. ``pnpm run codegen:openapi`` - run the API code generation command.

## Deployment
1. ``pnpm run build`` - run the production build command.
2. Check dist folder in the project root.

## Useful links
- [Jira Confluence](https://departmentp.atlassian.net/wiki/spaces/SD/pages/622912/Documentation) - full documentation.
- [Demo](/demo) - online playground with vite-ts branch.
- [react-ts](https://vitejs.dev/guide/#trying-vite-online) - Vite official template.
- [vite-template](https://mantine.dev/getting-started/#get-started-with-a-template) - Mantine official template.
- [vite-template-redux](https://github.com/reduxjs/redux-templates) - Redux official template.
- [mantine-for-figma](https://mantine.dev/getting-started/#mantine-for-figma) - community-driven projects that provide Figma components based on Mantine.

## VS Code recommended extensions
- [editorconfig.editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
- [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - integrates ESLint into VS Code.
- [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - integrates Prettier into VS Code.
- [stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - integrates Stylelint into VS Code.
- [vunguyentuan.vscode-css-variables](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables) - intelligent suggestions for css variables.
- [streetsidesoftware.code-spell-checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - catches common spelling errors.

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
        - [stylelint-config-standard-scs](https://github.com/stylelint-scss/stylelint-config-standard-scss) - SCSS rules.
        - [stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order) - sorts CSS properties the same way Recess and Bootstrap did.
    - [prettier](https://prettier.io) - consistent code style across the project.
    - [husky](https://github.com/typicode/husky) - runs scripts automatically before committing code to a git repository.
    - [lint-staged](https://github.com/lint-staged/lint-staged) - runs scripts on files that are staged in git.

- #### Design:
    - [mantine/core](https://mantine.dev) - core components library that provides a rich set of customizable UI components for building responsive and accessible applications.
        - [mantine/hooks](https://mantine.dev) - hooks for state and UI management.
            - [mantine/forms](https://mantine.dev) - form management library.
            - [mantine/notifications](https://mantine.dev) - notifications system.
            - [mantine-datatable](https://icflorescu.github.io/mantine-datatable) - lightweight, dependency-free component that brings datagrid-like functionality to data-rich user interface. It uses __clsx__ dependency.
    - [sass](https://sass-lang.com) - CSS preprocessor that extends CSS with features like variables, nested rules, and mixins to enhance styling and maintainability.
    - [@tabler/icons-react](https://tabler.io/icons) - set of free, high-quality, and customizable icon designs optimized for use in applications.
    - [clsx](https://github.com/lukeed/clsx) - utility that making it easier to manage dynamic class names.

- #### Data Management:
    - [@reduxjs/toolkit](https://redux-toolkit.js.org) - set of tools and best practices for efficiently managing state with Redux. Also provides Redux Toolkit Query (RTK) that enables handling data fetching, caching, and synchronization within Redux applications.
        - [react-redux](https://react-redux.js.org) - React UI bindings layer for Redux. It lets React components read data from a Redux store, and dispatch actions to the store to update state.
        - [@rtk-query/codegen-openapi](https://redux-toolkit.js.org/rtk-query/usage/code-generation#openapi) - automatically generates API hooks, types, etc. for RTK based on an OpenAPI specification.

- #### Navigation:
    - [react-router-dom](https://reactrouter.com) - navigation and routing in React applications that allows defining and handling different views and URL paths within a SPA.

- #### Internationalization:
    - [i18next](https://www.i18next.com) - internationalization-framework written in and for JS.
        - [react-i18next](https://react.i18next.com) - internationalization in React applications, providing tools for translating and managing multi-language support with ease.

- #### Validations:
    - [zod](https://zod.dev) - provides TS-first schema validation for simple and type-safe way to define and validate data structures.
        - [mantine-form-zod-resolver](https://github.com/mantinedev/mantine-form-zod-resolver) - Mantine's form resolver for Zod schema validation.

- #### Permissions:
    - [@casl/ability](https://casl.js.org/v6/en/guide/intro) - isomorphic authorization JS library which restricts what resources a given client is allowed to access.
    - [@casl/react](https://casl.js.org/v6/en/package/casl-react) - React resolver for CASL that allows defining and enforcing user permissions for various UI components and actions.

- #### Authorization:
    - uses __@reduxjs/toolkit__ and __@casl/react__ dependencies.

- #### Miscellaneous:
    - esbuild-runner - workaround for __@rtk-query/codegen-openapi__. [Check issue](https://github.com/reduxjs/redux-toolkit/issues/1775).
    - meow - workaround for __vite-plugin-checker stylelint__ integration. [Check warning section](https://vite-plugin-checker.netlify.app/checkers/stylelint.html#installation).
