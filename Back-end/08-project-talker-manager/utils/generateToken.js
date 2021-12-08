// fonte para gerar o token aleatorio:
// https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details

const generateRandomStr = () => (
  Math.random().toString(36).substr(2)
);

const generateToken = () => (
  (generateRandomStr() + generateRandomStr()).substr(0, 16)
);

module.exports = generateToken;
