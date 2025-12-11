import express from "express";
import { Rental } from "../models/rental.js";
import { Customers } from "../models/customer.js";
import { Movies } from "../models/movie.js";
import validateId from "../utils/validateId.js";
import { validateRental } from "../models/rental.js";
import idNotFound from "../utils/idNotFound.js";
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
  else idNotFound();
});

//post

route.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const movie = await Movies.findById(req.body.movieId);
  if (!movie) return res.status(404).send("Movie with Id Not Found");
  const customer = await Customers.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Customer with Id Not Found");

  const rental = new Rental({
    customer: customer,
    movie: movie,
    returnDate: req.body.returnDate,
  });
  const result = await rental.save();
  res.send(result);
});

//delete

route.delete("/:id", async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await Rental.findByIdAndDelete(req.params.id);
  if (result) res.send(result);
  else res.status(404).send("Can't find Rental with the id");
});

export default route;
