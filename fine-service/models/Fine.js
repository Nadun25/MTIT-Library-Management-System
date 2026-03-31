const mongoose = require('mongoose');

const fineSchema = new mongoose.Schema({
  userId:      { type: String, required: true },
  bookId:      { type: String, required: true },
  dueDate:     { type: Date,   required: true },
  returnDate:  { type: Date,   required: true },
  fineAmount:  { type: Number, default: 0 },
  paid:        { type: Boolean, default: false }
}, { timestamps: true });

fineSchema.method('toJSON', function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
});

module.exports = mongoose.model('Fine', fineSchema);