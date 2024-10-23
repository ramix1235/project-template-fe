# Branch vite-ts

## Description
  Implements a services-based project structure in which components use functionality isolated into services for better modularity. 
  
  _Note: services still depend on the project. For absolute independence, the repository should use [pnpm workspaces](https://pnpm.io/workspaces) or [Nx](https://nx.dev) and become a monorepository where services are packages with their own package.json, tsconfig.json, etc._

## Features
  - Development configuration - for quickly starting a project from scratch.
  - Design - set of components, set of hooks for state and UI management, set of icons, notifications management, forms management, theme management and theme select component.
  - Data management - store and cache management for authorization and API.
  - Navigation - routing for pages which are described below.
  - Internationalization - translations and language select component.
  - Validations - schema-based validations for forms.
  - Permissions - access restriction for pages/components/logic.
  - Authorization - basic auth token-based flow.

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

## Deployment

1. ``pnpm run build`` - run the production build command.
2. Check dist folder in the project root.

## Useful links
- [mantine-for-figma](https://mantine.dev/getting-started/#mantine-for-figma) - community-driven projects that provide Figma components based on Mantine.

## Dependencies:

- #### Development configuration:
    - extends vite-ts-min branch...

- #### Design:
    - extends vite-ts-min branch...
    - [mantine/core](https://mantine.dev) - core components library that provides a rich set of customizable UI components for building responsive and accessible applications.
        - [mantine/hooks](https://mantine.dev) - hooks for state and UI management.
            - [mantine/forms](https://mantine.dev) - form management library.
            - [mantine/notifications](https://mantine.dev) - notifications system.
            - [mantine-datatable](https://icflorescu.github.io/mantine-datatable) - lightweight, dependency-free component that brings datagrid-like functionality to data-rich user interface.
    - [@tabler/icons-react](https://tabler.io/icons) - set of free, high-quality, and customizable icon designs optimized for use in applications.
    - [clsx](https://github.com/lukeed/clsx) - utility that making it easier to manage dynamic class names.

- #### Data management:
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
    - [async-mutex](https://github.com/DirtyHairy/async-mutex) - prevent multiple calls to '/refresh' when multiple calls fail with 401 Unauthorized errors.

- #### Miscellaneous:
    - extends vite-ts-min branch...
    - esbuild-runner - workaround for __@rtk-query/codegen-openapi__. [Check issue](https://github.com/reduxjs/redux-toolkit/issues/1775).
