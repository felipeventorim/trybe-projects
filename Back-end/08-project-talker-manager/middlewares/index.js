const getToken = require('./auth/getToken');
const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const validateEmail = require('./auth/validateEmail');
const validatePassword = require('./auth/validatePassword');
const validateToken = require('./auth/validateToken');
const validateName = require('./validateTalker/validateName');
const validateAge = require('./validateTalker/validateAge');
const validateTalk = require('./validateTalker/validateTalk');
const createTalker = require('./createTalker');
const updateTalker = require('./updateTalker');
const deleteTalker = require('./deleteTalker');
const searchTalker = require('./searchTalker');

module.exports = {
  getToken,
  getAllTalkers,
  getTalkerById,
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  createTalker,
  updateTalker,
  deleteTalker,
  searchTalker,
};
