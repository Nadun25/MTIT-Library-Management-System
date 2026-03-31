const express = require('express');
const router  = express.Router();

const {
  getAllFines,
  createFine,
  getFineById,
  getOverdueFines,
  markFineAsPaid,
  deleteFine
} = require('../controllers/fineController');

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
 *         description: List of all fines
 *   post:
 *     summary: Create a fine
 *     tags: [Fines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, bookId, dueDate, returnDate]
 *             properties:
 *               userId:
 *                 type: string
 *               bookId:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 example: "2025-01-01"
 *               returnDate:
 *                 type: string
 *                 example: "2025-01-10"
 *     responses:
 *       201:
 *         description: Fine created successfully
 */
router.route('/').get(getAllFines).post(createFine);

/**
 * @swagger
 * /api/fines/overdue:
 *   get:
 *     summary: Get unpaid overdue fines (fineAmount > 0 and paid = false)
 *     tags: [Fines]
 *     responses:
 *       200:
 *         description: List of overdue fines
 */
router.get('/overdue', getOverdueFines);

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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fine details
 *       404:
 *         description: Fine not found
 *   delete:
 *     summary: Delete a fine
 *     tags: [Fines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fine deleted successfully
 *       404:
 *         description: Fine not found
 */
router.route('/:id').get(getFineById).delete(deleteFine);

/**
 * @swagger
 * /api/fines/{id}/pay:
 *   patch:
 *     summary: Mark a fine as paid
 *     tags: [Fines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fine marked as paid
 *       404:
 *         description: Fine not found
 */
router.patch('/:id/pay', markFineAsPaid);

module.exports = router;