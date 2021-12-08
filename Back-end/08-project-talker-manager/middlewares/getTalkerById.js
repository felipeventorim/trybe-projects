const getTalkers = require('../utils/getTalkers');

const errorMessages = require('../utils/errorMessages');

const getTalkerById = (req, res, next) => {
  const talkers = getTalkers();
  const { id } = req.params;

  const talker = talkers.find(({ id: talkerId }) => talkerId === Number(id));

  if (!talker) return next(errorMessages.personNotFound);

  res.status(200).json(talker);
};

module.exports = getTalkerById;
