export async function UpdateApi(email, team) {
  const bodyData = JSON.stringify({ email: email, team: team });
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyData,
  };
  let res = await fetch("http://172.22.24.135:3001/users/update/team", options);
  let data = res.json();
  return data;
}
