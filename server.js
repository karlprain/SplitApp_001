const express = require('express');
const path = require('path');
const app = express();

// Serve static files from current directory
app.use(express.static(path.join(__dirname), {
  maxAge: '1d',
  etag: false
}));

// Serve index.html for root and any route that doesn't match a file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// SPA fallback - route all non-file requests to index.html for router
app.get(/^(?!.*\.).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`[ui5-server] Server running at http://localhost:${PORT}`);
});
