import express from "express";
import Joi from "joi";
const app = express();
app.use(express.json());

const genres = [
  "horror",
  "thriller",
  "fantasy",
  "fiction",
  "comedy",
  "romance",
  "history",
  "adventure",
];
const genreSchema = Joi.object({
  name: Joi.string().min(4).max(11).required(),
});

//get

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

//post

app.post("/api/genres", (req, res) => {
  const { error } = genreSchema.validate(req.body || {});
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  genres.push(req.body.name);
  res.send(req.body);
});

//delete

app.delete("/api/genres/:name", (req, res) => {
  const genre = genres.indexOf(req.params.name);
  if (genre === -1)
    return res.status(404).send("the genre doesn't exist to delete");
  genres.splice(genre, 1);
  res.send(req.params.name);
});

//put

app.put("/api/genres/:name", (req, res) => {
  const genre = genres.indexOf(req.params.name);
  if (genre === -1)
    return res.status(404).send("the genre doesn't exist to delete");
  const { error } = genreSchema.validate(req.body || {});
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  genres[genre] = req.body.name;
  res.send(req.body.name);
});

// port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));
