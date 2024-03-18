// src/main/frontend/src/setProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'http://127.0.0.1:5000',
            changeOrigin: true,
        })
    );
};