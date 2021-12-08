const getTalkers = require('../utils/getTalkers');
const setTalkers = require('../utils/setTalkers');

const createTalker = (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = getTalkers();
  const id = talkers[talkers.length - 1].id + 1;
  const newTalker = { id, name, age, talk };

  setTalkers([...talkers, newTalker]);

  res.status(201).json(newTalker);
};

module.exports = createTalker;
