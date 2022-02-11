const { verifyToken } = require('../auth/token');

const errorHandling = require('../utils/functions/errorHandling');
const { unauthorized } = require('../utils/dictionary/statusCode');
const { jwtMalformed, missingAuthToken } = require('../utils/dictionary/ErrorMessages');

const authUserMiddleware = (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw errorHandling(unauthorized, missingAuthToken);

    const { email, role } = verifyToken(authorization);

    req.headers = { email, role };
    
    next();
  } catch (error) {
    console.log(`AUTHUSERMIDDLEWARE => ${error.message}`);
    if (error.status) next(error);
    next(errorHandling(unauthorized, jwtMalformed));
  }
};

module.exports = authUserMiddleware;
