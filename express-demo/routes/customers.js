import { required } from "joi";
import mongoose from "mongoose";

const Customers = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: { type: String, minlength: 5, required: true },
    phone: {
      type: String,
      validate: {
        validator: (v) => v.length === 10,
      },
    },
  })
);
