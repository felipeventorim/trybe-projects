const fs = require('fs');

const path = './talker.json';

const getTalkers = () => {
  const file = fs.readFileSync(path);
  const parsedFile = JSON.parse(file);

  if (!parsedFile || !parsedFile.length) return [];

  return parsedFile;
};

module.exports = getTalkers;
