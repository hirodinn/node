import Joi from "joi";
import express from "express";
import logger from "./logger.js";
import authenticate from "./authenticate.js";
const app = express();
app.use(express.json());

app.use(logger);

app.use(authenticate);

app.use(express.static("public"));

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

const courseSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

//get

app.get("/", (req, res) => {
  res.send("hello ladies and gentlemen");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course)
    return res.status(404).send("the course with this id is not found");
  res.send(course);
});
app.get("/api/users", (req, res) => {
  res.send(req.query);
});

//post

app.post("/api/courses", (req, res) => {
  const { error } = courseSchema.validate(req.body || {});
  if (error) return res.status(400).send(error.details[0].message);

  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  res.send(course);
});

//put

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course)
    return res.status(404).send("the course with this id is not found");
  const { error } = courseSchema.validate(req.body || {});
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

//delete

app.delete("/api/courses/:id", (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find((c) => c.id === id);
  if (!course)
    return res.status(404).send("the course with this id is not found");
  courses.splice(courses.indexOf(course), 1);
  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening to port ${port}...`));
