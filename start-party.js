import express from "express";
import ViteExpress from "vite-express";

const app = express();

const server = app.listen(3000, "0.0.0.0", () =>
  console.log("party started on port 3000...")
);

ViteExpress.bind(app, server);
