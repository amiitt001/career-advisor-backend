const express = require('express');
const router = express.Router();
const db = require('../database.js'); // Go up one level to find database.js

// This route handles POST requests to /profile
router.post('/', async (req, res) => {
  try {
    const profileData = req.body;
    console.log("Received profile data:", profileData);

    // A UID is required to save the document
    if (!profileData.uid) {
      return res.status(400).json({ error: 'UID is missing from the request.' });
    }

    const uid = profileData.uid;

    // Save the data to a 'profiles' collection with the document ID as the user's UID
    await db.collection('profiles').doc(uid).set(profileData);

    res.status(201).json({ 
      message: 'Profile saved successfully!', 
      uid: uid 
    });

  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ error: 'Failed to save profile.' });
  }
});

module.exports = router;