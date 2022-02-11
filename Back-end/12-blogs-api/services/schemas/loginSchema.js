const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
  email: Joi.string().empty().email().required(),
  password: Joi.string().empty().length(6).required(),
});

module.exports = loginSchema;
