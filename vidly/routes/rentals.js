import express from "express";
import { Rental } from "../models/rental.js";
import { Customers } from "../models/customer.js";
import { Movies } from "../models/movie.js";

const route = express.Router();

//get

route.get("/", async (req, res) => {
  res.send(await Rental.find());
});

export default route;
