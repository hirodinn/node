import mongoose from "mongoose";
import express from "express";
import { Genres, genreMongoSchema } from "./genres.js";

const route = express.Router();

const Movies = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
    },
    genre: { type: genreMongoSchema, required: true },
    numberInStock: {
      type: Number,
      default: 0,
    },
    dailyRentalRate: {
      type: Number,
      default: 0,
    },
  })
);

async function listMovies(res) {
  const result = await Movies.find();
  res.send(result);
}

async function createMovie(movie, genreId, res) {
  const genre = await Genres.findById(genreId);
  if (!genre) {
    return res.status(404).send("no more genre");
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
  const result = await Movies.findByIdAndDelete(movieId);
  if (result) res.send(result);
  else res.status(404).send("can't find the movie");
}
//createMovie({ title: "The Lolane Land" }, "6920b9b4fa5fc2947d0b2a81");
//deleteMovie("6920bcb8de7c7e6acd740bb3");

//End points

route.get("/", (req, res) => {
  listMovies(res);
});

export default route;
