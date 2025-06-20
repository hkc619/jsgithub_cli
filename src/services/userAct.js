import { Octokit, App } from "octokit";
import chalk from "chalk";

export async function userAct(userName) {
  const octokit = new Octokit({
    auth: process.env.authToken,
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
            "- Pushed " +
              userData[i].payload.size +
              " commits to" +
              userData[i].repo.name
          );
          break;

        case "CreatEvent":
          console.log("- Created at " + userData[i].repo.name);
          break;

        case "PullRequestEvent":
          console.log("- Pulled a request to" + userData[i].repo.name);
          break;

        default:
          console.log(chalk.red(userData[i].type));
          console.log(userData[i]);
      }
    }
  } catch (error) {
    console.log("Error!");
    console.log(error);
  }
}
