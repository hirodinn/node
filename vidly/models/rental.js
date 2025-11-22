import mongoose from "mongoose";
import { customerSchema } from "./customer.js";
import { movieSchema } from "./movie.js";

export const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: customerSchema,
      required: true,
    },
    movie: { type: movieSchema, required: true },
    rentDate: {
      type: Date,
      default: Date.now(),
    },
    returnDate: {
      type: Date,
      required: true,
    },
  })
);
