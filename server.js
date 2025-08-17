const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database.js'); 

// --- 1. DEFINE ROUTES ---
const profileRoutes = require('./routes/profile.js');
const resumeRoutes = require('./routes/resume.js');
const recommendationRoutes = require('./routes/recommendations.js');

dotenv.config();

// --- 2. INITIALIZE APP ---
const app = express();

// --- 3. USE MIDDLEWARE ---
app.use(cors());
app.use(express.json());
const requestLogger = require('./middlewares/requestLogger.js');
app.use(requestLogger);

// --- 4. USE ROUTES ---
app.use('/profile', profileRoutes);
app.use('/resume', resumeRoutes);
app.use('/recommendations', recommendationRoutes);

const PORT = process.env.PORT || 5000;

// --- BASE AND TEST ROUTES ---
app.get('/', (req, res) => {
  res.send('Career Advisor Backend is running...');
});

app.get('/test-firestore', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});