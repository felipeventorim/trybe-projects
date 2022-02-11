const { StatusCodes } = require('http-status-codes');

const { validateToken } = require('../auth');

const { tokenNotFound, expiredToken } = require('../utils/errors/messages');
const errorHandling = require('../utils/errors/errorHandling');

const validateTokenMiddleware = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    
    if (!token) throw errorHandling(StatusCodes.UNAUTHORIZED, tokenNotFound);
    
    const { email } = validateToken(token);

    req.headers.email = email;

    next();
  } catch (error) {
    if (error.name) return next(errorHandling(StatusCodes.UNAUTHORIZED, expiredToken));
    next(error);
  }
};

module.exports = validateTokenMiddleware;
