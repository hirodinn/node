import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected To Mongo DB..."))
  .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  date: { type: Date, default: Date.now() },
  tags: [String],
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  const result = await Course.find().or([
    { price: { $gte: 15 } },
    { name: /.*by.*/i },
  ]);
  console.log(result);
}

getCourses();
