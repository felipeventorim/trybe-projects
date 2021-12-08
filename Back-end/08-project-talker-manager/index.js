const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./routes/talker');
const login = require('./routes/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talker);
app.use('/login', login);

app.use((err, _req, res, _next) => res.status(err.status).json({ message: err.message }));

app.listen(PORT, () => {
  console.log('Online');
});
