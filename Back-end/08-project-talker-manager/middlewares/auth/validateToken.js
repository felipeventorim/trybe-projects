const errorMessages = require('../../utils/errorMessages');

const validateToken = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token || !token.length) {
    return next(errorMessages.tokenNotFound);
  }

  if (token.length !== 16) {
    return next(errorMessages.invalidToken);
  }

  next();
};

module.exports = validateToken;
