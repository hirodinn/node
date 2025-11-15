import express from "express";
import Joi from "joi";

const route = express.Router();

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

const courseSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

//get

route.get("/", (req, res) => {
  res.send(courses);
});

route.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course)
    return res.status(404).send("the course with this id is not found");
  res.send(course);
});

//post

route.post("/", (req, res) => {
  const { error } = courseSchema.validate(req.body || {});
  if (error) return res.status(400).send(error.details[0].message);

  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  res.send(course);
});

//put

route.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course)
    return res.status(404).send("the course with this id is not found");
  const { error } = courseSchema.validate(req.body || {});
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

//delete

route.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find((c) => c.id === id);
  if (!course)
    return res.status(404).send("the course with this id is not found");
  courses.splice(courses.indexOf(course), 1);
  res.send(course);
});

export default route;
route.get("/api/users", (req, res) => {
  res.send(req.query);
});
