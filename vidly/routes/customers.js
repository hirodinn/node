import express from "express";
import { Customers } from "../models/customer.js";
import { validateCustomer } from "../models/customer.js";
import idNotFound from "../utils/idNotFound.js";
import validateId from "../utils/validateId.js";

const route = express.Router();

//get

route.get("/", async (req, res) => {
  res.send(await Customers.find());
});

route.get("/:id", async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await Customers.findById(req.params.id);
  if (result) res.send(result);
  else idNotFound();
});

//post

route.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = new Customers(req.body);
  const result = await customer.save();
  res.send(result);
});

// put

route.put("/:id", async (req, res) => {
  var { error } = validateId(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  var { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await Customers.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (result) res.send(result);
  else idNotFound();
});

//delete

route.delete("/:id", async (req, res) => {
  const result = await Customers.findByIdAndDelete(req.params.id);
  if (result) res.send(result);
  else idNotFound();
});
export default route;
