import express from "express";
import Joi from "joi";
import { Movies, validateBody } from "../models/movie.js";

import { Genres } from "./genres.js";

const route = express.Router();

async function listMovies(res) {
  const result = await Movies.find();
  res.send(result);
}

async function createMovie(movie, res) {
  const genre = await Genres.findById(movie.genre);
  if (!genre) {
    return res.status(404).send("No Genre Found");
  }
  try {
    movie.genre = genre;
    const mo = new Movies(movie);
    const result = await mo.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}
async function deleteMovie(movieId, res) {
  try {
    const result = await Movies.findByIdAndDelete(movieId);
    if (result) res.send(result);
    else res.status(404).send("can't find the movie");
  } catch (err) {
    res.status(400).send(err.message);
  }
}
//createMovie({ title: "The Lolane Land" }, "6920b9b4fa5fc2947d0b2a81");
//deleteMovie("6920bcb8de7c7e6acd740bb3");

//End points

//get

route.get("/", (req, res) => {
  listMovies(res);
});

route.get("/:id", async (req, res) => {
  try {
    const result = await Movies.findById(req.params.id);
    if (!result) res.status(404).send("No Movie Found");
    else res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//post

route.post("/", async (req, res) => {
  const { error } = validateBody(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  createMovie(req.body, res);
});

route.post("/:id", async (req, res) => {
  const idSchema = Joi.object({
    genre: Joi.string().length(24).required(),
  });
  const { error } = idSchema.validate(req.body || {});
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const movie = await Movies.findById(req.params.id);
    if (!movie)
      return res.status(404).send("Can't find a movie with the param id");
    const genre = await Genres.findById(req.body.genre);
    if (!genre)
      return res.status(404).send("Can't find a genre with the body id");
    movie.genre.push(genre);
    const result = await movie.save();
    res.send(result);
  } catch (err) {
    res.status(404).send(err.message);
  }
});
//delete

route.delete("/:id", (req, res) => {
  deleteMovie(req.params.id, res);
});

export default route;
