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