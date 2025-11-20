import express from "express";
import mongoose from "mongoose";
import Joi from "joi";

const route = express.Router();

const genreMongoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 11,
  },
});

const Genres = mongoose.model("Genre", genreMongoSchema);

const genreSchema = Joi.object({
  name: Joi.string().max(11).required(),
});

//get

route.get("/", async (req, res) => {
  res.send(await Genres.find());
});

route.get("/:id", async (req, res) => {
  try {
    const result = await Genres.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(404).send(err.message);
  }
});
//post

route.post("/", async (req, res) => {
  const { error } = genreSchema.validate(req.body || {});
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = new Genres({
    name: req.body.name,
  });
  try {
    const result = await genre.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//delete

route.delete("/:id", async (req, res) => {
  try {
    const result = await Genres.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

//put

route.put("/:id", async (req, res) => {
  const { error } = genreSchema.validate(req.body || {});
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const result = await Genres.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.send(result);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

export default route;
