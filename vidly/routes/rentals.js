import express from "express";
import { Rental } from "../models/rental.js";

const route = express.Router();

async function listRentals() {
  const result = await Rental.find();
  console.log(result);
}

export default route;
