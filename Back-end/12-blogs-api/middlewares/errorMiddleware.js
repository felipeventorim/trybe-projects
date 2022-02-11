const { StatusCodes } = require('http-status-codes');

const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err });
};

module.exports = errorMiddleware;
