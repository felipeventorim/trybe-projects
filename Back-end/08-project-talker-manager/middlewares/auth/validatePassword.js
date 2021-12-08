const errorMessages = require('../../utils/errorMessages');

const validatePassword = (req, _res, next) => {
  const { password } = req.body;

  if (!password || !password.length) {
    return next(errorMessages.requiredPassword);
  }

  if (password.length < 6) {
    return next(errorMessages.validatedPassword);
  }

  next();
};

module.exports = validatePassword;
