const getTalkers = require('../utils/getTalkers');
const setTalkers = require('../utils/setTalkers');

const deleteTalker = (req, res) => {
  const id = Number(req.params.id);

  const talkers = getTalkers();
  const newTalkers = talkers.filter((talker) => (talker.id !== Number(id)));

  setTalkers(newTalkers);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
