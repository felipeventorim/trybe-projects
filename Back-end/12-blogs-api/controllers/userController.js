const { StatusCodes } = require('http-status-codes');

const { generateToken } = require('../auth');
const userService = require('../services/userService');

const createUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = { displayName, email, password, image };
  
    await userService.createUser(newUser);

    const token = generateToken({ email, password });
  
    res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.getUser(id);

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.headers;

    await userService.deleteUser(email);

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
};
