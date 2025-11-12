import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("hello ladies and gentlemen");
});
app.get("/api/courses", (req, res) => {
  res.send(["maths", "science", "sport"]);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening to port ${port}...`));
