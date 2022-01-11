const { serverError } = require('../utils/dictionary/statusCode');
const { internalServerError } = require('../utils/dictionary/messagesDefault');

const errorHandler = (error, _req, res, _next) => {
  if (error.status) return res.status(error.status).send({ err: error.err });

  res.status(serverError).send(internalServerError);
};

module.exports = errorHandler;
