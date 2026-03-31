const Fine = require('../models/Fine');

// create fine
exports.createFine = async (req, res) => {
  const { userId, bookId, dueDate, returnDate } = req.body;

  const due = new Date(dueDate);
  const returned = new Date(returnDate);

  let fineAmount = 0;

  if (returned > due) {
    const daysLate = Math.ceil((returned - due) / (1000 * 60 * 60 * 24));
    fineAmount = daysLate * 10;
  }

  const fine = await Fine.create({
    userId,
    bookId,
    dueDate,
    returnDate,
    fineAmount
  });

  res.json(fine);
};

// get all fines
exports.getFines = async (req, res) => {
  const fines = await Fine.find();
  res.json(fines);
};