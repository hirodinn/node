import express from "express";
import Joi from "joi";

const route = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
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
  genres.push({ id: genres.length + 1, name: req.body.name });
  res.send(req.body);
});

//delete

route.delete("/:id", (req, res) => {
  const genre = genres.find((gen) => gen.id === req.params.id);
  if (genre) return res.status(404).send("the genre doesn't exist to delete");
  genres.splice(genre, 1);
  res.send(req.params.name);
});

//put

route.put("/:id", (req, res) => {
  const genre = genres.find((gen) => gen.id === req.params.id);
  if (genre) return res.status(404).send("the genre doesn't exist to delete");
  const { error } = genreSchema.validate(req.body || {});
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  genres[genre] = req.body.name;
  res.send(req.body.name);
});

export default route;
