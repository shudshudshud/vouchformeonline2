import express from 'express';

const app = express();
const PORT = 5000;

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to Your Node.js App!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
