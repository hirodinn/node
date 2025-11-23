import express from "express";
import { User, validateUser } from "../models/user.js";
const route = express.Router();

route.get("/", async (req, res) => {
  res.send(await User.find());
});

export default route;
