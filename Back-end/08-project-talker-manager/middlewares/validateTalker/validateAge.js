const errorMessages = require('../../utils/errorMessages');

const validateAge = (req, _res, next) => {
  const { age } = req.body;

  if (!age) {
    return next(errorMessages.ageNotFound);
  }

  if (age < 18) {
    return next(errorMessages.invalidAge);
  }

  next();
};

module.exports = validateAge;
