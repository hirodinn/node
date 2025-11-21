import mongoose from "mongoose";
import { genreMongoSchema } from "../routes/genres.js";
export const Movies = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
    },
    genre: { type: [genreMongoSchema], required: true },
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
