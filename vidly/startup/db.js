import mongoose from "mongoose";

export default function () {
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to Mongo DB..."));
}
