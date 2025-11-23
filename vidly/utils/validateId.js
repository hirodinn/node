import Joi from "joi";
import joi from "joi-objectid";
Joi.objectId = joi(Joi);

export default function validateId(id) {
  const schema = Joi.object({
    id: Joi.objectId().required(),
  });
  return schema.validate({ id } || {});
}
