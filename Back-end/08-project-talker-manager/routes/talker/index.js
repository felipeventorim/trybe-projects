const express = require('express');

const {
  getAllTalkers,
  getTalkerById,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  createTalker,
  updateTalker,
  deleteTalker,
  searchTalker,
} = require('../../middlewares');

const router = express.Router();

router.get('/', getAllTalkers);

router.get('/search', validateToken, searchTalker);

router.get('/:id', getTalkerById);

router.post('/', validateToken, validateName, validateAge, validateTalk, createTalker);

router.put('/:id', validateToken, validateName, validateAge, validateTalk, updateTalker);

router.delete('/:id', validateToken, deleteTalker);

module.exports = router;
