import express from "express";
import loadDb from "./startup/db.js";
import loadRoute from "./startup/routes.js";
import validate from "./startup/validate.js";
import configure from "./startup/config.js";

const app = express();

validate();
loadDb();
loadRoute(app);
configure();

// port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));
