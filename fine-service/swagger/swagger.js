const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi   = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title:       'Fine Service API',
      version:     '1.0.0',
      description: 'API documentation for Fine Service'
    },
    servers: [{ url: 'http://localhost:8084' }]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerDocs };