export async function getTeamInfo(id) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "902064d6d0msh419c80d9eab4c36p177814jsn582d8ba24e7f",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };
  const url = `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=39&season=2022&team=${id}`;
  let res = await fetch(url, options)
    .then((response) => response.json())
    .then((results) => results.response)
    .catch((err) => console.error(err));
  return res;
}
