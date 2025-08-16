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

module.exports = router;// ... your existing router.post(...) code should be above this

// This route handles updating a profile with new information, like a score
router.patch('/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const dataToUpdate = req.body; // This will be an object like { assessmentScore: 80 }

    if (!uid) {
      return res.status(400).json({ error: 'UID is missing.' });
    }

    // .update() merges data into an existing document without overwriting the whole thing
    await db.collection('profiles').doc(uid).update(dataToUpdate);

    res.status(200).json({ 
      message: 'Profile updated successfully!', 
      uid: uid,
      updatedData: dataToUpdate 
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

module.exports = router;