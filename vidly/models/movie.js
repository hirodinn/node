import mongoose from "mongoose";
import Joi from "joi";
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

//supportive functions

export function validateBody(obj) {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    genre: Joi.string().length(24).required(),
  });
  return schema.validate(obj || {});
}

export function validateId(id) {
  const schema = Joi.object({
    genre: Joi.string().length(24).required(),
  });
  return schema.validate(id || {});
}
