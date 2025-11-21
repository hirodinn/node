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

async function listMovies() {
  const result = await Movies.find();
  console.log(result);
}

async function createMovie(movie, genreId) {
  const genre = await Genres.findById(genreId);
  if (!genre) {
    return console.log("no more genre");
  }
  try {
    movie.genre = genre;
    const mo = new Movies(movie);
    const result = await mo.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}
createMovie({ title: "The Lolane Land" }, "6920b9b4fa5fc2947d0b2a81");
export default route;
