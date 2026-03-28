require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler');
const { swaggerUi, swaggerDocs } = require('./swagger/swagger');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main Root Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Library Management - Book Service' });
});

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use('/api/books', bookRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8081;

const server = app.listen(PORT, () => {
    console.log(`Book Service running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
