# Branch vite-ts-tests

## Description
  Implements integration with tests for project template from vite-ts branch.

## Features
  - Development configuration - for quickly starting a project from scratch.
  - Design - set of components, set of hooks for state and UI management, set of icons, notifications management, forms management, theme management and theme select component.
  - Data management - store and cache management for authorization and API.
  - Navigation - routing for pages which are described below.
  - Internationalization - translations and language select component.
  - Validations - schema-based validations for forms.
  - Permissions - access restriction for pages/components/logic.
  - Authorization - basic auth token-based flow.
  - Tests - environment and set of already written tests.

 ## Pages:
  - Identity:
    - Login
    - Register
    - Reset/Forgot/Setup Password
  - User:
    - Home
    - Settings:
      - Change Password
      - Change Email
  - Other:
    - Action Redirect - handles redirects with special parameters for some actions.
    - Not Found - handles pages which don't exists in navigation.
    - Splash - handles loading state in pages.
    - Error Boundary - handles exceptions in component rendering.

## Getting Started
1. Read general instructions in main branch.
2. ``pnpm run dev`` - run the development server and http://localhost:4200 automatically opens in the browser.
3. Check all TODO comments in the whole project to customize the template for yourself and remove stubs and mocks.
4. ``pnpm run codegen:openapi`` - run the API code generation command.

## Tests
1. ``pnpm run test`` - run the tests in watch mode command.
1. ``pnpm run test:run`` - run the tests command.

## Deployment

1. ``pnpm run build`` - run the production build command.
2. Check dist folder in the project root.

## VS Code recommended extensions
- [vitest.explorer](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) - manage tests both from the Testing view and directly within test files.

## Dependencies:

- #### Development configuration:
    - extends vite-ts branch...
    - [eslint-plugin-jest-dom](https://testing-library.com/docs/ecosystem-eslint-plugin-jest-dom) - ESLint plugin for Jest DOM.
    - [eslint-plugin-testing-library](https://testing-library.com/docs/ecosystem-eslint-plugin-testing-library) - ESLint plugin for Testing Library.

- #### Design:
    - extends vite-ts branch...

- #### Data management:
    - extends vite-ts branch...

- #### Navigation:
    - extends vite-ts branch...

- #### Internationalization:
    - extends vite-ts branch...

- #### Validations:
    - extends vite-ts branch...

- #### Permissions:
    - extends vite-ts branch...

- #### Authorization:
    - extends vite-ts branch...

- #### Tests:
    - [vitest](https://vitest.dev) - Vite native test runner and framework.
      - [jsdom](https://github.com/jsdom/jsdom) - browser-like environment instead of Node.js environment for tests.
    - [@testing-library/dom](https://testing-library.com) - provides involve querying the DOM for nodes in a way that's similar to how the user finds elements on the page.
      - [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro) - builds on top of DOM Testing Library by adding APIs for working with React components.
      - [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom) - custom DOM element matchers.
      - [@testing-library/user-event](https://testing-library.com/docs/user-event/intro) - simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.

- #### Miscellaneous:
    - extends vite-ts branch...
