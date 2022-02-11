const jwt = require('jsonwebtoken');

const SECRET = 'cookmaster';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (user) => jwt.sign({ data: user }, SECRET, jwtConfig);

const verifyToken = (token) => {
  const { data: { email, role } } = jwt.verify(token, SECRET);
  return { email, role };
};

module.exports = {
  generateToken,
  verifyToken,
};
