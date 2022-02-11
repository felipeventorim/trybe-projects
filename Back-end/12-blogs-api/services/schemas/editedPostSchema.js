const Joi = require('@hapi/joi');

const editedPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.boolean().falsy(),
});

module.exports = editedPostSchema;
