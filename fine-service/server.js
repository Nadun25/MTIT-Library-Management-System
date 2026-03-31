const express    = require('express');
const dotenv     = require('dotenv');
const cors       = require('cors');

dotenv.config();

const connectDB      = require('./config/db');
const fineRoutes     = require('./routes/fineRoutes');
const errorHandler   = require('./middleware/errorHandler');
const { swaggerUi, swaggerDocs } = require('./swagger/swagger');

// Connect to MongoDB
connectDB();

const app  = express();
const PORT = process.env.PORT || 8084;

// Middleware
app.use(cors());
app.use(express.json());

// Root
app.get('/', (req, res) => {
  res.send('Fine Service API is running...');
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/fines', fineRoutes);

// Global error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger:  http://localhost:${PORT}/api-docs`);
});
