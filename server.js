const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const app = express(); // ✅ THIS WAS MISSING

app.use(cors());
app.use(express.json());

// ✅ Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Fine Service API',
      version: '1.0.0',
      description: 'API documentation for Fine Service'
    },
    servers: [
      {
        url: 'http://localhost:5000'
      }
    ]
  },
  apis: [__dirname + '/routes/*.js'], // ✅ FIXED
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Routes
app.use('/api/fines', require('./routes/fineRoutes'));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});