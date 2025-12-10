import mongoose from "mongoose";
import logger from "../logger.js";

export default function () {
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => logger.info("Connected to Mongo DB..."));
}
