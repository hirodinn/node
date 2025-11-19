import express from "express";
import mongoose from "mongoose";
import Joi from "joi";

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to Mongo DB..."))
  .catch((err) => console.log(err));

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
  name: Joi.string().min(4).max(11).required(),
});

//get

route.get("/", async (req, res) => {
  res.send(await Genres.find());
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
  const result = await genre.save();
  res.send(result);
});

//delete

route.delete("/:id", async (req, res) => {
  try {
    const result = await Genres.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

//put

route.put("/:id", async (req, res) => {
  const { error } = genreSchema.validate(req.body || {});
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const result = await Genres.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name: req.body.name } },
      { new: true }
    );
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

export default route;
