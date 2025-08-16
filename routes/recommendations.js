const express = require('express');
const router = express.Router();
const db = require('../database.js');
const { getCareerRecommendations } = require('../services/recommendationEngine.js');

// Route: GET /recommendations/:uid
router.get('/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    console.log(`Fetching profile for UID: ${uid}`);

    // 1. Fetch the user's profile from Firestore
    const profileDoc = await db.collection('profiles').doc(uid).get();
    if (!profileDoc.exists) {
      return res.status(404).json({ error: 'Profile not found.' });
    }
    const userProfile = profileDoc.data();

    // 2. Call our AI service to get recommendations
    const recommendations = await getCareerRecommendations(userProfile);

    // 3. (Optional but good practice) Save the recommendations back to Firestore
    await db.collection('recommendations').doc(uid).set({
      recommendations: recommendations,
      createdAt: new Date().toISOString(),
    });

    // 4. Send the recommendations back to the client
    res.status(200).json(recommendations);

  } catch (error) {
    console.error("Error getting recommendations:", error);
    res.status(500).json({ error: 'Failed to get recommendations.' });
  }
});

module.exports = router;