const Fine = require('../models/Fine');

// GET all fines
const getAllFines = async (req, res, next) => {
  try {
    const fines = await Fine.find();
    res.status(200).json({ success: true, count: fines.length, data: fines });
  } catch (error) {
    next(error);
  }
};

// POST create fine
const createFine = async (req, res, next) => {
  try {
    const { userId, bookId, dueDate, returnDate } = req.body;

    if (!userId || !bookId || !dueDate || !returnDate) {
      return res.status(400).json({
        success: false,
        error: 'userId, bookId, dueDate and returnDate are all required'
      });
    }

    const due      = new Date(dueDate);
    const returned = new Date(returnDate);
    let fineAmount = 0;

    if (returned > due) {
      const daysLate = Math.ceil((returned - due) / (1000 * 60 * 60 * 24));
      fineAmount = daysLate * 10;
    }

    const fine = await Fine.create({ userId, bookId, dueDate, returnDate, fineAmount });
    res.status(201).json({ success: true, data: fine });
  } catch (error) {
    next(error);
  }
};

// GET fine by ID
const getFineById = async (req, res, next) => {
  try {
    const fine = await Fine.findById(req.params.id);
    if (!fine) {
      return res.status(404).json({ success: false, error: 'Fine not found' });
    }
    res.status(200).json({ success: true, data: fine });
  } catch (error) {
    next(error);
  }
};

// GET overdue fines (unpaid with fineAmount > 0)
const getOverdueFines = async (req, res, next) => {
  try {
    const fines = await Fine.find({ paid: false, fineAmount: { $gt: 0 } });
    res.status(200).json({ success: true, count: fines.length, data: fines });
  } catch (error) {
    next(error);
  }
};

// PATCH mark fine as paid
const markFineAsPaid = async (req, res, next) => {
  try {
    const fine = await Fine.findByIdAndUpdate(
      req.params.id,
      { paid: true },
      { new: true, runValidators: true }
    );
    if (!fine) {
      return res.status(404).json({ success: false, error: 'Fine not found' });
    }
    res.status(200).json({ success: true, data: fine });
  } catch (error) {
    next(error);
  }
};

// DELETE fine
const deleteFine = async (req, res, next) => {
  try {
    const fine = await Fine.findByIdAndDelete(req.params.id);
    if (!fine) {
      return res.status(404).json({ success: false, error: 'Fine not found' });
    }
    res.status(200).json({ success: true, message: 'Fine deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFines,
  createFine,
  getFineById,
  getOverdueFines,
  markFineAsPaid,
  deleteFine
};