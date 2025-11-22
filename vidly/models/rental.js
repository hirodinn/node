import mongoose from "mongoose";
import { Customers, customerSchema } from "./customer";
import { Movies, movieSchema } from "./movie";
const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: customerSchema,
      required: true,
    },
    movie: { type: movieSchema, required: true },
    rentDate: {
      type: date,
      default: Date.now(),
    },
    returnDate: {
      type: date,
      required: true,
    },
  })
);
