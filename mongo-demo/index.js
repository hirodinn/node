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
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const course = new Course({
  name: "Node learning course",
  author: "Hire Bikila",
  tags: ["node", "mongo", "backend"],
  isPublished: true,
});

async function saveToDb() {
  const result = await course.save();
  console.log(result);
}
saveToDb();
