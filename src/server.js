const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const publicDir = path.join(__dirname, '..', 'public');

app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/catalog', (req, res) => {
    res.sendFile(path.join(publicDir, 'catalog.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(publicDir, 'cart.html'));
});

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(publicDir, 'checkout.html'));
});

app.get('/enterprise', (req, res) => {
    res.sendFile(path.join(publicDir, 'enterprise.html'));
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', project: 'node' });
});

function startServer() {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = { app, startServer };
