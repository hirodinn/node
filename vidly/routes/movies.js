import express from "express";
import mongoose from "mongoose";
import { Movies, validateBody } from "../models/movie.js";
import validateId from "../utils/validateId.js";
import { Genres } from "./genres.js";

const route = express.Router();

async function listMovies(res) {
  const result = await Movies.find();
  res.send(result);
}

async function createMovie(movie, res) {
  let genre;
  if (typeof movie.genre === "string")
    genre = await Genres.findById(movie.genre);
  else {
    genre = [];
    for (let i of movie.genre) {
      const { error } = validateId(i);
      if (error) continue;
      const temp = await Genres.findById(i);
      genre.push(temp);
    }
  }
  if (!genre || genre.length === 0) {
    return res.status(404).send("No Genre Found");
  }
  movie.genre = genre;
  const mo = new Movies(movie);
  const result = await mo.save();
  res.send(result);
}
async function deleteMovie(movieId, res) {
  const result = await Movies.findByIdAndDelete(movieId);
  if (result) res.send(result);
  else res.status(404).send("can't find the movie");
}
//createMovie({ title: "The Lolane Land" }, "6920b9b4fa5fc2947d0b2a81");
//deleteMovie("6920bcb8de7c7e6acd740bb3");

//End points

//get

route.get("/", (req, res) => {
  listMovies(res);
});

route.get("/:id", async (req, res) => {
  const result = await Movies.findById(req.params.id);
  if (!result) res.status(404).send("No Movie Found");
  else res.send(result);
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
  var { error } = validateId(req.body.id);
  if (error) return res.status(400).send("Genre " + error.details[0].message);
  var { error } = validateId(req.params.id);
  if (error) return res.status(400).send("Movie " + error.details[0].message);
  const movie = await Movies.findById(req.params.id);
  if (!movie)
    return res.status(404).send("Can't find a movie with the param id");
  const genre = await Genres.findById(req.body.id);
  if (!genre)
    return res.status(404).send("Can't find a genre with the body id");
  movie.genre.push(genre);
  const result = await movie.save();
  res.send(result);
});
//delete

route.delete("/:id", (req, res) => {
  deleteMovie(req.params.id, res);
});

export default route;
