import express from "express";
import { User, validateUser } from "../models/user.js";
import validateId from "../utils/validateId.js";
const route = express.Router();

//get

route.get("/", async (req, res) => {
  res.send(await User.find());
});

route.get("/:id", async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) res.status(400).send("Invalid Id");
  const result = await User.findById(req.params.id);
  if (result) res.send(result);
  else res.status(404).send("User with ID not Found");
});

//post

route.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) res.status(400).send(error.details[0].message);

  try {
    const user = new User(req.body);
    const result = await user.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default route;
