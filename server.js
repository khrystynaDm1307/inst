const express = require("express");
const app = express();
const port = 4000;
const APP_ID = "880663813213909";
const APP_SECRET = "5f28610fc885c6856863db5471b0cf55";
const BASE_URL = "https://insta-test-2.dev-test.pro";

app.get("/", function (req, res) {
  console.log(222222222);
  res.sendFile("index.html", { root: __dirname });
});

app.get("/login", function (req, res) {
  return res.redirect(`https://api.instagram.com/oauth/authorize
  ?client_id=${APP_ID}
  &redirect_uri=${BASE_URL}/auth-callback
  &scope=user_profile,user_media
  &response_type=code`);
});

app.post("/auth-callback", async function (req, res) {
  const code = req.query.code;

  const response = await fetch(
    `https://api.instagram.com/oauth/access_token?client_id=${APP_ID}
    &client_secret=${APP_SECRET}
    &grant_type=authorization_code
    &redirect_uri=${BASE_URL}/auth/access-token
    &code=${code}`,
    {
      method: "POST",
    }
  );

  // response example
  //   {
  //     "access_token": "IGQVJ...",
  //     "user_id": 17841405793187218
  //   }
  return res.send({ response });
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
