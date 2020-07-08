const mongoose = require('mongoose');
const User = require('../models/user');

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const created = await User.create({ name, about, avatar });
    res.json({ data: created });
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(400).send({ message: e.message });
      return;
    }
    res.status(500).send({ message: e.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .orFail();
    res.json({ data: users });
  } catch (e) {
    if (e.name === 'DocumentNotFoundError') {
      res.json({ data: [] });
      return;
    }
    res.status(500).send({ message: e.message });
  }
};

const getUserById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    res.status(400).send({ message: 'Некорректный userId' });
    return;
  }
  try {
    const user = await User.findById(req.params.userId)
      .orFail();
    res.json({ data: user });
  } catch (e) {
    if (e.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: 'Не найден пользователь с таким userId' });
      return;
    }
    res.status(500).send({ message: e.message });
  }
};

const updateUser = async (req, res) => {
  const { name, about } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(req.user._id,
      { name, about },
      { new: true, runValidators: true })
      .orFail(new Error('Ошибка при обновлении юзеринфо'));
    res.json({ data: updated });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(req.user._id,
      { avatar },
      { new: true, runValidators: true })
      .orFail(new Error('Ошибка при обновлении аватара'));
    res.json({ data: updated });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
};
