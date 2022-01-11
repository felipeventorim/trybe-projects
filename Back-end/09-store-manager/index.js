const express = require('express');
const errorHandler = require('./middlewares/errorHandler');

const router = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
