import axios from "axios";
const FB_HOST = "https://graph.facebook.com/v16.0"

export const api = axios.create({
    withCredentials: true,
    baseURL: FB_HOST,
});
