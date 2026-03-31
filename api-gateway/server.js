const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { swaggerUi, swaggerDocs } = require('./swagger/swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const MEMBER_SERVICE_URL = process.env.MEMBER_SERVICE_URL || 'http://localhost:8082';
const BOOK_SERVICE_URL   = process.env.BOOK_SERVICE_URL   || 'http://localhost:8081';
const LOAN_SERVICE_URL   = process.env.LOAN_SERVICE_URL   || 'http://localhost:8083';
const FINE_SERVICE_URL   = process.env.FINE_SERVICE_URL   || 'http://localhost:8084';

app.use(cors());

app.use((req, res, next) => {
    console.log('➡️ Gateway Hit:', req.method, req.originalUrl);
    next();
});

const membersProxy = createProxyMiddleware({
    target: MEMBER_SERVICE_URL,
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

const booksProxy = createProxyMiddleware({
    target: BOOK_SERVICE_URL,
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

const loansProxy = createProxyMiddleware({
    target: LOAN_SERVICE_URL,
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

const finesProxy = createProxyMiddleware({
    target: FINE_SERVICE_URL,
    changeOrigin: true,
    pathFilter: (path) => path.startsWith('/api/fines'),
    on: {
        proxyReq: (proxyReq, req) => {
            console.log(`🔀 Proxying to fine-service: ${req.method} ${req.url}`);
        },
        error: (err, req, res) => {
            console.error('Proxy error (fines):', err.message);
            res.status(502).json({ error: 'Fine service unavailable' });
        }
    }
});

app.use(membersProxy);
app.use(booksProxy);
app.use(loansProxy);
app.use(finesProxy);

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API Gateway is running...' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
    console.log(`Members:         ${MEMBER_SERVICE_URL}/api/members`);
    console.log(`Books:           ${BOOK_SERVICE_URL}/api/books`);
    console.log(`Loans:           ${LOAN_SERVICE_URL}/api/loans`);
    console.log(`Fines:           ${FINE_SERVICE_URL}/api/fines`);
    console.log(`Gateway Swagger: http://localhost:${PORT}/api-docs`);
});