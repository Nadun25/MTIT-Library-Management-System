const mongoose = require('mongoose');

const fineSchema = new mongoose.Schema({
  userId: String,
  bookId: String,
  dueDate: Date,
  returnDate: Date,
  fineAmount: Number,
  paid: { type: Boolean, default: false }
});

module.exports = mongoose.model('Fine', fineSchema);