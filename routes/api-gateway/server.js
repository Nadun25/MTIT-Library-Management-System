const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

app.use('/api/fines', createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});