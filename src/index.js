#!/usr/bin/env node

import { Command } from "commander";
import { userAct } from "./services/userAct.js";
import "dotenv/config";

const program = new Command();

// help
program
  .name("github-activity-tool")
  .description(
    "Use CLI to connect GitHub API to fetch user activity and display it in the terminal. "
  )
  .version("0.0.1");

// Main func
program
  .argument("<userName>", "Username of user's activities you want to check.")
  .action((userName) => {
    console.log(userName);
    userAct(userName);
  });

program.parse();
