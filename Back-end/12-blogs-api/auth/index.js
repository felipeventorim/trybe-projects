const jwt = require('jsonwebtoken');

const SECRET = 'ProjectBlogsApi';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (data) => jwt.sign({ data }, SECRET, jwtConfig);

const validateToken = (token) => {
  const { data } = jwt.verify(token, SECRET);

  return data;
};

module.exports = {
  generateToken,
  validateToken,
};
