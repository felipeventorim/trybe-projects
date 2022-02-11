const Joi = require('@hapi/joi');

const idSchema = Joi.string().length(24).hex().required();

module.exports = idSchema;