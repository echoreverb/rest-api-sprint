const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const cardsPath = path.join(__dirname, '../data/cards.json');
const cardsData = JSON.parse(fs.readFileSync(cardsPath));

const sendCards = (req, res) => {
  if (!cardsData) {
    /* eslint no-console: ["error", { allow: ["error"] }] */
    console.error('Извините, ошибка');
    return;
  }
  res.send(cardsData);
};

router.get('/', sendCards);

module.exports = router;
