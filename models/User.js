const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please enter a username'],
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: [true, 'Email already exists'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    trim: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
