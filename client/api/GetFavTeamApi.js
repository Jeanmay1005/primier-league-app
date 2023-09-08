export async function GetFavTeam(email) {
  const options = { method: "GET" };
  const res = await fetch(
    `http://172.22.24.135:3001/users/team/${email}`,
    options
  );
  let data = await res.json();
  const teamList = data["teams"][0]["team_list"];
  return teamList;
}
