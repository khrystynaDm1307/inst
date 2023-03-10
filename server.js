import express from "express";
import cors from "cors";
import { authMiddleware } from "./auth-middleware.js";
import { api } from "./http.js";

const port = 4000;
const BASE_URL = "https://insta-0u51.onrender.com";
//const CLIENT_URL = "http://localhost:3000";
const CLIENT_URL = "https://inst-fromt.onrender.com"

const app = express();

app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(authMiddleware);

app.get("/", async function (req, res) {
  const fields = ["email", "id", "name", "picture"].join(",");

  try {
    const me_response = await api.get("/me", {
      params: { access_token: req.access_token, fields },
    });
    const acc_response = await api.get("/me/accounts", {
      params: { access_token: req.access_token },
    });
    //id from me/accounts we use in the next request /account/:id to get insta id

    return res
      .status(201)
      .json({ ...me_response?.data, accounts: acc_response?.data?.data })
      .end();
  } catch (e) {
    console.log("----->" + JSON.stringify(e, null, 2));
    return res.status(e.status || 500).end();
  }
});

app.get("/account/:id", async function (req, res) {
  const access_token = req.access_token;
  const fields = [
    "follows_count",
    "biography",
    "followers_count",
    "media_count",
    "profile_picture_url",
    "website",
    "username",
    "id",
    "name",
  ].join(",");

  try {
    const { id } = req.params;
    if (!id) throw new Error("Bad request");

    const response = await api.get(`${id}`, {
      params: { access_token, fields: "instagram_business_account" },
    });

    //id of insta
    const ig_id = response?.data?.instagram_business_account?.id;

    if (!ig_id) return res.status(200).json({}).end();

    const inst_account_response = await api.get(`${ig_id}`, {
      params: { access_token, fields },
    });

    return res.status(201).json(inst_account_response.data).end();
  } catch (e) {
    console.log("----->" + JSON.stringify(e, null, 2));
    return res.status(e.status || 500).end();
  }
});

app.get("/ig-accounts/:id/media", async function (req, res) {
  const access_token = req.access_token;

  const fields = [
    "caption",
    "comments_count",
    "like_count",
    "media_product_type",
    "media_type",
    "media_url",
    "id",
    "is_comment_enabled",
    "is_shared_to_feed",
    "permalink",
    "owner",
    "shortcode",
    "thumbnail_url",
    "timestamp",
    "username"
  ].join(",");

  try {
    const { id } = req.params;
    if (!id) throw new Error("Bad request");

    const response = await api.get(`${id}/media`, {
      params: { access_token, fields },
    });

    return res.status(201).json(response.data).end();
  } catch (e) {
    console.log("----->" + JSON.stringify(e, null, 2));
    return res.status(e.status || 500).end();
  }
});

app.get("/ig-accounts/:id/stories", async function (req, res) {
  const access_token = req.access_token;

  const fields = [
    "caption",
    "comments_count",
    "like_count",
    "media_product_type",
    "media_type",
    "media_url",
    "id",
    "is_shared_to_feed",
    "permalink",
    "owner",
    "shortcode",
    "thumbnail_url",
    "timestamp",
    "username"
  ].join(",");

  try {
    const { id } = req.params;
    if (!id) throw new Error("Bad request");

    const response = await api.get(`${id}/stories`, {
      params: { access_token, fields },
    });

    return res.status(201).json(response.data).end();
  } catch (e) {
    console.log("----->" + JSON.stringify(e, null, 2));
    return res.status(e.status || 500).end();
  }
});

app.get("/media/:id", async function (req, res) {
  const access_token = req.access_token;

  const fields = [
    "caption",
    "comments_count",
    "like_count",
    "media_product_type",
    "media_type",
    "media_url",
    "is_comment_enabled",
    "is_shared_to_feed",
    "owner",
    "permalink",
    "timestamp",
    "username",
    "comments{username,text,user}"
  ].join(",");

  try {
    const { id } = req.params;
    if (!id) throw new Error("Bad request");

    const response = await api.get(`${id}`, {
      params: { access_token, fields },
    });

    return res.status(201).json(response.data).end();
  } catch (e) {
    console.log("----->" + JSON.stringify(e, null, 2));
    return res.status(e.status || 500).end();
  }
});

app.get("/stories/:id", async function (req, res) {
  const access_token = req.access_token;

  const fields = [
    "caption",
    "like_count",
    "media_product_type",
    "media_type",
    "media_url",
    "is_shared_to_feed",
    "owner",
    "permalink",
    "timestamp",
    "username",
  ].join(",");

  try {
    const { id } = req.params;
    if (!id) throw new Error("Bad request");

    const response = await api.get(`${id}`, {
      params: { access_token, fields },
    });

    return res.status(201).json(response.data).end();
  } catch (e) {
    console.log("----->" + JSON.stringify(e, null, 2));
    return res.status(e.status || 500).end();
  }
});

