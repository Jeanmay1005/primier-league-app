export async function LoginApi(email, password) {
  const bodyData = JSON.stringify({ email: email, password: password });
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyData,
  };
  let res = await fetch("http://172.22.24.135:3001/users/login", options);
  let data = res.json();
  return data;
}
