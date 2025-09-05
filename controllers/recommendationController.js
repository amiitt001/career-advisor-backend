const db = require('../database.js');
const { 
  getCareerRecommendations, 
  compareCareerPaths, 
  generateProjectIdea,
  generateQuiz,
  suggestQuizTopic 
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
    const comparisonData = await compareCareerPaths(career1, career2);
    res.status(200).json(comparisonData);
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

const getDynamicQuiz = async (req, res) => {
  try {
    const { careerTitle } = req.params;
    if (!careerTitle) {
      return res.status(400).json({ error: 'Career title is required.' });
    }
    const quiz = await generateQuiz(careerTitle);
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ error: 'Failed to generate quiz.' });
  }
};

const getQuizSuggestion = async (req, res) => {
  try {
    const userProfile = req.body;
    if (!userProfile || !userProfile.interests || !userProfile.skills) {
      return res.status(400).json({ error: 'User profile with interests and skills is required.' });
    }
    const topic = await suggestQuizTopic(userProfile);
    res.status(200).json({ topic });
  } catch (error) {
    console.error("Error suggesting quiz topic:", error);
    res.status(500).json({ error: 'Failed to suggest quiz topic.' });
  }
};

module.exports = {
  generateRecommendations,
  compareCareers,
  suggestProject,
  getDynamicQuiz,
  getQuizSuggestion,
};