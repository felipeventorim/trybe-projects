const Joi = require('@hapi/joi');

const productSchema = Joi.object({
  name: Joi.string().min(5),
  quantity: Joi.number().min(1).required(),
});

module.exports = productSchema;
