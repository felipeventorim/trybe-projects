const getTalkers = require('../utils/getTalkers');
const setTalkers = require('../utils/setTalkers');

const updateTalker = (req, res) => {
  const id = Number(req.params.id);
  const { name, age, talk } = req.body;

  const talkers = getTalkers();
  const newTalker = { id, name, age, talk };
  const newTalkers = talkers.map((talker) => (talker.id === Number(id) ? newTalker : talker));

  setTalkers(newTalkers);

  res.status(200).json(newTalker);
};

module.exports = updateTalker;
