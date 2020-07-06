const mongoose = require('mongoose');
const validatorCheck = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Количество символов от 2 до 30'],
    maxlength: [30, 'Количество символов от 2 до 30'],
  },
  link: {
    type: String,
    required: [true, 'Это обязательное поле'],
    validate: {
      validator(v) {
        return validatorCheck.isURL(v);
      },
      message: (props) => `${props.value} - вместо этого должна быть ссылка на изображение!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Это обязательное поле'],
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
