import mongoose from "mongoose";
import Joi from "joi";
import { genreMongoSchema } from "../routes/genres.js";

export const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  genre: {
    type: [genreMongoSchema],
    required: true,
    validator: {
      validate: (v) => v.length > 0,
    },
  },
  numberInStock: {
    type: Number,
    default: 0,
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
  },
});

export const Movies = mongoose.model("Movie", movieSchema);

//supportive functions

export function validateBody(obj) {
  let schema = Joi.object({
    title: Joi.string().min(5).required(),
    genre: Joi.string().length(24).required(),
  });
  if (obj && typeof obj.genre !== "string")
    schema = Joi.object({
      title: Joi.string().min(5).required(),
      genre: Joi.array().min(1).required(),
    });
  return schema.validate(obj || {});
}
