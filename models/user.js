const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [{ type: mongoose.Schema.types.ObjectId, ref: 'Food'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;


const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  //category: { type: String, required: true },
  //vegan: Boolean,
  // glutenFree: Boolean
});

const Food = model('Food', foodSchema);

module.exports = Food;