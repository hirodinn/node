import express from "express";
//import middlewares
import debug from "debug";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./logger.js";
import authenticate from "./authenticate.js";
//import routes
import courses from "./routes/courses.js";
import home from "./routes/home.js";

//initialization
const app = express();
const startupDebugger = debug("app:startup");
const dbDebugger = debug("app:db");

//middlewares
app.use(express.json());
app.use(logger);
app.use(authenticate);
app.use(express.static("public"));
app.use(helmet());

app.use("/", home);
app.use("/api/courses", courses);

//working environment

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan Enabled");
}
dbDebugger("the database is running");

//port

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening to port ${port}...`));
