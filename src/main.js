import App from "App";

if (!import.meta.env.VITE_YT_API_KEY) {
  throw new Error("missing yt api key");
}

const app = new App({
  target: document.getElementById("app"),
});

export default app;
