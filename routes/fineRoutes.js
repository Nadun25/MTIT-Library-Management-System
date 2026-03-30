const express = require('express');
const router = express.Router();
const Fine = require('../models/Fine');

/**
 * @swagger
 * /api/fines:
 *   get:
 *     summary: Get all fines
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', async (req, res) => {
  const fines = await Fine.find();
  res.json(fines);
});

/**
 * @swagger
 * /api/fines:
 *   post:
 *     summary: Create a fine
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               bookId:
 *                 type: string
 *               dueDate:
 *                 type: string
 *               returnDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fine created
 */
router.post('/', async (req, res) => {
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
});

/**
 * @swagger
 * /api/fines/overdue:
 *   get:
 *     summary: Get overdue fines
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/overdue', async (req, res) => {
  const fines = await Fine.find({ paid: false });
  res.json(fines);
});

/**
 * @swagger
 * /api/fines/{id}:
 *   get:
 *     summary: Get fine by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', async (req, res) => {
  const fine = await Fine.findById(req.params.id);
  res.json(fine);
});

/**
 * @swagger
 * /api/fines/{id}:
 *   delete:
 *     summary: Delete a fine
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Fine ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fine deleted successfully
 */
router.delete('/:id', async (req, res) => {
  try {
    await Fine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fine deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;