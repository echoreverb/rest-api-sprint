const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersPath));
function getUser(id) {
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  return users.find((elem) => elem._id === id);
}

const sendUsers = (req, res) => {
  if (!users) {
    /* eslint no-console: ["error", { allow: ["error"] }] */
    console.error('Извините, ошибка');
    return;
  }
  res.send(users);
};

const doesUserExist = (req, res, next) => {
  if (!getUser(req.params.id)) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  next();
};

const sendUser = (req, res) => {
  res.send(getUser(req.params.id));
};

router.get('/', sendUsers);

router.get('/:id', doesUserExist);
router.get('/:id', sendUser);

module.exports = router;
