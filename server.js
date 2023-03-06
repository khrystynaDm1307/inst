import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import qs from "qs";
import axios from "axios";

const port = 4000;
const APP_ID = "223946259993081";
const APP_SECRET = "be6659ef82a77b726e236f30c2facaec";
const BASE_URL = "https://insta-0u51.onrender.com";

const scope = [
  "pages_read_engagement",
  "instagram_basic",
  "instagram_manage_insights",
  "business_management",
  "user_profile",
  "user_media",
  "instagram_content_publish",
  "pages_show_list",
  "email",
  "read_insights",
  "publish_video",
  "user_hometown",
  "user_birthday",
  "user_age_range",
  "user_link",
  "user_location",
  "user_likes",
  "public_profile",
  "pages_user_locale",
  "pages_user_timezone",
  "instagram_shopping_tag_products",
  "user_videos",
  "pages_manage_posts",
  "pages_manage_engagement",
  "user_posts",
];
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", function (req, res) {
  console.log("start point");
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login", function (req, res) {
  console.log("/login");
  return res.redirect(
    `https://api.instagram.com/oauth/authorize?client_id=${APP_ID}&redirect_uri=${BASE_URL}/auth-callback&scope=${scope.join(
      ","
    )}&response_type=code`
  );
});

app.get("/auth-callback", async function (req, res) {
  console.log("/auth callback");

  try {
    const code = req.query.code;
    console.log({ code });

    const data = qs.stringify({
      client_id: APP_ID,
      client_secret: APP_SECRET,
      grant_type: "authorization_code",
      redirect_uri: "https://insta-0u51.onrender.com/auth-callback",
      code,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.instagram.com/oauth/access_token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    };

    const response = await axios(config);

    return res.send(JSON.stringify(response.data));
  } catch (e) {
    console.log({ e });
    return res
      .status(e.code || 500)
      .json(e.message)
      .end();
  }
});

app.get("/user", async function (req, res) {
  const userId = 17841458655797337;
  const access_token =
    "IGQVJXSFM5WFkweWFaS1pkejQ4c2hzcmFQOGVUcTQydUtSa1ZAFeFI4SHc4TlF5bzZAFeHBwWTRyQzV6WGY1Yl9CU25MRVgyb3ZA6M0UyaldmRlB5ZA2d0dlItX2cxZAzItZAlhOV3AzbU9YcF9jWG0yekJHdzVFRkNDS3pCeG93";
  const response = await fetch(
    `https://graph.instagram.com/${userId}?fields=id,username&access_token=${
      access - token
    }`
  );

  return res.send({ response });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
