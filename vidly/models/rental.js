import mongoose from "mongoose";
import Joi from "joi";

const movieSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const customerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

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

export function validateRental(obj) {
  const schema = Joi.object({
    customerId: Joi.string().required().length(24),
    movieId: Joi.string().required().length(24),
    rentDate: Joi.date(),
    returnDate: Joi.date().required(),
  });
  return schema.validate(obj || {});
}
