const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');
const router = require('./router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, '..', '..', 'uploads'))); 

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => {
  res.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(router);

app.use(errorMiddleware);

module.exports = app;
