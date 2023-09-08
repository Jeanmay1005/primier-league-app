export async function getStandings() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "902064d6d0msh419c80d9eab4c36p177814jsn582d8ba24e7f",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };
  let res = await fetch(
    "https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=39",
    options
  )
    .then((response) => response.json())
    .then((results) => results.response)
    .catch((err) => console.error(err));
  return res;
}
