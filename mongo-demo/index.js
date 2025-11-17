import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongo DB"))
  .catch((err) => console.log(err));
