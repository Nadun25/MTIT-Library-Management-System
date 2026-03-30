/**
 * API Gateway Server - Fixed for http-proxy-middleware v3 + Express v5
 */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { swaggerUi, swaggerDocs } = require('./swagger/swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use((req, res, next) => {
    console.log('➡️ Gateway Hit:', req.method, req.originalUrl);
    next();
});

// Members proxy — mounted on / , filter inside
const membersProxy = createProxyMiddleware({
    target: 'http://localhost:8082',
    changeOrigin: true,
    pathFilter: (path) => path.startsWith('/api/members'),
    on: {
        proxyReq: (proxyReq, req) => {
            console.log(`🔀 Proxying to member-service: ${req.method} ${req.url}`);
        },
        error: (err, req, res) => {
            console.error('Proxy error (members):', err.message);
            res.status(502).json({ error: 'Member service unavailable' });
        }
    }
});

// Books proxy — mounted on / , filter inside
const booksProxy = createProxyMiddleware({
    target: 'http://localhost:8081',
    changeOrigin: true,
    pathFilter: (path) => path.startsWith('/api/books'),
    on: {
        proxyReq: (proxyReq, req) => {
            console.log(`🔀 Proxying to book-service: ${req.method} ${req.url}`);
        },
        error: (err, req, res) => {
            console.error('Proxy error (books):', err.message);
            res.status(502).json({ error: 'Book service unavailable' });
        }
    }
});

// Loans proxy — mounted on / , filter inside
const loansProxy = createProxyMiddleware({
    target: 'http://localhost:8083',
    changeOrigin: true,
    pathFilter: (path) => path.startsWith('/api/loans'),
    on: {
        proxyReq: (proxyReq, req) => {
            console.log(`🔀 Proxying to loan-service: ${req.method} ${req.url}`);
        },
        error: (err, req, res) => {
            console.error('Proxy error (loans):', err.message);
            res.status(502).json({ error: 'Loan service unavailable' });
        }
    }
});

// Mount all proxies at root level — pathFilter handles the routing
app.use(membersProxy);
app.use(booksProxy);
app.use(loansProxy);

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API Gateway is running...' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
    console.log(`Members:         http://localhost:${PORT}/api/members`);
    console.log(`Books:           http://localhost:${PORT}/api/books`);
    console.log(`Loans:           http://localhost:${PORT}/api/loans`);
    console.log(`Gateway Swagger: http://localhost:${PORT}/api-docs`);
});