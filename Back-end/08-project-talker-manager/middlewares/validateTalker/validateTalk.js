const errorMessages = require('../../utils/errorMessages');

const checkWatchedAt = (watchedAt) => {
  const [day, mouth, year] = watchedAt.split('/');
  const date = new Date(`${mouth}-${day}-${year}`);

  if (date.toString() === 'Invalid Date') return false;

  return true;
};

const checkRate = (rate) => {
  if (rate < 1 || rate > 5) {
    return false;
  }
  return true;
};

const validateTalk = (req, _res, next) => {
  try {
    const { talk: { watchedAt, rate } } = req.body;

    if (rate === undefined) return next(errorMessages.invalidTalk);
    
    if (!checkWatchedAt(watchedAt)) return next(errorMessages.invalidWatchedAt);
  
    if (!checkRate(rate)) return next(errorMessages.invalidRate);
  
    next();
  } catch (error) {
    return next(errorMessages.invalidTalk);
  }
};

module.exports = validateTalk;
