const { required } = require("joi");
const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  createdAt: {
    immutable: true,
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model(`User`, userSchema);
