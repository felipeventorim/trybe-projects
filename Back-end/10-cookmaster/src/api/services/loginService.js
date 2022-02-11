const usersModel = require('../models/usersModel');
const loginSchema = require('./loginSchema');
const { generateToken } = require('../auth/token');

const errorHandling = require('../utils/functions/errorHandling');
const { unauthorized } = require('../utils/dictionary/statusCode');
const {
  allFieldsMustBeFilled,
  incorrectUsernameOrPassword,
} = require('../utils/dictionary/ErrorMessages');

const getPayload = (user) => {
  const { _id: id, email, role } = user;
  return { id, email, role };
};

const userLogin = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });

  if (error) throw errorHandling(unauthorized, allFieldsMustBeFilled);

  const user = await usersModel.findUserByEmail(email);

  if (!user || user.password !== password) {
    throw errorHandling(unauthorized, incorrectUsernameOrPassword);
  }

  const payload = getPayload(user);
  const token = generateToken(payload);

  return token;
};

module.exports = {
  userLogin,
};
