import dotenv from "dotenv";
import Joi from "joi";
import joi from "joi-objectid";
export default function validate() {
  Joi.objectId = joi(Joi);
  dotenv.config();
}
