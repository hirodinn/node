import express from "express";
import mongoose from "mongoose";
import Joi from "joi";
import auth from "../middleware/auth.js";
import idNotFound from "../utils/idNotFound.js";

const route = express.Router();

export const genreMongoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 11,
  },
});

export const Genres = mongoose.model("Genre", genreMongoSchema);

const genreSchema = Joi.object({
  name: Joi.string().max(11).required(),
});

//get

route.get("/", async (req, res) => {
  res.send(await Genres.find());
});

route.get("/:id", async (req, res) => {
  const result = await Genres.findById(req.params.id);
  if (result) res.send(result);
  else idNotFound();
});
//post

route.post("/", auth, async (req, res) => {
  const { error } = genreSchema.validate(req.body || {});
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = new Genres({
    name: req.body.name,
  });
  const result = await genre.save();
  res.send(result);
});

//delete

route.delete("/:id", async (req, res) => {
  const result = await Genres.findByIdAndDelete(req.params.id);
  if (result) res.send(result);
  else idNotFound();
});

//put

route.put("/:id", async (req, res) => {
  const { error } = genreSchema.validate(req.body || {});
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const result = await Genres.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (result) res.send(result);
  else idNotFound();
});

export default route;
