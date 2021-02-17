import express from "express";
import next from "next";
import mainRouter from "./routes";

// Server Initialization
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();

nextApp
  .prepare()
  .then(() => {
    app.use(express.json());
    app.use("/api/downloads", express.static("dist/server/downloads"));
    app.use("/api", mainRouter);
    console.log(__dirname);
    app.all("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(3000, () => {
      console.log("App ready on port 3000");
    });
  })
  .catch((exception) => {
    console.error(exception.stack);
    process.exit(1);
  });
