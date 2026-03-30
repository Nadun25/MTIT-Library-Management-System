/**
 * API Gateway Server
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * ROOT ROUTE
 */
app.get('/', (req, res) => {
    res.send('API Gateway is running...');
});

/**
 * PROXY: MEMBER SERVICE
 * http://localhost:5000/api/members -> http://localhost:8082/api/members
 */
app.use('/api/members', createProxyMiddleware({
    target: 'http://localhost:8082',
    changeOrigin: true
}));

/**
 * PROXY: BOOK SERVICE
 * http://localhost:5000/api/books -> http://localhost:8081/api/books
 */
app.use('/api/books', createProxyMiddleware({
    target: 'http://localhost:8081',
    changeOrigin: true
}));

/**
 * OPTIONAL: Swagger forwarding (if needed)
 */
app.use('/member-docs', createProxyMiddleware({
    target: 'http://localhost:8082',
    changeOrigin: true,
    pathRewrite: { '^/member-docs': '/api-docs' }
}));

app.use('/book-docs', createProxyMiddleware({
    target: 'http://localhost:8081',
    changeOrigin: true,
    pathRewrite: { '^/book-docs': '/api-docs' }
}));

// Start server
app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
    console.log(`Members via Gateway: http://localhost:${PORT}/api/members`);
    console.log(`Books via Gateway: http://localhost:${PORT}/api/books`);

    console.log('\n--- Swagger Access ---');
    console.log(`Member Swagger: http://localhost:${PORT}/member-docs`);
    console.log(`Book Swagger: http://localhost:${PORT}/book-docs`);
});