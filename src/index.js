#!/usr/bin/env node

import { Command } from "commander";
import { userAct } from "userAct.js";
import { Octokit, App } from "octokit";
import "dotenv/config";

import "dotenv/config";

const program = new Command();

program
  .name("github-activity-tool")
  .description(
    "Use CLI to connect GitHub API to fetch user activity and display it in the terminal. "
  )
  .version("0.0.1");

program
  .argument("<userName>", "Username of user's activities you want to check.")
  .action((userName) => {
    userAct(userName);
  });

program.parse();
