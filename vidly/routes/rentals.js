import express from "express";
import { Rental } from "../models/rental.js";
import { Customers } from "../models/customer.js";
import { Movies } from "../models/movie.js";
import validateId from "../utils/validateId.js";
const route = express.Router();

//get

route.get("/", async (req, res) => {
  res.send(await Rental.find());
});

route.get("/:id", async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).send("Invalid Id");
  const result = await Rental.findById(req.params.id);
  if (result) res.send(result);
  else res.status(404).send("Rental with this Id not found");
});

export default route;
