/**
 * Swagger Configuration
 * ------------------------------------
 * Generates API documentation
 */

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Member Service API',
            version: '1.0.0',
            description: 'API for managing library members'
        },
        servers: [
            {
                url: 'http://localhost:8082'
            }
        ]
    },
    apis: ['./routes/*.js'] // Reads route comments (optional)
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerDocs };