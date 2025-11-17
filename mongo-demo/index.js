import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongo DB"))
  .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now() },
});
