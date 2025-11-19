import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to Mongo DB..."))
  .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 25,
    //match:/matching character/
  },
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
    required: true,
    lowercase: true,
    //uppercase: true,
    trim: true,
  },
  author: String,
  price: {
    type: Number,
    min: 15,
    max: 30,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: async function (v) {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });

        return v && v.length > 0;
      },
      message: "a course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now() },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "frontend learning course",
    author: "Mosh Hamedani",
    price: 16.67,
    category: "WEB",
    tags: ["frontend"],
    isPublished: true,
  });
  try {
    //we can also use course.validate() which returns a promise
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (let field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
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

  // const pageNumber = 2;
  // const pageSize = 10;
  // const result = await Course.find()
  //   .skip((pageNumber - 1) * pageSize)
  //   .limit(pageNumber);
  const result = await Course.find({ _id: "691e1d03b011e535d86839de" });
  console.log(result[0].price);
}
getCourses();

async function changeCourse(id) {
  const result = await Course.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        author: "visible",
        isPublished: false,
      },
    },
    { new: true }
  );
  // if (!course) {
  //   console.log("Course not found");
  //   return;
  //}
  // course.set({
  //   isPublished: true,
  //   author: "Whether author",
  // });
  // course.isPublished = false;
  // course.author = "whether author";

  console.log(result);
}

async function deleteCourse(id) {
  const result = await Course.deleteMany({ name: "frontend learning course" });
  //const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

//createCourse();
