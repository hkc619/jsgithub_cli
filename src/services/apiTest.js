import { Octokit, App } from "octokit";
import "dotenv/config";
const octokit = new Octokit({
  auth: process.env.authToken,
});

let res = await octokit.request("GET /users/{username}/events/public", {
  username: "ask0ldd",
  headers: {
    "X-Github-Api-Version": "2022-11-28",
  },
  page: 1,
  per_page: 30,
});

console.log(res.data);
for (var i = 0; i < res.data.length; i++) {
  console.log(res.data[i].type);
}
