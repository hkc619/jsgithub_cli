#!/usr/bin/env node

import { Command } from "commander";
import { userAct } from "./services/userAct.js";
import chalk from "chalk";
import "dotenv/config";

const program = new Command();

// help
program
  .name("github-activity-tool")
  .description(
    "Use CLI to connect GitHub API to fetch user activity and display it in the terminal."
  )
  .version("0.1.0");

// Main func
program
  .argument("<userName>", "Username of user's activities you want to check.")
  .option("--page <number>", "The page number of the results to fetch.", 1)
  .option(
    "--per-page <number>",
    "The number of results per page (max 100).",
    10
  )
  .action((userName) => {
    const options = program.opts();
    //console.log(options.page);
    console.log(chalk.blue(userName));
    userAct(userName, options.perPage, options.page);
  });

program.parse();
