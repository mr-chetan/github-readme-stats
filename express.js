import "dotenv/config";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";
import gistCard from "./api/gist.js";
import express from "express";

const PORT = process.env.port || process.env.PORT || 9000;

const app = express();

app.get("/", statsCard);
app.get("/pin", repoCard);
app.get("/top-langs", langCard);
app.get("/wakatime", wakatimeCard);
app.get("/gist", gistCard);

const server = app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});

const close = (signal) => {
  console.log(`Received ${signal}, closing server...`);

  setTimeout(() => {
    console.error("Could not close server in time, forcefully shutting down");
    process.exit(1);
  }, 5000);

  server.close(() => {
    process.exit(0);
  });
};

// listen to sigterm signal and gracefully close the server
process.on("SIGTERM", close);
process.on("SIGINT", close);
process.on("SIGHUP", close);
