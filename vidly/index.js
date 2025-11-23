import mongoose from "mongoose";
import express from "express";
import Joi from "joi";
import joi from "joi-objectid";
import dotenv from "dotenv";
import genres from "./routes/genres.js";
import customers from "./routes/customers.js";
import movies from "./routes/movies.js";
import rentals from "./routes/rentals.js";
import users from "./routes/users.js";
import auth from "./routes/auth.js";

dotenv.config();
if (!process.env.JWT_SECRET) {
  console.log("The token doesnt exist");
  process.exit(1);
}

Joi.objectId = joi(Joi);

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to Mongo DB..."))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

// port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));
