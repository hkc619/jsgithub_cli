import { Octokit, App } from "octokit";

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
      if (userData[i].type == "PushEvent") {
        console.log(
          "- Pushed " +
            userData[i].payload.size +
            " commits to" +
            userData[i].repo.name
        );
      } else if (userData[i].type == "CreateEvent") {
        console.log("- Created at " + userData[i].repo.name);
      } else {
        console.log(userData[i].type);
      }
    }
  } catch (error) {
    console.log("Error!");
    console.log(error);
  }
}
