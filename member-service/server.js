/**
 * Main Server File (Entry Point)
 * ------------------------------------
 * Starts the Member Service on port 8082
 */

const express = require('express');
const cors = require('cors');

// Import routes and middleware
const memberRoutes = require('./routes/memberRoutes');
const errorHandler = require('./middleware/errorHandler');
const { swaggerUi, swaggerDocs } = require('./swagger/swagger');

const app = express();
const PORT = 8082;

// Middleware
app.use(cors());              // Allow cross-origin requests
app.use(express.json());      // Parse JSON request body

// Routes
app.use('/api/members', memberRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`Member Service running on http://localhost:${PORT}`);
    console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});