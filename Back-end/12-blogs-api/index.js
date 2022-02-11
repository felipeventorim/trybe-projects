const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const router = require('./routers');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use(router);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));