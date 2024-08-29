# Template for Single Page Application (SPA)

## Description

The template provides a set of settings and features that are usually required in medium-sized SPA project. Richness of functionality depends on the selected git branch.

## Branches

- main - overview of the repository.
- vite-ts-min - implements a minimal project structure with recommended development configuration.
- vite-ts - implements a services-based project structure in which components use functionality isolated into services for better modularity.

_Note: detailed overview of each branch can be found in their own readme._

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
3. `corepack enable` - run the Corepack command if necessary.
4. Read specific instructions in selected branch.

## Useful links

- [react-ts](https://vitejs.dev/guide/#trying-vite-online) - Vite official template.
- [vite-template](https://mantine.dev/getting-started/#get-started-with-a-template) - Mantine official template.
- [vite-template-redux](https://github.com/reduxjs/redux-templates) - Redux official template.

## VS Code recommended extensions

- [editorconfig.editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
- [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - integrates ESLint into VS Code.
- [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - integrates Prettier into VS Code.
- [stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - integrates Stylelint into VS Code.
- [vunguyentuan.vscode-css-variables](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables) - intelligent suggestions for css variables.
- [streetsidesoftware.code-spell-checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - catches common spelling errors.
