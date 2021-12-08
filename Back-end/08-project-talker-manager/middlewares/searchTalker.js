const getTalkers = require('../utils/getTalkers');

const searchTalker = (req, res) => {
  const { q } = req.query;

  const talkers = getTalkers();

  if (!q || !q.length) return res.status(200).json(talkers);

  const filteredTalkers = talkers.filter((talker) => {
    const name = talker.name.toLowerCase();
    return name.includes(q.toLowerCase());
  });

  return res.status(200).json(filteredTalkers);
};

module.exports = searchTalker;
