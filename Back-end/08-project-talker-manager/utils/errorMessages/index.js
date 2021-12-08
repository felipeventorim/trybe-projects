const createError = (status, message) => ({ status, message });

const errorMessages = {
  personNotFound: createError(404, 'Pessoa palestrante não encontrada'),
  requiredEmail: createError(400, 'O campo "email" é obrigatório'),
  validatedEmail: createError(400, 'O "email" deve ter o formato "email@email.com"'),
  requiredPassword: createError(400, 'O campo "password" é obrigatório'),
  validatedPassword: createError(400, 'O "password" deve ter pelo menos 6 caracteres'),
  tokenNotFound: createError(401, 'Token não encontrado'),
  invalidToken: createError(401, 'Token inválido'),
  nameNotFound: createError(400, 'O campo "name" é obrigatório'),
  invalidName: createError(400, 'O "name" deve ter pelo menos 3 caracteres'),
  ageNotFound: createError(400, 'O campo "age" é obrigatório'),
  invalidAge: createError(400, 'A pessoa palestrante deve ser maior de idade'),
  invalidWatchedAt: createError(400, 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'),
  invalidRate: createError(400, 'O campo "rate" deve ser um inteiro de 1 à 5'),
  invalidTalk: 
    createError(400, 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'),
};

module.exports = errorMessages;
