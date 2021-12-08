const generateToken = require('../../utils/generateToken');

const getToken = (_req, res, _next) => {
  const token = generateToken();

  res.status(200).json({ token });
};

module.exports = getToken;
