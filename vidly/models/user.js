import mongoose from "mongoose";
import Joi, { required } from "joi";

export const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /@gmail.com$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
    },
  })
);

export function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().min(11),
    password: Joi.string().required().min(10),
  });
}
