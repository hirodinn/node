import mongoose, { get } from "mongoose";

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to Mongo DB..."))
  .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now() },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "frontend learning course",
    author: "Mosh Hamedani",
    tags: ["javascript", "react", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  //const result = await Course.find({ author: "Hire Bikila" }); this filters out based on the properties we can write any property and it just filters out
  //const result = await Course.find().limit(2); this limits the number of objects returned from the find array
  //const result = await Course.find().sort({ name: -1 }); Sorts based on some attribute of the schema and 1 for asending -1 for descending
  //const result = await Course.find().select({ name: 1, author: 1 }); This filters some attributes from the schema to be returned 1 to include them

  // eq, ne, gt, lt, gte, lte, in, nin

  //const result = await Course.find({ price: { $lte: 10 } }); this just returns an array which their price is less than or equal to 10

  //or, and

  // const result = await Course.find().or([
  //   { author: "Hire Bikila" },
  //   { isPublished: false },
  // ]);

  //const result = await Course.find({ author: /^hire/i }); starts with hire, case insensitive
  //const result = await Course.find({ author: /Bikila$/ }); ends with hire, case sensitive
  const result = await Course.find({ author: /.*hire.*/i }); // has hire, case insensitive

  console.log(result);
}

getCourses();
