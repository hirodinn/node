import debug from "debug";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import logger from "./logger.js";
import authenticate from "./authenticate.js";
import courses from "./routes/courses.js";
const app = express();

const startupDebugger = debug("app:startup");
const dbDebugger = debug("app:db");

app.use(express.json());

app.use(logger);

app.use(authenticate);

app.use(express.static("public"));

app.use(helmet());

app.use("/api/courses", courses);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan Enabled");
}
dbDebugger("the database is running");

//get

app.get("/", (req, res) => {
  res.send("hello ladies and gentlemen");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening to port ${port}...`));
