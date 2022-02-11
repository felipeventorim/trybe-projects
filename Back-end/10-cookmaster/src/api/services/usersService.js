const usersModel = require('../models/usersModel');
const userSchema = require('./userSchema');

const errorHandling = require('../utils/functions/errorHandling');
const { badRequest, conflict } = require('../utils/dictionary/statusCode');
const { invalidEntries, emailAlreadyRegistered } = require('../utils/dictionary/ErrorMessages');

const createUser = async (newUser) => {
  const { error } = userSchema.validate(newUser);

  if (error) throw errorHandling(badRequest, invalidEntries);

  const userlAlreadyExists = await usersModel.findUserByEmail(newUser.email);
  if (userlAlreadyExists) throw errorHandling(conflict, emailAlreadyRegistered);

  const role = 'user';
  const { _id } = await usersModel.createUser({ role, ...newUser });

  return { _id, role };
};

module.exports = {
  createUser,
};
