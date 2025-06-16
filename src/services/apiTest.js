import { Octokit, App } from "octokit";
import "dotenv/config";
const octokit = new Octokit({
  auth: process.env.authToken,
});

let res = await octokit.request("GET /events", {
  headers: {
    "X-Github-Api-Version": "2022-11-28",
  },
});

console.log(res);
