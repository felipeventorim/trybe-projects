const fs = require('fs');

const path = './talker.json';

const setTalkers = (newFile) => {
  fs.writeFileSync(path, JSON.stringify(newFile));
};

module.exports = setTalkers;
