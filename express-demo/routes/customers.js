import mongoose from "mongoose";
import express from "express";
import Joi from "joi";
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
const schema = Joi.object({
  name: Joi.string().required().min(5),
  phone: Joi.string().length(10).required(),
});

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

//post

route.post("/", async (req, res) => {
  const { error } = schema.validate(req.body || {});
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const customer = new Customers(req.body);
    const result = await customer.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// put

route.put("/:id", async (req, res) => {
  const { error } = schema.validate(req.body || {});
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const result = await Customers.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
export default route;
