import { Octokit, App } from "octokit";
import chalk from "chalk";

export async function userAct(userName, perPage, page) {
  const octokit = new Octokit({
    auth: process.env.authToken,
    per_page: perPage,
    page: page,
  });

  try {
    const res = await octokit.request("GET /users/{username}/events/public", {
      username: userName,
      page: 1,
      per_page: 10,
      headers: {
        "X-Github-Api-Version": "2022-11-28",
      },
    });
    const userData = res.data;

    // switch for events => push, create, watch, fork, PullRequestReviewEvent
    for (var i = 0; i < userData.length; i++) {
      switch (userData[i].type) {
        case "PushEvent":
          console.log(
            chalk.bgYellowBright("- Pushed") +
              " " +
              userData[i].payload.size +
              " commits to" +
              chalk.yellow(userData[i].repo.name)
          );
          break;

        case "CreateEvent":
          console.log(
            chalk.bgBlue("- Created") +
              " at " +
              chalk.yellow(userData[i].repo.name)
          );
          break;

        case "PullRequestEvent":
          console.log(
            chalk.bgCyan("- Pulled") +
              " a request to " +
              chalk.yellow(userData[i].repo.name)
          );
          break;

        case "WatchEvent":
          console.log(
            chalk.bgYellow("- Stared") +
              " to " +
              chalk.yellow(userData[i].repo.name)
          );
          break;

        case "ForkEvent":
          console.log(
            chalk.bgGreen("- Forked") +
              " from " +
              chalk.yellow(userData[i].repo.name)
          );
          break;

        default:
          console.log(chalk.bgRed(userData[i].type));
          console.log(userData[i]);
      }
    }
  } catch (error) {
    console.log("Error!");
    console.log(error);
  }
}
