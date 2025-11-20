import mongoose from "mongoose";
import Joi from "joi";

export const Customers = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: { type: String, minlength: 5, required: true, trim: true },
    phone: {
      type: String,
      validate: {
        validator: (v) => v.length === 10,
      },
    },
  })
);

export function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().required().min(5),
    phone: Joi.string().length(10).required(),
  });
  return schema.validate(customer || {});
}
