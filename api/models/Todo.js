const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is quired'],
    trim: true
  },
  description: {
    type: String,
    required: false,
    max: 40
  },
  completed: {
    type: Boolean,
    required: false,
    default: false
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
