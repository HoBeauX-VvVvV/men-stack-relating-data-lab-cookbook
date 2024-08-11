const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [ foodSchema ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;


