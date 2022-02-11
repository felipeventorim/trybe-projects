const { StatusCodes } = require('http-status-codes');

const loginSchema = require('./schemas/loginSchema');
const { findUserByEmail } = require('./userService');

const { invalidFields } = require('../utils/errors/messages');
const errorHandling = require('../utils/errors/errorHandling');

const validateFields = (email, password) => {
  const { error } = loginSchema.validate({ email, password });

  if (error) throw errorHandling(StatusCodes.BAD_REQUEST, error.message);
};

const login = async ({ email, password }) => {
  validateFields(email, password);

  const user = await findUserByEmail(email);

  if (!user) throw errorHandling(StatusCodes.BAD_REQUEST, invalidFields);
  
  if (user.dataValues.password !== password) {
    throw errorHandling(StatusCodes.BAD_REQUEST, invalidFields);
  }
};

module.exports = {
  login,
};
