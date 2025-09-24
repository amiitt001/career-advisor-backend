const express = require('express');
const cors = require('cors'); // Import the cors package

// --- IMPORTANT: Import your route files ---
const profileRoutes = require('./routes/profile.js'); // Assuming this is the path to your profile routes
// Add your other route imports here, for example:
// const recommendationRoutes = require('./routes/recommendations.js');

const app = express();
const PORT = process.env.PORT || 8080;

// === Middleware ===

// 1. Enable JSON body parsing
app.use(express.json());

// 2. Configure and enable CORS
const corsOptions = {
  origin: 'https://career-advisor-frontend-g6hl.vercel.app', // Your frontend's URL
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// === Routes ===

// A simple health check endpoint
app.get('/', (req, res) => {
  res.status(200).send('Career Advisor backend is running!');
});

// 3. Use your application's routes
app.use('/api/profile', profileRoutes);
// Add your other routes here, for example:
// app.use('/api/recommendations', recommendationRoutes);


// === Start Server ===
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});