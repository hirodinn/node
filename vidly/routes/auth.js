import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";

const route = express.Router();

route.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email of Password");

    const verified = await bcrypt.compare(req.body.password, user.password);
    console.log(verified);
    if (verified) res.send("Yes It Is Verified");
    else res.status(400).send("Not Verified");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .min(5)
      .max(255)
      .email()
      .pattern(/@gmail\.com/),
    password: Joi.string().required().min(5).max(255),
  });
  return schema.validate(req);
}

export default route;
