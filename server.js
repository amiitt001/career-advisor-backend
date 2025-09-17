const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

// A simple health check endpoint
app.get('/', (req, res) => {
  console.log('Smoke test server was accessed.');
  res.status(200).send('Minimal server is running!');
});

app.listen(PORT, () => {
  console.log(`Minimal smoke test server listening on port ${PORT}`);
});