export async function userAct(userName) {
  const octokit = new Octokit({
    auth: process.env.authToken,
  });

  let res = await octokit.request("GET /users/{username}/events/public", {
    username: userName,
    headers: {
      "X-Github-Api-Version": "2022-11-28",
    },
  });
}
