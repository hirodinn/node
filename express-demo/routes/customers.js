import mongoose from "mongoose";
import express from "express";
const route = express.Router();

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

route.get("/", async (req, res) => {
  res.send(await Customers.find());
});

export default route;
