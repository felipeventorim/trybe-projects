const { StatusCodes } = require('http-status-codes');

const loginService = require('../services/loginService');
const { generateToken } = require('../auth');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await loginService.login({ email, password });

    const token = generateToken({ email, password });

    res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
