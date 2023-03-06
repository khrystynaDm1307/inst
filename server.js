import express from "express";
import fetch from "node-fetch";

const port = 4000;
const APP_ID = "223946259993081";
const APP_SECRET = "be6659ef82a77b726e236f30c2facaec";
const BASE_URL = "https://insta-0u51.onrender.com";

const app = express();

app.get("/", function (req, res) {
  console.log("start point");
  res.sendFile("index.html", { root: __dirname });
});

app.get("/login", function (req, res) {
  console.log("/login");
  return res.redirect(
    `https://api.instagram.com/oauth/authorize?client_id=${APP_ID}&redirect_uri=${BASE_URL}/auth-callback&scope=user_profile,user_media&response_type=code`
  );
});

app.get("/auth-callback", async function (req, res) {
  console.log("/auth callback");
  const code = req.query.code;
  console.log({ code });
  const response = await fetch(
    `https://api.instagram.com/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&grant_type=authorization_code&redirect_uri=${BASE_URL}/auth/access-token&code=${code}`,
    {
      method: "POST",
    }
  );
  console.log(response.json());
  // response example
  //   {
  //     "access_token": "IGQVJ...",
  //     "user_id": 17841405793187218
  //   }
  return res.send(response.json());
});

app.post("/auth/access-token", async function (req, res) {
  console.log("/access token");
  return res.status(200).end();
});

app.get("/user", async function (req, res) {
  //   const access_token=req.headers
  const userId = req.params.id;

  const response = await fetch(
    `https://graph.instagram.com/${userId}?fields=id,username&access_token={access-token}`
  );

  return res.send({ response });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
