import express from "express";
import Joi from "joi";
import joi from "joi-objectid";
import dotenv from "dotenv";
import loadDb from "./startup/db.js";

loadDb();

dotenv.config();
if (!process.env.JWT_SECRET) {
  console.log("The token doesnt exist");
  process.exit(1);
}

Joi.objectId = joi(Joi);

const app = express();

// port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));
