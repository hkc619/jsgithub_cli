#!/usr/bin/env node

import { Command } from "commander";
import {} from ".js";

import "dotenv/config";

const program = new Command();

program
  .name("github-activity-tool")
  .description(
    "Use CLI to connect GitHub API to fetch user activity and display it in the terminal. "
  )
  .version("0.0.1");

program.parse();
