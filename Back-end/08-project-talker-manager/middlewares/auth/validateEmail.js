const errorMessages = require('../../utils/errorMessages');

const validateEmail = (req, _res, next) => {
  const emailRegex = /^[a-z0-9-_.]+@[a-z.]+\.[a-z]{2,3}$/;
  const { email } = req.body;

  if (!email || !email.length) {
    return next(errorMessages.requiredEmail);
  }

  if (!emailRegex.test(email)) {
    return next(errorMessages.validatedEmail);
  }

  next();
};

module.exports = validateEmail;
