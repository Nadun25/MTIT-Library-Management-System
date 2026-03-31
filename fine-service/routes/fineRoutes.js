const express = require('express');
const router = express.Router();
const Fine = require('../models/Fine');

/**
 * @swagger
 * tags:
 *   name: Fines
 *   description: Fine management APIs
 */

/**
 * @swagger
 * /api/fines:
 *   get:
 *     summary: Get all fines
 *     tags: [Fines]
 *     responses:
 *       200:
 *         description: List of fines
 */
router.get('/', async (req, res) => {
  try {
    const fines = await Fine.find();
    res.status(200).json(fines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/fines:
 *   post:
 *     summary: Create a fine
 *     tags: [Fines]
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
 *         description: Fine created successfully
 */
router.post('/', async (req, res) => {
  try {
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

    res.status(200).json(fine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/fines/overdue:
 *   get:
 *     summary: Get unpaid (overdue) fines
 *     tags: [Fines]
 *     responses:
 *       200:
 *         description: List of overdue fines
 */
router.get('/overdue', async (req, res) => {
  try {
    const fines = await Fine.find({ paid: false });
    res.status(200).json(fines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/fines/{id}:
 *   get:
 *     summary: Get fine by ID
 *     tags: [Fines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Fine ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fine details
 */
router.get('/:id', async (req, res) => {
  try {
    const fine = await Fine.findById(req.params.id);
    res.status(200).json(fine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/fines/{id}:
 *   delete:
 *     summary: Delete a fine
 *     tags: [Fines]
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
    res.status(200).json({ message: 'Fine deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;