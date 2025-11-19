import express from "express";
import mongoose from "mongoose";
import Joi from "joi";

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to Mongo DB..."))
  .catch((err) => console.log(err));

const route = express.Router();

const genreMongoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 11,
  },
});

const Genres = mongoose.model("Genre", genreMongoSchema);

const genreSchema = Joi.object({
  name: Joi.string().min(4).max(11).required(),
});

//get

route.get("/", async (req, res) => {
  res.send(await Genres.find());
});

//post

route.post("/", async (req, res) => {
  const { error } = genreSchema.validate(req.body || {});
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = new Genres({
    name: req.body.name,
  });
  const result = await genre.save();
  res.send(result);
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
