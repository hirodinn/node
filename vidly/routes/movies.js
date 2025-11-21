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

export default route;
