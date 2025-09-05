const express = require('express');
const router = express.Router();
const { generateRecommendations, compareCareers,   getDynamicQuiz,
  getQuizSuggestion } = require('../controllers/recommendationController.js');


// The route now simply points to the controller function
router.get('/:uid', generateRecommendations);
router.post('/compare', compareCareers);
router.post('/quiz/suggest-topic', getQuizSuggestion);

module.exports = router;