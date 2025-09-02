const db = require('../database.js');
// ONE single import for all functions from the recommendation engine
const { 
  getCareerRecommendations, 
  compareCareerPaths, 
  generateProjectIdea 
} = require('../services/recommendationEngine.js');

const generateRecommendations = async (req, res) => {
  try {
    const { uid } = req.params;
    const profileDoc = await db.collection('profiles').doc(uid).get();
    if (!profileDoc.exists) {
      return res.status(404).json({ error: 'Profile not found.' });
    }
    const userProfile = profileDoc.data();
    const recommendations = await getCareerRecommendations(userProfile);
    await db.collection('recommendations').doc(uid).set({
      recommendations: recommendations,
      createdAt: new Date().toISOString(),
    });
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

const suggestProject = async (req, res) => {
  try {
    const { careerRecommendation, userInterests } = req.body;
    if (!careerRecommendation || !userInterests) {
      return res.status(400).json({ error: 'Career recommendation and user interests are required.' });
    }
    const projectIdea = await generateProjectIdea(careerRecommendation, userInterests);
    res.status(200).json(projectIdea);
  } catch (error) {
    console.error("Error suggesting project:", error);
    res.status(500).json({ error: 'Failed to suggest project.' });
  }
};

module.exports = {
  generateRecommendations,
  compareCareers,
  suggestProject,
};