app.get("/media/:id/insights", async function (req, res) {
  const access_token = req.access_token;

  const metric_carousel = [
    "carousel_album_engagement",
    "carousel_album_impressions",
    "carousel_album_reach",
    "carousel_album_saved",
    "carousel_album_video_views",
  ].join(",");

  const metric_photo_video = [
    "engagement",
    "impressions",
    "reach",
    "saved",
    "video_views",
  ].join(",");

  const metric_reels = [
    "comments",
    "likes",
    "plays",
    "reach",
    "saved",
    "shares",
    "total_interactions"
  ].join(",");

  const metric_stories = [
    "exits",
    "impressions",
    "reach",
    "replies",
    "taps_forward",
    "taps_back",
  ].join(",");

  const metric_post = [
    "comments",
    "follows",
    "likes",
    "profile_activity",
    "profile_visits",
    "shares",
    "total_interactions"
  ].join(",")

  const metric_story = [
    "follows",
    "navigation",
    "profile_activity",
    "profile_visits",
    "shares",
    "total_interactions"
  ].join(",")

  try {
    const { id } = req.params;
    if (!id) throw new Error("Bad request");

    const media = await api.get(`${id}`, {
      params: { access_token, fields: "media_type,media_product_type" },
    });

    console.log(media.data)
    const { media_product_type, media_type } = media.data;
    let metrics;

    if (media_type === 'CAROUSEL_ALBUM') metrics = metric_carousel;
    if (media_product_type === 'STORY') metrics = metric_stories + "," + metric_story;
    if (media_product_type === 'REELS') metrics = metric_reels;
    if (media_type !== 'CAROUSEL_ALBUM' && media_product_type === "FEED") metrics = metric_post + "," + metric_photo_video;

    const response = await api.get(`${id}/insights`, {
      params: { access_token, metric: metrics },
    });

    return res.status(201).json(response.data).end();
  } catch (e) {
    console.log("----->" + JSON.stringify(e, null, 2));
    return res.status(e.status || 500).end();
  }
});

app.post("/webhooks", async function (req, res) {
  console.log("post webkook", {req})
  res.send(200).end()
})

app.get("/webhooks", async function (req, res) {
  console.log("get webkook", {req})
  res.send(200).end()
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.get("/", function (req, res) {
//   console.log(req.user);
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// app.get("/login", function (req, res) {
//   console.log("/login");
//   return res.redirect(
//     `https://api.instagram.com/oauth/authorize?client_id=${APP_ID}&redirect_uri=${BASE_URL}/auth-callback&scope=${scope.join(
//       ","
//     )}&response_type=code`
//   );
// });

// app.get("/auth-callback", async function (req, res) {
//   console.log("/auth callback");

//   try {
//     const code = req.query.code;
//     console.log({ code });

//     const data = qs.stringify({
//       client_id: APP_ID,
//       client_secret: APP_SECRET,
//       grant_type: "authorization_code",
//       redirect_uri: "https://insta-0u51.onrender.com/auth-callback",
//       code,
//     });

//     const config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "https://api.instagram.com/oauth/access_token",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       data,
//     };

//     const response = await axios(config);
//     console.log({ response });

//     return res.send(JSON.stringify(response.data));
//   } catch (e) {
//     console.log({ e });
//     return res
//       .status(e.code || 500)
//       .json(e.message)
//       .end();
//   }
// });

// const APP_ID = "223946259993081";
// const APP_SECRET = "be6659ef82a77b726e236f30c2facaec";
// const BASE_URL = "https://insta-0u51.onrender.com";
// //const CLIENT_URL="http://localhost:3000"
// const CLIENT_URL = "https://inst-fromt.onrender.com"
// const scope = [
//   "pages_read_engagement",
//   "instagram_basic",
//   "instagram_manage_insights",
//   "business_management",
//   "user_profile",
//   "user_media",
//   "instagram_content_publish",
//   "pages_show_list",
//   "email",
//   "read_insights",
//   "publish_video",
//   "user_hometown",
//   "user_birthday",
//   "user_age_range",
//   "user_link",
//   "user_location",
//   "user_likes",
//   "public_profile",
//   "pages_user_locale",
//   "pages_user_timezone",
//   "instagram_shopping_tag_products",
//   "user_videos",
//   "pages_manage_posts",
//   "pages_manage_engagement",
//   "user_posts",
// ];
