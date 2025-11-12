import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("hello ladies and gentlemen");
});
app.get("/api/courses", (req, res) => {
  res.send(["maths", "science", "sport"]);
});

app.listen(3000, () => console.log("listening to port 3000..."));
