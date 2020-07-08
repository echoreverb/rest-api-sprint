const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: '5f0209d71b10c9e918751e0c' };
  next();
});

app.use('/users', users);
app.use('/cards', cards);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      /* eslint no-console: ["error", { allow: ["log", "error"] }] */
      console.log(`Server is running on PORT: ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
}

start();
