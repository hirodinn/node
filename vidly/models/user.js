import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.getAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

export const User = mongoose.model("User", userSchema);

export function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .pattern(/@gmail\.com$/)
      .required()
      .min(11),
    password: Joi.string().required().min(10),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user || {});
}
