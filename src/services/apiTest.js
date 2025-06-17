import { Octokit, App } from "octokit";
import "dotenv/config";
const octokit = new Octokit({
  auth: process.env.authToken,
});

let res = await octokit.request("GET /users/{username}/events/public", {
  username: "liuhh02",
  headers: {
    "X-Github-Api-Version": "2022-11-28",
  },
  page: 1,
  per_page: 30,
});

const data = res.data;
// switch for events => push, create, watch, fork
for (var i = 0; i < data.length; i++) {
  if (data[i].type == "PushEvent") {
    console.log(
      "- Pushed " + data[i].payload.size + " commits to" + data[i].repo.name
    );
  } else if (data[i].type == "CreateEvent") {
    console.log("- Created at " + data[i].repo.name);
  } else {
    console.log(data[i]);
  }
}
