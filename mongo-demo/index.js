import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to Mongo DB..."))
  .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  tags: [String],
  date: { type: Date, default: Date.now() },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "frontend learning course",
    author: "Mosh Hamedani",
    price: 100,
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
  //const result = await Course.find({ author: /^hire/i }); starts with hire, case insensitive
  //const result = await Course.find({ author: /.*hire.*/i }).countDocuments(); counts the number of values returned from the query

  const pageNumber = 2;
  const pageSize = 10;
  const result = await Course.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageNumber);
  console.log(result);
}

async function changeCourse(id) {
  const course = await Course.findById(id);
  if (!course) {
    console.log("Course not found");
    return;
  }
  course.set({
    isPublished: true,
    author: "Whether author",
  });
  // course.isPublished = false;
  // course.author = "whether author";

  const result = await course.save();
  console.log(result);
}
changeCourse("5a6900fff467be65019a9001");
