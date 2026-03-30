const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API Gateway',
            version: '1.0.0',
            description: 'Unified API Gateway for Book, Member & Loan Services'
        },
        servers: [
            {
                url: 'http://localhost:5000'
            }
        ]
    },
    apis: [
        './swagger/routes.js'
    ]
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerDocs };