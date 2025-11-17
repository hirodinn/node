import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to Mongo DB..."))
  .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now() },
  price: Number,
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);
async function getCourses() {
  const result = await Course.find({ tags: "backend", isPublished: true })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  console.log(result);
}
getCourses();
