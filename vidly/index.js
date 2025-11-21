import mongoose from "mongoose";
import express from "express";
import genres from "./routes/genres.js";
import customers from "./routes/customers.js";
import movies from "./routes/movies.js";

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to Mongo DB..."))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);

// port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));
