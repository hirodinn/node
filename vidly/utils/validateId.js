import Joi from "joi";

export default function validateId(id) {
  const obj = { id };
  const schema = Joi.object({
    id: Joi.string().length(24).required(),
  });
  return schema.validate(obj || {});
}
