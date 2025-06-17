export async function userAct(userName) {
  const octokit = new Octokit({
    auth: process.env.authToken,
  });

  try {
    const res = await octokit.request("GET /users/{username}/events/public", {
      username: userName,
      page: 1,
      per_page: 30,
      headers: {
        "X-Github-Api-Version": "2022-11-28",
      },
    });
  } catch (error) {
    console.log("Error!");
  }
}
