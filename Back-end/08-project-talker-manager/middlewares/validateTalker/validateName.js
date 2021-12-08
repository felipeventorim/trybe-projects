const errorMessages = require('../../utils/errorMessages');

const validateName = (req, _res, next) => {
  const { name } = req.body;

  if (!name || !name.length) {
    return next(errorMessages.nameNotFound);
  }

  if (name.length < 3) {
    return next(errorMessages.invalidName);
  }

  next();
};

module.exports = validateName;
