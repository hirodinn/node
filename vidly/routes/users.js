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
  if (error) return res.status(400).send("Invalid Id");
  const result = await User.findById(req.params.id);
  if (result) res.send(result);
  else res.status(404).send("User with ID not Found");
});

//post

route.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = User.find({ email: req.body.email });
    if (user) res.status(400).send("User with email already exists");
    user = new User(req.body);
    const result = await user.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//put

route.put("/:id", async (req, res) => {
  var { error } = validateId(req.params.id);
  if (error) return res.status(400).send("Invalid Id");

  var { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (result) res.send(result);
    else res.status(404).send("Id Not Found");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//delete

route.delete("/:id", async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).send("Invalid Id");

  const result = await User.findByIdAndDelete(req.params.id);
  if (result) res.send(result);
  else res.status(404).send("User with ID already doesn't exist");
});

export default route;
