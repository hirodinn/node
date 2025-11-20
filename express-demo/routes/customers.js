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

//get

route.get("/", async (req, res) => {
  res.send(await Customers.find());
});

route.get("/:id", async (req, res) => {
  try {
    res.send(await Customers.findById(req.params.id));
  } catch (err) {
    res.status(404).send(err.message);
  }
});

export default route;
