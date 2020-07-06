const mongoose = require('mongoose');
const validatorCheck = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validatorCheck.isURL(v);
      },
      message: (props) => `${props.value} - вместо этого должна быть ссылка на изображение!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
