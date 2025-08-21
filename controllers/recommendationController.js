const db = require('../database.js');
const { getCareerRecommendations } = require('../services/recommendationEngine.js');
const { getCareerRecommendations, compareCareerPaths } = require('../services/recommendationEngine.js');

const generateRecommendations = async (req, res) => {
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

    // 3. Save the recommendations back to Firestore
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
};
const compareCareers = async (req, res) => {
  try {
    const { career1, career2 } = req.body;
    if (!career1 || !career2) {
      return res.status(400).json({ error: 'Two career paths are required for comparison.' });
    }
    const comparison = await compareCareerPaths(career1, career2);
    res.status(200).json({ comparisonText: comparison });
  } catch (error) {
    console.error("Error comparing careers:", error);
    res.status(500).json({ error: 'Failed to compare careers.' });
  }
};


module.exports = {
   generateRecommendations,
  compareCareers,
};