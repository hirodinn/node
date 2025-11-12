import express from "express";
const app = express();

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

app.get("/", (req, res) => {
  res.send("hello ladies and gentlemen");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course) res.status(404).send("the course with this id is not found");
  res.send(course);
});

// app.get("/api/users", (req, res) => {
//   res.send(req.query);
// });

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening to port ${port}...`));
