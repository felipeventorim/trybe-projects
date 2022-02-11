const Joi = require('@hapi/joi');

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
  userId: Joi.number().required(),
});

module.exports = postSchema;
