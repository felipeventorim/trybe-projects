const { StatusCodes } = require('http-status-codes');

const { Users } = require('../models');
const userSchema = require('./schemas/userSchema');

const { userAlreadyRegistered, userNotExist } = require('../utils/errors/messages');
const errorHandling = require('../utils/errors/errorHandling');

const validateUserFields = (user) => {
  const { error } = userSchema.validate(user);

  if (error) throw errorHandling(StatusCodes.BAD_REQUEST, error.message);
};

const createUser = async (newUser) => {
  validateUserFields(newUser);

  const [, wasCreated] = await Users.findOrCreate(
    {
      where: { email: newUser.email },
      defaults: newUser,
    },
  );

  if (!wasCreated) throw errorHandling(StatusCodes.CONFLICT, userAlreadyRegistered);
};

const getAllUsers = async () => {
  const users = await Users.findAll();

  const usersWithoutPassword = users.map(({ dataValues: { password, ...infos } }) => infos);

  return usersWithoutPassword;
};

const findUserByEmail = (email) => Users.findOne({ where: { email } });

const findUserById = (id) => Users.findByPk(id);

const getUser = async (id) => {
  const user = await findUserById(id);

  if (!user) throw errorHandling(StatusCodes.NOT_FOUND, userNotExist);

  return user;
};

const deleteUser = async (email) => {
  await Users.destroy({ where: { email } });
};

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  getUser,
  deleteUser,
};
