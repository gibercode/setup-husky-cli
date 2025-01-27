#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs/promises";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";

async function installHusky(targetDir) {
  console.log(chalk.blue(`Installing Husky in ${targetDir}...`));

  execSync("npm install husky --save-dev", {
    cwd: targetDir,
    stdio: "inherit",
  });

  console.log(chalk.blue("Setting up Husky Git hooks..."));
  await fs.mkdir(path.resolve(targetDir, ".husky"), { recursive: true });

  const huskyPreparePath = path.resolve(
    targetDir,
    ".husky",
    "prepare-commit-msg"
  );
  const prepareHookScript = `
  # Here you can add any script you want to run before committing.
  # Example: npm run lint
`;

  await fs.writeFile(huskyPreparePath, prepareHookScript, { mode: 0o755 });
  console.log(chalk.green("Husky hooks set up successfully!"));
}

async function setupPreCommitHook(targetDir) {
  console.log(chalk.blue("Setting up pre-commit hook..."));

  const { preCommitCommand } = await inquirer.prompt([
    {
      type: "input",
      name: "preCommitCommand",
      message:
        "Enter the command to run in the pre-commit hook (e.g., npm run lint):",
      default: "npm run lint",
      validate(input) {
        if (input.trim() === "") {
          return "Command cannot be empty.";
        }
        return true;
      },
    },
  ]);

  const huskyHookPath = path.resolve(targetDir, ".husky", "pre-commit");

  try {
    await fs.writeFile(huskyHookPath, preCommitCommand, { mode: 0o755 });
    console.log(chalk.green("Pre-commit hook added!"));
  } catch (error) {
    console.error(
      chalk.red(`Error setting up pre-commit hook: ${error.message}`)
    );
  }
}

async function getProjectDirectory() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectDir",
      message: "Enter the path to the project directory:",
      validate(input) {
        return fs
          .access(input)
          .then(() => fs.lstat(input))
          .then((stats) => {
            if (stats.isDirectory()) {
              return true;
            }
            return "The path is not a directory.";
          })
          .catch(() => "Please provide a valid project directory.");
      },
    },
  ]);
  return answers.projectDir;
}

async function setup() {
  const targetDir = await getProjectDirectory();
  await installHusky(targetDir);
  await setupPreCommitHook(targetDir);
  console.log(chalk.green("Husky setup is complete!"));
}

setup();
