const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database.js'); 
const requestLogger = require('./middlewares/requestLogger.js');

// --- LOAD ENV VARIABLES ---
dotenv.config();

// --- 1. DEFINE ROUTES ---
const profileRoutes = require('./routes/profile.js');
const resumeRoutes = require('./routes/resume.js');
const recommendationRoutes = require('./routes/recommendations.js');

// --- 2. INITIALIZE APP ---
const app = express();

// --- 3. CONFIGURE CORS ---
// IMPORTANT: Replace with your actual Vercel frontend URL!
const whitelist = ['https://career-advisor-frontend.vercel.app', 'http://localhost:3000']; 
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// --- 4. USE MIDDLEWARE ---
app.use(cors(corsOptions)); // Use CORS with your custom options
app.use(express.json());   // Middleware to parse JSON bodies
app.use(requestLogger);    // Your custom logger

// --- 5. USE ROUTES ---
app.use('/api/profile', profileRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/recommendations', recommendationRoutes);

// --- 6. BASE AND TEST ROUTES ---
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is running and CORS is working!' });
});

app.get('/api/test-firestore', async (req, res) => {
  try {
    const snapshot = await db.collection('test-collection').get();
    res.status(200).json({
      message: 'Successfully connected to Firestore and performed a test read!',
      documentsFound: snapshot.docs.length,
    });
  } catch (error) {
    console.error("Error during /test-firestore route:", error);
    res.status(500).json({
      message: 'Failed to communicate with Firestore.',
      error: error.message,
    });
  }
});

// --- 7. START THE SERVER ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});