# Setup husky precommit CLI 

A customizable CLI tool to easily integrate and manage Husky pre-commit hooks and custom build processes across multiple projects.

## Installation

You can install the CLI locally in your project using **npm**, **Yarn**, or **pnpm**. Choose your preferred package manager:

### npm

To install the CLI in your project with **npm**, **Yarn**, or **pnpm**., run the following command:

```bash
npm install setup-husky-cli --save-dev
yarn add setup-husky-cli --dev
pnpm add setup-husky-cli --dev
```

## Usage

Once installed, you can use the CLI tool to configure **Husky pre-commit hooks** and customize your **build process** for multiple projects.

### Setup Husky Pre-commit Hook

This command will install **Husky** and set up a **pre-commit hook** in your project. The hook will run a custom command (like `npm run lint`) before every commit.

This will prompt you to enter the path to the project directory and the pre-commit command you want to run.

Copy
Enter the path to the project directory: ./my-project
Enter the command to run in the pre-commit hook (e.g., npm run lint): npm run lint
This will install Husky, set up the .husky directory, and configure the pre-commit hook.

#### Example:
```bash
Enter the path to the project directory: ./my-project
Enter the command to run in the pre-commit hook (e.g., npm run lint): npm run lint
```

This will install Husky, set up the .husky directory, and configure the pre-commit hook.

