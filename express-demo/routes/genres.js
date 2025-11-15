import express from "express";
import Joi from "joi";

const route = express.Router();

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

route.get("/", (req, res) => {
  res.send(genres);
});

//post

route.post("/", (req, res) => {
  const { error } = genreSchema.validate(req.body || {});
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  genres.push(req.body.name);
  res.send(req.body);
});

//delete

route.delete("/:name", (req, res) => {
  const genre = genres.indexOf(req.params.name);
  if (genre === -1)
    return res.status(404).send("the genre doesn't exist to delete");
  genres.splice(genre, 1);
  res.send(req.params.name);
});

//put

route.put("/:name", (req, res) => {
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

export default route;
