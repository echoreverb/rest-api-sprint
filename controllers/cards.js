const mongoose = require('mongoose');
const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({})
      .orFail(new Error('Произошла ошибка'));
    res.json({ cards });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const created = await Card.create({ name, link, owner });
    res.json({ created });
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(400).send({ message: e.message });
    } else {
      res.status(500).send({ message: e.message });
    }
  }
};

const deleteCard = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    res.status(400).send({ message: 'Некорректный cardId' });
  } else if (!(await Card.exists({ _id: req.params.cardId }))) {
    res.status(400).send({ message: 'Карточки с таким cardId не существует' });
  } else {
    try {
      await Card.deleteOne({ _id: req.params.cardId });
      res.json('Карточка удалена');
    } catch (e) {
      res.status(500).send({ message: 'Ошибка при удалении карточки' });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const updated = await Card.findByIdAndUpdate(req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true })
      .orFail(new Error('Ошибка при простановке лайка'));
    res.json({ updated });
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const updated = await Card.findByIdAndUpdate(req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true })
      .orFail(new Error('Ошибка при отмене лайка'));
    res.json({ updated });
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
