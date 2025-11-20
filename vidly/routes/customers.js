import express from "express";
import { Customers } from "../models/customer.js";
import { validateCustomer } from "../models/customer.js";

const route = express.Router();

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
  const { error } = validateCustomer(req.body);
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
  const { error } = validateCustomer(req.body);
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

//delete

route.delete("/:id", async (req, res) => {
  try {
    const result = await Customers.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(404).send(err.message);
  }
});
export default route;
