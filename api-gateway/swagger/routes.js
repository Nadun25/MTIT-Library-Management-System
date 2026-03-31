/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         active:
 *           type: boolean
 *
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - isbn
 *       properties:
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         isbn:
 *           type: string
 *         publishedYear:
 *           type: integer
 *         available:
 *           type: boolean
 *
 *     Loan:
 *       type: object
 *       required:
 *         - bookId
 *         - memberId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the loan
 *         bookId:
 *           type: string
 *           description: The ID of the book
 *         memberId:
 *           type: string
 *           description: The ID of the member
 *         loanDate:
 *           type: string
 *           format: date-time
 *           description: The date the loan was created
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The date the loan is due
 *         returnDate:
 *           type: string
 *           format: date-time
 *           description: The date the loan was returned
 *         status:
 *           type: string
 *           enum: [active, returned, overdue]
 *           description: The status of the loan
 *
 *     Fine:
 *       type: object
 *       required:
 *         - userId
 *         - bookId
 *         - dueDate
 *         - returnDate
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the fine
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         bookId:
 *           type: string
 *           description: The ID of the book
 *         dueDate:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *           description: The date the book was due
 *         returnDate:
 *           type: string
 *           format: date
 *           example: "2025-01-10"
 *           description: The date the book was returned
 *         fineAmount:
 *           type: number
 *           description: Calculated fine amount (10 per day late)
 *         paid:
 *           type: boolean
 *           description: Whether the fine has been paid
 */


/**
 * =========================
 * MEMBER ENDPOINTS
 * =========================
 */

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Success
 *
 *   post:
 *     summary: Create member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/members/{id}:
 *   get:
 *     summary: Get member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *
 *   put:
 *     summary: Update member
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       200:
 *         description: Updated
 *
 *   delete:
 *     summary: Delete member
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */


/**
 * =========================
 * BOOK ENDPOINTS
 * =========================
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Success
 *
 *   post:
 *     summary: Create book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *
 *   put:
 *     summary: Update book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Updated
 *
 *   delete:
 *     summary: Delete book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */


/**
 * =========================
 * LOAN ENDPOINTS
 * =========================
 */

/**
 * @swagger
 * /api/loans:
 *   get:
 *     summary: Get all loans
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: List of all loans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/loans/checkout:
 *   post:
 *     summary: Create a new loan (checkout a book)
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - memberId
 *             properties:
 *               bookId:
 *                 type: string
 *               memberId:
 *                 type: string
 *     responses:
 *       201:
 *         description: The loan was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/loans/return/{loanId}:
 *   put:
 *     summary: Mark a loan as returned
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: loanId
 *         required: true
 *         schema:
 *           type: string
 *         description: The loan ID
 *     responses:
 *       200:
 *         description: The loan was marked as returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       400:
 *         description: Bad request (i.e. already returned)
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/loans/member/{memberId}:
 *   get:
 *     summary: Get all loans for a specific member
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: The member ID
 *     responses:
 *       200:
 *         description: List of loans for the member
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/loans/overdue:
 *   get:
 *     summary: Get all overdue loans
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: List of overdue loans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/loans/{id}:
 *   get:
 *     summary: Get a single loan by ID
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The loan ID
 *     responses:
 *       200:
 *         description: The loan details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a loan
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The loan ID
 *     responses:
 *       200:
 *         description: Loan deleted successfully
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Server error
 */


/**
 * =========================
 * FINE ENDPOINTS
 * =========================
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Fine'
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a fine
 *     tags: [Fines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - bookId
 *               - dueDate
 *               - returnDate
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fine'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/fines/overdue:
 *   get:
 *     summary: Get unpaid overdue fines (fineAmount > 0 and paid = false)
 *     tags: [Fines]
 *     responses:
 *       200:
 *         description: List of overdue fines
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Fine'
 *       500:
 *         description: Server error
 */

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
 *         description: The fine ID
 *     responses:
 *       200:
 *         description: Fine details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fine'
 *       404:
 *         description: Fine not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a fine
 *     tags: [Fines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The fine ID
 *     responses:
 *       200:
 *         description: Fine deleted successfully
 *       404:
 *         description: Fine not found
 *       500:
 *         description: Server error
 */

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
 *         description: The fine ID
 *     responses:
 *       200:
 *         description: Fine marked as paid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fine'
 *       404:
 *         description: Fine not found
 *       500:
 *         description: Server error
 */